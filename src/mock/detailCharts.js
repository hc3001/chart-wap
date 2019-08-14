import Mock from "mockjs"

Mock.mock('/api/v1/detailedPanelData', "post", {
    "code": "0",
    "msg": "数据返回正常！",
    "data": {
        "totalData": [{
            "totalNum": "6183",
            "completionRate": "9",
            "accomplishRate": "92",
            "yearCompared": "-27",
            "monthCompared": "34",
            "title": "发货(万元)",
            "nowData": "3083",
            "permeability": null
        }],
        "trendData": null,
        "compared": [{
            "title": "收入同比趋势",
            "detailData": [{
                "categoryTitle": "retailAverage",
                "unit": "%",
                "categoryData": {
                    "columns": ["日期", "同比"],
                    "rows": [{"同比": "-25", "日期": "03月"}, {"同比": "-14", "日期": "04月"}, {
                        "同比": "22",
                        "日期": "05月"
                    }, {"同比": "0", "日期": "06月"}, {"同比": "35", "日期": "07月"}, {"同比": "-27", "日期": "08月"}]
                }
            }],
            "goodsStatus": "goodsOut"
        }],
        "updateTime": "2019-08-04 22:25:33",
        "dataStatus": "data"
    }
})

