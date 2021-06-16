# homebridge-mi-waterpuri

小米净水器homebridge插件

[English](README.md)

可能支持以下型号的净水器

| 型号 | 名字 | 通过测试 | 
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

## 因为没有对应的配件，暂时使用光线感应器来替代

## 安装

1. 请按照[README](https://github.com/nfarina/homebridge/blob/master/README.md). 安装  HomeBridge。 
如果你用的是树莓派，请参考这个 [Running-HomeBridge-on-a-Raspberry-Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi).   
2. 请确保您可以在iOS设备中看到HomeBridge，如果没有，请检查步骤1。  
3. 安装软件包。
4. 获取ip和token，请安装这个版本的米家 [link](https://www.kapiba.ru/2017/11/mi-home.html)

```
npm install -g miio homebridge-mi-waterpuri
```

## 配置

```
"platforms": [{
    "platform": "MiWaterPurifierPlatform",
    "deviceCfgs": [{
        "type": "MiWaterPurifier",
        "ip": "192.168.31.x",
        "token": "xxxxxxxxxxxxxxxxxxx",
        "FilteredWaterQuality": "过滤后水质",
        "TapWaterQuality": "自来水水质",
        "PpCottonFilterRemaining": "PP棉滤芯剩余天数",
        "FrontActiveCarbonFilterRemaining": "前置活性炭滤芯剩余天数",
        "RoFilterRemaining": "RO反渗透滤芯剩余天数",
        "RearActiveCarbonFilterRemaining": "后置活性炭滤芯剩余天数"
    }]
}]
```

如果你不想显示某个项目，请删除该配置项或者把值留空白，比如只显示进水和出水的TDS

```
"platforms": [{
    "platform": "MiWaterPurifierPlatform",
    "deviceCfgs": [{
        "type": "MiWaterPurifier",
        "ip": "192.168.31.x",
        "token": "xxxxxxxxxxxxxxxxxxx",
        "FilteredWaterQuality": "过滤后水质",
        "TapWaterQuality": "自来水水质"
    }]
}]
```
