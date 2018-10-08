import vhttp from './modle/vueRequest';
import config from '@/config.js';

/* API接口 */
/**
 * vhttp(url,params,httpType,method)
 * @url APIurl的地址。
 * @params 请求的参数。
 * @httpType 请求的类型 GET POST。
 * @method 请求方法 ajax（jsonp) 或者 axios 默认axios。
 * @return Promise;
 * 规范 ： 命名前缀需要 type_*  get_baidu  post_baidu。接口地址需要添加注释.
 */

 // 获取表格列表
 export const get_tablelist = params => vhttp('/table/list', params, 'GET');