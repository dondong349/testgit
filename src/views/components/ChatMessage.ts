/**
 *
 * @聊天信息
 *
 */
class ChatMessage extends eui.Component {
    //定义变量
    private txt_detail: eui.Label;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = ChatMessageSkin;
    }
    
    //显示界面
    public show(_detail: string,_color: any):void{
        //定义变量
        var show_detail: string;
        
        //判断赋值
        if(_color != undefined) {
            if(_detail.indexOf("：") >= 0) {
                show_detail = '<font color=' + _color + '>';
                show_detail += _detail.substring(0,_detail.indexOf("：") + 1) + '</font>'
                show_detail += _detail.substring(_detail.indexOf("：") + 1,_detail.length);
            }
            else {
                show_detail = _detail;
            }
        }
        else {
            show_detail = _detail;
        }
        
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(show_detail);
        
        //显示界面高度
        this.height = this.txt_detail.height + 10;
    }
}
