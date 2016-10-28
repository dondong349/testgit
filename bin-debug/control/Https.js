/**
 * @author Don
 * @信息交互
 *
 */
var Https = (function () {
    function Https() {
    }
    var d = __define,c=Https,p=c.prototype;
    //初始化
    Https.init = function () {
        //数据赋值
        this.root = "http://www.dae.pw:8080/wsdsp-wx/"; //http://www.dae.pw/
    };
    //获取数据
    Https.getData = function (url, params, callback) {
        if (params === void 0) { params = null; }
        //定义变量
        var _url;
        //数据赋值
        _url = this.root + url;
        _url += "?v=" + Math.random().toString();
        _url += "&" + basic.Utils.obj2query(params);
        console.log(_url);
        //链接数据
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(_url, egret.HttpMethod.POST);
        request.send();
        //定义事件
        request.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(request.response);
            //数据赋值
            var response = JSON.parse(request.response);
            //显示回调函数
            callback(response);
        }, this);
    };
    return Https;
})();
egret.registerClass(Https,'Https');
