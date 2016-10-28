/**
 *Created by jq on 2016/1/24
 * @声音管理
 *
 */
module basic {
    export class SoundManager {
        //封装
        private static _instance: SoundManager;
        public static get instance(): SoundManager {
            if(this._instance == undefined) {
                this._instance = new SoundManager();
            }
            return this._instance;
        }
        
        //-----------------播放背景音乐-------------------
        //定义变量
        musicRes: string;
        musicChannel: egret.SoundChannel;
        
        //播放声音
        playMusic(res: string = null,loop: number = 1): void {
            //判断
            if(res) {
                this.musicRes = res;
            }
            
            //判断是否静音
            if(this.musicMute) {
                return;
            }
            
            //停止声音
            this.stopMusic();
            
            //播放声音
            var music: egret.Sound = RES.getRes(this.musicRes);
            this.musicChannel = music.play(0,loop);
            this.musicChannel.addEventListener(egret.Event.SOUND_COMPLETE,this.onMusicComplete,this);
        }
        
        //声音播放结束
        onMusicComplete(e: egret.Event): void {
           //停止声音
            this.stopMusic();
        }
        
        //停止声音
        stopMusic(): void {
            //判断停止声音
            if(this.musicChannel) {
                this.musicChannel.stop();
                this.musicChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onMusicComplete,this);
                this.musicChannel = null;
            }
        }
        
        //开关音乐
        switchMusic(): void {
            //数据赋值
            this.musicMute = !this.musicMute;
            
            ///判断停止或播放声音
            if(this.musicRes) {
                if(this.musicMute) {
                    this.stopMusic()
                } else {
                    this.playMusic();
                }
            }
        }
        
        //获取音乐是否播放
        get musicMute(): boolean {
            var mm: string = basic.localStorage.getItem('musicMute');
            return mm ? mm == '1' : false;
        }
        
        //保存音乐是否播放
        set musicMute(value: boolean) {
            basic.localStorage.setItem('musicMute',value ? '1' : '0');
        }
        
        //-----------------播放声效-------------------
        //定义变量
        effectRes: string;
        effectCallBack: Function;
        effectChannel: egret.SoundChannel;
        effectForceRes: string;
        effectForceCallBack: Function;
        effectForceChannel: egret.SoundChannel;
        
        //开始播放声效
        playEffect(res: string = null,loop: number = 1,callback: Function = null): void {
            //2016-10-22 Don debug
            return;
            //判断
            if(res) {
                this.effectRes = res;
                this.effectCallBack = callback;
            }
            
            //判断否关闭声效
            if(this.effectMute) {
                return;
            }
            
            //停止播放声效
            this.stopEffect();
            
            //播放生效
            var effect: egret.Sound = RES.getRes(this.effectRes);
            this.effectChannel = effect.play(0,loop);
            this.effectChannel.addEventListener(egret.Event.SOUND_COMPLETE,this.onEffectComplete,this);
        }
        
        //强制播放声效
        playEffectForce(res: string = null,loop: number = 1,callback: Function = null): void {
            //判断
            if(res) {
                this.effectForceRes = res;
                this.effectForceCallBack = callback;
            }
            
            //判断否关闭声效
            if(this.effectMute) {
                return;
            }
            
            //播放声效
            var effect: egret.Sound = RES.getRes(this.effectForceRes);
            this.effectForceChannel = effect.play(0,loop);
            this.effectForceChannel.addEventListener(egret.Event.SOUND_COMPLETE,this.onEffectForceComplete,this);
        }
        
        //声效播放结束
        onEffectComplete(e: egret.Event): void {
            //停止播放声效
            this.stopEffect();
            
            //显示返回函数
            if(this.effectCallBack) {
                this.effectCallBack();
            }
        }
        
        //声效播放结束
        onEffectForceComplete(e: egret.Event): void {
            //停止播放声效
            this.stopForceEffect();
            
            //显示返回函数
            if(this.effectForceCallBack){
                this.effectForceCallBack();
            }
        }
        
        //停止播放声效
        stopEffect(): void {
            //停止播放声效
            if(this.effectChannel) {
                this.effectChannel.stop();
                this.effectChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onEffectComplete,this);
                this.effectChannel = null;
            }
        }
        
        //停止播放声效
        stopForceEffect(): void {
            //停止播放声效
            if(this.effectForceChannel) {
                this.effectForceChannel.stop();
                this.effectForceChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onEffectForceComplete,this);
                this.effectForceChannel = null;
            }
        }
        
        //开关声效
        switchEffect(): void {
            //数据赋值
            this.effectMute = !this.effectMute;
        }
        
        //获取音效是否播放
        get effectMute(): boolean {
            var mm: string = basic.localStorage.getItem('effectMute');
            return mm ? mm == '1' : false;
        }
        
        //保存音效是否播放
        set effectMute(value: boolean) {
            basic.localStorage.setItem('effectMute',value ? '1' : '0');
        }
        
        //开关音乐音效
        switchAll() {
            this.switchEffect();
            this.switchMusic();
        }
    }
}
