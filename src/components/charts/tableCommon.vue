<template>
    <div>
        <div class="common-list" v-for="(s,t) in sList" v-if="s!=null" ref="list">
            <div class="common-title">
                <h2>{{s.name}}</h2>
                <p>单位: {{s.unit}}</p>
            </div>
           <!--  <table>
                <tr>
                    <th v-for="(n,m) in s.title">{{n}}</th>
                </tr>
                <template v-for="(item,index) in s.content">
                    <template v-for="(val,i) in item.list">
                        <tr v-for="(n,m) in val.list">
                            <td :rowspan="getRow(item.list)" v-if="(i+m)==0" :class="item.list.length>1||val.list.length>1?'white':''">{{item.name}}</td>
                            <td :rowspan="val.list.length" v-if="m==0"  :class="val.list.length>1?'white':''">{{val.name}}</td>
                            <td v-for="(x,y) in n" :class="x[1]">{{x[0]}}</td>

                        </tr>
                    </template>
                </template>
            </table> -->
            <div style="height: 0.9rem"></div>
            <table class="thead-cont">
                <thead>
                    <tr>
                        <th v-for="(n,m) in s.title">{{n}}</th>
                    </tr>
                </thead>

                   
                   
            </table>
            <div class="set-height"></div>
            <table>
                <thead>
                    <tr>
                        <th v-for="(n,m) in s.title">{{n}}</th>
                    </tr>
                </thead>
                <tbody>
                     <template v-for="(item,index) in s.content">
                        <tr >
                            <td :rowspan="n.rowspan" v-for="(n,m) in item" :colspan="n.colspan" :style="{'background':n.color,'color':(n.color=='#E74D51')?'#fff':'#000'}">{{n.value}}</td>
                        </tr>
                    </template>
                </tbody>
                   
                   
            </table>
        </div>
    </div>
   
</template>

<script>
export default {
    data() {
        return {
            list:[],
            tableList:[],
        	offsetTopList:[],
            clientHeightList:[]
        }
    },
    props:['sList'],
    
    mounted() {
        
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll, false)
    },
    watch:{
    	sList(){

            if(this.sList){
                this.$nextTick(()=> {
                    this.listSlide()
                    window.addEventListener('scroll', this.handleScroll, false)
                 })
               
            }
            
        }
	　　　
    },
    methods: {
        handleScroll(){
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset
            for(let i=0;i<this.offsetTopList.length;i++){
                let thead = this.list[i].getElementsByTagName("table")[0]
                let divEle = this.list[i].getElementsByTagName("div")[0];
                let theadHeight = thead.clientHeight;
                let divEleHeight = divEle.clientHeight;
                let translateY = scrollTop - this.offsetTopList[i]
                if(this.offsetTopList[i]<scrollTop&&scrollTop<this.list[i].clientHeight+this.offsetTopList[i]-theadHeight-divEleHeight-5){   //滚动到当前表格并且滚动范围在表格高度加上顶部距离的和，减去表头和标题的高度，滚动时可防止滚动到底部，没有内容时还显示表头等信息
                    divEle.style.position='fixed';
                    divEle.style.top='2.17rem';
                    thead.style.position='fixed';
                    thead.style.top='3.07rem';
                }else{
                    thead.style.position='absolute';
                    divEle.style.top='auto';
                    thead.style.top='auto';
                    divEle.style.position='absolute';
                }
            }
        },
        listSlide(){
            this.offsetTopList = [];
            this.tableList = []
            this.list = this.$refs.list;
            for(let i=0;i<this.list.length;i++){   //计算每个表格距离顶部的距离
                this.offsetTopList.push(this.list[i].offsetTop)
                let th = this.list[i].getElementsByTagName("thead")[1].getElementsByTagName("tr")[0].getElementsByTagName("th")
                let tr = this.list[i].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0]
                // this.list[i].getElementsByClassName("set-height")[0].style.height=tr.clientHeight+"px";
                for(let j=0;j<th.length;j++){
                    tr.getElementsByTagName("th")[j].style.width=th[j].offsetWidth+"px"
                    console.log(th[j].offsetWidth)
                }
            }
        }


    }
};
</script>
<style lang="scss">
@import "../../assets/sass/indicesTable.scss";
</style>