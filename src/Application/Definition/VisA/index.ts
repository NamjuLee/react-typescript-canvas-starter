import { DefinitionBase } from '../../Core/DefinitionBase';
import { Application } from '../..';
import { MouseEventData } from '../../Core/MouseInteraction';

const data = require('./data/bitcoin_price.csv');

export class VisA extends DefinitionBase {
    app: Application;
    t: number = 0;

    pts: Point[];

    constructor(app: Application) {
        super(app);
        this.ImportCSV(data).then((d:any) => console.log(d) );
    }
    Init() {
        this.pts = [];
    }
    Render(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.pts.length; ++i){
            this.pts[i].RenderPoint(ctx);
        }
    }
    MouseLeftClick(e: MouseEventData) {
        this.pts.push(new Point(e.x, e.y))
    }
    async ImportCSV(path: string) {
        return fetch(`${path}`)
            .then((response: Response) => {
                return response.text();
            }).then((d: string) => {
                let texts = d.split(/\r\n|\n/);
                let lines = [];
                for (let ii = 0; ii < texts.length; ++ii) {
                    let theData = texts[ii].split(',');
                    let row = [];
                    for (let jj = 0; jj < theData.length; ++jj) {
                        row.push(+theData[jj]);
                    }
                    lines.push(row);
                }
                return lines;
            }).catch((err: Error) => {
                console.log(err);
            });

    }
}

class Point{
    x: number;
    y: number;
    constructor(x: number, y:number){
        this.x = x;
        this.y = y;
    }
    RenderPoint(ctx: CanvasRenderingContext2D){
        let color = this.GetRandomColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 3.14*2);
        ctx.closePath();
        ctx.fillStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")" ; // 'rgb(255, 165, 0)';
        ctx.fill();
    }
    GetRandomColor(){
        return [ Math.random() * 255, Math.random() * 255, Math.random() * 255 ]
    }
}