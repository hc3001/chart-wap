<template>
    <div class="detail-first" v-if="totalData && totalData.length !== 0">
        <div v-for="(val, index) in totalData" class="index-content">
            <div class="module-title font14 clo000">{{val.title}}</div>
            <div class="totalMoney align-center font26" v-if="val.totalNum" :class="{'align-left': val.completionRate === undefined, 'align-center': val.completionRate !== undefined}">
                <span v-if="val.totalNum && val.totalNum != '--'">
                    <countTo :startVal='0' :endVal='parseFloat(val.totalNum)' :duration='500'></countTo>
                </span>
                <span v-else>{{numberFormat(val.totalNum)}}</span>
            </div>
            <div v-if="val.completionRate" class="ring-content">
                <div class="cloum-align completion-rate" v-if="val.completionRate">
                    <span class="font22 black-font">{{percentFormat(val.completionRate)}}</span>
                    <span class="gray-font">达成率</span>
                </div>
                <ve-ring :data="chartData[index]" :tooltip-visible="false" :legend-visible="false" :settings="chartSettings" :colors="colors[index]" width="3.1rem" height="2.8rem" ref="chartsring"></ve-ring>
            </div>
            <div class="common-rate">
                <div class="rate-item" v-if="val.yearCompared || val.yearCompared === 0">
                    <span>同比</span>
                    <span class='icon iconfont' :class="{'iconjiantou-xia-px': val.yearCompared < 0, 'iconjiantou-shang-px': val.yearCompared > 0}"></span>
                    <span class="black-font">{{percentFormat(val.yearCompared)}}</span>
                </div>
                <div class="rate-item" v-if="val.monthCompared || val.monthCompared === 0">
                    <span>环比</span>
                    <span class='icon iconfont' :class="{'iconjiantou-xia-px': val.monthCompared < 0, 'iconjiantou-shang-px': val.monthCompared > 0}"></span>
                    <span class="black-font">{{percentFormat(val.monthCompared)}}</span>
                </div>
                <div class="rate-item" v-if="val.permeability || val.permeability === 0">
                    <span>渗透率</span>
                    <span class='icon iconfont' :class="{'iconjiantou-xia-px': val.permeability < 0, 'iconjiantou-shang-px': val.permeability > 0}" v-if="val.permeability !== '--'"></span>
                    <span class="black-font">{{percentFormat(val.permeability)}}</span>
                </div>
                <div class="rate-item" v-if="val.nowData || val.permeability === 0">
                    <span>当日</span>
                    <span class="black-font">{{numberFormat(val.nowData)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {NumberFormat, percentFormat} from '@/assets/js/common.js';
    import VeRing from 'v-charts/lib/ring.common'
    import 'v-charts/lib/style.css'
    import countTo from 'vue-count-to';

    export default {
        props: {
            totalData: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            this.chartSettings = {
                radius: [50, 58],
                offsetY: '50%',
                labelLine: {
                    show: false
                },
                label: {
                    show: false
                },
                hoverAnimation: false,
            },
            this.colors = []
            return {
                chartData: [],
            }
        },
        watch: {
            totalData: {
                deep: true,
                handler: function() {
                    //容器的初始宽度未知问题解决
                    this.$nextTick(()=> {
                        var targets = this.$refs.chartsring
                        if(targets) {
                            targets.forEach((val)=> {
                                val.echarts.resize()
                            })
                            this.rangeColorshow()
                        }
                    })
                }
            }
        },
        created() {

        },
        components: {
            VeRing,
            countTo
        },
        mounted() {
            this.rangeColorshow()
        },
        methods: {
            numberFormat(value){
                return NumberFormat(value);
            },
            percentFormat(value) {
                return percentFormat(value);
            },
            rangeColorshow() {
                this.colors = []
                this.chartData = []
                this.totalData.forEach((val, index)=> {
                    //颜色用accomplishRate判断，圆弧大小用completionRate显示
                    let data = {}
                    let color = []
                    let remain
                    let num = val.completionRate === '--' ? 0 : Number(val.completionRate)
                    if(num > 100) {
                        num = 100
                        remain = 0
                    } else {
                        remain = 100 - num
                    }
                    let accomlish = val.accomplishRate === null ? 0 : Number(val.accomplishRate)
                    if(accomlish >= 98) {
                        color = ['#66CB09','#e0e8ea']
                    } else if(accomlish >= 95 && accomlish < 98) {
                        color = ['#F5A623','#e0e8ea']
                    } else {
                        color = ['#DE4140','#e0e8ea']
                    }
                    data.columns = ['goal', 'rate']
                    data.rows = [
                        { 'goal': 'reach', 'rate': num },
                        { 'goal': 'unacommpolished', 'rate': remain },
                    ]
                    this.chartData.push(data)
                    this.colors.push(color)
                })
            }
        },
    }
</script>
<style lang="scss">
    @import "./../../assets/sass/detailFirst.scss";
</style>
