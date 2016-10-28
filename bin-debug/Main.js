//外包股票
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Main,p=c.prototype;
    //初始化
    p.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        //初始化数据
        Api.instance.init();
        GameConfig.init(false);
        basic.Dispatcher.init();
        basic.StageProxy.init(this.stage, this);
        basic.SceneManager.init(this);
        basic.localStorage.init(GameConfig.gameName);
        //获取用户个人信息
        Api.instance.get_account(function (response) {
            //数据赋值
            if (response.success == true) {
                //数据赋值
                LoaderData.is_LoginEnd = true;
                UserData.User_Name = response.data.nickname;
                UserData.User_Head = response.data.face;
                if (response.data.ulevel == undefined) {
                    UserData.User_DengJi = 0;
                }
                else {
                    UserData.User_DengJi = response.data.ulevel;
                }
                if (response.data.val == undefined) {
                    UserData.User_JiFen = 0;
                }
                else {
                    UserData.User_JiFen = response.data.val;
                }
                UserData.User_Detail = response.data.introduce;
                //创建场景
                _this.createScene();
            }
            else {
            }
        });
        //判断显示
        if (egret.Capabilities.os.indexOf("Windows") >= 0 || egret.Capabilities.os.indexOf("Mac") >= 0) {
            this.stage.orientation = egret.OrientationMode.AUTO;
            if (basic.StageProxy.width > basic.StageProxy.height) {
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            else {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
        }
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    //配置文件加载完成,开始预加载皮肤主题资源和loading资源组
    p.onConfigComplete = function (event) {
        //移除事件
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        //加载资源
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    };
    //主题文件加载完成,开始预加载
    p.onThemeLoadComplete = function () {
        //数据赋值
        LoaderData.is_ThemeLoadEnd = true;
        //判断显示
        if (LoaderData.is_loading_LoadEnd == true) {
            //显示加载界面
            basic.SceneManager.addTopScene(SceneNames.LOADING);
        }
        //创建场景
        this.createScene();
    };
    //preload资源组加载完成
    p.onResourceLoadComplete = function (event) {
        //判断显示
        if (event.groupName == "loading") {
            //数据赋值
            LoaderData.is_loading_LoadEnd = true;
            //显示加载界面
            this.checkShowLoading();
            //开始加载开始资源
            RES.loadGroup("startload");
        }
        else if (event.groupName == "startload") {
            //数据赋值
            LoaderData.is_start_LoadEnd = true;
            //显示界面
            this.createScene();
            //开始加载游戏资源
            RES.loadGroup("otherload");
        }
        else if (event.groupName == "otherload") {
            //数据赋值
            LoaderData.is_other_LoadEnd = true;
            //注销事件
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        }
    };
    //显示加载界面
    p.checkShowLoading = function () {
        //注册场景
        basic.SceneManager.register(SceneNames.START, SceneStart);
        basic.SceneManager.register(SceneNames.ARENA, SceneArena);
        basic.SceneManager.register(SceneNames.HISTORY, SceneHistory);
        basic.SceneManager.register(SceneNames.HUDONG1, SceneHuDong1);
        basic.SceneManager.register(SceneNames.HUDONG2, SceneHuDong2);
        basic.SceneManager.register(SceneNames.FRIENDS, SceneFriends);
        basic.SceneManager.register(SceneNames.DOWNBTN, SceneDownBtn);
        basic.SceneManager.register(SceneNames.LOADING, SceneLoading);
        basic.SceneManager.register(SceneNames.PLAYRULE, ScenePlayRule);
        basic.SceneManager.register(SceneNames.SENDMESSAGE, SceneSendMessage);
        basic.SceneManager.register(SceneNames.HUDONGXINXI, SceneHuDongXinXi);
        //判断显示加载界面
        if (LoaderData.is_ThemeLoadEnd) {
            //显示加载界面
            basic.SceneManager.addTopScene(SceneNames.LOADING);
        }
    };
    //创建场景
    p.createScene = function () {
        //判断显示
        if (LoaderData.is_ThemeLoadEnd && LoaderData.is_start_LoadEnd && LoaderData.is_LoginEnd) {
            this.startCreateScene();
        }
    };
    //资源组加载出错
    p.onItemLoadError = function (event) {
        //alert("Url:" + event.resItem.url + " has failed to load");
    };
    //资源组加载出错
    p.onResourceLoadError = function (event) {
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    //资源组加载进度
    p.onResourceProgress = function (event) {
        //判断显示进度条
        if (event.groupName == "startload") {
            basic.Dispatcher.dispatch(EventNames.LOADING_PROGRESS, {
                itemsLoaded: event.itemsLoaded,
                itemsTotal: event.itemsTotal
            });
        }
    };
    //创建场景
    p.startCreateScene = function () {
        //显示底下按钮
        basic.SceneManager.addTopScene(SceneNames.DOWNBTN);
        //移除加载界面
        basic.SceneManager.removeTopScene(SceneNames.LOADING);
        //显示开始界面
        basic.SceneManager.show(SceneNames.START, null, basic.sceneEffect.Fade);
    };
    return Main;
})(eui.UILayer);
egret.registerClass(Main,'Main');
