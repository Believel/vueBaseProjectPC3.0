export default {
    //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    install(Vue) {
        //全局过滤器˝
        Vue.filter("imghandle", function (imgsrc) {
            if (imgsrc && imgsrc.indexOf("|") != -1) {
                imgsrc = imgsrc.split("|")[0];
            }
            if (imgsrc == null) {
                imgsrc = "";
            }
            return imgsrc;
        });
        //保留两位小数
        Vue.filter("decimaltwo", function (val) {
            return parseFloat(val).toFixed(2);
        });
        //展示距离
        Vue.filter("discount", function (val) {
            return parseFloat(val / 1000).toFixed(2) + "km";
        });
        //处理时间 07:00
        Vue.filter("timehrhandle", function (time) {
            return time == "" ? "" : new Date(time).Format("hh:mm");
        });
        //年 月 日过滤器
        Vue.filter("timeymdhandle", function (time) {
            return time == "" ? "" : new Date(time).Format("yyyy年MM月dd日");
        });
        //年 月 日 时 分 秒过滤器
        Vue.filter("timeymdhmshandle", function (time) {
            return time == "" ?
                "" :
                new Date(time).Format("yyyy年MM月dd日 hh:mm:ss");
        });
        // 全局指令
        Vue.directive("focus", {
            // 当被绑定元素插入到DOM时
            inserted: function (el, binding) {
                console.log(el);
                console.log(binding);
                el.focus();
            }
        });
        //返回上一页
        Vue.prototype.goback = function () {
            this.$router.go(-1);
        };
        Vue.prototype.texthandle = function (value) {
            if (value) {
                let s = value.replace("\n", "<br>").replace(/ /g, "&nbsp;");
                return s;
            }
        };
    }
};
