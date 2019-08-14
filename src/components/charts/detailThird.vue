<template>
    <div class="main-card" v-if="compared && compared.length !== 0">
        <div class="font16 clo000 fontbold">{{compared[0].title}}</div>
        <div v-if="this.categoryStatus == 4" class="line-align-center radio-select">
            <div v-for="(val, ind) in titleList" class="line-align-center" @click="chooseCategory(val)" v-if="val.show">
                <input type="radio" id="index" :value="val.name" v-model="selectTitle">
                <label for="index" class="font14">{{val.title}}</label>
            </div>
        </div>
        <div class="line-data">
            <ve-line :data="chartData" :colors="colors" height="5.6rem" :extend="chartExtend" :yAxis="yAxis" ref="chartline"></ve-line>
        </div>
    </div>
</template>

<script>
    import VeLine from 'v-charts/lib/line.common'
    import 'v-charts/lib/style.css'
    import 'echarts/lib/component/dataZoom'
    import {mapState, mapMutations} from 'vuex'
    
    export default {
        props: {
            compared: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            this.chartExtend = {
                series: {
                    type: 'line',
                    smooth: false,
                    label: {
                        show: false,
                        position: "top"
                    }
                },
                legend: {
                    left: 'center',
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 5,
                    bottom: 25,
                    padding: 0,
                    textStyle: {
                        fontSize: 10,
                    },
                    selected: {}
                },
                grid: {
                    left: '0%',
                    top: '12%',
                    bottom: '20%'
                },
                dataZoom: [{
                    type: 'slider',
                    show:true,
                    height: 13,
                    bottom: 45,
                    zoomLock:true,
                }],
                xAxis: {
                    axisLabel: {
                        interval: 0,
                        rotate: 50,
                    }
                }
            }
            this.yAxis = {
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#DFDFDF"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#666666",
                },
                scale: true, //数据均匀分布
                name: "(%)",
                nameLocation: 'end',
                nameTextStyle: {
                    padding: [0, 15, 0, 0],
                    color: "#666666"
                }
            }
            this.colors = ['#F5A623', '#3DA5FE', '#EE6962', '#6CC60A', '#B27DE0']
            return {
                chartData: {},
                selectTitle: '',
                titleList: [{
                    name: 'shipAverage',
                    title: '出货均价',
                    show: true,
                },{
                    name: 'retailAverage',
                    title: '零售均价',
                    show: true,
                }],
                bussinessObj: [{
                    text: '整体', value: '0'
                },{
                    text: '京东', value: '1'
                },{
                    text: '连锁', value: '2'
                },{
                    text: '天猫', value: '3'
                },{
                    text: '全品类', value: '4'
                },],
                departmentObj: [{
                    text: '业务部整体', value: '8'
                },{
                    text: 'TV', value: '1'
                },{
                    text: '冰洗', value: '2'
                },{
                    text: '空调', value: '3'
                },{
                    text: '东芝', value: '4'
                },{
                    text: '乐华', value: '5'
                },{
                    text: '健康电器', value: '6'
                }],
            }
        },
        components: {
            've-line': VeLine
        },
        watch: {
            compared: {
                deep: true,
                handler: function(newValue, oldValue) {
                    if(this.compared && this.compared.length !== 0) {
                        if(newValue[0].detailData.length > 1) {
                            this.selectTitle = 'shipAverage'
                        } else {
                            this.selectTitle = 'retailAverage'
                        }
                        this.getselectList(this.selectTitle)
                        this.$nextTick(() => {
                            this.$refs.chartline.echarts.resize()
                        })
                    }
                }
            }
        },
        created() {

        },
        computed: {
            //获取vuex state对象值
            ...mapState({
                headerStatus: (state) => {
                    return state.headerStatus
                },
                categoryStatus: (state) => {
                    return state.categoryStatus
                },
            })
        },
        mounted() {
            if(this.compared[0].detailData.length > 1) {
                this.selectTitle = 'shipAverage'
            } else {
                this.selectTitle = 'retailAverage'
            }
            this.getselectList(this.selectTitle)
        },
        methods: {
            getselectList(selectTitle) {
                if(this.compared && this.compared.length !== 0) {
                    const detailData = this.compared[0].detailData
                    detailData.forEach((val, index) => {
                        if(val.categoryTitle === selectTitle) {
                            if(val.categoryData.columns.length < 3) {
                                this.$set(this.chartExtend.legend, 'selectedMode', false)
                            }
                            this.chartData = val.categoryData
                            //asp进入只选择一个业务体或渠道，折线图只选中一个图例，其他图例置灰。
                            if(this.categoryStatus == 4) {
                                this.bussinessObj.forEach((val, index)=> {
                                    if(this.headerStatus.bussinessValue == 0) {
                                        this.$set(this.chartExtend.legend.selected, val.text, true)
                                    } else {
                                        if(val.value == this.headerStatus.bussinessValue) {
                                            this.$set(this.chartExtend.legend.selected, val.text, true)
                                        } else {
                                            this.$set(this.chartExtend.legend.selected, val.text, false)
                                        }
                                    }
                                })
                                this.departmentObj.forEach((val, index)=> {
                                    if(this.headerStatus.departmentValue == 8) {
                                        this.$set(this.chartExtend.legend.selected, val.text, true)
                                    } else {
                                        if(val.value == this.headerStatus.departmentValue) {
                                            this.$set(this.chartExtend.legend.selected, val.text, true)
                                        } else {
                                            this.$set(this.chartExtend.legend.selected, val.text, false)
                                        }
                                    }
                                })

                                //选择渠道，只有整体有出货、零售均价，其他都只有零售均价
                                if(this.headerStatus.bussinessValue != 0) {
                                    this.titleList.forEach((val, inde)=> {
                                        if(val.name === 'shipAverage') {
                                            val.show = false
                                        }
                                    })
                                } else {
                                    this.titleList.forEach((val, inde)=> {
                                        val.show = true
                                    })
                                }
                            }
                            this.yAxis.name = `(${val.unit})`
                            this.xZoomrange()
                        }
                    })
                }
            },
            //获取x轴数据数量，6个月为dataZoom 100%
            xZoomrange() {
                let num = this.chartData.rows.length
                if(num > 6) {
                    this.$set(this.chartExtend.dataZoom[0], 'startValue', (num - val.len))
                    this.$set(this.chartExtend.dataZoom[0], 'endValue', num - 1)
                }
                this.chartExtend.dataZoom[0].show = (num<=6)?false:true
            },
            chooseCategory(select) {
                this.getselectList(select.name)
                this.$nextTick(() => {
                    this.$refs[`chartline`].echartsResize()
                })
            }
        }
    }
</script>
<style lang="scss">
    @import "./../../assets/sass/detailThird.scss";
</style>
