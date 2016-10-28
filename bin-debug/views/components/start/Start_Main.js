/**
 *
 * @游戏主界面
 *
 */
var Start_Main = (function (_super) {
    __extends(Start_Main, _super);
    function Start_Main() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Start_Main,p=c.prototype;
    //初始化
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = Start_Main_Item;
    };
    //初始化界面
    p.info = function () {
        var _this = this;
        //初始化
        this.takecard.info();
        this.information.info();
        //获取数据
        Api.instance.get_start_list(function (response) {
            //判断显示
            if (response.success == true) {
                //列表赋值
                _this._data.source = response.list;
                GameData.start_list = response.list;
            }
            else {
            }
        });
        this._data.refresh();
    };
    //停止计时
    p.stop = function () {
        //停止计时
        this.takecard.stop();
    };
    return Start_Main;
})(eui.Component);
egret.registerClass(Start_Main,'Start_Main');
//显示条定义
var Start_Main_Item = (function (_super) {
    __extends(Start_Main_Item, _super);
    function Start_Main_Item() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Start_Main_Item,p=c.prototype;
    //初始化界面
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示文本
        this.txt_name.text = this.data.num;
        this.txt_date.text = this.data.day + "  " + this.data.date;
        //判断显示按钮
        if (this.data.isenroll == true) {
            this.btn_yes.label = "已报名";
            this.btn_yes.enabled = false;
        }
        else {
            this.btn_yes.label = "报名";
            this.btn_yes.enabled = true;
        }
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //确定按钮
    p.onYesBtn = function (e) {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //报名提交数据
        Api.instance.start_signup(this.data.code, function (response) {
            //判断显示
            if (response.success == true) {
                //数据赋值
                _this.data.isenroll = true;
                //显示按钮
                _this.btn_yes.label = "已报名";
                _this.btn_yes.enabled = false;
            }
        });
    };
    return Start_Main_Item;
})(eui.ItemRenderer);
egret.registerClass(Start_Main_Item,'Start_Main_Item');
