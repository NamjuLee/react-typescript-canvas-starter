import { Canvas } from './Core/Canvas';

export class Application {

    host: HTMLElement;
    canvas: Canvas;
    constructor(id: string) {
        console.log('id: ' + id + ', App Init!!!!!');
        const host = document.getElementById(id);
        if (host) {this.host = host; }
        this.canvas = new Canvas(this);
    }
    Init(ctx: CanvasRenderingContext2D){
        console.log('this is init...');
    }
    Loop(ctx: CanvasRenderingContext2D){
        console.log('this is the loop');

        ctx.beginPath();
        ctx.arc(100,100, 10,0,3.14*2);
        ctx.closePath();
        ctx.fillStyle = '#ff0000';
        ctx.fill();
    }
}