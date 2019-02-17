import { DefinitionBase } from '../../Core/DefinitionBase';
import { Application } from '../..';
import { MouseEventData } from '../../Core/MouseInteraction';
export class VisA extends DefinitionBase {
    app: Application;
    t: number = 0;

    pts: Point[];

    constructor(app: Application) {
        super(app);
    }
    Init() {
        this.pts = [];
    }
    Render(ctx: CanvasRenderingContext2D) {

        for (let i = 0; i < this.pts.length; ++i){
            this.pts[i].RenderPoint(ctx);
        }

    }
    MouseLeftClick(e: MouseEventData) {
        this.pts.push(new Point(e.x, e.y))
    }
 
}


class Point{
    x: number;
    y: number;
    r: number;
    constructor(x: number, y:number){
        this.x = x;
        this.y = y;
        this.r = Math.random() * 20;
    }
    RenderPoint(ctx: CanvasRenderingContext2D){
        let color = this.GetRandomColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 3.14*2);
        ctx.closePath();
        ctx.fillStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")" ; // 'rgb(255, 165, 0)';
        ctx.fill();
    }
    GetRandomColor(){
        return [ Math.random() * 255, Math.random() * 255, Math.random() * 255 ]
    }
}