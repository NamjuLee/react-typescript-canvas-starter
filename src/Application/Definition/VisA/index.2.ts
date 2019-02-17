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

            ctx.beginPath();
            ctx.arc(p[0], p[1], 10, 0, 3.14*2);
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();

        }

    }
    MouseLeftClick(e: MouseEventData) {
        let p = [e.x, e.y];
        this.pts.push(p)
        console.log(this.pts);
    }
 
}