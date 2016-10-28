/**
 * Created by jq on 2016/2/8.
 */
var basic;
(function (basic) {
    var SceneManager = (function () {
        //初始化
        function SceneManager() {
            this.topScene = null; //顶部场景
            //定义变量
            this.mapScene = new basic.HashMap();
            this.mapSceneDef = new basic.HashMap();
            this.mapTopScene = new basic.HashMap();
        }
        var d = __define,c=SceneManager,p=c.prototype;
        d(SceneManager, "instance"
            ,function () {
                if (this._instance == undefined) {
                    this._instance = new SceneManager();
                }
                return this._instance;
            }
        );
        //初始化界面
        SceneManager.init = function (root) {
            SceneManager.instance.init(root);
        };
        //添加顶部场景
        SceneManager.addTopScene = function (name) {
            SceneManager.instance.addTopScene(name);
        };
        //移除顶部场景
        SceneManager.removeTopScene = function (name) {
            SceneManager.instance.removeTopScene(name);
        };
        //添加底部场景
        SceneManager.addBottomScene = function (name, sceneDef) {
            SceneManager.instance.addBottomScene(name, sceneDef);
        };
        //注册场景
        SceneManager.register = function (name, scene, resPack) {
            if (resPack === void 0) { resPack = null; }
            SceneManager.instance.register(name, scene, resPack);
        };
        //显示场景
        SceneManager.show = function (name, params, effectDef, callback, back, setLastSceneName) {
            if (params === void 0) { params = null; }
            if (effectDef === void 0) { effectDef = null; }
            if (callback === void 0) { callback = null; }
            if (back === void 0) { back = false; }
            if (setLastSceneName === void 0) { setLastSceneName = null; }
            SceneManager.instance.show(name, params, effectDef, callback, back, setLastSceneName);
        };
        //返回场景
        SceneManager.back = function (params, effectDef, callback) {
            if (params === void 0) { params = null; }
            if (effectDef === void 0) { effectDef = null; }
            if (callback === void 0) { callback = null; }
            return SceneManager.instance.back(params, effectDef, callback);
        };
        //初始化
        p.init = function (root) {
            //数据赋值
            this.root = root;
            //显示容器
            this.root.addChild(this.bottomLayer = new eui.Group());
            this.root.addChild(this.middleLayer = new eui.Group());
            this.root.addChild(this.topLayer = new eui.Group());
            this.root.addChild(this.popLayer = new eui.Group());
            //定义容器
            this.bottomLayer.touchEnabled = false;
            this.middleLayer.touchEnabled = false;
            this.topLayer.touchEnabled = false;
            this.popLayer.touchEnabled = false;
        };
        //添加顶部场景
        p.addTopScene = function (name) {
            //判断显示顶部场景
            if (this.mapTopScene.containsKey(name)) {
                //显示前调用
                this.mapTopScene.get(name)._beforeShow(null);
                //显示最顶层
                this.mapTopScene.get(name).visible = true;
                this.topLayer.setChildIndex(this.mapTopScene.get(name), this.topLayer.numChildren - 1);
            }
            else {
                //定义变量
                var scene2;
                var sceneConfig = this.mapSceneDef.get(name);
                var scene2Def = sceneConfig.sceneDef;
                //显示界面
                scene2 = new scene2Def();
                this.mapTopScene.put(name, scene2);
                //显示前调用
                this.mapTopScene.get(name)._beforeShow(null);
                //显示界面
                this.topLayer.addChild(this.mapTopScene.get(name));
            }
        };
        //移除底部场景
        p.removeTopScene = function (name) {
            //判断移除顶部场景
            if (this.mapTopScene.containsKey(name)) {
                //显示前调用
                this.mapTopScene.get(name)._beforeHide(null);
                //显示界面
                this.mapTopScene.get(name).visible = false;
            }
        };
        //添加底部场景
        p.addBottomScene = function (name, sceneDef) {
            //定义场景
            var scene = new sceneDef();
            //显示场景
            this.bottomLayer.addChild(scene);
            //显示前调用
            scene._beforeShow(null);
        };
        //注册场景
        p.register = function (name, scene, resPack) {
            if (resPack === void 0) { resPack = null; }
            //容器赋值
            this.mapSceneDef.put(name, new SceneConfig(scene, resPack));
        };
        //显示容器
        p.show = function (name, params, effectDef, callback, back, setLastSceneName) {
            if (params === void 0) { params = null; }
            if (effectDef === void 0) { effectDef = null; }
            if (callback === void 0) { callback = null; }
            if (back === void 0) { back = false; }
            if (setLastSceneName === void 0) { setLastSceneName = null; }
            //判断不是同一场景
            if (this.currentSceneName != name) {
                //定义变量
                var effect;
                var scene2;
                //判断场景是否存在
                if (this.mapScene.containsKey(name)) {
                    //场景赋值
                    scene2 = this.mapScene.get(name);
                }
                else {
                    //定义变量
                    var sceneConfig = this.mapSceneDef.get(name);
                    var scene2Def = sceneConfig.sceneDef;
                    //场景赋值
                    scene2 = new scene2Def();
                    this.mapScene.put(name, scene2);
                }
                //显示方式赋值
                if (!effect && this.currentSceneName) {
                    //判断赋值
                    if (!effectDef) {
                        effect = new basic.sceneEffect.None();
                    }
                    else {
                        effect = new effectDef();
                    }
                    //隐藏前消除
                    this.currentScene._beforeHide(params);
                }
                else {
                    effect = new basic.sceneEffect.FadeBlack();
                }
                //定义下一界面Touch值
                scene2.touchChildren = false;
                //显示场景
                effect.handover(this.currentScene, scene2, this.middleLayer, function (scene1, scene2) {
                    //判断隐藏时调用
                    if (scene1) {
                        scene1._onHide(params);
                    }
                    //定义下一界面Touch值
                    scene2.touchChildren = true;
                    //显示时调用
                    scene2._onShow(params);
                    //显示回调函数
                    if (callback) {
                        callback();
                    }
                }.bind(this, this.currentScene, scene2));
                //数据赋值
                this.currentScene = scene2;
                this.currentSceneName = name;
                //判断是否返回
                if (back) {
                    this.lastSceneName = name;
                }
                else {
                    this.currentScene.lastSceneName = setLastSceneName != null ? setLastSceneName : this.lastSceneName;
                    this.lastSceneName = name;
                }
                //显示前调用
                this.currentScene._beforeShow(params);
            }
        };
        //返回界面
        p.back = function (params, effectDef, callback) {
            if (params === void 0) { params = null; }
            if (effectDef === void 0) { effectDef = null; }
            if (callback === void 0) { callback = null; }
            if (this.currentScene.lastSceneName && this.currentScene.lastSceneName != '') {
                this.show(this.currentScene.lastSceneName, params, effectDef, callback, true);
                return true;
            }
            return false;
        };
        return SceneManager;
    })();
    basic.SceneManager = SceneManager;
    egret.registerClass(SceneManager,'basic.SceneManager');
    //场景数据
    var SceneConfig = (function () {
        //初始化
        function SceneConfig(scene, resPack) {
            if (resPack === void 0) { resPack = null; }
            this.sceneDef = scene;
            this.resPack = resPack;
        }
        var d = __define,c=SceneConfig,p=c.prototype;
        return SceneConfig;
    })();
    basic.SceneConfig = SceneConfig;
    egret.registerClass(SceneConfig,'basic.SceneConfig');
    //显示容器
    var ShowEntity = (function () {
        //初始化界面
        function ShowEntity(name, params, effectDef, callback, back) {
            if (params === void 0) { params = null; }
            if (effectDef === void 0) { effectDef = null; }
            if (callback === void 0) { callback = null; }
            if (back === void 0) { back = false; }
            this.params = null;
            this.effectDef = null;
            this.callback = null;
            this.back = null;
            this.name = name;
            this.params = params;
            this.effectDef = effectDef;
            this.callback = callback;
            this.back = back;
        }
        var d = __define,c=ShowEntity,p=c.prototype;
        return ShowEntity;
    })();
    basic.ShowEntity = ShowEntity;
    egret.registerClass(ShowEntity,'basic.ShowEntity');
})(basic || (basic = {}));
