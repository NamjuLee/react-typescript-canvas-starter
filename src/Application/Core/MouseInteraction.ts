import { Application } from '../';

export enum CLICK_TYPE {
    LEFT = 'LEFT', MIDDLE = 'MIDDLE', RIGHT = 'RIGHT', WHEEL = 'WHEEL',
    DRAG = 'DRAG', DRAG_LEFT = 'DRAG_LEFT', DRAG_MIDDLE = 'DRAG_MIDDLE', DRAG_RIGHT = 'DRAG_RIGHT',
    MOVE = 'MOVE', DOUBLE = 'DOUBLE', UP = 'UP',
    DOWN = 'DOWN', DOWN_MIDDLE = 'DOWN_MIDDLE', DOWN_RIGHT = 'DOWN_RIGHT'
}

export interface IMouseInteractionMenu {
    MouseInteractionMenu: (mouseEventData: MouseEventData) => void;
}
export class MouseEventData {
  x: number = -1; y: number = -1; z: number = -1;
  preX: number = -1; preY: number = -1; preZ: number = -1;
  yGLPicking: number;
  CLICK_TYPE: CLICK_TYPE = CLICK_TYPE.MOVE;
  isDown: boolean = false;
  isDoubleClick: boolean = false;
  isMove: boolean = false;
  pressedShift: boolean = false;
  pressedAlt: boolean = false;
  pressedCtrl: boolean = false;

  lat: number = -1;
  long: number = -1;
  wheel: number = 0;
  preWheel: number = 0;
  isActive: boolean = true;
  // premEvent: MouseEventData;
  native: MouseEvent;
  constructor() {
    //
  }
  DeepCopy() {
    let mEvent = new MouseEventData();
    mEvent.x = this.x; mEvent.y = this.y; mEvent.z = this.z; mEvent.preX = this.preX; mEvent.preY = this.preY; mEvent.preZ = this.preZ;
    mEvent.pressedAlt = this.pressedAlt; mEvent.pressedShift = this.pressedShift; mEvent.pressedCtrl = this.pressedCtrl;
    mEvent.isDoubleClick = this.isDoubleClick; mEvent.isDown = this.isDown; mEvent.isMove = this.isMove;
    mEvent.lat = this.lat; mEvent.long = this.long; mEvent.wheel = this.wheel; mEvent.preWheel = this.preWheel;
    mEvent.yGLPicking = this.yGLPicking;
    mEvent.CLICK_TYPE = this.CLICK_TYPE;
    mEvent.native = this.native;
    return mEvent;
  }
}
export class MouseInteraction {
    app: Application;
    mouseInteractionUI: IMouseInteractionMenu;
    mouseEventDataPre: MouseEventData = new MouseEventData();
    isEnable: boolean = true;
    clickCount: number = 0;
    click: boolean = false;
    prevent: boolean = false;
    delay: number = 250;
    timer: NodeJS.Timer | number;
    down: boolean = false;
    e: MouseEventData;
    private _stopPropagation: boolean = false;

