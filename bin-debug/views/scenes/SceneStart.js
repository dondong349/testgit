/**
 *
 * @开始界面
 *
 */
var SceneStart = (function (_super) {
    __extends(SceneStart, _super);
    //定义界面
    function SceneStart() {
        _super.call(this);
        //数据变量
        this.show_face = 0;
        this.title_name = ["竞技", "排行", "我的"];
        //定义界面
        this.skinName = SenceStartSkin;
        //初始显示
        this.viewStack.selectedIndex = this.show_face;
        //注册按钮
        this.btn_about.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAboutBtn, this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_STARTTYPE, this.onShowFace, this);
    }
    var d = __define,c=SceneStart,p=c.prototype;
    //显示前调用
    p.beforeShow = function () {
        //初始化界面
        if (this.show_face == 0) {
            this.main.info();
        }
        else if (this.show_face == 1) {
            this.ranking.info();
        }
        else if (this.show_face == 2) {
            this.mine.info();
        }
        //获取好友个数
        Api.instance.get_friendsnum(function (response) {
            if (response.success == true) {
                //显示界面
                if (response.data == 1) {
                    //显示红点
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS);
                }
            }
            else {
            }
        });
    };
    //隐藏前调用
    p.beforeHide = function () {
        //判断显示
        if (this.show_face == 0) {
            this.main.stop();
        }
    };
    //显示界面
    p.onShowFace = function (e) {
        //判断显示
        if (this.show_face == 0) {
            this.main.stop();
            console.log("this.show_face = 0 ,this.main.stop");
        }
        //判断显示
        this.show_face = e.data.type;
        this.viewStack.selectedIndex = e.data.type;
        //显示文本
        this.txt_title.text = this.title_name[e.data.type];
        //初始化界面
        if (this.show_face == 0) {
            this.main.info();
        }
        else if (this.show_face == 1) {
            this.ranking.info();
        }
        else if (this.show_face == 2) {
            this.mine.info();
        }
        console.log("clicked " + this.title_name[e.data.type] + " button");
    };
    //关于按钮
    p.onAboutBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //显示界面
        basic.SceneManager.addTopScene(SceneNames.PLAYRULE);
    };
    return SceneStart;
})(basic.SceneBase);
egret.registerClass(SceneStart,'SceneStart');
