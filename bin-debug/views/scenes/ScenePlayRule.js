/**
 *
 * @游戏规则
 *
 */
var ScenePlayRule = (function (_super) {
    __extends(ScenePlayRule, _super);
    //定义界面
    function ScenePlayRule() {
        _super.call(this);
        //定义界面
        this.skinName = ScenePlayRuleSkin;
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
    }
    var d = __define,c=ScenePlayRule,p=c.prototype;
    //退出按钮
    p.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //移除游戏规则
        basic.SceneManager.removeTopScene(SceneNames.PLAYRULE);
    };
    return ScenePlayRule;
})(basic.SceneBase);
egret.registerClass(ScenePlayRule,'ScenePlayRule');
