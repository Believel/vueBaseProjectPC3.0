/**
 * 配置编译环境和线上环境之间的切换
 * urlWenHttp: 域名地址
 * toastime: toast时间
 */
const toastime = 3000
let URLWEBHTTP = ''
switch (process.env.NODE_ENV) {
    case 'development':
         URLWEBHTTP = "https://www.easy-mock.com/mock/5b8c9810c0b06d42b3bb5552/mockapi"; // 这里是本地请求的地址
        break;
    case 'alpha': // 注意这里的名字要和.env.alpha 设置的环境名字对应起来
        URLWEBHTTP = ""; // 这里是测试环境中的url
        break;
    case 'production':
        URLWEBHTTP = ""; // 生产环境url
        break;
}

export default {
    toastime,
    URLWEBHTTP
}
