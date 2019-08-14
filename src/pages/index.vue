<template>
    <div class="index">
        <commonHeader></commonHeader>
        <div class="charts-index content-main">
            <div class="index-content" v-for="(val, index) in totalData" @click="goDetail(index)">
                <h3>{{val.title}}</h3>
                <h2 v-if="val.totalNum && val.totalNum != '--'">
                    <countTo :startVal='0' :endVal='parseFloat(val.totalNum)' :duration='500'></countTo>
                </h2>
                <h2 v-else>
                    {{numberFormat(val.totalNum)}}
                </h2>
                <div class="rate-1" v-if="val.completionRate">
                    <span>达成率</span>
                    <span :class="{'green-font':val.completionRate>=100}" class="black-font">{{percentFormat(val.completionRate)}}</span>
                </div>
                <div class="rate-2" v-if="val.completionRate && val.completionRate != '--'"><span
                    :style="{'width':val.completionRate+'%'}"
                    :class="{'green-bg':val.accomplishRate>=98,'yellow-bg':val.accomplishRate<98&&val.accomplishRate>=95,'red-bg':val.accomplishRate<95}"></span>
                </div>
                <div class="rate-2" v-if="val.completionRate && val.completionRate == '--'"><span
                    style="width: 0rem;"></span>
                </div>
                <div class="common-rate">
                    <div class="rate-item" v-if="val.yearCompared || val.yearCompared === 0">
                        <span>同比</span>
                        <span class='icon iconfont'
                              :class="{'iconjiantou-xia-px': val.yearCompared < 0, 'iconjiantou-shang-px': val.yearCompared > 0}"></span>
                        <span class="black-font">{{percentFormat(val.yearCompared)}}</span>
                    </div>
                    <div class="rate-item" v-if="val.monthCompared || val.monthCompared === 0">
                        <span>环比</span>
                        <span class='icon iconfont'
                              :class="{'iconjiantou-xia-px': val.monthCompared < 0, 'iconjiantou-shang-px': val.monthCompared > 0}"></span>
                        <span class="black-font">{{percentFormat(val.monthCompared)}}</span>
                    </div>
                    <div class="rate-item" v-if="val.nowData || val.nowData === 0">
                        <span>当日</span>
                        <span class="black-font">{{numberFormat(val.nowData)}}</span>
                    </div>
                </div>
            </div>
            <router-link to="/testFresh">
                <van-button plain type="primary">按钮</van-button>
            </router-link>
            <updateTime></updateTime>
        </div>
        <watermark></watermark>
        <div class="loading-mask" v-if="markShow">
            <van-loading color="#fff" size="24px" vertical>加载中...</van-loading>
        </div>
    </div>
</template>
<script>
    import {NumberFormat, percentFormat} from '@/assets/js/common.js'
    import commonHeader from '@/components/common/commonHeader'
    import watermark from '@/components/watermark'
    import updateTime from '@/components/updateTime'
    import {mapState, mapMutations} from 'vuex'
    import vanLoading from 'vant/lib/loading'
    import vanToast from 'vant/lib/toast'
    import 'vant/lib/index.css'
    import countTo from 'vue-count-to'

    import data from '@/mock';

    export default {
        data() {
            return {
                totalData: [],
                indexShow: true,
                markShow: true,
                source: 'index'
            }
        },
        components: {
            commonHeader,
            watermark,
            updateTime,
            'van-loading': vanLoading,
            'van-toast': vanToast,
            countTo
        },
        create() {
        },
        computed: {
            // 获取vuex state对象值
            ...mapState({
                headerStatus: (state) => {
                    return state.headerStatus
                }
            })
        },
        watch: {
            headerStatus: {
                deep: true,
                handler: function() {
                    this.getData()
                }
            }
        },
        mounted() {
            if(this.headerStatus.date) {
                this.getData()
            }

        },
        methods: {
            ...mapMutations([
                'categorySelect'
            ]),
            numberFormat(value) {
                return NumberFormat(value)
            },
            percentFormat(value) {
                return percentFormat(value)
            },
            goIndex() {
                this.$refs.backIndex.back()
            },
            getData() {
                this.markShow = true
                var params = this.headerStatus
                delete params.category
                this.get('/api/v1/mainPanelData', {}, (res) => {
                    if(res) {
                        this.totalData = res.data.totalData
                        this.markShow = false
                    }
                }, (err) => {
                    this.markShow = false
                    this.$toast.fail({
                        duration: 1500,
                        message: '请求失败！'
                    })
                })
            },
            goDetail(m) {
                this.categorySelect(m)
                this.$router.push({
                    path: '/detail'
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "./../assets/sass/index.scss";
</style>
