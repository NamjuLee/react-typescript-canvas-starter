import { Canvas } from './Core/Canvas';
import { Renderer } from './Core/Renderer';
import { ActiveCommands } from './Core/ActiveCommands';
import { MouseInteraction } from './Core/MouseInteraction';

import { VisA } from './Definition/VisA';
import { DS } from './Definition/DS';

export class Application {

    host: HTMLElement;
    activeCommands: ActiveCommands;
    mouseInteraction: MouseInteraction;
    canvas: Canvas;
    renderer: Renderer;
    constructor(id: string) {
        console.log('id: ' + id + ', App Init!!!!!');

        const host = document.getElementById(id);
        if (host) {this.host = host; }
        this.activeCommands = new ActiveCommands(this);
        this.mouseInteraction = new MouseInteraction(this);
        this.mouseInteraction.InitNativeMouseEvent(this.host);
        this.renderer = new Renderer(this);
        this.canvas = new Canvas(this);

        this.InitDefinition();
    }
    InitDefinition() {
        // const visA = new VisA(this);
        const ds = new DS(this);
    }
}