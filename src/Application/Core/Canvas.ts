import { Application } from '../';

export class Canvas {
    app: Application;
    
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(app: Application) {
        this.app = app;

        this.canvas = document.createElement('canvas');
        if (this.app.host) {
            this.app.host.appendChild(this.canvas);
            this.canvas.width = this.app.host.clientWidth;
            this.canvas.height = this.app.host.clientHeight;
        }
        const ctx = this.canvas.getContext('2d');
        if (ctx !== null) { this.ctx = ctx; }
        this.app.Init(this.ctx);
        this.Loop();
    }
    Loop() {
        requestAnimationFrame(() => { this.Loop(); });
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.app.Loop(this.ctx);
    }
}