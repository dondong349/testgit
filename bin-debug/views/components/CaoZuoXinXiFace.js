/**
 *
 * @操作信息界面
 *
 */
var CaoZuoXinXiFace = (function (_super) {
    __extends(CaoZuoXinXiFace, _super);
    function CaoZuoXinXiFace() {
        _super.apply(this, arguments);
        this.num_show_height = 10;
        this.send_type = -1; //-1:不显示,0:新闻 ,1:评论,2:指挥
        //定义变量
        this.timer_change = null;
        this.now_hudongnum = 0;
        this._tween_alpha = null;
        this.messIsOpen = true;
    }
    var d = __define,c=CaoZuoXinXiFace,p=c.prototype;
    //初始化
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.g_send.visible = false;
        this.img_tips.visible = false;
        //注册按钮
        this.txt_num.addEventListener(egret.Event.CHANGE, this.onNumChange, this);
        this.txt_price.addEventListener(egret.Event.CHANGE, this.onPriceChange, this);
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendBtn, this);
        this.btn_letter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLetterBtn, this);
        this.btn_chedan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheDanBtn, this);
        this.btn_domore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoMoreBtn, this);
        this.btn_doempty.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoEmptyBtn, this);
        this.btn_num_jia.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onNumJiaBtn, this);
        this.btn_num_jian.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onNumJianBtn, this);
        this.btn_price_jia.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPriceJiaBtn, this);
        this.btn_price_jian.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPriceJianBtn, this);
        this.btn_num_jia.addEventListener(egret.TouchEvent.TOUCH_END, this.onNumJiaBtn, this);
        this.btn_num_jian.addEventListener(egret.TouchEvent.TOUCH_END, this.onNumJianBtn, this);
        this.btn_price_jia.addEventListener(egret.TouchEvent.TOUCH_END, this.onPriceJiaBtn, this);
        this.btn_price_jian.addEventListener(egret.TouchEvent.TOUCH_END, this.onPriceJianBtn, this);
        this.btn_huifu.addEventListener(egret.TouchEvent.TOUCH_END, this.onHuiFuBtn, this);
        this.btn_chuli.addEventListener(egret.TouchEvent.TOUCH_END, this.onChuLiBtn, this);
        this.tipToggle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleFunc, this);
    };
    //显示信息
    p.showChat = function (_message, _color) {
        //定义变量
        var chat = new ChatMessage();
        //显示信息
        chat.show(_message, _color);
        //数据赋值
        this.num_show_height += chat.height;
        //显示信息
        this.g_detail.addChild(chat);
        //判断显示位置
        if (this.num_show_height > this.scroller.height) {
            this.scroller.validateNow();
            this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
        }
    };
    //显示互动提示
    p.showHuDongTips = function (_hudongnum) {
        //判断显示
        if (_hudongnum != undefined && this.now_hudongnum == 0 && _hudongnum > 0) {
            //判断显示互动
            this.now_hudongnum = _hudongnum;
            //显示互动
            this.img_tips.visible = true;
            this._tween_alpha = egret.Tween.get(this.img_tips, { loop: true }).
                to({ alpha: 0.1 }, 200).
                to({ alpha: 1 }, 200);
        }
        else if (_hudongnum > 0) {
            this.img_tips.visible = true;
        }
        else {
            this.img_tips.visible = false;
        }
    };
    //初始化信息
    p.info = function (_price, _num) {
        //显示文本
        this.txt_num.text = _num.toString();
        this.txt_price.text = _price.toString();
        //显示按钮
        if (GameData.game_role == 1) {
            this.btn_chuli.label = "闪电平仓";
        }
        else {
            this.btn_chuli.label = "一键布局";
        }
    };
    //发送按钮
    p.onSendBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //显示发送界面
        basic.SceneManager.addTopScene(SceneNames.SENDMESSAGE);
    };
    //判断显示界面
    p.showSendType = function (_type) {
        //判断显示
        if (this.send_type != _type) {
            //数据赋值
            this.send_type = _type;
            GameData.sendmessage_type = this.send_type;
            //判断显示界面
            if (this.send_type == -1) {
                //隐藏界面
                this.g_send.visible = false;
                this.scroller.height = 170;
            }
            else if (this.send_type == 0) {
                //显示界面
                this.g_send.visible = true;
                this.scroller.height = 170 - 35;
                //显示文本
                this.txt_type.text = "欺骗猎物";
                this.rect_type.fillColor = 0xF5576D;
            }
            else if (this.send_type == 1) {
                //显示界面
                this.g_send.visible = true;
                this.scroller.height = 170 - 35;
                //显示文本
                this.txt_type.text = "大户合谋";
                this.rect_type.fillColor = 0x49BECB;
            }
            else if (this.send_type == 2) {
                //显示界面
                this.g_send.visible = true;
                this.scroller.height = 170 - 35;
                //显示文本
                this.txt_type.text = "团队指挥";
                this.rect_type.fillColor = 0xF5576D;
            }
            GameData.sendmessage_title = this.txt_type.text;
        }
    };
    //-----------------------------定义按钮----------------------------
    //数量改变
    p.onNumChange = function (e) {
        //数据赋值
        if (Number(this.txt_num.text).toString() == "NaN") {
            this.txt_num.text = this.now_num.toString();
        }
        else {
            this.now_num = Number(this.txt_num.text);
        }
    };
    //价格改变
    p.onPriceChange = function (e) {
        //数据赋值
        if (Number(this.txt_price.text).toString() == "NaN") {
            this.txt_price.text = this.now_price.toString();
        }
        else {
            this.now_price = Number(this.txt_price.text);
        }
    };
    //信息按钮
    p.onLetterBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //判断停止
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
            this.img_tips.visible = false;
        }
        //显示界面
        basic.SceneManager.addTopScene(SceneNames.HUDONGXINXI);
    };
    //撤单按钮
    p.onCheDanBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //显示撤单
        PanelCheDan.instance.show();
    };
    //做多按钮
    p.onDoMoreBtn = function (e) {
        //下单
        Api.instance.get_game_xiadan(Number(this.txt_price.text), Number(this.txt_num.text), 1, function (response) {
            //判断显示
            if (response.success == true) {
                //播放声音
                basic.SoundManager.instance.playEffect("golong_mp3");
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_ARENATIPS, { "tips": "下单成功" });
            }
            else {
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_ARENATIPS, { "tips": response.code });
            }
        });
    };
    //做空按钮
    p.onDoEmptyBtn = function (e) {
        //下单
        Api.instance.get_game_xiadan(Number(this.txt_price.text), Number(this.txt_num.text), 2, function (response) {
            //判断显示
            if (response.success == true) {
                //播放声音
                basic.SoundManager.instance.playEffect("goshort_mp3");
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_ARENATIPS, { "tips": "下单成功" });
            }
            else {
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_ARENATIPS, { "tips": response.code });
            }
        });
    };
    //数量加
    p.onNumJiaBtn = function (e) {
        //等待结束
        if (this.timer_change) {
            this.timer_change.stop();
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change = null;
        }
        //判断显示
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            //播放声音
            basic.SoundManager.instance.playEffect("nomal_mp3");
            //显示文本
            this.txt_num.text = (Number(this.txt_num.text) + 1).toString();
            //数据赋值
            this.change_type = 1;
            this.change_detail = 1;
            //开始等待
            this.timer_change = new basic.Timer(500, 1);
            this.timer_change.addEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change.start();
            //注册结束事件
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStopChange, this);
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStopChange, this);
        }
    };
    //数量减
    p.onNumJianBtn = function (e) {
        //等待结束
        if (this.timer_change) {
            this.timer_change.stop();
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change = null;
        }
        //判断显示
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            //播放声音
            basic.SoundManager.instance.playEffect("nomal_mp3");
            //显示文本
            this.txt_num.text = (Math.max(0, Number(this.txt_num.text) - 1)).toString();
            //数据赋值
            this.change_type = 0;
            this.change_detail = 1;
            //开始等待
            this.timer_change = new basic.Timer(500, 1);
            this.timer_change.addEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change.start();
            //注册结束事件
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStopChange, this);
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStopChange, this);
        }
    };
    //价格加
    p.onPriceJiaBtn = function (e) {
        //等待结束
        if (this.timer_change) {
            this.timer_change.stop();
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change = null;
        }
        //判断显示
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            //播放声音
            basic.SoundManager.instance.playEffect("nomal_mp3");
            //显示文本
            this.txt_price.text = (Number(this.txt_price.text) + 1).toString();
            //数据赋值
            this.change_type = 1;
            this.change_detail = 0;
            //开始等待
            this.timer_change = new basic.Timer(500, 1);
            this.timer_change.addEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change.start();
            //注册结束事件
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStopChange, this);
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStopChange, this);
        }
    };
    //价格减
    p.onPriceJianBtn = function (e) {
        //等待结束
        if (this.timer_change) {
            this.timer_change.stop();
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change = null;
        }
        //判断显示
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            //播放声音
            basic.SoundManager.instance.playEffect("nomal_mp3");
            //显示文本
            this.txt_price.text = (Math.max(0, Number(this.txt_price.text) - 1)).toString();
            //数据赋值
            this.change_type = 0;
            this.change_detail = 0;
            //开始等待
            this.timer_change = new basic.Timer(500, 1);
            this.timer_change.addEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change.start();
            //注册结束事件
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStopChange, this);
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStopChange, this);
        }
    };
    //等待结束
    p.onTimer = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //判断显示
        if (this.change_detail == 0) {
            if (this.change_type == 0) {
                //显示文本
                this.txt_price.text = (Math.max(0, Number(this.txt_price.text) - 1)).toString();
            }
            else if (this.change_type == 1) {
                this.txt_price.text = (Number(this.txt_price.text) + 1).toString();
            }
        }
        else if (this.change_detail == 1) {
            if (this.change_type == 0) {
                this.txt_num.text = (Math.max(0, Number(this.txt_num.text) - 1)).toString();
            }
            else if (this.change_type == 1) {
                this.txt_num.text = (Number(this.txt_num.text) + 1).toString();
            }
        }
    };
    //等待结束
    p.onTimerComplete = function (e) {
        //等待结束
        if (this.timer_change) {
            this.timer_change.stop();
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change = null;
        }
        //开始等待
        this.timer_change = new basic.Timer(50);
        this.timer_change.addEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
        this.timer_change.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timer_change.start();
    };
    //注册结束事件
    p.onStopChange = function (e) {
        //注销按钮
        basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStopChange, this);
        basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStopChange, this);
        //等待结束
        if (this.timer_change) {
            this.timer_change.stop();
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer_change.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer_change = null;
        }
    };
    //恢复界面
    p.onHuiFuBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("lightning_mp3");
        //显示文本
        this.txt_price.text = GameData.price_now.toString();
    };
    //处理按钮
    p.onChuLiBtn = function (e) {
        var _this = this;
        //发送接口
        Api.instance.up_zhinengcaozuo(GameData.game_role, function (response) {
            //判断显示
            if (response.success == true) {
                //播放声音
                egret.setTimeout(function () {
                    basic.SoundManager.instance.playEffect("lightning_mp3");
                }, _this, 100);
                //显示消息
                basic.Dispatcher.dispatch(EventNames.SHOW_ARENATIPS, { "tips": "操作成功" });
            }
            else {
                //显示消息
                basic.Dispatcher.dispatch(EventNames.SHOW_ARENATIPS, { "tips": response.code });
            }
        });
    };
    //手气放开信息大厅
    p.toggleFunc = function (e) {
        if (this.messIsOpen) {
            this.scrollG.height = 100;
            this.btnsG.y = 125;
            this.btn_huifu.y = 150;
            this.btn_chuli.y = 150;
            this.g_send.visible = false;
            this.tipToggle.text = "收起";
            this.scroller.bottom = 0;
        }
        else {
            this.scrollG.height = 220;
            this.btnsG.y = 245;
            this.btn_huifu.y = 270;
            this.btn_chuli.y = 270;
            this.g_send.visible = true;
            this.tipToggle.text = "展开";
            this.scroller.bottom = 38;
        }
        this.messIsOpen = !this.messIsOpen;
    };
    return CaoZuoXinXiFace;
})(eui.Component);
egret.registerClass(CaoZuoXinXiFace,'CaoZuoXinXiFace');
