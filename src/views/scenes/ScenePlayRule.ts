/**
 *
 * @游戏规则
 *
 */
class ScenePlayRule extends basic.SceneBase {
    //定义变量
    private btn_exit: eui.Button;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = ScenePlayRuleSkin;
        
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3")
        
        //移除游戏规则
        basic.SceneManager.removeTopScene(SceneNames.PLAYRULE);
    }
    
    
}
