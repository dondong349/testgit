/**
 *
 * @动态信息
 *
 */
var DongTaiMessage = (function (_super) {
    __extends(DongTaiMessage, _super);
    function DongTaiMessage() {
        _super.apply(this, arguments);
        this.txt_mai1_num = [];
        this.txt_mai2_num = [];
        this.txt_mai1_title = [];
        this.txt_mai2_title = [];
        this.txt_mai1_jiage = [];
        this.txt_mai2_jiage = [];
        this.now_showmenu = 1;
        //K线数据
        this.KLine_Num = 0;
        this.KLineData = [];
        this.KLine_Part = [];
        this.txt_tubiao = [];
        this.txt_percent = [];
        this.KLine_kedu = 0;
        this.isShow_fenshi = false;
        this.kline_daxiao = 0; //0：普通大小，1：放大，-1：缩小
    }
    var d = __define,c=DongTaiMessage,p=c.prototype;
    //初始化
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 1; i < 6; i++) {
            //定义变量
            var mai1_num = this["txt_mai1_num" + i];
            var mai2_num = this["txt_mai2_num" + i];
            var mai1_title = this["txt_mai1_title" + i];
            var mai2_title = this["txt_mai2_title" + i];
            var mai1_jiage = this["txt_mai1_jiage" + i];
            var mai2_jiage = this["txt_mai2_jiage" + i];
            //数据赋值
            this.txt_mai1_num[i] = mai1_num;
            this.txt_mai2_num[i] = mai2_num;
            this.txt_mai1_title[i] = mai1_title;
            this.txt_mai2_title[i] = mai2_title;
            this.txt_mai1_jiage[i] = mai1_jiage;
            this.txt_mai2_jiage[i] = mai2_jiage;
            //清空文本
            this.txt_mai1_num[i].text = "";
            this.txt_mai2_num[i].text = "";
            this.txt_mai1_jiage[i].text = "";
            this.txt_mai2_jiage[i].text = "";
        }
        this.txt_jiage.text = "";
        //图标文本赋值
        for (var j = 0; j < 5; j++) {
            //定义变量
            var percent = this["txt_percent" + j];
            var tubiao = this["txt_tubiao" + j];
            //数据赋值
            this.txt_tubiao[j] = tubiao;
            this.txt_percent[j] = percent;
            this.txt_tubiao[j].text = "";
            this.txt_percent[j].text = "";
        }
        //显示界面
        this.tb_menu.selectedIndex = this.now_showmenu;
        //注册按钮
        this.tb_menu.addEventListener(egret.Event.CHANGE, this.onChaneMenu, this);
        this.btn_jia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiaBtn, this);
        this.btn_jian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJianBtn, this);
    };
    //清楚K线数据
    p.cleanKLine = function () {
        //判断移除
        if (this.g_show.visible == true) {
            //移除K线
            this.removeKLineFace();
        }
        else {
            //移除分时
            this.removeFenShiFace();
        }
        //数据赋值
        this.KLineData = [];
    };
    //加减按钮
    p.onJiaBtn = function (e) {
        //播放声音
        egret.setTimeout(function () {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        }, this, 100);
        //移除K线
        this.removeKLineFace();
        //判断显示
        if (this.kline_daxiao != 1) {
            this.kline_daxiao += 1;
        }
        //显示K线
        this.showKLineFace();
    };
    p.onJianBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //移除K线
        this.removeKLineFace();
        //判断显示
        if (this.kline_daxiao != -1) {
            this.kline_daxiao -= 1;
        }
        //显示K线
        this.showKLineFace();
    };
    //K线改变事件
    p.onChaneMenu = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //判断显示
        if (this.tb_menu.selectedIndex == 0) {
            //数据赋值
            this.KLineData = [];
            this.now_showmenu = this.tb_menu.selectedIndex;
            //显示分时
            this.g_percent.visible = true;
            this.g_showfenshi.visible = true;
            //隐藏K线
            this.g_show.visible = false;
            this.btn_jia.visible = false;
            this.btn_jian.visible = false;
            //发送消息
            basic.Dispatcher.dispatch(EventNames.CHANGE_KLINE, { "klinetype": 0 });
        }
        else if (this.tb_menu.selectedIndex == 5) {
            //显示提示
            PanelTips.instance.show("暂未开放");
            //显示界面
            this.tb_menu.selectedIndex = this.now_showmenu;
        }
        else {
            //数据赋值
            this.KLineData = [];
            this.now_showmenu = this.tb_menu.selectedIndex;
            //显示K线
            this.g_show.visible = true;
            this.btn_jia.visible = true;
            this.btn_jian.visible = true;
            //隐藏分时
            this.g_percent.visible = false;
            this.g_showfenshi.visible = false;
            //发送消息
            basic.Dispatcher.dispatch(EventNames.CHANGE_KLINE, { "klinetype": this.now_showmenu - 1 });
        }
    };
    //显示价格内容
    p.showPrice = function (_buy_data, _sell_data, _now_price) {
        //数据赋值
        for (var i = 1; i < 6; i++) {
            //清空文本
            this.txt_mai1_num[i].text = "";
            this.txt_mai2_num[i].text = "";
            this.txt_mai1_jiage[i].text = "";
            this.txt_mai2_jiage[i].text = "";
        }
        this.txt_jiage.text = "";
        //显示当前价格
        GameData.price_now = _now_price;
        this.txt_jiage.text = _now_price.toString();
        //显示卖价格
        if (_sell_data != undefined) {
            for (var i1 = 0; i1 < Math.min(5, _sell_data.length); i1++) {
                this.txt_mai1_num[i1 + 1].text = _sell_data[i1].volume;
                this.txt_mai1_jiage[i1 + 1].text = _sell_data[i1].price;
            }
        }
        //显示买价格
        if (_buy_data != undefined) {
            for (var i2 = 0; i2 < Math.min(5, _buy_data.length); i2++) {
                this.txt_mai2_num[i2 + 1].text = _buy_data[i2].volume;
                this.txt_mai2_jiage[i2 + 1].text = _buy_data[i2].price;
            }
        }
    };
    //显示K线
    p.showKLine = function (_data) {
        //判断显示
        if (_data.length > 0) {
            //判断移除
            if (this.g_show.visible == true) {
                //移除K线
                this.removeKLineFace();
            }
            else {
                //移除分时
                this.removeFenShiFace();
            }
            //数据赋值
            for (var i = 0; i < _data.length; i++) {
                if (this.KLineData.length > 0) {
                    if (this.KLineData[this.KLineData.length - 1].id == _data[i].id) {
                        this.KLineData[this.KLineData.length - 1] = _data[i];
                    }
                    else {
                        this.KLineData[this.KLineData.length] = _data[i];
                    }
                }
                else {
                    this.KLineData[this.KLineData.length] = _data[i];
                }
            }
            //判断显示
            if (this.g_show.visible == true) {
                //显示K线
                this.showKLineFace();
            }
            else {
                //显示分时
                this.showFenShiFace();
            }
        }
    };
    //显示分时
    p.showFenShiFace = function () {
        //定义变量
        var now_max = this.assMax(1);
        var now_min = this.assMin(1);
        var add_x;
        var add_price;
        //判断赋值
        if (this.KLineData.length > 0) {
            var now_middle = Math.floor(this.KLineData[0].openprice);
            var now_kedu = Math.max(Math.floor((now_max - now_middle) / 1.5) + 1, Math.floor((now_middle - now_min) / 1.5) + 1);
        }
        //判断显示
        if (now_kedu > this.KLine_kedu) {
            this.KLine_kedu = now_kedu;
            this.KLine_middle = now_middle;
        }
        else if (now_max < this.KLine_middle + this.KLine_kedu) {
            this.KLine_kedu = now_kedu;
            this.KLine_middle = now_middle;
        }
        else if (now_min > this.KLine_middle - this.KLine_kedu) {
            this.KLine_kedu = now_kedu;
            this.KLine_middle = now_middle;
        }
        add_price = Math.floor(this.KLine_kedu / this.KLine_middle * 10000) / 100;
        //判断赋值
        if (this.KLineData.length <= 72) {
            add_x = 5;
        }
        else {
            add_x = 360 / this.KLineData.length;
        }
        this.txt_percent[2].text = "0%";
        this.txt_percent[0].text = Number(add_price * 2).toString() + "%";
        this.txt_percent[1].text = Number(add_price * 1).toString() + "%";
        this.txt_percent[3].text = Number(add_price * 1).toString() + "%";
        this.txt_percent[4].text = Number(add_price * 2).toString() + "%";
        //显示文本
        for (var j = 0; j < 5; j++) {
            this.txt_tubiao[j].text = Number(this.KLine_middle - 2 * this.KLine_kedu + j * this.KLine_kedu).toString();
        }
        //显示界面
        this.fenshi = new egret.Shape();
        this.fenshi.graphics.lineStyle(0.5, 0x4584f4);
        for (var i = 0; i < this.KLineData.length; i++) {
            //定义变量
            var now_x;
            var now_y;
            //数据赋值
            now_x = i * add_x;
            now_y = (this.KLine_middle + 2 * this.KLine_kedu - this.KLineData[i].closeprice) * 75 / this.KLine_kedu;
            //判断显示
            if (i == 0) {
                this.fenshi.graphics.moveTo(now_x, now_y);
            }
            else {
                this.fenshi.graphics.lineTo(now_x, now_y);
            }
        }
        this.fenshi.graphics.endFill();
        this.g_showfenshi.addChild(this.fenshi);
        this.isShow_fenshi = true;
    };
    //移除分时
    p.removeFenShiFace = function () {
        //移除界面
        if (this.isShow_fenshi == true) {
            this.g_showfenshi.removeChild(this.fenshi);
            this.isShow_fenshi = false;
            this.fenshi = null;
        }
    };
    //显示K线
    p.showKLineFace = function () {
        //定义变量
        var now_max = this.assMax(0);
        var now_min = this.assMin(0);
        var now_kedu = Math.floor((now_max - now_min) / 3) + 1;
        var now_middle = Math.floor((now_max + now_min) / 2);
        //判断显示
        if (now_kedu > this.KLine_kedu) {
            this.KLine_kedu = now_kedu;
            this.KLine_middle = now_middle;
        }
        else if (now_max < this.KLine_middle + this.KLine_kedu) {
            this.KLine_kedu = now_kedu;
            this.KLine_middle = now_middle;
        }
        else if (now_min > this.KLine_middle - this.KLine_kedu) {
            this.KLine_kedu = now_kedu;
            this.KLine_middle = now_middle;
        }
        //显示文本
        for (var j = 0; j < 5; j++) {
            this.txt_tubiao[j].text = Number(this.KLine_middle - 2 * this.KLine_kedu + j * this.KLine_kedu).toString();
        }
        //定义变量
        var show_klinenum;
        var show_klinemaxnum;
        var show_klinewidth;
        var show_kline_add;
        //判断显示
        if (this.kline_daxiao == -1) {
            show_klinewidth = 4;
            show_kline_add = 6;
            show_klinemaxnum = 60;
            show_klinenum = Math.min(60, this.KLineData.length);
        }
        else if (this.kline_daxiao == 0) {
            show_klinewidth = 7;
            show_kline_add = 10;
            show_klinemaxnum = 36;
            show_klinenum = Math.min(36, this.KLineData.length);
        }
        else if (this.kline_daxiao == 1) {
            show_klinewidth = 10;
            show_kline_add = 15;
            show_klinemaxnum = 24;
            show_klinenum = Math.min(24, this.KLineData.length);
        }
        console.log(show_klinenum);
        //显示界面
        for (var i = 0; i < show_klinenum; i++) {
            //定义界面
            var show_num;
            var now_kline = new KLine();
            //判断显示
            if (this.KLineData.length <= show_klinemaxnum) {
                show_num = i;
            }
            else {
                show_num = (this.KLineData.length - show_klinemaxnum) + i;
            }
            //显示界面
            now_kline.show(show_klinewidth, this.KLine_kedu, this.KLineData[show_num]);
            //定义位置
            now_kline.x = i * show_kline_add;
            now_kline.y = (this.KLine_middle + 2 * this.KLine_kedu - this.KLineData[show_num].topprice) * 75 / this.KLine_kedu;
            //数据赋值
            this.KLine_Part[this.KLine_Num] = now_kline;
            //显示界面
            this.g_show.addChild(this.KLine_Part[this.KLine_Num]);
            this.KLine_Num += 1;
        }
    };
    //判断显示K线
    p.removeKLineFace = function () {
        //移除界面
        for (var i = 0; i < this.KLine_Num; i++) {
            this.g_show.removeChild(this.KLine_Part[i]);
        }
        this.KLine_Num = 0;
        this.KLine_Part = [];
    };
    //最小值赋值
    p.assMin = function (_type) {
        //定义变量
        var min;
        var assnum;
        var maxnum;
        //判断赋值
        if (_type == 0) {
            if (this.kline_daxiao == -1) {
                maxnum = 60;
                assnum = Math.min(60, this.KLineData.length);
            }
            else if (this.kline_daxiao == 0) {
                maxnum = 36;
                assnum = Math.min(36, this.KLineData.length);
            }
            else if (this.kline_daxiao == 1) {
                maxnum = 24;
                assnum = Math.min(24, this.KLineData.length);
            }
        }
        else {
            assnum = this.KLineData.length;
        }
        for (var i = 0; i < assnum; i++) {
            //定义界面
            var show_num;
            //判断显示
            if (_type == 0) {
                if (this.KLineData.length <= maxnum) {
                    show_num = i;
                }
                else {
                    show_num = (this.KLineData.length - maxnum) + i;
                }
            }
            else {
                show_num = i;
            }
            //数据赋值
            if (i == 0) {
                min = this.KLineData[show_num].lowprice;
            }
            else {
                min = Math.min(min, this.KLineData[show_num].lowprice);
            }
        }
        return min;
    };
    //最大值赋值
    p.assMax = function (_type) {
        //定义变量
        var max;
        var assnum;
        var maxnum;
        //判断赋值
        if (_type == 0) {
            if (this.kline_daxiao == -1) {
                maxnum = 60;
                assnum = Math.min(60, this.KLineData.length);
            }
            else if (this.kline_daxiao == 0) {
                maxnum = 36;
                assnum = Math.min(36, this.KLineData.length);
            }
            else if (this.kline_daxiao == 1) {
                maxnum = 24;
                assnum = Math.min(24, this.KLineData.length);
            }
        }
        else {
            assnum = this.KLineData.length;
        }
        //数据赋值
        for (var i = 0; i < assnum; i++) {
            //定义界面
            var show_num;
            //判断显示
            if (_type == 0) {
                if (this.KLineData.length <= maxnum) {
                    show_num = i;
                }
                else {
                    show_num = (this.KLineData.length - maxnum) + i;
                }
            }
            else {
                show_num = i;
            }
            if (i == 0) {
                max = this.KLineData[show_num].topprice;
            }
            else {
                max = Math.max(max, this.KLineData[show_num].topprice);
            }
        }
        return max;
    };
    return DongTaiMessage;
})(eui.Component);
egret.registerClass(DongTaiMessage,'DongTaiMessage');
