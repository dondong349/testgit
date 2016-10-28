/**
 *
 * @地下按钮
 *
 */
var SceneDownBtn = (function (_super) {
    __extends(SceneDownBtn, _super);
    //定义界面
    function SceneDownBtn() {
        _super.call(this);
        //定义界面
        this.skinName = DownChooseBtnSkin;
        //注册按钮
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS, this.onShowTips, this);
        this.tb_menu.addEventListener(egret.Event.CHANGE, this.onTypeChange, this);
        basic.Dispatcher.addListener(EventNames.SHOW_CHOOSEBTN, this.onShowBtn, this);
        basic.Dispatcher.addListener(EventNames.HIDE_CHOOSEBTN, this.onHideBtn, this);
    }
    var d = __define,c=SceneDownBtn,p=c.prototype;
    //显示前调用
    p.beforeShow = function (params) {
        //定义位置
        this.g_btn.y = basic.StageProxy.height - 89;
    };
    //类型修改事件
    p.onTypeChange = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_STARTTYPE, { "type": this.tb_menu.selectedIndex });
        //判断是否显示界面
        if (this.tb_menu.selectedIndex == 2) {
            this.rect_tips.visible = false;
        }
    };
    //显示提示
    p.onShowTips = function (e) {
        //显示提示
        this.rect_tips.visible = true;
    };
    //显示按钮
    p.onShowBtn = function (e) {
        //显示界面
        var _tween_y = egret.Tween.get(this.g_btn).to({ y: basic.StageProxy.height - 89 }, 200);
    };
    //隐藏按钮
    p.onHideBtn = function (e) {
        var _tween_y = egret.Tween.get(this.g_btn).to({ y: basic.StageProxy.height }, 200);
    };
    return SceneDownBtn;
})(basic.SceneBase);
egret.registerClass(SceneDownBtn,'SceneDownBtn');
