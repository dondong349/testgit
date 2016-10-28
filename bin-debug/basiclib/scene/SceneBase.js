/**
 * Created by jq on 2016/2/5.
 * 场景基类
 */
var basic;
(function (basic) {
    var SceneBase = (function (_super) {
        __extends(SceneBase, _super);
        //初始化界面
        function SceneBase() {
            _super.call(this);
            //触屏控制
            this.touchChildren = true;
            this.touchEnabled = false;
            //定义场景大小
            this.width = basic.StageProxy.stage.stageWidth;
            this.height = basic.StageProxy.stage.stageHeight;
        }
        var d = __define,c=SceneBase,p=c.prototype;
        //显示前
        p._beforeShow = function (params) {
            if (params === void 0) { params = null; }
            this.beforeShow(params);
        };
        //隐藏前
        p._beforeHide = function (params) {
            if (params === void 0) { params = null; }
            this.beforeHide(params);
        };
        //显示时
        p._onShow = function (params) {
            if (params === void 0) { params = null; }
            this.onShow(params);
        };
        //隐藏时
        p._onHide = function (params) {
            if (params === void 0) { params = null; }
            this.onHide(params);
        };
        //显示前
        p.beforeShow = function (params) {
            if (params === void 0) { params = null; }
        };
        //隐藏前
        p.beforeHide = function (params) {
            if (params === void 0) { params = null; }
        };
        //显示时
        p.onShow = function (params) {
            if (params === void 0) { params = null; }
        };
        //隐藏时
        p.onHide = function (params) {
            if (params === void 0) { params = null; }
        };
        return SceneBase;
    })(eui.Component);
    basic.SceneBase = SceneBase;
    egret.registerClass(SceneBase,'basic.SceneBase');
})(basic || (basic = {}));
