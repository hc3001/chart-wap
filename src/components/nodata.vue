<template>
    <div id="no-data" class="cloum-align">
        <img src="/static/images/nodata.png" alt="">
        <span class="title">暂无数据</span>
        <span class="content">此时间段暂无数据，请选择其他日期</span>
    </div>
</template>
<script>
    export default {
        name: "暂无数据",
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    #no-data {
        margin-top: 2rem;
        .title {
            color: #333333;
            font-size: 0.4rem;
            margin-bottom: 0.32rem;
            font-weight: 600;
        }
        .content {
            color: #999999;
            font-size: 0.38rem;
        }
    }
</style>