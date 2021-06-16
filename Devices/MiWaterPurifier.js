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
        case 'TapWaterQuality':
            if (this.name != '' && this.name != null) {
                MiWaterPurifierService = new Service.LightSensor(this.name);
                getChar = Characteristic.CurrentAmbientLightLevel;
            }
            break;
        case 'FilteredWaterQuality':
            if (this.name != '' && this.name != null) {
                MiWaterPurifierService = new Service.LightSensor(this.name);
                getChar = Characteristic.CurrentAmbientLightLevel;
            }
            break;
        case 'PpCottonFilterRemaining':
            if (this.name != '' && this.name != null) {
                MiWaterPurifierService = new Service.LightSensor(this.name);
                getChar = Characteristic.CurrentAmbientLightLevel;
            }
            break;
        case 'FrontActiveCarbonFilterRemaining':
            if (this.name != '' && this.name != null) {
                MiWaterPurifierService = new Service.LightSensor(this.name);
                getChar = Characteristic.CurrentAmbientLightLevel;
            }
            break;
        case 'RoFilterRemaining':
            if (this.name != '' && this.name != null) {
                MiWaterPurifierService = new Service.LightSensor(this.name);
                getChar = Characteristic.CurrentAmbientLightLevel;
            }
            break;
        case 'RearActiveCarbonFilterRemaining':
            if (this.name != '' && this.name != null) {
                MiWaterPurifierService = new Service.LightSensor(this.name);
                getChar = Characteristic.CurrentAmbientLightLevel;
            }

            break;
        default:
            break;
    }

    MiWaterPurifierService
        .getCharacteristic(getChar)
        .on('get', function (callback) {

            this.device.call("get_prop", ["tds_in", "tds_out", "f1_totaltime", "f1_usedtime", "f2_totaltime", "f2_usedtime", "f3_totaltime", "f3_usedtime", "f4_totaltime", "f4_usedtime"]).then(result => {
                // that.platform.log.info(result);
                that.platform.log.debug("[MiWaterPurifier][DEBUG]MiWaterPurifier - getWaterDensity: " + result);
                var res = 1;
                if (result.length > 0) {
                    switch (this.type) {
                        case 'TapWaterQuality':
                            res = parseInt(result[0]);
                            break;
                        case 'FilteredWaterQuality':
                            res = parseInt(result[1]);
                            break;
                        case 'PpCottonFilterRemaining':
                            res = parseInt((result[2] - result[3]) / 24);
                            break;
                        case 'FrontActiveCarbonFilterRemaining':
                            res = parseInt((result[4] - result[5]) / 24);
                            break;
                        case 'RoFilterRemaining':
                            res = parseInt((result[6] - result[7]) / 24);
                            break;
                        case 'RearActiveCarbonFilterRemaining':
                            res = parseInt((result[8] - result[9]) / 24);
                            break;
                        default:
                            break;
                    }

                }
                callback(null, res);

            }).catch(function (err) {
                that.platform.log.error("[MiWaterPurifier][ERROR]MiWaterPurifier - getWaterDensity Error: " + err);
                // callback(err);
                callback(null, 1);
            });
        }.bind(this))
    services.push(MiWaterPurifierService);
    return services;
}

