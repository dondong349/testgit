/**
 *
 * @撤单
 *
 */
var PanelCheDan = (function (_super) {
    __extends(PanelCheDan, _super);
    //定义界面
    function PanelCheDan() {
        _super.call(this);
    }
    var d = __define,c=PanelCheDan,p=c.prototype;
    d(PanelCheDan, "instance"
        ,function () {
            if (this._instance == undefined) {
                this._instance = new PanelCheDan();
            }
            return this._instance;
        }
    );
    //皮肤设置
    p.init = function () {
        this.skinName = PanelCheDanSkin;
    };
    //初始化界面
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = CheDanItem;
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
        GameData.chedan_list = [];
        Api.instance.get_game_chexiao(function (response) {
            //判断显示
            if (response.success == true) {
                //数据赋值
                if (response.list != undefined) {
                    for (var i = 0; i < response.list.length; i++) {
                        //数据赋值
                        GameData.chedan_list[i] = response.list[i];
                        GameData.chedan_list[i]["itemnum"] = i;
                    }
                }
                _this._data.source = GameData.chedan_list;
            }
        });
        this._data.refresh();
    };
    //显示撤单界面
    p.onShowCheDan = function (e) {
        //刷新列表
        this._data.source = GameData.chedan_list;
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
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //退出函数
        this.funExit();
    };
    return PanelCheDan;
})(basic.PanelBase);
egret.registerClass(PanelCheDan,'PanelCheDan');
//显示条定义
var CheDanItem = (function (_super) {
    __extends(CheDanItem, _super);
    function CheDanItem() {
        _super.apply(this, arguments);
    }
    var d = __define,c=CheDanItem,p=c.prototype;
    //初始化界面
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //定义文本颜色
        if (this.data.direction == 1) {
            this.txt_num.textColor = 0xf3576f;
        }
        else if (this.data.direction == 2) {
            this.txt_num.textColor = 0x3ce490;
        }
        //显示文本
        this.txt_price.text = this.data.price;
        this.txt_num.text = this.data.volume + "手";
        //显示颜色
        if (this.data.itemnum % 2 == 0) {
            //显示颜色
            this.rect_back.fillColor = 0xfafafa;
        }
        else {
            //显示颜色
            this.rect_back.fillColor = 0xf0f0f0;
        }
        //注册按钮
        this.btn_chedan.label = "撤单";
        this.btn_chedan.enabled = true;
        this.btn_chedan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheDanBtn, this);
    };
    //取消按钮
    p.onCheDanBtn = function (e) {
        var _this = this;
        //播放声音
        egret.setTimeout(function () {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        }, this, 100);
        //上传接口
        Api.instance.up_game_chexiao(this.data.id, function (response) {
            //判断显示
            if (response.success == true) {
                //显示按钮
                _this.btn_chedan.label = "已撤单";
                _this.btn_chedan.enabled = false;
            }
            else {
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    };
    return CheDanItem;
})(eui.ItemRenderer);
egret.registerClass(CheDanItem,'CheDanItem');
