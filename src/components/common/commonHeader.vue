
<template>
    <div class="index">
        <div class="common-header">
            <div class="common-tab" ref="commontab" v-if="showItem!=1">
                <van-dropdown-menu :class="{'arrow-title-down': menuType==='departmentValue'}" active-color='#C63A39'>
                    <van-dropdown-item v-model="headerStatus.departmentValue" :options="departmentObj" @change="changeMenu" @close="closeSelect('departmentValue')" @open="openSelect('departmentValue')"  />
                    <van-icon name="arrow-down"/>
                </van-dropdown-menu>
                <van-dropdown-menu :class="{'arrow-title-down': menuType==='bussinessValue'}" active-color='#C63A39'>
                    <van-dropdown-item v-model="headerStatus.bussinessValue" :options="bussinessObj" @change="changeMenu" @close="closeSelect('bussinessValue')" @open="openSelect('bussinessValue')"   />
                    <van-icon name="arrow-down"/>
                </van-dropdown-menu>
                <van-dropdown-menu :class="{'arrow-title-down': menuType==='accumulateValue'}" active-color='#C63A39'>
                    <van-dropdown-item v-model="headerStatus.accumulateValue" :options="accumulateObj" @change="changeMenu" @close="closeSelect('accumulateValue')" @open="openSelect('accumulateValue')"   />
                    <van-icon name="arrow-down"/>
                </van-dropdown-menu>
            </div>
            <div class="common-col col-2" @click="showDatetimePicker">
                <span>{{headerStatus.date}}</span>
                <span class="icon iconfont iconrili-px"></span>
            </div>
        </div>
        <!--时间-->
        <van-popup v-model="dateShow" position="bottom" :overlay="true">
            <van-datetime-picker type="date" v-model="currentDate" :formatter='formatter' :min-date="minDate" :max-date="maxDate" @confirm="dateconfirm" @cancel="dateShow = false"/>
        </van-popup>
    </div>
</template>
<script>
import {getNowDate} from '@/assets/js/common.js';
import {mapState, mapActions, mapMutations} from 'vuex';
import dropdownMenu from 'vant/lib/dropdown-menu'
import dropdownItem from 'vant/lib/dropdown-item'
import vanPopup from 'vant/lib/popup'
import datetimePicker from 'vant/lib/datetime-picker'
import vanIcon from 'vant/lib/icon'
import vanToast from 'vant/lib/toast'


export default {
    data() {
        return {
            minDate: '',
            maxDate: '',
            departmentObj: [{
                text: '业务部整体', value: '8'
            },{
                text: 'TV', value: '1'
            },{
                text: '冰洗', value: '2'
            },{
                text: '空调', value: '3'
            },{
                text: '东芝', value: '4'
            },{
                text: '乐华', value: '5'
            },{
                text: '健康电器', value: '6'
            }],
            bussinessObj: [{
                text: '整体', value: '0'
            },{
                text: '京东', value: '1'
            },{
                text: '连锁', value: '2'
            },{
                text: '天猫', value: '3'
            },{
                text: '全品类', value: '4'
            },],
            accumulateObj: [{
                text: '月累', value: '1'
            },{
                text: '年累', value: '2'
            },],
            menuType: '',
            dateShow:false,
            flag:1,
        }
    },
    props:["showItem"],
    components: {
        'van-dropdown-menu': dropdownMenu,
        'van-dropdown-item': dropdownItem,
        'van-popup': vanPopup,
        'van-datetime-picker': datetimePicker,
        'van-icon': vanIcon,
        'van-toast': vanToast,
    },
    create(){

    },
    computed: {
        //获取vuex state对象值
        ...mapState({
            headerStatus: (state)=> {
                return state.headerStatus
            }
        }),
        currentDate: {
            get() {
                return new Date(this.headerStatus.date)
            },
            //用set避免报错
            set(newDate) {}
        }
    },
    mounted() {
        this.getnewTime();
    },
    methods:{
        ...mapActions([
            'getDate',
        ]),
        ...mapMutations([
            'changeSelect',
            'getUpdatetime'
        ]),
        getnewTime() {
            this.get('/api/v1/haveDataTime', {}, (res) => {
                if(res) {
                    this.maxDate = new Date(Number(res.data.maxTime))
                    this.minDate = new Date(Number(res.data.minTime))
                    var dateSelect = getNowDate('Y-m-d', Number(res.data.maxTime))  //进来的插件时间
                    var updateTime = getNowDate('Y-m-d H:i:s', Number(res.data.maxTime)) //进来的数据更新时间
                    //headerStatus.date 没值(第一次进来没值)才更新
                    if(!this.headerStatus.date) {
                        this.getDate({date: dateSelect})
                    }
                    this.getUpdatetime(updateTime)
                }
            }, (err)=> {
                this.$toast.fail({
                    duration: 1500,
                    message: '请求失败！',
                })
            })
        },
        showDatetimePicker(){
            this.dateShow = true
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`
            }else if (type === 'day') {
                return `${value}日`
            }
            return value;
        },
        changeMenu(value) {
            this.changeValue(this.menuType, value)
        },
        openSelect(type) {
            this.menuType = type;
            this.flag = this.menuType
        },
        closeSelect(type) {
            if(this.flag!=type){   //判断当前关闭的下拉框，如果不是当前正在点击的，将其他下拉框的下拉箭头向下，当前箭头向上
                this.menuType = this.flag
            }else{
                this.menuType = ""
            }
        },
        dateconfirm(value){
            this.dateShow = false;    //关闭弹窗
            var dateSelect = getNowDate('Y-m-d', value);
            this.changeValue('date', dateSelect)
        },
        changeValue(name, value){
            this.headerStatus[name] = value
            var select = {}
            select[name] = value
            this.changeSelect(select)
        }
    },
}
</script>
<style lang="scss">
    @import "../../assets/sass/common";
    //echarts插件tips遮挡住了时间插件
    .van-popup.van-popup--bottom {
        z-index: 1000000000 !important;
    }
    .van-dropdown-menu__title::after {
        display: none !important;
    }
</style>
