# homebridge-mi-water-purifier

MiWaterPurifier for homebridge

Thanks for [nfarina](https://github.com/nfarina)(the author of [homebridge](https://github.com/nfarina/homebridge)), [OpenMiHome](https://github.com/OpenMiHome/mihome-binary-protocol), [aholstenson](https://github.com/aholstenson)(the author of [miio](https://github.com/aholstenson/miio)), all other developer and testers.   

## TDS shows in Temperature.(No accessory available for water purifier)

## Installation
1. Install HomeBridge, please follow it's [README](https://github.com/nfarina/homebridge/blob/master/README.md).   
If you are using Raspberry Pi, please read [Running-HomeBridge-on-a-Raspberry-Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi).   
2. Make sure you can see HomeBridge in your iOS devices, if not, please go back to step 1.   
3. Install packages.   

```
npm install -g miio homebridge-mi-water-purifier2
```

## Configuration

```
"platforms": [{
    "platform": "MiWaterPurifierPlatform",
    "deviceCfgs": [{
        "type": "MiWaterPurifier",
        "ip": "192.168.31.x",
        "token": "xxxxxxxxxxxxxxxxxxx",
        "Name": "Water TDS"
    }]
}]
```
