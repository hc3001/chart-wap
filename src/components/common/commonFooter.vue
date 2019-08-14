<template>
    <div class="footer" id="footer">
        <div class="content">
            <div class="home">
                <router-link to="/">
                    <span class="iconfont iconfanhuishouye icon"></span>
                </router-link>
            </div>
            <div class="module-nav" :class="{'red39': $route.name === 'index' || $route.name === 'indicesTable'}" @click="moreShow = !moreShow">
                <span class="iconfont iconsan icon"></span>
                <span class="font15">{{moreCategory}}</span>
                <div class="tab-switch font14" v-show="moreShow">
                    <span class="arrow-bot"></span>
                    <span class="arrow-top"></span>
                    <span class="module-title" :class="{'red39': $route.name === 'index'}" @click.stop="goHome">指标总览</span>
                    <hr/>
                    <span class="module-title" :class="{'red39': $route.name === 'indicesTable'}" @click.stop="goReport">指标表格</span>
                </div>
            </div>
            <div class="module-nav" @click="goDetail" :class="{'red39': $route.name === 'detail'}">
                <span class="iconfont iconsan icon"></span>
                <span class="font15">详情分析</span>
            </div>
            <div class="module-nav" @click="gosaleReport" :class="{'red39': $route.name === 'saleTable'}">
                <span class="iconfont iconsan icon"></span>
                <span class="font15">销售简报</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pathName: 'index',
                moreShow: false,
                moreCategory: '指标总览',
            }
        },
        mounted() {

        },
        watch: {
            $route: {
                handler(newValue, oldValue) {
                    if(newValue.name === 'index') {
                        this.moreCategory = '指标总览'
                        this.moreShow = false
                    } else if(newValue.name === 'indicesTable'){
                        this.moreCategory = '指标表格'
                        this.moreShow = false
                    }
                },
                deep: true,
                immediate: true,
            }
        },
        methods: {
            goReport() {
                this.$router.push({
                    path: '/indicesTable',
                })
            },
            goHome() {
                this.$router.push({
                    path: '/',
                })
            },
            goDetail() {
                this.moreShow = false
                this.$router.push({
                    path: '/detail',
                })
            },
            gosaleReport() {
                this.moreShow = false
                this.$router.push({
                    path: '/saleTable',
                })
            },
        }
    }
</script>

<style lang="scss">
    #footer {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10001;
        .content {
            height: 1.04rem;
            width: 100%;
            box-shadow: 0px -0.5px 1.5px 0px #e0d7d7;
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .home {
                height: 100%;
                width: 0.88rem;
                color: #999;
                display: flex;
                justify-content: center;
                align-items: center;
                .iconfont {
                    font-size: 0.48rem;
                    color: #999999;
                }
            }
            .module-nav {
                width: 2.2rem;
                height: 100%;
                border-left: 0.5px solid #f3ebeb;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                .iconfont {
                    font-size: 0.16rem;
                    margin-right: 0.1rem;
                    color: #999999;
                }
                .font15 {
                    color: #333333;
                }
                .tab-switch {
                    position: absolute;
                    top: -1.7rem;
                    left: 50%;
                    width: 1.5rem;
                    height: 1.48rem;
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                    border: 0.5px solid #f3ebeb;
                    background: white;
                    border-radius: 0.1rem;
                    padding: 0 0.3rem;
                    hr {
                        width: 100%;
                        border: 1px solid rgba(243, 235, 235, 0.57);
                    }
                    .module-title {
                        width: 100%;
                        text-align: center;
                        height: 0.74rem;
                        line-height: 0.74rem;
                    }
                    .module-title.red39 {
                        color: #C63A39;
                    }
                    .arrow-bot {
                        transform: rotate(180deg) translate(50%, -100%);
                        width: 0;
                        height: 0;
                        font-size: 0;
                        overflow: hidden;
                        position: absolute;
                        border-width: 8px;
                        border-style: dashed dashed solid;
                        border-color: transparent transparent #f3ebeb;
                        left: 50%;
                        bottom: 0;
                    }
                    .arrow-top {
                        transform: rotate(180deg) translate(50%, -100%);
                        width: 0;
                        height: 0;
                        font-size: 0;
                        overflow: hidden;
                        position: absolute;
                        border-width: 8px;
                        border-style: dashed dashed solid;
                        border-color: transparent transparent #fff;
                        left: 50%;
                        bottom: 0;
                    }
                }
            }
            .red39.module-nav {
                >span {
                    color: #C63A39;
                }
            }
        }

    }
</style>