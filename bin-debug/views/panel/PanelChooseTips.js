/**
 *
 * @选择提示
 *
 */
var PanelChooseTips = (function (_super) {
    __extends(PanelChooseTips, _super);
    //定义界面
    function PanelChooseTips() {
        _super.call(this);
    }
    var d = __define,c=PanelChooseTips,p=c.prototype;
    d(PanelChooseTips, "instance"
        ,function () {
            if (this._instance == undefined) {
                this._instance = new PanelChooseTips();
            }
            return this._instance;
        }
    );
    //皮肤设置
    p.init = function () {
        this.skinName = PanelChooseTipsSkin;
    };
    //初始化界面
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
    };
    //显示界面
    p.show = function (_Tips, _yesfun, callback) {
        if (_yesfun === void 0) { _yesfun = null; }
        if (callback === void 0) { callback = null; }
        //数据赋值
        this.fun_yes = _yesfun;
        this._callback = callback;
        //显示文本
        this.txt_tips.text = _Tips;
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //退出函数
    p.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //退出按钮
    p.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //退出函数
        this.funExit();
    };
    //确定按钮
    p.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //退出函数
        this.funExit();
        //判断显示
        if (this.fun_yes) {
            this.fun_yes();
        }
    };
    return PanelChooseTips;
})(basic.PanelBase);
egret.registerClass(PanelChooseTips,'PanelChooseTips');
