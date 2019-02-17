import { Application } from '..';
import { MouseEventData } from './MouseInteraction';
export abstract class DefinitionBase {
    app: Application;
    constructor(app: Application) {
        this.app = app;
        this.app.renderer.DefinitionBase.push(this);
        this.Init();
    }
    abstract Init(): void;
    abstract Render(ctx: CanvasRenderingContext2D): void;
    MouseDown(e: MouseEventData) {/* */ }
    MouseLeftClick(e: MouseEventData) {/* */ }
    MouseMiddleClick(e: MouseEventData) {/* */ }
    MouseRightClick(e: MouseEventData) { /* */ }
    MouseUp(e: MouseEventData) { /* */ }
    MouseDoubleClick(e: MouseEventData) {/* */ }
    MouseMove(e: MouseEventData) {/* */ }
    MouseDrag(e: MouseEventData) {/* */ }
    MouseWheel(e: MouseEventData) {/* */ }
}