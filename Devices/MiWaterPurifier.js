require('./Base');

const inherits = require('util').inherits;
const miio = require('miio');

var Accessory, PlatformAccessory, Service, Characteristic, UUIDGen;
MiWaterPurifier = function(platform, config) {
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
    if(this.config['Name'] && this.config['Name'] != "") {
        this.accessories['WaterAccessory'] = new MiWaterPurifierServices(this);
    }
    var accessoriesArr = this.obj2array(this.accessories);
    
    this.platform.log.debug("[MiWaterPurifier][DEBUG]Initializing " + this.config["type"] + " device: " + this.config["ip"] + ", accessories size: " + accessoriesArr.length);
    
    
    return accessoriesArr;
}
inherits(MiWaterPurifier, Base);

MiWaterPurifierServices = function(dThis) {
    this.device = dThis.device;
    this.name = dThis.config['Name'];
    this.token = dThis.config['token'];
    this.platform = dThis.platform;
}

MiWaterPurifierServices.prototype.getServices = function() {
    var that = this;
    var services = [];
    var tokensan = this.token.substring(this.token.length-8);
    var infoService = new Service.AccessoryInformation();
    infoService
        .setCharacteristic(Characteristic.Manufacturer, "XiaoMi")
        .setCharacteristic(Characteristic.Model, "Water Purifier")
        .setCharacteristic(Characteristic.SerialNumber, tokensan);
    services.push(infoService);   
    var MiWaterPurifierService = new Service.TemperatureSensor(this.name);
    MiWaterPurifierService
        .getCharacteristic(Characteristic.CurrentTemperature)
        .on('get', function(callback) {
            this.device.call("get_prop").then(result => {
                that.platform.log.debug("[MiWaterPurifier][DEBUG]MiWaterPurifier - getWaterDensity: " + result);
                callback(null, result[1]);
            }).catch(function(err) {
                that.platform.log.error("[MiWaterPurifier][ERROR]MiWaterPurifier - getWaterDensity Error: " + err);
                callback(err);
            });
        }.bind(this))
    services.push(MiWaterPurifierService);
    return services;
}

