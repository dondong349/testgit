/**
 *Created by jq on 2016/1/24
 * @声音管理
 *
 */
var basic;
(function (basic) {
    var SoundManager = (function () {
        function SoundManager() {
        }
        var d = __define,c=SoundManager,p=c.prototype;
        d(SoundManager, "instance"
            ,function () {
                if (this._instance == undefined) {
                    this._instance = new SoundManager();
                }
                return this._instance;
            }
        );
        //播放声音
        p.playMusic = function (res, loop) {
            if (res === void 0) { res = null; }
            if (loop === void 0) { loop = 1; }
            //判断
            if (res) {
                this.musicRes = res;
            }
            //判断是否静音
            if (this.musicMute) {
                return;
            }
            //停止声音
            this.stopMusic();
            //播放声音
            var music = RES.getRes(this.musicRes);
            this.musicChannel = music.play(0, loop);
            this.musicChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onMusicComplete, this);
        };
        //声音播放结束
        p.onMusicComplete = function (e) {
            //停止声音
            this.stopMusic();
        };
        //停止声音
        p.stopMusic = function () {
            //判断停止声音
            if (this.musicChannel) {
                this.musicChannel.stop();
                this.musicChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onMusicComplete, this);
                this.musicChannel = null;
            }
        };
        //开关音乐
        p.switchMusic = function () {
            //数据赋值
            this.musicMute = !this.musicMute;
            ///判断停止或播放声音
            if (this.musicRes) {
                if (this.musicMute) {
                    this.stopMusic();
                }
                else {
                    this.playMusic();
                }
            }
        };
        d(p, "musicMute"
            //获取音乐是否播放
            ,function () {
                var mm = basic.localStorage.getItem('musicMute');
                return mm ? mm == '1' : false;
            }
            //保存音乐是否播放
            ,function (value) {
                basic.localStorage.setItem('musicMute', value ? '1' : '0');
            }
        );
        //开始播放声效
        p.playEffect = function (res, loop, callback) {
            if (res === void 0) { res = null; }
            if (loop === void 0) { loop = 1; }
            if (callback === void 0) { callback = null; }
            //2016-10-22 Don debug
            return;
            //判断
            if (res) {
                this.effectRes = res;
                this.effectCallBack = callback;
            }
            //判断否关闭声效
            if (this.effectMute) {
                return;
            }
            //停止播放声效
            this.stopEffect();
            //播放生效
            var effect = RES.getRes(this.effectRes);
            this.effectChannel = effect.play(0, loop);
            this.effectChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onEffectComplete, this);
        };
        //强制播放声效
        p.playEffectForce = function (res, loop, callback) {
            if (res === void 0) { res = null; }
            if (loop === void 0) { loop = 1; }
            if (callback === void 0) { callback = null; }
            //判断
            if (res) {
                this.effectForceRes = res;
                this.effectForceCallBack = callback;
            }
            //判断否关闭声效
            if (this.effectMute) {
                return;
            }
            //播放声效
            var effect = RES.getRes(this.effectForceRes);
            this.effectForceChannel = effect.play(0, loop);
            this.effectForceChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onEffectForceComplete, this);
        };
        //声效播放结束
        p.onEffectComplete = function (e) {
            //停止播放声效
            this.stopEffect();
            //显示返回函数
            if (this.effectCallBack) {
                this.effectCallBack();
            }
        };
        //声效播放结束
        p.onEffectForceComplete = function (e) {
            //停止播放声效
            this.stopForceEffect();
            //显示返回函数
            if (this.effectForceCallBack) {
                this.effectForceCallBack();
            }
        };
        //停止播放声效
        p.stopEffect = function () {
            //停止播放声效
            if (this.effectChannel) {
                this.effectChannel.stop();
                this.effectChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onEffectComplete, this);
                this.effectChannel = null;
            }
        };
        //停止播放声效
        p.stopForceEffect = function () {
            //停止播放声效
            if (this.effectForceChannel) {
                this.effectForceChannel.stop();
                this.effectForceChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onEffectForceComplete, this);
                this.effectForceChannel = null;
            }
        };
        //开关声效
        p.switchEffect = function () {
            //数据赋值
            this.effectMute = !this.effectMute;
        };
        d(p, "effectMute"
            //获取音效是否播放
            ,function () {
                var mm = basic.localStorage.getItem('effectMute');
                return mm ? mm == '1' : false;
            }
            //保存音效是否播放
            ,function (value) {
                basic.localStorage.setItem('effectMute', value ? '1' : '0');
            }
        );
        //开关音乐音效
        p.switchAll = function () {
            this.switchEffect();
            this.switchMusic();
        };
        return SoundManager;
    })();
    basic.SoundManager = SoundManager;
    egret.registerClass(SoundManager,'basic.SoundManager');
})(basic || (basic = {}));
