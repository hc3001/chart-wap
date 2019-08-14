<template>
	<div id="watermark">
		<div></div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            sHeight:document.documentElement.clientHeight,
            
        }
    },
    // props:["sHeight"],
    watch:{
    	sHeight(){
    		
    		
    	}
    },
	mounted() {
		let para = document.getElementById("watermark")
		let oldChild = para.childNodes[0]
		para.removeChild(oldChild)
		let html = this.setWatermark(this.$utils.getCookie('username'),this.sHeight)
		para.appendChild(html)
	},
	methods:{
	

	}

}
</script>
<style lang="scss">
@function rem($args){
	@return $args/50 + rem;
}
#watermark{
	position: fixed;
	height:100%;
	width:100%;
	top:0;
	left:0;
	z-index: 9999;
	pointer-events: none;
	.mask_div{
	    transform: rotate(-15deg);
	    /*position: relative;*/
	    margin-left: rem(20);
	    margin-top: rem(50);
	    overflow: hidden;
	    /*pointer-events: none;*/
	    opacity: 0.4;
	    font-size: rem(15);
	    font-family: 微软雅黑;
	    color: #aaa;
	    text-align: center;
	    width: rem(100);
	    height: rem(80);
	    /*display: block;*/
	    float: left;
	}
}
</style>