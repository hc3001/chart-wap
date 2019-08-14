<template>
    <div class="trend-main main-card" v-if="trendData && trendData.length !== 0">
        <div class="font16 clo000 fontbold">{{trendData[0].title}}</div>
        <!--<ul class="select-date">-->
            <!--<li v-for="(n, m) in selectDateStyle" :class="{'active':n.title==selectDateFlag}" @click="changeDate(n.title)">{{n.name}}</li>-->
        <!--</ul>-->
        <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :colors="colors" :y-axis="yAxis" ref="chartsbar"></ve-histogram>
    </div>
</template>
<script>
    import VeHistogram from 'v-charts/lib/histogram.common'
    import 'echarts/lib/component/dataZoom'
    import 'v-charts/lib/style.css'
    import {mapState, mapMutations} from 'vuex'

    export default {
        props: {
            trendData: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            this.chartSettings = {
                stack: {}
            }
            this.colors = ["#3DA5FE", "#6CC60A", "#FBB33B", "#EE6962", "#B27DE0"]
            this.yAxis = {
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(223,223,223,1)"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "rgba(102,102,102,1)",
                },
                name: "",
                nameLocation: 'end',
                nameTextStyle: {
                    padding: [0, 15, 0, 0],
                    color: "rgba(102,102,102,1)"
                }
            }
            this.chartExtend = {
                series: {
                    label: {
                        show: false,
                        position: "inside"
                    },
                    barWidth: 25,
                },
                grid: {
                    left: '0%',
                    top: '12%',
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
                dataZoom: [
                    {
                        show:true,
                        xAxisIndex: [0],
                        type: 'slider',
                        height: 13,
                        bottom: 45,
                        zoomLock:true
                    }
                ],
                xAxis: {
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(223,223,223,1)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "rgba(102,102,102,1)",
                        interval: 0,
                        rotate: 50,
                    }
                },
            }
            return {
                selectDateStyle: [{
                    name: "日",
                    title: 'day',
                    len: 7, //x轴显示数据
                }, {
                    name: "周",
                    title: 'week',
                    len: 6,
                },{
                    name: "月",
                    title: 'mouth',
                    len: 6,
                },{
                    name: "季度",
                    title: 'quarter',
                    len: 6,
                },],
                selectDateFlag: 'day',
                chartData: {},
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
            }
        },
        components: {
            VeHistogram
        },
        watch: {
            trendData: {
                deep: true,
                handler: function(newValue, oldValue) {
                    if(newValue) {
                        this.getCategory()
                        this.$nextTick(() => {
                            this.$refs.chartsbar.echarts.resize()
                        })
                    }
                }
            }
        },
        mounted() {
            this.getCategory()
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
        methods: {
            getCategory() {
                if(this.trendData && this.trendData.length !== 0) {
                    this.trendData[0].detailData.forEach((val, index) => {
                        if(val.categoryTitle === this.selectDateFlag) {
                            this.chartData = Object.assign({}, val.categoryData)
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
                            this.$set(this.yAxis, 'name', `(${val.unit})`)
                        }
                    })
                    if(this.trendData[0].detailData[0].categoryData.columns.length < 3) {
                        this.$set(this.chartExtend.legend, 'selectedMode', false)
                    }
                    this.chartSettings.stack.channel = this.chartData.columns.slice(1)
                    this.xZoomrange()
                }
            },
            //获取x轴数据数量
            xZoomrange() {
                let num = this.chartData.rows.length
                let percent = 0
                this.selectDateStyle.forEach((val, index) => {
                    if(val.title === this.selectDateFlag) {
                        this.$set(this.chartExtend.dataZoom[0], 'show', (num<=val.len)?false:true)
                        this.$set(this.chartExtend.dataZoom[0], 'startValue', (num - val.len))
                        this.$set(this.chartExtend.dataZoom[0], 'endValue', num - 1)
                    }
                })
            },
            changeDate(title) {
                this.selectDateFlag = title
                this.getCategory()
            }
        }
    }
</script>
<style lang="scss">
    @import "./../../assets/sass/detailSecond.scss";
</style>
