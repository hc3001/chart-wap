<template>
    <div class="ve-pie">
        <div class="cloum-align completion-rate" v-if="true">
            <span class="font17 black-font">{{NumberFormat(piechartData.totalData)}}</span>
            <span class="gray-font font11">总计({{unit}})</span>
        </div>
        <ve-pie :data="piechartData.charts" :settings="piechartSettings"  :extend="piechartExtend" height="4.6rem" :after-set-option="afterOption" ref="chartspie" :loading="loading"></ve-pie>
    </div>
</template>
<script type="text/ecmascript-6">
    import {NumberFormat} from '@/assets/js/common.js'
    import VePie from 'v-charts/lib/pie.common'

    export default {
        data() {
            //南丁格尔图
            this.piechartSettings = {
                roseType: 'radius',
            }
            this.piechartExtend = {
                series: {
                    color: ['rgba(225, 55, 78, 1)', 'rgba(74, 144, 226, 1)', 'rgba(236, 51, 117, 1)', 'rgba(247, 117, 105, 1)', 'rgba(167, 66, 166, 1)'],
                    center: ['50%', '55%'],
                    radius : [47, 88],
                    startAngle: 180,
                    label: {
                        normal: {
                            formatter: function(param) {
                                return param.name + '\n\n' + '占比' + Math.round(param.percent) + '%';
                            },
                            color: 'rgba(51, 51, 51, 1)',
                            fontSize: 13,
                        }
                    },
                    labelLine: {
                        length: 3,
                        length2: 10
                    },
//                    silent: true,
                },
                legend: {
                    show: false
                },
            }
            return {
                unit: '万元',
                loading: false,
            }
        },
        watch: {
            piechartData: {
                deep: true,
                handler: function(newValue, oldValue) {
                    this.loading = true
                    if(newValue.category === 'retailAmount') {
                        this.unit = '万元'
                    } else if(newValue.category === 'retailCount') {
                        this.unit = '台'
                    }
                    this.$nextTick(() => {
                        this.$refs.chartspie.echarts.resize()
                    })
                }
            }
        },
        props: {
            piechartData: Object,
            default: ()=> {
                return {}
            }
        },
        methods: {
            NumberFormat(value) {
                return NumberFormat(value);
            },
            afterOption() {
                this.loading = false
            },
        },
        components: {
            VePie,
        },
    }
</script>
<style>

</style>