
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/basiclib/popup/DialogEffect.js",
	"bin-debug/basiclib/popup/PanelBase.js",
	"bin-debug/basiclib/popup/PopUpManager.js",
	"bin-debug/basiclib/scene/SceneBase.js",
	"bin-debug/basiclib/scene/SceneeEffect.js",
	"bin-debug/basiclib/scene/SceneManager.js",
	"bin-debug/basiclib/support/Dispatcher.js",
	"bin-debug/basiclib/support/LocalStorage.js",
	"bin-debug/basiclib/support/Native.js",
	"bin-debug/basiclib/support/SoundManager.js",
	"bin-debug/basiclib/support/StageProxy.js",
	"bin-debug/basiclib/support/Timer.js",
	"bin-debug/basiclib/support/TimerEvent.js",
	"bin-debug/basiclib/tools/HashMap.js",
	"bin-debug/basiclib/tools/MathUtils.js",
	"bin-debug/basiclib/tools/Utils.js",
	"bin-debug/control/Api.js",
	"bin-debug/control/Https.js",
	"bin-debug/Main.js",
	"bin-debug/model/EventNames.js",
	"bin-debug/model/GameConfig.js",
	"bin-debug/model/GameData.js",
	"bin-debug/model/LoaderData.js",
	"bin-debug/model/SceneNames.js",
	"bin-debug/model/UserData.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/views/components/CaoZuoXinXiFace.js",
	"bin-debug/views/components/ChatMessage.js",
	"bin-debug/views/components/DongTaiMessage.js",
	"bin-debug/views/components/Head.js",
	"bin-debug/views/components/HuDongMessage.js",
	"bin-debug/views/components/Information.js",
	"bin-debug/views/components/KLine.js",
	"bin-debug/views/components/start/Start_Main.js",
	"bin-debug/views/components/start/Start_Mine.js",
	"bin-debug/views/components/start/Start_Ranking.js",
	"bin-debug/views/components/TakeCard.js",
	"bin-debug/views/components/UserMessage.js",
	"bin-debug/views/panel/PanelCheDan.js",
	"bin-debug/views/panel/PanelChooseTips.js",
	"bin-debug/views/panel/PanelGenSui.js",
	"bin-debug/views/panel/PanelTips.js",
	"bin-debug/views/panel/PanelUserMessage.js",
	"bin-debug/views/scenes/SceneArena.js",
	"bin-debug/views/scenes/SceneDownBtn.js",
	"bin-debug/views/scenes/SceneFriends.js",
	"bin-debug/views/scenes/SceneHistory.js",
	"bin-debug/views/scenes/SceneHuDong1.js",
	"bin-debug/views/scenes/SceneHuDong2.js",
	"bin-debug/views/scenes/SceneHuDongXinXi.js",
	"bin-debug/views/scenes/SceneLoading.js",
	"bin-debug/views/scenes/ScenePlayRule.js",
	"bin-debug/views/scenes/SceneSendMessage.js",
	"bin-debug/views/scenes/SceneStart.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};