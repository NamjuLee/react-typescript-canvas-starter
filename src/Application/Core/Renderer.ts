import { Application } from '../';
import { DefinitionBase } from './DefinitionBase';
export class Renderer {
    app: Application;
    
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    DefinitionBase: DefinitionBase[] = [];
    constructor(app: Application) {
        this.app = app;

    }
    Render(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.DefinitionBase.length; ++i) {this.DefinitionBase[i].Render(ctx); }
    }
}