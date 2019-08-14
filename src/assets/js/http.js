//axios API configure
import axios from 'axios';
import qs from 'qs';
const timeout = 10000; //超时时间
const baseURL = '';
/**
 * 请求建立成功处理逻辑
 * @param {Object} rsp   响应信息
 * @param {Object} opts  请求参数
 */
function httpReqOK (rsp, opts) {
	let data = rsp.data; //服务响应数据
	let code = rsp.data.code; //服务状态码
	if(code == 0){ 
		(typeof opts.success === 'function') && opts.success(data);
	}
	else if(code == 403){ //重定向				
		if(!!data.message) {
		}
	}
	else { //服务器错误
		(typeof opts.error === 'function') && opts.error(rsp);
	}
}
/**
 * 请求建立连接异常捕获
 * @param {Object} err
 */
function httpReqCatch (err, opts) {
    (typeof opts.error === 'function') && opts.error(rsp);
}
//get和post请求基础配置
const Axios = {
	// get
	getApi (opts) {
		axios({
			baseURL: baseURL,
			url:  opts.url || '',
			method: 'get',
			params: opts.data || {},
			paramsSerializer: function (params) {
				return qs.stringify(params,  {arrayFormat: 'brackets'});
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type'
			},
			timeout: timeout
		})
		.then(rsp => {			
			httpReqOK (rsp, opts);
		})
		.catch((err) => {
            console.log('err', err)
			httpReqCatch (err, opts);
		})
	},
	// post
	postApi (opts) {
		axios({			
			baseURL: baseURL,
			url:  opts.url || '',
			method: 'post',
			data: qs.stringify(opts.data),
			headers: {
				'Content-Type':'application/x-www-form-urlencoded',
			},
			timeout: timeout
		})
		.then(rsp => {
			httpReqOK (rsp, opts);
		})
		.catch((err) => {
			httpReqCatch (err, opts);
		})
	},
	// all 执行多个并发请求
	allApi (opts) {
		axios.all(opts.lists) //opts.lists为数组
		.then(axios.spread(opts.callback))// N个请求现在都执行完成
		.catch((err) => {
			httpReqCatch (err);
		})
	}
}
let base = (url,params,success, error)=>{
	let baseData = {
        url: url,
        data: params,
        success (rsp) {
            (typeof success === 'function') && success(rsp);
        },
        error(rsp){
        	//有报错处理函数则执行函数，没有的话默认弹窗显示报错信息
			if(typeof error === 'function'){
			  	error(rsp);
			}else{
				console.log(33)
			}
        }
    }
	return baseData;
}
//get、post请求封装，全局引入，调用方法为this.get和this.post
export function get (url,params,success, error) {	   
    Axios.getApi(base(url,params,success, error))
}
export function post (url,params,success, error) {	   
    Axios.postApi(base(url,params,success, error))
}