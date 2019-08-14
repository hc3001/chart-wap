<template>
    <div id="app">
        <transition name="transitionRouter">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="transitionRouter">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <commonFooter></commonFooter>
        <watermark></watermark>
    </div>
</template>

<script>
    import commonFooter from '@/components/common/commonFooter'
    import watermark from '@/components/watermark'

    export default {
        components: {
            commonFooter,
            watermark,
        },
    }
</script>
<style lang="scss" scoped>
    @import "./assets/sass/common.scss";
    .transitionRouter-enter-active {
        opacity: 100;
        transition: all 0.4s;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
    }
    .transitionRouter-enter,
    .transitionRouter-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
</style>

