/**
 *
 * @基本信息
 *
 */
class Information extends eui.Component {
    //定义变量
    private head: Head;
    private txt_name: eui.Label;
    private txt_touxian: eui.Label;
    private txt_dengji: eui.Label;
    private txt_jifen: eui.Label;
    
    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //初始化界面
    public info():void{
        //显示头像
        this.head.show(UserData.User_Head);
        
        //显示文本
        this.txt_name.text = UserData.User_Name;
        this.txt_jifen.text = UserData.User_JiFen.toString();
        this.txt_touxian.text = UserData.TouXian_Name[UserData.User_DengJi];
        this.txt_dengji.text = UserData.DengJi_Name[UserData.User_DengJi];
    }
}
