import { DefinitionBase } from '../../Core/DefinitionBase';
import { Application } from '../..';
import { MouseEventData } from '../../Core/MouseInteraction';
export class VisA extends DefinitionBase {
    app: Application;
    t: number = 0;
    constructor(app: Application) {
        super(app);
    }
    Init() {
        //
    }
    Render(ctx: CanvasRenderingContext2D) {
        
        let r = Math.cos(this.t) * 15;

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(100, 100, 15 + r , 0, 3.14 * 2);
        ctx.closePath();
        ctx.fill();

        this.t += 0.05;
    }
    MouseLeftClick(e: MouseEventData) {
        console.log('L-click');
    }
    MouseDoubleClick(e: MouseEventData) {
        console.log('D-click');
    }
    MouseDrag(e: MouseEventData) {
        console.log('Drag');
    }
}