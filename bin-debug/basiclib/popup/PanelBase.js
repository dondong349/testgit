/**
 * Created by jq 2016/2/8.
 */
var basic;
(function (basic) {
    var PanelBase = (function (_super) {
        __extends(PanelBase, _super);
        //初始化
        function PanelBase(showEffect, showEffectParams, closeEffect, closeEffectParams, popupShowBanner) {
            if (showEffect === void 0) { showEffect = null; }
            if (showEffectParams === void 0) { showEffectParams = null; }
            if (closeEffect === void 0) { closeEffect = null; }
            if (closeEffectParams === void 0) { closeEffectParams = null; }
            if (popupShowBanner === void 0) { popupShowBanner = true; }
            _super.call(this);
            this._excludeActionsClose = [];
            //显示数据赋值
            this.showEffect = showEffect || basic.dialogEffect.None;
            this.showEffectParams = showEffectParams;
            //关闭数据赋值
            this.closeEffect = closeEffect || basic.dialogEffect.None;
            this.closeEffectParams = closeEffectParams;
            //数据赋值
            this.popupShowBanner = popupShowBanner;
            //初始化
            this.init();
        }
        var d = __define,c=PanelBase,p=c.prototype;
        //初始化
        p.init = function () {
        };
        //添加不用关闭的动作
        p.addExcludeForClose = function (actions) {
            //数据赋值
            this._excludeActionsClose = this._excludeActionsClose.concat(actions);
        };
        //退出函数
        p.dealAction = function (action, data) {
            if (action === void 0) { action = null; }
            if (data === void 0) { data = null; }
            //判断是否调用callback
            if (this._callback) {
                this._callback(action || 'close', data);
            }
            //判断退出
            if (this._excludeActionsClose.indexOf(action) < 0) {
                this.close();
            }
        };
        //显示对话框
        p.popup = function (modalTouchFun, modal) {
            if (modalTouchFun === void 0) { modalTouchFun = null; }
            if (modal === void 0) { modal = true; }
            basic.PopUpManager.addPopUp(this, this.showEffect, this.showEffectParams, modalTouchFun, modal);
        };
        //关闭对话框
        p.close = function () {
            basic.PopUpManager.removePopUp(this, this.closeEffect, this.closeEffectParams);
        };
        return PanelBase;
    })(eui.Component);
    basic.PanelBase = PanelBase;
    egret.registerClass(PanelBase,'basic.PanelBase');
})(basic || (basic = {}));
