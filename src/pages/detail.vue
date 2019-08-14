<template>
    <div>
        <commonHeader></commonHeader>
        <div class="content-main">
            <van-tabs :swipe-threshold='6' v-model="active" @change="changeTab" ref="box">
                <van-tab title="收入">
                    <div v-if="0==tabShow">
                        <div v-if="status === 'data'">
                            <detailFirst :totalData="totalData"></detailFirst>
                            <!--<detailSecond :trendData="trendData"></detailSecond>-->
                            <detailThird :compared="compared" v-if="compared.length !== 0"></detailThird>
                            <img class="testimg" src="/static/images/test3.png">
                        </div>
                        <nodata v-if="status === 'nodata'"></nodata>
                        <img v-if="status === 'developing'" class="testimg1" src="/static/images/test1.png">
                    </div>
                </van-tab>
                <van-tab title="销量">
                    <div v-if="1==tabShow">
                        <div v-if="status === 'data'">
                            <detailFirst :totalData="totalData"></detailFirst>
                            <!--<detailSecond :trendData="trendData"></detailSecond>-->
                            <detailThird :compared="compared" v-if="compared.length !== 0"></detailThird>
                            <img class="testimg" src="/static/images/test2.png">
                        </div>
                        <nodata v-if="status === 'nodata'"></nodata>
                        <img v-if="status === 'developing'" class="testimg1" src="/static/images/test1.png">
                    </div>
                </van-tab>
                <van-tab title="零售额">
                    <div v-if="2==tabShow">
                        <div v-if="status === 'data'">
                            <detailFirst :totalData="totalData"></detailFirst>
                            <detailSecond :trendData="trendData"></detailSecond>
                            <detailThird :compared="compared" v-if="compared.length !== 0"></detailThird>
                        </div>
                        <nodata v-if="status === 'nodata'"></nodata>
                        <img v-if="status === 'developing'" class="testimg1" src="/static/images/test1.png">
                    </div>
                </van-tab>
                <van-tab title="零售量">
                    <div v-if="3==tabShow">
                        <div v-if="status === 'data'">
                            <detailFirst :totalData="totalData"></detailFirst>
                            <detailSecond :trendData="trendData"></detailSecond>
                            <detailThird :compared="compared" v-if="compared.length !== 0"></detailThird>
                        </div>
                        <nodata v-if="status === 'nodata'"></nodata>
                        <img v-if="status === 'developing'" class="testimg1" src="/static/images/test1.png">
                    </div>
                </van-tab>
                <van-tab title="ASP">
                    <div v-if="4==tabShow">
                        <div v-if="status === 'data'">
                            <detailFirst :totalData="totalData"></detailFirst>
                            <detailThird :compared="compared" v-if="compared.length !== 0"></detailThird>
                        </div>
                        <nodata v-if="status === 'nodata'"></nodata>
                        <img v-if="status === 'developing'" class="testimg1" src="/static/images/test1.png">
                    </div>
                </van-tab>
                <van-tab title="毛利率">
                    <div v-if="5==tabShow">
                        <img class="testimg1" src="/static/images/test1.png">
                    </div>
                </van-tab>
            </van-tabs>
            <updateTime v-if="status !== 'developing'"></updateTime>
        </div>
        <watermark></watermark>
        <div class="loading-mask" v-if="markShow">
            <van-loading color="#fff" size="24px" vertical>加载中...</van-loading>
        </div>
    </div>
</template>
<script>
    import {getNowDate, NumberFormat} from '@/assets/js/common.js';
    import commonHeader from '@/components/common/commonHeader';
    import detailFirst from '@/components/charts/detailFirst';
    import detailSecond from '@/components/charts/detailSecond';
    import detailThird from '@/components/charts/detailThird';
    import watermark from '@/components/watermark';
    import updateTime from '@/components/updateTime';
    import nodata from '@/components/nodata';
    import {mapState, mapMutations} from 'vuex';
    import vanLoading from 'vant/lib/loading'
    import vanTabs from 'vant/lib/tabs'
    import vanTab from 'vant/lib/tab'
    import vanToast from 'vant/lib/toast'
    import 'vant/lib/index.css'

    export default {
        data() {
            return {
                indexShow: true,
                active: 0,
                sHeight: 0,
                markShow: true,
                totalData: [],
                trendData: {},
                compared: {},
                source: 'detail',
                status: '', //数据状态：有数据、无数据、开发中
                tabShow: -1,
            }
        },
        components: {
            commonHeader,
            detailFirst,
            detailSecond,
            detailThird,
            updateTime,
            watermark,
            nodata,
            'van-loading': vanLoading,
            'van-tabs': vanTabs,
            'van-tab': vanTab,
            'van-toast': vanToast,
        },
        create() {

        },
        watch: {
            headerStatus: {
                deep: true,
                handler: function(newValue, oldValue) {
                    this.getData()
                }
            },
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
            this.active = this.categoryStatus
            //需要子组件mounted执行，date有值
            if(this.headerStatus.date) {
                this.getData()
            }
        },
        methods: {
            ...mapMutations([
                'categorySelect',
            ]),
            goIndex() {
                this.$refs.backIndex.back()
            },
            numberFormat(value) {
                return NumberFormat(value)
            },
            getData() {
                this.markShow = true
                let params = this.headerStatus
                params.category = this.active
                this.sHeight = 0
                this.post('/api/v1/detailedPanelData', {}, (res) => {
                    if(res) {
                        this.totalData = res.data.totalData
                        this.trendData = res.data.trendData ? res.data.trendData : []
                        this.compared = res.data.compared ? res.data.compared : []
                        this.status = res.data.dataStatus
                        this.markShow = false
                        this.tabShow = this.active
                    }
                }, (err) => {
                    this.markShow = false
                    this.$toast.fail({
                        duration: 1500,
                        message: '请求失败！',
                    })
                })
            },
            changeTab(index) {
                this.categorySelect(index)
                this.tabShow = -1
                this.getData()
            }
        },
    }
</script>
<style lang="scss">
    @import "./../assets/sass/detail.scss";
</style>
