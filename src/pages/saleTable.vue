<template>
    <div>
        <div class="main">
            <!--第一部分总数据-->
            <div class="main-infor">
                <div class="main-top">
                    <div class="main-time hide"></div>
                    <div>
                        <span class="iconfont icon iconxiaoshoushujujianbaodabiaoti white-bg font50"></span>
                    </div>
                    <div class="main-time font15" @click="dateShow = true">
                        <div>{{tableYear}}</div>
                        <div class="detail-time">
                            <span v-if="Number(tableMounth) < 10">0</span>
                            <countTo :startVal='0' :endVal = Number(tableMounth) :duration='1000'></countTo>
                            <span class="fgx">/</span>
                            <span v-if="Number(tableDay) < 10">0</span>
                            <countTo :startVal='0' :endVal = Number(tableDay) :duration='2000'></countTo>
                        </div>
                    </div>
                </div>
                <div class="main-detail">
                    <div class="time-select" @click="selectShow = true">
                        <span class="font13">{{selectNow.name}}</span>
                        <span class="iconfont icon iconxia-px" v-if="!selectShow"></span>
                        <span class="iconfont icon iconshang-px" v-if="selectShow"></span>
                    </div>
                    <div class="accumu-title">
                        <div class="font15">本{{selectText}}累计(万元)</div>
                        <div class="font45" v-if="!selectfirstDate.amount">--</div>
                        <div class="font45" v-else>
                            <countTo :startVal='0' :endVal = selectfirstDate.amount :duration='500'></countTo>
                        </div>
                    </div>
                    <div class="accumu-target">
                        <span class="font15">本{{selectText}}目标</span>
                        <span class="font20" v-if="!selectfirstDate.taskAmount">--</span>
                        <span class="font20" v-if="selectfirstDate.taskAmount">
                            <countTo :startVal='0' :endVal = selectfirstDate.taskAmount :duration='500'></countTo>
                        </span>
                    </div>
                    <div class="accumu-title accomplishRate">
                        <div class="font15">本{{selectText}}达成率</div>
                        <div class="font45" v-if="!selectfirstDate.amountCompleteRate">--</div>
                        <div class="font45" v-else-if="selectfirstDate.amountCompleteRate.length >= 4">'∞'</div>
                        <div class="rate-number" v-else>
                            <countTo class="font45" :startVal='0' :endVal = Number(selectfirstDate.amountCompleteRate) :duration='500' decimals = 1 suffix='%' v-if="Number(selectfirstDate.amountCompleteRate) < 10"></countTo>
                            <countTo class="font45" :startVal='0' :endVal = Number(selectfirstDate.amountCompleteRate) :duration='500' suffix='%' v-if="Number(selectfirstDate.amountCompleteRate) >= 10"></countTo>
                        </div>
                    </div>
                    <div class="growth-rate">
                        <span class="font15">同比</span>
                        <span class="font20 middle" v-html="formattAmountRate('periodAmountRate')"></span>
                        <span class="font15" v-if="selectNow.whichTotal === 'monthly'">环比</span>
                        <span class="font20" v-if="selectNow.whichTotal === 'monthly'" v-html="formattAmountRate('previousPeriodAmountRate')"></span>
                    </div>
                </div>
            </div>
            <!--第二部分达成分析数据-->
            <div class="department">
                <div class="depart-task">
                    <div class="department-title">
                        <span class="iconfont icon iconbiaotifuhaozuo-px"></span>
                        <span class="title-text font18">业务部任务达成分析</span>
                        <span class="iconfont icon iconbiaotifuhaoyou-px"></span>
                    </div>
                    <div class="department-select font16">
                        <span :class="{'select': taskSelect === 'retailAmount'}" @click="typeSelect('retailAmount', 'task')">零售额</span>
                        <span :class="{'select': taskSelect === 'retailCount'}" @click="typeSelect('retailCount', 'task')">零售量</span>
                    </div>
                    <bar-brief :hischartData="taskSalesData" v-if="taskSalesData.charts"></bar-brief>
                    <table-brief :tableData="taskSalesData"></table-brief>
                </div>
            </div>
            <!--第三部分占比分析数据-->
            <div class="department">
                <div class="depart-per">
                    <div class="department-title">
                        <span class="iconfont icon iconbiaotifuhaozuo-px"></span>
                        <span class="title-text font18">业务体占比分析</span>
                        <span class="iconfont icon iconbiaotifuhaoyou-px"></span>
                    </div>
                    <div class="department-select font16">
                        <span :class="{'select': perSelect === 'retailAmount'}" @click="typeSelect('retailAmount', 'per')">零售额</span>
                        <span :class="{'select': perSelect === 'retailCount'}" @click="typeSelect('retailCount', 'per')">零售量</span>
                    </div>
                    <pie-brief :piechartData="perSalesData" v-if="perSalesData.charts"></pie-brief>
                    <table-brief :tableData="perSalesData"></table-brief>
                </div>
            </div>
            <updateTime></updateTime>
            <van-action-sheet v-model="selectShow" :actions="selectActions" cancel-text="取消" @select="onSelect" @cancel="selectShow = false"/>
        </div>
        <watermark></watermark>
        <div class="loading-mask" v-if="markShow">
            <van-loading color="#fff" size="24px" vertical>加载中...</van-loading>
        </div>
        <!--时间-->
        <van-popup v-model="dateShow" position="bottom" :overlay="true">
            <van-datetime-picker type="date" v-model="currentDate" :formatter='formatter' :min-date="minDate" :max-date="maxDate" @confirm="dateconfirm" @cancel="dateShow = false"/>
        </van-popup>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getNowDate, NumberFormat, nounitFormat} from '@/assets/js/common.js'
    import tableBrief from '@/components/charts/tableBrief'
    import barBrief from '@/components/charts/barBrief'
    import pieBrief from '@/components/charts/pieBrief'
    import updateTime from '@/components/updateTime'
    import watermark from '@/components/watermark'
    import vanLoading from 'vant/lib/loading'
    import vanIcon from 'vant/lib/icon'
    import actionSheet from 'vant/lib/action-sheet'
    import 'vant/lib/index.css'
    import 'v-charts/lib/style.css'
    import countTo from 'vue-count-to'
    import vanPopup from 'vant/lib/popup'
    import datetimePicker from 'vant/lib/datetime-picker'

    export default {
        data() {
            return {
                minDate: new Date('2018-01-01'),
                maxDate: new Date(Date.now() - 86400000),
                dateShow: false,
                markShow: true,
                currentDate: new Date(Date.now() - 86400000),
                selectShow: false,
                selectNow: {
                    name: '月累',
                    whichTotal: "monthly"
                },
                selectActions: [{
                    name: '月累',
                    whichTotal: "monthly"
                }, {
                    name: '年累',
                    whichTotal: "yearly"
                }],
                firstDate: [],
                selectfirstDate: {},
                taskSelect: 'retailAmount',
                perSelect: 'retailAmount',
                taskData: [],
                perData: [],
                taskSalesData: {},
                perSalesData: {},
                secendPart: {},
                thirdPart: {},
            }
        },
        computed: {
            tableYear: {
                get() {
                    return getNowDate('Y', Date.parse(this.currentDate))
                }
            },
            tableMounth: {
                get() {
                    return getNowDate('m', Date.parse(this.currentDate))
                }
            },
            tableDay: {
                get() {
                    return getNowDate('d', Date.parse(this.currentDate))
                }
            },
            selectText: {
                get() {
                    return this.selectNow.whichTotal === 'monthly' ? '月' : '年'
                }
            },
            timeParams: {
                get() {
                    return getNowDate('Y-m-d', String(Date.parse(this.currentDate)))
                }
            }
        },
        components: {
            updateTime,
            watermark,
            vanLoading,
            vanIcon,
            vanPopup,
            countTo,
            tableBrief,
            barBrief,
            pieBrief,
            'van-datetime-picker': datetimePicker,
            'van-action-sheet': actionSheet,
        },
        mounted() {
            this.getfirstData()
            this.getsecondData()
        },
        methods: {
            getfirstData() {
                this.markShow = true
                var params = {
                    date: this.timeParams
                }
                this.get('/api/v1/dataOverview', {}, (res) => {
                    if(res) {
                        this.firstDate = res.data
                        this.selectfirstDate = this.firstDate.filter((val, index) => {
                            return this.selectNow.whichTotal === val.whichTotal
                        })[0]
                        this.getsecondData()
                        this.getthirdData()
                    }
                }, (err) => {
                    this.markShow = false
                    this.$toast.fail({
                        duration: 1500,
                        message: '请求失败！',
                    })
                })
            },
            getsecondData() {
                var params = {
                    date: this.timeParams
                }
                this.get('/api/v1/departmentBriefing', {}, (res) => {
                    if(res) {
                        this.secendPart = res.data.secendPart
                        this.taskData = this.secendPart['monthly']
                        this.taskSalesData = this.taskData.filter((val)=> {
                            return val.category === this.taskSelect
                        })[0]
                        this.markShow = false
                    }
                }, (err) => {
                    this.markShow = false
                    this.$toast.fail({
                        duration: 1500,
                        message: '请求失败！',
                    })
                })
            },
            getthirdData() {
                var params = {
                    date: this.timeParams
                }
                this.get('/api/v1/bodyBriefing', {}, (res) => {
                    if(res) {
                        this.thirdPart = res.data.thirdPart
                        this.perData = this.thirdPart['monthly']
                        this.perSalesData = this.perData.filter((val)=> {
                            return val.category === this.perSelect
                        })[0]
                        this.markShow = false
                    }
                }, (err) => {
                    this.markShow = false
                    this.$toast.fail({
                        duration: 1500,
                        message: '请求失败！',
                    })
                })
            },
            nounitFormat(value) {
                return nounitFormat(value);
            },
            NumberFormat(value) {
                return NumberFormat(value);
            },
            //同比环比格式化
            formattAmountRate(value) {
                if(!this.selectfirstDate[value] && this.selectfirstDate[value] !== 0) {
                    return `<span class="no-data">--</span>`
                } else {
                    if(Number(this.selectfirstDate[value]) > 0) {
                        return `<span class="up">
                                +${this.nounitFormat(this.selectfirstDate[value])}<span class="percent">%</span>
                            </span>`
                    } else if(Number(this.selectfirstDate[value]) < 0) {
                        return `<span class="down">
                                -${this.nounitFormat(this.selectfirstDate[value])}<span class="percent">%</span>
                            </span>`
                    } else if(Number(this.selectfirstDate[value]) == 0) {
                        return `<span class="up">0</span>`
                    }
                }
            },
            onSelect(select) {
                this.selectNow = select
                this.selectfirstDate = this.firstDate.filter((val, index) => {
                    return this.selectNow.whichTotal === val.whichTotal
                })[0]
                this.taskData = this.secendPart[select['whichTotal']]
                this.taskSalesData = this.taskData.filter((val)=> {
                    return val.category === this.taskSelect
                })[0]

                this.perData = this.thirdPart[select['whichTotal']]
                this.perSalesData = this.perData.filter((val)=> {
                    return val.category === this.perSelect
                })[0]
                this.selectShow = false
            },
            typeSelect(type, depart) {
                if(depart === 'task') {
                    this.taskSelect = type
                    this.taskSalesData = this.taskData.filter((val)=> {
                        return val.category === this.taskSelect
                    })[0]
                } else {
                    this.perSelect = type
                    this.perSalesData = this.perData.filter((val)=> {
                        return val.category === this.perSelect
                    })[0]
                }
            },
            formatter(type, value) {
                if(type === 'year') {
                    return `${value}年`;
                } else if(type === 'month') {
                    return `${value}月`
                } else if(type === 'day') {
                    return `${value}日`
                }
                return value;
            },
            dateconfirm(value) {
                this.dateShow = false    //关闭弹窗
                this.currentDate = value
                this.getfirstData()
            }
        }
    }
</script>
<style lang="scss">
    @import "./../assets/sass/saleTable.scss";
</style>
