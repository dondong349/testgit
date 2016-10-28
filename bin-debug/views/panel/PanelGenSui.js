/**
 *
 * @跟随列表
 *
 */
var PanelGenSui = (function (_super) {
    __extends(PanelGenSui, _super);
    //定义界面
    function PanelGenSui() {
        _super.call(this);
    }
    var d = __define,c=PanelGenSui,p=c.prototype;
    d(PanelGenSui, "instance"
        ,function () {
            if (this._instance == undefined) {
                this._instance = new PanelGenSui();
            }
            return this._instance;
        }
    );
    //皮肤设置
    p.init = function () {
        this.skinName = PanelGenSuiSkin;
    };
    //初始化界面
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = GenSuiItem;
        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    //显示界面
    p.show = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        //显示界面
        this.popup(this.funExit.bind(this));
        //获取跟随数据
        Api.instance.get_game_gensui(function (response) {
            //判断显示
            if (response.success == true) {
                //数据赋值
                _this._data.source = response.list;
            }
        });
        this._data.refresh();
    };
    //退出函数
    p.funExit = function () {
        //退出事件
        this.dealAction();
        //判断显示
        if (this._callback) {
            this._callback();
        }
    };
    //关闭按钮
    p.onCloseBtn = function (e) {
        //退出函数
        this.funExit();
    };
    return PanelGenSui;
})(basic.PanelBase);
egret.registerClass(PanelGenSui,'PanelGenSui');
//显示条定义
var GenSuiItem = (function (_super) {
    __extends(GenSuiItem, _super);
    function GenSuiItem() {
        _super.apply(this, arguments);
    }
    var d = __define,c=GenSuiItem,p=c.prototype;
    //初始化界面
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.head.show(this.data.url);
        //显示文本
        this.txt_name.text = this.data.accountname;
        //显示类型
        if (this.data.auctionrole == "RETAIL") {
            this.com_type.currentState = "1";
        }
        else if (this.data.auctionrole == "BIGRETAIL") {
            this.com_type.currentState = "2";
        }
        else if (this.data.auctionrole == "MECHANISM") {
            this.com_type.currentState = "3";
        }
        //注册按钮
        this.btn_quxiao.label = "取消";
        this.btn_quxiao.enabled = true;
        this.btn_quxiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuXiaoBtn, this);
    };
    //取消按钮
    p.onQuXiaoBtn = function (e) {
        var _this = this;
        //上传接口
        Api.instance.up_game_quxiaogensui(this.data.accountId, function (response) {
            //判断显示
            if (response.success == true) {
                //显示按钮
                _this.btn_quxiao.enabled = false;
                _this.btn_quxiao.label = "已取消";
            }
        });
    };
    return GenSuiItem;
})(eui.ItemRenderer);
egret.registerClass(GenSuiItem,'GenSuiItem');
