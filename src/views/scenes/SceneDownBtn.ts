/**
 *
 * @地下按钮
 *
 */
class SceneDownBtn extends basic.SceneBase {
    //定义变量
    private g_btn: eui.Group;
    private tb_menu: eui.TabBar;
    private rect_tips: eui.Rect;

    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = DownChooseBtnSkin;
        
        //注册按钮
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS,this.onShowTips,this);
        this.tb_menu.addEventListener(egret.Event.CHANGE,this.onTypeChange,this);
        basic.Dispatcher.addListener(EventNames.SHOW_CHOOSEBTN,this.onShowBtn,this);
        basic.Dispatcher.addListener(EventNames.HIDE_CHOOSEBTN,this.onHideBtn,this);
    }
    
    //显示前调用
    beforeShow(params: any): void {
        //定义位置
        this.g_btn.y = basic.StageProxy.height - 89;
    }
    
    //类型修改事件
    private onTypeChange(e: egret.Event) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3")
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_STARTTYPE,{ "type": this.tb_menu.selectedIndex});
        
        //判断是否显示界面
        if(this.tb_menu.selectedIndex==2){
            this.rect_tips.visible = false;
        }
    }
    
    //显示提示
    private onShowTips(e: egret.Event):void{
        //显示提示
        this.rect_tips.visible = true;
    }
    
    //显示按钮
    private onShowBtn(e:egret.Event):void{
        //显示界面
        var _tween_y: egret.Tween = egret.Tween.get(this.g_btn).to({ y: basic.StageProxy.height - 89 },200);
    }
    
    //隐藏按钮
    private onHideBtn(e: egret.Event): void {
        var _tween_y: egret.Tween = egret.Tween.get(this.g_btn).to({ y: basic.StageProxy.height },200);
    }
}
