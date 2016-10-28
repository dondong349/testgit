/**
 *
 * @K线 
 *
 */
class KLine extends eui.Component{
    //定义变量
    private rect_up: eui.Rect;
    private rect_box: eui.Rect;
    private rect_down: eui.Rect;
    
    //定义界面
    constructor() {
        super();
        
        //设置皮肤
        this.skinName = KLineSkin;
    }
    
    //显示界面
    public show(_width:number,_kedu:number,_data:any):void{
        //定义变量
        var zoomrate: number = 75 / _kedu;
        
        //判断显示界面
        if(_data.openprice <= _data.closeprice){
            this.currentState = "1";
            this.rect_box.height = Math.max(1,(_data.closeprice - _data.openprice) * zoomrate);
            this.rect_up.height = (_data.topprice - _data.closeprice) * zoomrate;
            this.rect_down.height = (_data.openprice - _data.lowprice) * zoomrate;
        }
        else{
            this.currentState = "2";
            this.rect_box.height = Math.max(1,(_data.openprice - _data.closeprice) * zoomrate);
            this.rect_up.height = (_data.topprice - _data.openprice) * zoomrate;
            this.rect_down.height = (_data.closeprice - _data.lowprice) * zoomrate;
        }
        
        //定义高度
        this.rect_box.y = this.rect_up.height;
        this.height = (_data.topprice - _data.lowprice) * zoomrate;
            
        //显示宽度
        this.width = _width;
    }
}
