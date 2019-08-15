<template>
    <div>
        <div>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" ref="sss">
                <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
                    <van-cell v-for="item in list" :key="item" :title="item" @click="geDetail"/>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import commonHeader from '@/components/common/commonHeader'

    export default {
        data() {
            return {
                list: [],
                nowPage: 1,
                loading: false,//控制载入动画
                finished: false,//是否再执行 onLoad方法
                isLoading: false,//控制下拉重新载入
                totalPage: 0,//分页总数
            }
        },
        components: {
            commonHeader,
        },
        created() {
            this.init()
        },
        mounted() {
            this.$nextTick(()=> {
                // window.addEventListener('scroll', ()=> {
                //     console.log('this', this, document.documentElement.scrollTop, window.pageYOffset)
                // }, false)
            })
            this.$nextTick(()=> {
                // setTimeout(()=> {
                    console.log('ss', this.$refs.sss.$el)
                    this.$refs.sss.$el.style.height = '18rem'
                    this.$refs.sss.$el.style.overflow = 'scroll'
                    this.$refs.sss.$el.scrollTop = 100
                // }, 100)
            })
        },
        activated() {
            // isUseCache为false时才重新刷新获取数据
            // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的
            if(!this.$route.meta.isUseCache) {
                this.list = [] // 清空原有数据
                this.init() // 这是我们获取数据的函数
            }
            this.$nextTick(()=> {
                // setTimeout(()=> {
                console.log('ss')
                // this.$refs.sss.$el.style.height = '18rem'
                // this.$refs.sss.$el.style.overflow = 'scroll'
                this.$refs.sss.$el.scrollTop = 100
                // }, 100)
            })
            this.$route.meta.isUseCache = false
        },
        beforeRouteLeave (to, from, next) {
            if (to.name == 'testDetail') {
                from.meta.isUseCache = true;
            }
            next()
        },
        methods: {
            init() {
                let data = {
                    page: 1
                }
                this.get("https://easy-mock.com/mock/5b78ddf0de86980870733379/aysntest/count", data, res => {
                    this.list = res.data.list
                    this.page = res.data.page
                    this.totalPage = res.data.totalPage
                    this.isLoading = false
                })
            },
            onRefresh() {
                console.log('sss')
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.page = 1
                    this.init()//加载
                }, 500)
            },
            onLoad() {
                console.log('ooo')
                let data = {
                    page: ++this.nowPage,
                }
                setTimeout(() => {
                    this.get("https://easy-mock.com/mock/5b78ddf0de86980870733379/aysntest/count", data, (res) => {
                        this.page = res.data.page
                        this.list = this.list.concat(res.data.list)//追加数据
                        this.loading = false //加载状态结束
                        if(this.totalPage <= this.page) {
                            this.finished = true
                        }
                    })
                }, 500)
            },
            geDetail() {
                this.$router.push({
                    path: '/testDetail'
                })
            }
        }
    }
</script>
<style lang="scss">
    .van-list {
        margin-bottom: 2rem;
    }
    .van-pull-refresh {
        overflow: scroll !important;
        height: 17rem;
    }
    /*.van-pull-refresh__track {*/
        /*overflow: scroll;*/
        /*height: 15rem;*/
    /*}*/
</style>
