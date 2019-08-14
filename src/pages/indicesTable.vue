
<template>
	<div class="indices-main">
       <commonHeader showItem="1"></commonHeader>
       <div>
			<van-tabs :swipe-threshold='4' v-model="active" @change="changeTab">
			  	<van-tab title="业务部">
			  		<tableCommon :sList="fList"></tableCommon>

			  	</van-tab>
			  	<van-tab title="零售结构">
                    <tableCommon :sList="fList"></tableCommon>
			  	</van-tab>
                <van-tab title="业务体">
                    <tableCommon :sList="fList"></tableCommon>
                </van-tab>
			  	<van-tab title="店铺">
                    <tableCommon :sList="fList" class="store-main"></tableCommon>
			  	</van-tab>
			</van-tabs>
		</div>
        <div class="common-tip">
            <i>注：</i>
            <p>2月11日起SI收入统一为C网NC收入+B网出库收入，2月17日SI销量为C网NC销售+B网出库销量。</p>
        </div>
        <div class="loading-mask" v-if="markShow">
            <van-loading color="#C63A39" />
        </div>
        <watermark></watermark>
        <!--<commonFooter></commonFooter>-->
	</div>
</template>
<script>
import {getNowDate,NumberFormat} from '@/assets/js/common.js';
import commonHeader from '@/components/common/commonHeader';
//import commonFooter from '@/components/common/commonFooter';
import watermark from '@/components/watermark';
import tableCommon from '@/components/charts/tableCommon';
import vanLoading from 'vant/lib/loading'
import vanTabs from 'vant/lib/tabs'
import vanTab from 'vant/lib/tab'
import vanToast from 'vant/lib/toast'
import 'vant/lib/index.css'
import {mapState} from 'vuex';
export default {
    data() {
        return {
            active:0,
            markShow:true,
            fList:''


        }
    },
    components: {
        commonHeader,
//        commonFooter,
        watermark,
        tableCommon,
        'van-loading': vanLoading,
        'van-tabs': vanTabs,
        'van-tab': vanTab,
        'van-toast': vanToast,
    },
    create(){

    },
    computed: {
            //获取vuex state对象值
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
    methods:{
        getData(){
            this.markShow = true;
            this.fList = '';
            let params = {
                date:this.headerStatus.date,
                index:this.active+1
            }
             this.post('/api/v1/indexData', {}, (res) => {
                 if(res) {
                    this.markShow = false
                    this.fList = res.data;

                 }
             }, (err)=> {
                 this.markShow = false
                 this.$toast.fail({
                     duration: 1500,
                     message: (err.data.data) ? err.data.data:"服务异常"
                 })
             })
        },
        changeTab(index) {
            this.active = index;
            this.getData()
        }
    },
}
</script>
<style lang="scss">
@import "./../assets/sass/indicesTable.scss";
.store-main{
    .common-list table{
        tr td,th{
            font-size:0.18rem;
        }
    }
}
</style>
