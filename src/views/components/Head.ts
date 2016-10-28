/**
 *
 * @头像
 *
 */
class Head extends eui.Component {
    //定义变量
    private img_head:eui.Image;
    private img_mask: eui.Image;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //显示遮罩
        this.img_mask.visible = true;
        this.img_head.mask = this.img_mask;
    }
    
    //显示头像
    public show(_address:string):void{
        //判断显示
        if(_address != null && _address != "") {
            this.img_head.source = _address;
        }
    }
}
