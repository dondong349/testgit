/**
 *
 * @事件名称
 *
 */
var EventNames = (function () {
    function EventNames() {
    }
    var d = __define,c=EventNames,p=c.prototype;
    //定义变量
    EventNames.SHOW_START = "show_start";
    EventNames.SHOW_STARTTYPE = "show_starttype";
    EventNames.LOADING_PROGRESS = "loading_progress";
    EventNames.HIDE_CHOOSEBTN = "hide_choosebtn";
    EventNames.SHOW_CHOOSEBTN = "show_choosebtn";
    EventNames.SHOW_TIPS = "show_tips";
    EventNames.CHANGE_KLINE = "change_kline";
    EventNames.SHOW_ARENATIPS = "show_arenatips";
    EventNames.SHOW_KEYBOARD = "show_keyboard";
    EventNames.HIDE_KEYBOARD = "hide_keyboard";
    return EventNames;
})();
egret.registerClass(EventNames,'EventNames');
