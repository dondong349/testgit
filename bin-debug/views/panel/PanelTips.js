/**
 *
 * @提示界面
 *
 */
var PanelTips = (function (_super) {
    __extends(PanelTips, _super);
    //定义界面
    function PanelTips() {
        _super.call(this);
    }
    var d = __define,c=PanelTips,p=c.prototype;
    d(PanelTips, "instance"
        ,function () {
            if (this._instance == undefined) {
                this._instance = new PanelTips();
            }
            return this._instance;
        }
    );
    //皮肤设置
    p.init = function () {
        this.skinName = PanelTipsSkin;
    };
    //初始化界面
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
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
    //确定按钮
    p.onYesBtn = function (e) {
        //退出函数
        this.funExit();
        //判断显示
        if (this.fun_yes) {
            this.fun_yes();
        }
    };
    return PanelTips;
})(basic.PanelBase);
egret.registerClass(PanelTips,'PanelTips');
