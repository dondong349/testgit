/**
 *
 * @场景名称
 *
 */
var SceneNames = (function () {
    function SceneNames() {
    }
    var d = __define,c=SceneNames,p=c.prototype;
    SceneNames.START = "start"; //开始
    SceneNames.ARENA = "arena"; //竞技场
    SceneNames.HISTORY = "history"; //历史记录
    SceneNames.FRIENDS = "friends"; //好友管理
    SceneNames.PLAYRULE = "playrule"; //游戏规则
    SceneNames.DOWNBTN = "downbtn"; //地下按钮
    SceneNames.LOADING = "loading"; //加载
    SceneNames.HUDONG1 = "hudong1"; //互动界面1
    SceneNames.HUDONG2 = "hudong2"; //互动界面2
    SceneNames.SENDMESSAGE = "sendmessage"; //发送消息
    SceneNames.HUDONGXINXI = "hudongxinxi"; //互动信息
    SceneNames.CAOZUOXINXI = "caozuoxinxi"; //操作信息
    return SceneNames;
})();
egret.registerClass(SceneNames,'SceneNames');
