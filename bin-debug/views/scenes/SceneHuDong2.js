/**
 *
 * @互动界面2
 *
 */
var SceneHuDong2 = (function (_super) {
    __extends(SceneHuDong2, _super);
    //定义界面
    function SceneHuDong2() {
        _super.call(this);
        this.page_num = 20;
        //定义界面
        this.skinName = SceneHuDong2Skin;
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = HuDongItem;
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
    }
    var d = __define,c=SceneHuDong2,p=c.prototype;
    //显示前调用
    p.beforeShow = function () {
        var _this = this;
        //数据赋值
        this.page_now = 1;
        //获取数据
        Api.instance.get_game_hudong2(this.page_now, this.page_num, function (response) {
            //判断显示
            if (response.success == true) {
                //数据赋值
                _this._data.source = response.page.list;
            }
        });
        this._data.refresh();
    };
    //退出按钮
    p.onExitBtn = function (e) {
        //移除游戏规则
        basic.SceneManager.removeTopScene(SceneNames.HUDONG2);
    };
    return SceneHuDong2;
})(basic.SceneBase);
egret.registerClass(SceneHuDong2,'SceneHuDong2');
//显示条定义
var HuDongItem = (function (_super) {
    __extends(HuDongItem, _super);
    function HuDongItem() {
        _super.apply(this, arguments);
    }
    var d = __define,c=HuDongItem,p=c.prototype;
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
        //判断显示按钮
        if (this.data.isRequestType == 1) {
            //定义按钮
            this.btn_gensui.enabled = false;
            this.btn_tiaozhan.enabled = false;
            //判读显示按钮文本
            if (this.data.requestType == "CHALLENGE") {
                this.btn_gensui.label = "更随";
                this.btn_tiaozhan.label = "已挑战";
            }
            else if (this.data.requestType == "FOLLOW") {
                this.btn_gensui.label = "已请求";
                this.btn_tiaozhan.label = "挑战";
            }
        }
        else {
            this.btn_gensui.label = "跟随";
            this.btn_tiaozhan.label = "挑战";
        }
        //注册按钮
        this.btn_gensui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGenSuiBtn, this);
        this.btn_tiaozhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTiaoZhanBtn, this);
    };
    //跟随按钮
    p.onGenSuiBtn = function (e) {
        var _this = this;
        //上传接口
        Api.instance.up_game_gensui(this.data.accountId, function (response) {
            //判断显示
            if (response.success == true) {
                //数据赋值
                _this.data.isRequestType = 1;
                _this.data.requestType = "FOLLOW";
                //判断显示按钮
                if (_this.data.isRequestType == 1) {
                    //定义按钮
                    _this.btn_gensui.enabled = false;
                    _this.btn_tiaozhan.enabled = false;
                    //判读显示按钮文本
                    if (_this.data.requestType == "CHALLENGE") {
                        _this.btn_gensui.label = "跟随";
                        _this.btn_tiaozhan.label = "已挑战";
                    }
                    else if (_this.data.requestType == "FOLLOW") {
                        _this.btn_gensui.label = "已请求";
                        _this.btn_tiaozhan.label = "挑战";
                    }
                }
                //显示提示信息
                PanelTips.instance.show("等待对方同意！");
            }
            else {
                //显示提示信息
                PanelTips.instance.show(response.code);
            }
        });
    };
    //挑战界面
    p.onTiaoZhanBtn = function (e) {
        var _this = this;
        //上传接口
        Api.instance.up_game_tiaozhan(this.data.accountId, function (response) {
            //判断显示
            if (response.success == true) {
                //数据赋值
                _this.data.isRequestType = 1;
                _this.data.requestType = "CHALLENGE";
                //判断显示按钮
                if (_this.data.isRequestType == 1) {
                    //定义按钮
                    _this.btn_gensui.enabled = false;
                    _this.btn_tiaozhan.enabled = false;
                    //判读显示按钮文本
                    if (_this.data.requestType == "CHALLENGE") {
                        _this.btn_gensui.label = "跟随";
                        _this.btn_tiaozhan.label = "已挑战";
                    }
                    else if (_this.data.requestType == "FOLLOW") {
                        _this.btn_gensui.label = "已请求";
                        _this.btn_tiaozhan.label = "挑战";
                    }
                }
                //显示提示信息
                PanelTips.instance.show("等待对方同意！");
            }
            else {
                //显示提示信息
                PanelTips.instance.show(response.code);
            }
        });
    };
    return HuDongItem;
})(eui.ItemRenderer);
egret.registerClass(HuDongItem,'HuDongItem');
