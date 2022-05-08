import { Engine } from '../core/engine'
import { Vector3 } from '../core/math/vector';
import { Camera } from '../core/rendering/graphics/camera';
import { Scene } from '../core/world/scene';
import * as SHAPE from '../core/rendering/graphics/shape'
import { InputManager } from '../core/input/manager';

export class Game{

    private _camera!: Camera;
    private _scene!: Scene;

    public constructor() { }

    public get camera(): Camera {
        return this._camera;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public start(): void {
        this._camera = new Camera(new Vector3(0.5, 0, 0.5));
        this._scene = new Scene();
        this._scene.addShape(new SHAPE.Shape('test0'));
        this._scene.addShape(new SHAPE.Triangle('test1', 1, 2, [0.0, 0.0, 0.0]));
        this._scene.addShape(new SHAPE.Quad("test2", 1, 1, [0.5, 0.2, 1.0]));
        this._scene.addShape(new SHAPE.ColorCube('test0', 0.2));
    }

    public inputListen(input: InputManager): void {
        if(input.isKeyDown('ArrowLeft')) {
            this._camera.move({'x': 0.0, 'y': 0.0, 'z': 0.02});
        }
        if(input.isKeyDown('ArrowRight')) {
            this._camera.move({'x': 0.0, 'y': 0.0, 'z': -0.02});
        }
        if(input.isKeyDown('ArrowUp')) {
            this._camera.move({'x': 0.0, 'y': 0.02, 'z': 0.0});
        }
        if(input.isKeyDown('ArrowDown')) {
            this._camera.move({'x': 0.0, 'y': -0.02, 'z': 0.0});
        }
    }
}