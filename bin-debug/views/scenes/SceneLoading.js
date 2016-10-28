/**
 *
 * @加载界面
 *
 */
var SceneLoading = (function (_super) {
    __extends(SceneLoading, _super);
    //定义界面
    function SceneLoading() {
        _super.call(this);
        this._tween_rotation = null;
        this.trun_speed = 400;
        //定义界面
        this.skinName = SceneLoadingSkin;
    }
    var d = __define,c=SceneLoading,p=c.prototype;
    //显示前调用
    p.beforeShow = function (params) {
        //显示界面
        this.txt_progress.text = "0%";
        //开始转圈
        this._tween_rotation = egret.Tween.get(this.com_loading, { loop: true }).to({ rotation: 360 }, this.trun_speed);
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
    };
    //隐藏前调用
    p.beforeHide = function (params) {
        //判断停止
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        //注销事件
        basic.Dispatcher.removeListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
    };
    //显示加载进度
    p.onLoadingProgress = function (event) {
        //定义变量
        var num_now_loader = (event.data.itemsLoaded / event.data.itemsTotal) * 100;
        //显示文本
        this.txt_progress.text = Math.floor(num_now_loader).toString() + "%";
    };
    return SceneLoading;
})(basic.SceneBase);
egret.registerClass(SceneLoading,'SceneLoading');
