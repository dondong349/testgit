/**
 *
 * @开始界面
 *
 */
class SceneStart extends basic.SceneBase{
    //定义变量
    private main: Start_Main;
    private mine: Start_Mine;
    private btn_about: eui.Button;
    private ranking: Start_Ranking;
    private txt_title: eui.Label;
    private viewStack: eui.ViewStack;
    
    //数据变量
    private show_face: number = 0;
    private title_name: string[] = ["竞技","排行","我的"];
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SenceStartSkin;
        
        //初始显示
        this.viewStack.selectedIndex = this.show_face;
        
        //注册按钮
        this.btn_about.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAboutBtn,this);
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_STARTTYPE,this.onShowFace,this);
    }
    
    //显示前调用
    beforeShow():void{
        //初始化界面
        if(this.show_face == 0) {
            this.main.info();
        }
        else if(this.show_face == 1) {
            this.ranking.info();
        }
        else if(this.show_face == 2) {
            this.mine.info();
        }
        
        //获取好友个数
        Api.instance.get_friendsnum((response: any)=>{
            if(response.success==true){
                //显示界面
                if(response.data == 1) {
                    //显示红点
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS);
                }
            }
            else{
                
            }
        });
    }
    
    //隐藏前调用
    beforeHide():void{
        //判断显示
        if(this.show_face == 0) {
            this.main.stop();
        }
    }
    
    //显示界面
    private onShowFace(e:egret.Event):void{
        //判断显示
        if(this.show_face==0){
            this.main.stop();
            console.log("this.show_face = 0 ,this.main.stop");
        }
        
        //判断显示
        this.show_face = e.data.type;
        this.viewStack.selectedIndex = e.data.type;
        
        //显示文本
        this.txt_title.text = this.title_name[e.data.type];
        
        //初始化界面
        if(this.show_face == 0) {
            this.main.info();
        }
        else if(this.show_face == 1){
            this.ranking.info();
        }
        else if(this.show_face == 2) {
            this.mine.info();
        }
        console.log("clicked " + this.title_name[e.data.type]+" button");
    }
    
    //关于按钮
    private onAboutBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3")
        
        //显示界面
        basic.SceneManager.addTopScene(SceneNames.PLAYRULE);
    }
    
}
