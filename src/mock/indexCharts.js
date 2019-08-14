import Mock from "mockjs"

Mock.mock('/api/v1/haveDataTime', "get", {
    "code": "0",
    "msg": "数据返回正常！",
    "data": {
        "minTime": "1514736000000",
        "maxTime": "1564588800000"
    }
})
Mock.mock('/api/v1/mainPanelData', "get", {
    "code": "0",
    "msg": "数据返回正常！",
    "data": {
        "totalData": [{
            "totalNum": "1263",
            "completionRate": "2",
            "accomplishRate": "55.8",
            "yearCompared": "-43",
            "monthCompared": "7",
            "title": "收入(万元)",
            "nowData": "1263",
            "permeability": null
        }, {
            "totalNum": "7993",
            "completionRate": "1",
            "accomplishRate": "45.2",
            "yearCompared": "-53",
            "monthCompared": "6",
            "title": "销量(台)",
            "nowData": "7993",
            "permeability": null
        }, {
            "totalNum": "5136",
            "completionRate": "6",
            "accomplishRate": "170.5",
            "yearCompared": "4",
            "monthCompared": "15",
            "title": "零售额(万元)",
            "nowData": "5136",
            "permeability": null
        }, {
            "totalNum": "34473",
            "completionRate": "6",
            "accomplishRate": "193.4",
            "yearCompared": "24",
            "monthCompared": "12",
            "title": "零售量(台)",
            "nowData": "34473",
            "permeability": null
        }, {
            "totalNum": "1490",
            "completionRate": null,
            "accomplishRate": null,
            "yearCompared": "-16",
            "monthCompared": "2",
            "title": "ASP(元)",
            "nowData": null,
            "permeability": null
        }, {
            "totalNum": "--",
            "completionRate": null,
            "accomplishRate": null,
            "yearCompared": null,
            "monthCompared": null,
            "title": "毛利率 暂无数据...",
            "nowData": null,
            "permeability": null
        }],
        "trendData": null,
        "compared": null,
        "updateTime": "2019-08-03 11:14:32",
        "dataStatus": "data"
    }
})
