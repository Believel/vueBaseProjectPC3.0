import Vue from 'vue'
import appConfigs from '@/config.js'


let getevent = () => {
    var Event = new Vue()
    return Event
}
const vueEvent = getevent()

const utils = {
    vuethis: {}, //vue的this
    vueEvent: vueEvent,
    //打电话
    realcall(e) {
        window.location.href = 'tel:' + e.name
    },
    //处理空
    handlenull(item) {
        $.each(item, function(key, val) {
            if (val == null) {
                item[key] = ''
            }
        })
    },
    getGeolocation(callback) {
        let lnglat = this.handleCookieGet('lnglat')
        if (lnglat) {
            callback(lnglat, true)
        } else {
            var _this = this
            var currentposition = {}
            //获取当前位置
            var geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition(
                function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        currentposition.lng = r.point.lng
                        currentposition.lat = r.point.lat
                        callback(currentposition, r.accuracy)
                    } else {
                        callback(false)
                    }
                },
                {
                    enableHighAccuracy: true
                }
            )
        }
    },

    checkIDNumber(value) {
        let aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
        let iSum = 0 ;
        let info = "" ;
        if(!/^\d{17}(\d|x)$/i.test(value)) {
            return true;
        }
        value = value.replace(/x$/i,"a");
        if(aCity[parseInt(value.substr(0,2))] == null) {
            return true;
        }
        let sBirthday = value.substr(6,4)+"-" + Number(value.substr(10,2)) + "-" + Number(value.substr(12,2));
        let  d = new Date(sBirthday.replace(/-/g,"/")) ;
        if(sBirthday !== (d.getFullYear()+ "-" + (d.getMonth()+1) + "-" + d.getDate())){
            return true;
        }
        for(var i = 17;i>=0;i --) {
            iSum += (Math.pow(2,i) % 11) * parseInt(value.charAt(17 - i),11) ;
        }
        if(iSum%11 !== 1) {
            return true;
        }
        return false;
    },

    //验证姓名（2-5位汉字）
    nameCheck(value){
        let regExp = /^1[6934578]\d{9}$/;
        if (!regExp.test(value)) {
            /*MessageBox.alert('手机号码格式不正确');*/
            return true;
        }
        return false;
    },
    getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg) //匹配目标参数
        if (r != null) return r[2]
        return null //返回参数值
    },
    //获取七天日期
    getSevenDate(date, lasttime) {
        var lastarr = lasttime.split(':')
        var lasth = parseInt(lastarr[0])
        var lastm = parseInt(lastarr[1])
        var thirtyagoh = ''
        var thirtyagom = ''
        var _arr = []
        //提前半小时就从明天开始
        if (lastm >= 30) {
            thirtyagoh = lasth
            thirtyagom = lastm - 30
        } else {
            thirtyagoh = lasth - 1
            thirtyagom = lastm + 30
        }
        if (parseInt(date.Format('hh')) > thirtyagoh) {
            date.setDate(date.getDate() + 1)
        }
        if (parseInt(date.Format('hh')) == thirtyagoh) {
            if (parseInt(date.Format('mm')) > thirtyagom) {
                date.setDate(date.getDate() + 1)
            }
        }

        for (var i = 0; i < 7; i++) {
            var date2 = new Date(date)
            date2.setDate(date.getDate() + i)
            var time2 = date2.getMonth() + 1 + '月' + date2.getDate() + '日'
            _arr.push(time2)
        }
        return _arr
    },
    //缓存到cookie
    handleCookieGet(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + '=')
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(';', c_start)
                if (c_end == -1) c_end = document.cookie.length
                var result = unescape(document.cookie.substring(c_start, c_end))
                if (result) {
                    if (typeof result === 'string') {
                        return result;
                    } else {
                        return JSON.parse(result);
                    }
                } else {
                    return {}
                }
            }
        }
        return ''
    },
    handleCookieSet(c_name, value, expiredays) {
        var value = JSON.stringify(value)
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie =
            c_name +
            '=' +
            escape(value) +
            (expiredays == null ? '' : ';expires=' + exdate.toGMTString()) +
            '; path=/'
    },
    //缓存到本地
    setlocal(name, obj) {
        localStorage.setItem(name, JSON.stringify(obj))
    },
    //获取本地
    getlocal(name) {
        let data = localStorage.getItem(name)
        if (data != null && data != '') {
            try {
                let obj = eval('(' + data + ')')
                return obj
            } catch (e) {
                return ''
            }
        } else {
            return ''
        }
    },
    //禁止默认滚动条滚动，用于弹出窗
    forbidscroll() {
        document.body.style.overflow = 'hidden'
        document.getElementById('physical').style.overflow = 'hidden'
    },
    allscroll() {
        document.body.style.overflow = ''
        document.getElementById('physical').style.overflow = ''
    },
    //提示中间toast
    toastinfo(msg) {
        Vue.$toast({
            message: msg,
            position: 'middle',
            duration: appConfigs.toastime
        })
    },
    //zepto扩展
    scrollTo() {
        $.fn.scrollTo = function(options) {
            var defaults = {
                toT: 0, //滚动目标位置
                durTime: 500, //过渡动画时间
                delay: 30, //定时器时间
                callback: null //回调函数
            }
            var opts = $.extend(defaults, options),
                timer = null,
                _this = this,
                curTop = _this.scrollTop(), //滚动条当前的位置
                subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
                index = 0,
                dur = Math.round(opts.durTime / opts.delay),
                smoothScroll = function(t) {
                    index++
                    var per = Math.round(subTop / dur)
                    if (index >= dur) {
                        _this.scrollTop(t)
                        window.clearInterval(timer)
                        if (
                            opts.callback &&
                            typeof opts.callback == 'function'
                        ) {
                            opts.callback()
                        }
                        return
                    } else {
                        _this.scrollTop(curTop + index * per)
                    }
                }
            timer = window.setInterval(function() {
                smoothScroll(opts.toT)
            }, opts.delay)
            return _this
        }
    },
    //弹出提示框
    alertip(val) {
        vueEvent.$alert(val, '提示', {
            confirmButtonText: '确定',
            callback: action => {}
        })
    },
    //带取消的两个按钮
    confirmtip(title, info, btntext1, btntext2, suc, cancel) {
        vueEvent
            .$confirm(info, title || '提示', {
                confirmButtonText: btntext1 || '确定',
                cancelButtonText: btntext2 || '取消',
                type: 'warning'
            })
            .then(() => {
                suc && suc()
            })
            .catch(() => {
                cancel && cancel()
            })
    },
    //html片段
    alerthtmltip(
        title,
        htmlstr,
        btntext1,
        btntext2,
        suc,
        cancel,
        style,
        params
    ) {
        if (style == 'red') {
            setTimeout(() => {
                $('.el-message-box__wrapper').addClass('wrapper_redstyle')
            }, 10)
        } else {
            $('.el-message-box__wrapper').removeClass('wrapper_redstyle')
        }
        vueEvent
            .$confirm(htmlstr, title || '提示', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: btntext1 || '确定',
                cancelButtonText: btntext2 || '取消'
            })
            .then(() => {
                suc && suc(params)
            })
            .catch(() => {
                cancel && cancel(params)
            })
    },
    //登录错误提示
    errortip(info) {
        vueEvent.$message.error(info)
    },
    //成功提示
    successtip(info) {
        vueEvent.$message({message: info,type: 'success'});
    },
    //警告提示
    warningtip(info) {
        vueEvent.$message({
            message: info,
            type: 'warning'
        })
    },
    //身份证截取出生日期
    getBirthdayFromIdCard(idCard) {
        idCard = idCard.toString()
        var birthday = ''
        if (idCard != null && idCard != '') {
            if (idCard.length == 15) {
                birthday = '19' + idCard.substr(6, 6)
            } else if (idCard.length == 18) {
                birthday = idCard.substr(6, 8)
            }

            birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
        }
        return birthday
    },
    // 延时
    debounce(func, delay) {
        let timer;
        return function(...args) {
            if (timer) {
                clearInterval(timer)
            }
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    },
    // 随机字符串
    getDtring() {
        function randomString(len) {
            len = len ||16;
            let $chars ='ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            let maxPos = $chars.length;
            let pwd ='';
            for ( let i =0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }
        return randomString(16);
    }

}
export default utils
