/**
 *
 * @author
 *
 */
var basic;
(function (basic) {
    var TimerEvent = (function (_super) {
        __extends(TimerEvent, _super);
        function TimerEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=TimerEvent,p=c.prototype;
        //定义变量
        TimerEvent.TIMER = "timer";
        TimerEvent.TIMER_COMPLETE = "timer_complete";
        return TimerEvent;
    })(egret.Event);
    basic.TimerEvent = TimerEvent;
    egret.registerClass(TimerEvent,'basic.TimerEvent');
})(basic || (basic = {}));
