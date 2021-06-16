# homebridge-mi-waterpuri

MiWaterPurifier for homebridge

[简体中文说明](README_zh.md)

The following models of water purifiers may be supported

| Model| Name| Test| 
| :--- | :---: | :---: | 
| yunmi.waterpurifier.v1| Mi Water Purifier v1 | [ ] |
| yunmi.waterpurifier.v2| Mi Water Purifier v2 | [ ] |
| yunmi.waterpurifier.v3| Mi Water Purifier (Under sink) v3 | [ ] |
| yunmi.waterpurifier.v4| Mi Water Purifier v4 | [ ] |
| yunmi.waterpuri.lx2| Mi Water Purifier lx2 | [ ] |
| yunmi.waterpuri.lx3| Mi Water Purifier (Under Counter) | [x] |
| yunmi.waterpuri.lx4| Mi Water Purifier lx4 | [ ] |
| yunmi.waterpuri.lx5| Mi Water Purifier 1A/400G Pro | [x] |
| yunmi.waterpuri.lx6| Mi Water Purifier (Under Counter) | [ ] |
| yunmi.waterpuri.lx7| Mi Water Purifier 500G/500G Pro | [ ] |
| yunmi.waterpuri.lx8| Mi Water Purifier 600G | [ ] |
| yunmi.waterpuri.lx9| Mi Water Purifier D1 | [ ] |
| yunmi.waterpuri.lx10| Mi Water Purifier lx10 | [ ] |
| yunmi.waterpuri.lx11| Mi Water Purifier C1 (Triple Setting) | [ ] |
| yunmi.waterpuri.lx12| Mi Water Purifier S1 | [ ] |

## TDS shows in LightSensor.(No accessory available for water purifier)

## Installation

1. Install HomeBridge, please follow it's [README](https://github.com/nfarina/homebridge/blob/master/README.md).   
If you are using Raspberry Pi, please read [Running-HomeBridge-on-a-Raspberry-Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi).   
2. Make sure you can see HomeBridge in your iOS devices, if not, please go back to step 1.   
3. Install packages.   
4. Get ip and token, please install this version of Mijia [link](https://www.kapiba.ru/2017/11/mi-home.html)

```
npm install -g miio homebridge-mi-waterpuri
```

## Configuration

```
"platforms": [{
    "platform": "MiWaterPurifierPlatform",
    "deviceCfgs": [{
        "type": "MiWaterPurifier",
        "ip": "192.168.31.x",
        "token": "xxxxxxxxxxxxxxxxxxx",
        "FilteredWaterQuality": "TDS OUT",
        "TapWaterQuality": "TDS IN",
        "PpCottonFilterRemaining": "PP cottonfilter remaining",
        "FrontActiveCarbonFilterRemaining": "Front active Carbonfilter remaining",
        "RoFilterRemaining": "Ro Filter Remaining",
        "RearActiveCarbonFilterRemaining": "Rear active carbonFilter remaining"
    }]
}]
```

If you don't want to display an item, please delete the configuration item or leave the value blank, such as displaying only the TDS of inlet and outlet water

```
"platforms": [{
    "platform": "MiWaterPurifierPlatform",
    "deviceCfgs": [{
        "type": "MiWaterPurifier",
        "ip": "192.168.31.x",
        "token": "xxxxxxxxxxxxxxxxxxx",
        "FilteredWaterQuality": "TDS OUT",
        "TapWaterQuality": "TDS IN"
    }]
}]
```
