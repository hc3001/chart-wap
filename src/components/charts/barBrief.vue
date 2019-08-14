<template>
    <div class="ve-histogram">
        <ve-histogram height="4.32rem" :data="hischartData.charts" :extend="hischartExtend" :settings="hischartSettings" :colors="histogramColors" :after-config="afterConfig" ref="chartsbar" :loading="loading" :after-set-option="afterOption">
        </ve-histogram>
    </div>
</template>
<script type="text/ecmascript-6">
    import VeHistogram from 'v-charts/lib/histogram.common'
    import VeLine from 'v-charts/lib/line.common'

    export default {
        data() {
            //柱状图
            this.hischartSettings = {
                showLine: ['达成率'],
                axisSite: { right: ['达成率'] },
                yAxisName: []
            }
            this.histogramColors = ['rgba(74, 144, 226, 1)', 'rgba(225, 55, 78, 1)', 'rgba(245, 166, 35, 1)']
            this.hischartExtend = {
                series: {
                    label: {
                        show: false,
                        position: "inside"
                    },
                    barWidth: 13,
                    symbolSize: 8,
                    barGap: 0,
                },
                legend: {
                    left: 'center',
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 5,
                    bottom: 0,
                    padding: 0,
                    textStyle: {
                        fontSize: 10,
                    },
                    // selected: {}
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    top: '15%',
                    bottom: '10%',
                    // containLabel: false
                },
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
                        fontSize: '10'
                    }
                },
                yAxis: {
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(223, 223, 223, 1)"
                        },
                    },
                    splitLine: {
                        show: true,
                    },
                    axisLabel: {
                        color: "rgba(102, 102, 102, 1)",
                    },
                    nameTextStyle: {
                        padding: [0, 15, 0, 0],
                        color: "rgba(102, 102, 102, 1)"
                    },
                }
            }
            return {
                loading: false
            }
        },
        watch: {
            hischartData: {
                deep: true,
                handler: function(newValue, oldValue) {
                    this.getUnit()
                    this.loading = true
                    this.$nextTick(() => {
                        this.$refs.chartsbar.echarts.resize()
                    })
                }
            }
        },
        mounted() {

        },
        props: {
            hischartData: Object,
            default: ()=> {
                return {}
            }
        },
        methods: {
            getUnit() {
                let category = this.hischartData.category
                let unit
                if(category === 'retailAmount') {
                    unit = '万元'
                } else if(category === 'retailCount') {
                    unit = '台'
                }
                this.$set(this.hischartSettings, 'yAxisName', [unit, '达成率%'])
            },
            //对生成好的echarts配置进行额外的处理,去掉右侧分割线
            afterConfig(option) {
                var opt = JSON.parse(JSON.stringify(option))
                const yAxis = opt.yAxis.map((val)=> {
                    if(val.name === '达成率%') {
                        this.$set(val.splitLine, 'show', false)
                    }
                    return val
                })
                this.$set(opt, 'yAxis', yAxis)
                return opt
            },
            afterOption() {
                this.loading = false
            },
        },
        components: {
            VeHistogram,
        },
    }
</script>
<style>

</style>
