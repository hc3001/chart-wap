<template>
    <div class="update-time">数据最后更新于 {{updateTime}}</div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
            //获取vuex state对象值
            ...mapState({
                updateTime: (state)=> {
                    return state.updateTime
                }
            }),
        },
    }
</script>

<style lang="scss" scoped>
    .update-time{
        text-align: center;
        font-size:.26rem;
        color:rgba(204,204,204,1);
        line-height:26px;
        margin: 0.3rem auto;
    }
</style>