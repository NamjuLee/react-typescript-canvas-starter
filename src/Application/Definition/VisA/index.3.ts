import { DefinitionBase } from '../../Core/DefinitionBase';
import { Application } from '../..';
import { MouseEventData } from '../../Core/MouseInteraction';
export class VisA extends DefinitionBase {
    app: Application;
    t: number = 0;

    pts: number[][];

    constructor(app: Application) {
        super(app);
    }
    Init() {
        this.pts = [];
    }
    Render(ctx: CanvasRenderingContext2D) {

        for (let i = 0; i < this.pts.length; ++i){
            let p = this.pts[i];

            this.DrawPoint(ctx, p[0], p[1]);

        }

    }
    DrawPoint(ctx: CanvasRenderingContext2D, x: number, y: number){
        let color = this.GetRandomColor();
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 3.14*2);
        ctx.closePath();
        ctx.fillStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")" ; // 'rgb(255, 165, 0)';
        ctx.fill();
    }
    GetRandomColor(){
        return [ Math.random() * 255, Math.random() * 255, Math.random() * 255 ]
    }
    MouseLeftClick(e: MouseEventData) {
        let p = [e.x, e.y];
        this.pts.push(p)
        console.log(this.pts);
    }
 
}
    