/**
 *Created by jq on 2016/1/24
 * @消息事件类
 */
var basic;
(function (basic) {
    var Dispatcher = (function () {
        function Dispatcher() {
        }
        var d = __define,c=Dispatcher,p=c.prototype;
        //初始化
        Dispatcher.init = function () {
            Dispatcher.eventDispatcher = new egret.EventDispatcher();
        };
        //发送消息
        Dispatcher.dispatch = function (eventName, params) {
            if (params === void 0) { params = null; }
            //判断发送消息
            if (params) {
                Dispatcher.eventDispatcher.dispatchEventWith(eventName, false, params);
            }
            else {
                Dispatcher.eventDispatcher.dispatchEvent(new egret.Event(eventName));
            }
        };
        //注册消息侦听
        Dispatcher.addListener = function (eventName, callback, thisObj) {
            Dispatcher.eventDispatcher.addEventListener(eventName, callback, thisObj);
        };
        //注销消息侦听
        Dispatcher.removeListener = function (eventName, callback, thisObj) {
            Dispatcher.eventDispatcher.removeEventListener(eventName, callback, thisObj);
        };
        return Dispatcher;
    })();
    basic.Dispatcher = Dispatcher;
    egret.registerClass(Dispatcher,'basic.Dispatcher');
})(basic || (basic = {}));
