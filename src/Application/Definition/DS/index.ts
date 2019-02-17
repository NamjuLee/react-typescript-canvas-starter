import { Application } from '../../';

import * as tf from '@tensorflow/tfjs';

export class DS {
    app: Application;
    constructor(app: Application) {
        this.app = app;
        console.log('tf version: ', tf.version);

    }
}