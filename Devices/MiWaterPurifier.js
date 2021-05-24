require('./Base');

const inherits = require('util').inherits;
const miio = require('miio');

var Accessory, PlatformAccessory, Service, Characteristic, UUIDGen;
MiWaterPurifier = function (platform, config) {
    this.init(platform, config);

    Accessory = platform.Accessory;
    PlatformAccessory = platform.PlatformAccessory;
    Service = platform.Service;
    Characteristic = platform.Characteristic;
    UUIDGen = platform.UUIDGen;

    this.device = new miio.Device({
        address: this.config['ip'],
        token: this.config['token']
    });

    this.accessories = {};
    if (this.config['FilteredWaterQuality'] && this.config['Name'] != "") {
        this.accessories['FilteredWaterQualityAccessory'] = new bnAccessory(this, 'FilteredWaterQuality');
    }
    if (this.config['TapWaterQuality'] && this.config['TapWaterQuality'] != "") {
        this.accessories['TapWaterQualityAccessory'] = new bnAccessory(this, 'TapWaterQuality');
    }
    if (this.config['PpCottonFilterRemaining'] && this.config['PpCottonFilterRemaining'] != "") {
        this.accessories['PpCottonFilterRemainingAccessory'] = new bnAccessory(this, 'PpCottonFilterRemaining');
    }
    if (this.config['FrontActiveCarbonFilterRemaining'] && this.config['FrontActiveCarbonFilterRemaining'] != "") {
        this.accessories['FrontActiveCarbonFilterRemainingAccessory'] = new bnAccessory(this, 'FrontActiveCarbonFilterRemaining');
    }
    if (this.config['RoFilterRemaining'] && this.config['RoFilterRemaining'] != "") {
        this.accessories['RoFilterRemainingAccessory'] = new bnAccessory(this, 'RoFilterRemaining');
    }
    if (this.config['RearActiveCarbonFilterRemaining'] && this.config['RearActiveCarbonFilterRemaining'] != "") {
        this.accessories['RearActiveCarbonFilterRemainingAccessory'] = new bnAccessory(this, 'RearActiveCarbonFilterRemaining');
    }

    var accessoriesArr = this.obj2array(this.accessories);

    this.platform.log.debug("[MiWaterPurifier][DEBUG]Initializing " + this.config["type"] + " device: " + this.config["ip"] + ", accessories size: " + accessoriesArr.length);


    return accessoriesArr;
}
inherits(MiWaterPurifier, Base);
bnAccessory = function (dThis, type) {
    this.device = dThis.device;
    this.name = dThis.config[type];
    this.token = dThis.config['token'];
    this.platform = dThis.platform;
    this.type = type;
}

bnAccessory.prototype.getServices = function () {
    var that = this;
    var services = [];
    var tokensan = this.token.substring(this.token.length - 8);
    var infoService = new Service.AccessoryInformation();
    infoService
        .setCharacteristic(Characteristic.Manufacturer, "XiaoMi")
        .setCharacteristic(Characteristic.Model, "Water Purifier")
        .setCharacteristic(Characteristic.SerialNumber, tokensan);
    services.push(infoService);
    var MiWaterPurifierService;
    var getChar;
    switch (this.type) {
        //自来水水质
        case 'TapWaterQuality':
            MiWaterPurifierService = new Service.LightSensor(this.name);
            getChar = Characteristic.CurrentAmbientLightLevel;
            break;
        //过滤水质
        case 'FilteredWaterQuality':
            MiWaterPurifierService = new Service.LightSensor(this.name);
            getChar = Characteristic.CurrentAmbientLightLevel;
            break;
        //PP棉剩余天数
        case 'PpCottonFilterRemaining':
            MiWaterPurifierService = new Service.LightSensor(this.name);
            getChar = Characteristic.CurrentAmbientLightLevel;
            break;
        //前置活性炭剩余天数
        case 'FrontActiveCarbonFilterRemaining':
            MiWaterPurifierService = new Service.LightSensor(this.name);
            getChar = Characteristic.CurrentAmbientLightLevel;
            break;
        //RO反渗透滤芯剩余天数
        case 'RoFilterRemaining':
            MiWaterPurifierService = new Service.LightSensor(this.name);
            getChar = Characteristic.CurrentAmbientLightLevel;
            break;
        //后置活性炭滤芯剩余天数
        case 'RearActiveCarbonFilterRemaining':
            MiWaterPurifierService = new Service.LightSensor(this.name);
            getChar = Characteristic.CurrentAmbientLightLevel;
            break;
        default:
            break;
    }

    //自来水水质：0:209 TAP_WATER_QUALITY
    //过滤水质：1:16 FILTERED_WATER_QUALITY
    //PP棉剩余天数 int((status[11] - status[3]) / 24) PP_COTTON_FILTER_REMAINING 
    //PP棉剩余百分比 math.floor(pfd * 24 * 100 / status[11])
    //前置活性炭剩余天数 int((status[13] - status[5]) / 24) FRONT_ACTIVE_CARBON_FILTER_REMAINING 
    //前置活性炭剩余百分比 math.floor(fcfd * 24 * 100 / status[13])
    //RO反渗透滤芯剩余天数 int((status[15] - status[7]) / 24) RO_FILTER_REMAINING
    //RO反渗透滤芯剩余百分比  math.floor(rfd * 24 * 100 / status[15])
    //后置活性炭滤芯剩余天数 int((status[17] - status[9]) / 24) REAR_ACTIVE_CARBON_FILTER_REMAINING
    //后置活性炭滤芯百分比 math.floor(rcfd * 24 * 100 / status[17])
    MiWaterPurifierService
        .getCharacteristic(getChar)
        .on('get', function (callback) {
            this.device.call("get_prop").then(result => {
                that.platform.log.debug("[MiWaterPurifier][DEBUG]MiWaterPurifier - getWaterDensity: " + result);
                var res;
                //res = parseInt((result[11] - result[3]) / 24);
                switch (this.type) {
                    case 'TapWaterQuality':
                        res = result[0];
                        break;
                    case 'FilteredWaterQuality':
                        res = result[1];
                        break;
                    case 'PpCottonFilterRemaining':
                        res = parseInt((result[11] - result[3]) / 24);
                        break;
                    case 'FrontActiveCarbonFilterRemaining':
                        res = parseInt((result[13] - result[5]) / 24);
                        break;
                    case 'RoFilterRemaining':
                        res = parseInt((result[15] - result[7]) / 24);
                        break;
                    case 'RearActiveCarbonFilterRemaining':
                        res = parseInt((result[17] - result[9]) / 24);
                        break;
                    default:
                        break;
                }

                callback(null, res);
            }).catch(function (err) {
                that.platform.log.error("[MiWaterPurifier][ERROR]MiWaterPurifier - getWaterDensity Error: " + err);
                callback(err);
            });
        }.bind(this))
    services.push(MiWaterPurifierService);
    return services;
}

