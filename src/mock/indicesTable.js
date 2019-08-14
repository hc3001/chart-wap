import Mock from "mockjs"

Mock.mock('/api/v1/indexData', "post", {
    "code": "0",
    "msg": "数据返回正常！",
    "data": [{
        "name": "零售结构",
        "unit": "台",
        "title": ["业务部", "指标", "当天", "本周", "月累", "PBP", "PBP达成率", "累计渗透率", "月渗透率目标"],
        "content": [[{"value": "TV", "color": "#FFFFFF", "colspan": "1", "rowspan": "4"}], [{
            "value": "CP",
            "color": "#F8F0E3",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "1180", "color": "#F8F0E3", "colspan": "1", "rowspan": "1"}, {
            "value": "1180",
            "color": "#F8F0E3",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "1180", "color": "#F8F0E3", "colspan": "1", "rowspan": "1"}, {
            "value": "19810",
            "color": "#F8F0E3",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "6%", "color": "#5AB309", "colspan": "1", "rowspan": "1"}, {
            "value": "10%",
            "color": "#5AB309",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "10%", "color": "#F8F0E3", "colspan": "1", "rowspan": "1"}], [{
            "value": "C系列",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "730", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}, {
            "value": "730",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "730", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}, {
            "value": "10160",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "7%", "color": "#5AB309", "colspan": "1", "rowspan": "1"}, {
            "value": "6%",
            "color": "#5AB309",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "5%", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}], [{
            "value": "P系列",
            "color": "#F3F7F9",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "450", "color": "#F3F7F9", "colspan": "1", "rowspan": "1"}, {
            "value": "450",
            "color": "#F3F7F9",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "450", "color": "#F3F7F9", "colspan": "1", "rowspan": "1"}, {
            "value": "9650",
            "color": "#F3F7F9",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "5%", "color": "#5AB309", "colspan": "1", "rowspan": "1"}, {
            "value": "4%",
            "color": "#E74D51",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "5%", "color": "#F3F7F9", "colspan": "1", "rowspan": "1"}], [{
            "value": "空调",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "2"
        }], [{"value": "变频", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}, {
            "value": "2150",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "2150", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}, {
            "value": "2150",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "38211", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}, {
            "value": "6%",
            "color": "#5AB309",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "22%", "color": "#E74D51", "colspan": "1", "rowspan": "1"}, {
            "value": "37%",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }], [{"value": "冰洗", "color": "#FFFFFF", "colspan": "1", "rowspan": "4"}], [{
            "value": "小计",
            "color": "#F8F0E3",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "2857", "color": "#F8F0E3", "colspan": "1", "rowspan": "1"}, {
            "value": "2857",
            "color": "#F8F0E3",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "2857", "color": "#F8F0E3", "colspan": "1", "rowspan": "1"}, {
            "value": "56253",
            "color": "#F8F0E3",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "5%", "color": "#5AB309", "colspan": "1", "rowspan": "1"}, {
            "value": "37%",
            "color": "#5AB309",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "29%", "color": "#F8F0E3", "colspan": "1", "rowspan": "1"}], [{
            "value": "风冷",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "1541", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}, {
            "value": "1541",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "1541", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}, {
            "value": "29152",
            "color": "#FFFFFF",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "5%", "color": "#5AB309", "colspan": "1", "rowspan": "1"}, {
            "value": "20%",
            "color": "#5AB309",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "15%", "color": "#FFFFFF", "colspan": "1", "rowspan": "1"}], [{
            "value": "滚筒",
            "color": "#F3F7F9",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "1316", "color": "#F3F7F9", "colspan": "1", "rowspan": "1"}, {
            "value": "1316",
            "color": "#F3F7F9",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "1316", "color": "#F3F7F9", "colspan": "1", "rowspan": "1"}, {
            "value": "27101",
            "color": "#F3F7F9",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "5%", "color": "#5AB309", "colspan": "1", "rowspan": "1"}, {
            "value": "17%",
            "color": "#5AB309",
            "colspan": "1",
            "rowspan": "1"
        }, {"value": "14%", "color": "#F3F7F9", "colspan": "1", "rowspan": "1"}]]
    }]
})