    constructor(app: Application) {
        this.app = app;
    }
    InitNativeMouseEvent(div: HTMLElement) {
        div.onclick = (e: MouseEvent) => {
          this.prevent = false;
          this.timer = setTimeout(
            () => {
              if (!this.prevent) { 
                this.MouseClick(e);
               }
              this.prevent = false;
            },
            this.delay);
        };
        div.ondblclick = (e: MouseEvent) => {
          clearTimeout(this.timer as number);
          this.prevent = true;
          this.MouseDoubleClick(e);
        };
        div.onmousedown = (e: MouseEvent) => { this.MouseDown(e); };
        div.onmouseup = (e: MouseEvent) => { this.MouseUp(e); };
        div.onmousemove = (e: MouseEvent) => { this.MouseMove(e); };
        div.addEventListener('wheel', (e: WheelEvent) => this.MouseWheel(e, e.deltaY) );  
    }
    MouseDown(e: MouseEvent) {
      this.click = true;
      this.down = true;
      let mEvent = this.CommonEventBuilder(e);
      mEvent.CLICK_TYPE = CLICK_TYPE.DOWN;
      mEvent.isDown = true;
      this.MouseEvenEmitting(mEvent);
    }
    MouseClick(e: MouseEvent) {
      if (!this.click) { return; }
      let mEvent = this.CommonEventBuilder(e);
      if (e.button === 0) {
        mEvent.CLICK_TYPE = CLICK_TYPE.LEFT;
      } else if (e.button === 1) {
        mEvent.CLICK_TYPE = CLICK_TYPE.MIDDLE;
      } else if (e.button === 2) {
        mEvent.CLICK_TYPE = CLICK_TYPE.RIGHT;
      }
      this.MouseEvenEmitting(mEvent);
    }
    MouseDoubleClick(e: MouseEvent) {
      let mEvent = this.CommonEventBuilder(e);
      mEvent.CLICK_TYPE = CLICK_TYPE.DOUBLE;
      this.MouseEvenEmitting(mEvent);
    }
    MouseDrag(e: MouseEvent) {
      this.click = false;
      this.prevent = true;
      let mEvent = this.CommonEventBuilder(e);
      mEvent.CLICK_TYPE = CLICK_TYPE.DRAG;
      mEvent.isDown = true;
      if (e.buttons === 1) {
        mEvent.CLICK_TYPE = CLICK_TYPE.DRAG;
      } else if (e.buttons === 4) {
        mEvent.CLICK_TYPE = CLICK_TYPE.DRAG_MIDDLE;
      } else if (e.buttons === 2) {
        mEvent.CLICK_TYPE = CLICK_TYPE.DRAG_RIGHT;
      }
      this.MouseEvenEmitting(mEvent);
    }
    MouseMove(e: MouseEvent) {
      if (this.down) { this.MouseDrag(e); return; }
      let mEvent = this.CommonEventBuilder(e);
      mEvent.CLICK_TYPE = CLICK_TYPE.MOVE;
      mEvent.isDown = true;
      this.prevent = true;
      this.MouseEvenEmitting(mEvent);
    }
    MouseUp(e: MouseEvent) {
      this.down = false;
      this.click = true;
      let mEvent = this.CommonEventBuilder(e);
      mEvent.CLICK_TYPE = CLICK_TYPE.UP;
      mEvent.isDown = false;
      this.MouseEvenEmitting(mEvent);
    }
    MouseWheel(e: MouseEvent, v: number) {
      let mEvent = this.CommonEventBuilder(e);
      mEvent.wheel = v;
      mEvent.CLICK_TYPE = CLICK_TYPE.WHEEL;
      this.MouseEvenEmitting(mEvent);
    }
    CommonEventBuilder(e: MouseEvent): MouseEventData {
      let mEvent: MouseEventData = new MouseEventData();
      mEvent.preX = this.mouseEventDataPre.x;
      mEvent.preY = this.mouseEventDataPre.y;
      // mEvent.premEvent = this.mouseEventDataPre;

      mEvent.pressedShift = e.shiftKey;
      mEvent.pressedAlt = e.altKey;
      mEvent.pressedCtrl = e.ctrlKey;

      mEvent.x = e.offsetX;
      mEvent.y = e.offsetY;
      mEvent.preWheel = this.mouseEventDataPre.wheel;
      mEvent.wheel = 0;
      mEvent.native = e;
      this.mouseEventDataPre = mEvent;
      this.e = mEvent;
      return mEvent;
    }
    get stopPropagation() {
      return this._stopPropagation;
    }
    set stopPropagation(v: boolean) {
      if (v) {
        this._stopPropagation = v;
      } else {
        setTimeout(() => { this._stopPropagation = v; }, 500);
        // this._stopPropagation = v;
      }
    }
    MouseEvenEmitting(mouseEventData: MouseEventData) {
        this.app.activeCommands.MouseEventController(mouseEventData);
    }
}