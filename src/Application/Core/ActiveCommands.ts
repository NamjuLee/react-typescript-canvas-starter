import { CLICK_TYPE, MouseEventData } from './MouseInteraction';

import { Application } from '../';

export class ActiveCommands {
    app: Application;
    constructor(app: Application) {
        this.app = app;
    }
    MouseEventController(e: MouseEventData) {

        if (e.CLICK_TYPE === CLICK_TYPE.LEFT) {
            this.MouseLeftClickPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.MIDDLE) {
            this.MouseMiddleClickPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.DOWN_RIGHT) {
            this.MouseRightClickPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.DOUBLE) {
            this.MouseDoubleClickPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.MOVE) {
            this.MouseMovePre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.DRAG) {
            this.MouseDragPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.DOWN) {
            this.MouseDownPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.WHEEL) {
            this.MouseWheelPre(e); return;
        } else if (e.CLICK_TYPE === CLICK_TYPE.UP) { this.MouseUpPre(e); return; }
    }

    // .......................................................
    MouseDown(e: MouseEventData) {/* */ }
    MouseDownPre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseDown(e); }
        this.MouseDown(e);
    }
    MouseLeftClick(e: MouseEventData) {/* */ }
    MouseLeftClickPre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseLeftClick(e); }
        this.MouseLeftClick(e);
    }
    MouseMiddleClick(e: MouseEventData) {/* */ }
    MouseMiddleClickPre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseMiddleClick(e); }
        this.MouseMiddleClick(e);
    }
    MouseRightClick(e: MouseEventData) { /* */ }
    MouseRightClickPre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseRightClick(e); }
        this.MouseRightClick(e);
    }
    MouseUp(e: MouseEventData) { /* */ }
    MouseUpPre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseUp(e); }
        this.MouseUp(e);

    }
    MouseDoubleClick(e: MouseEventData) {/* */ }
    MouseDoubleClickPre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseDoubleClick(e); }
        this.MouseDoubleClick(e);
    }
    MouseMove(e: MouseEventData) {/* */ }
    MouseMovePre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseMove(e); }
        this.MouseMove(e);
    }
    MouseDrag(e: MouseEventData) {/* */ }
    MouseDragPre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseDrag(e); }
        this.MouseDrag(e);
    }
    MouseWheel(e: MouseEventData) {/* */ }
    MouseWheelPre(e: MouseEventData) {
        for ( let d of this.app.renderer.DefinitionBase) {d.MouseWheel(e); }
        this.MouseWheel(e);
    }
}