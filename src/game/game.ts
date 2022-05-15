import { Engine } from '../core/engine'
import { Vector3 } from '../core/math/vector';
import { Camera } from '../core/rendering/graphics/camera';
import { Scene } from '../core/world/scene';
import * as SHAPE from '../core/rendering/graphics/shape'
import { InputManager } from '../core/input/manager';

export class Game{

    private _camera!: Camera;
    private _scene!: Scene;
    private _x!: SHAPE.Shape;

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
        this._x = new SHAPE.ColorCube('test0', 0.2);
        this._scene.addShape(this._x);
        /* this._scene.addShape(new SHAPE.Triangle('test1', 1, 2, [0.0, 0.0, 0.0]));
        this._scene.addShape(new SHAPE.Quad("test2", 1, 1, [0.5, 0.2, 1.0])); */
        this._scene.addShape(new SHAPE.Shape('test0'));
    }

    public inputListen(input: InputManager): void {
        if(input.isKeyDown('ArrowLeft')) {
            this._camera.move(new Vector3(0, 0, 0.02));
        }
        if(input.isKeyDown('ArrowRight')) {
            this._camera.move(new Vector3(0, 0, -0.02));
        }
        if(input.isKeyDown('ArrowUp')) {
            this._camera.move(new Vector3(0, 0.02, 0));
        }
        if(input.isKeyDown('ArrowDown')) {
            this._camera.move(new Vector3(0, -0.02, 0));
        }

        if(input.isKeyDown('KeyA')) {
            this._x.move(new Vector3(-0.01, 0, 0));
        }
        if(input.isKeyDown('KeyD')) {
            this._x.move(new Vector3(0.01, 0, 0));
        }
        if(input.isKeyDown('KeyW')) {
            this._x.move(new Vector3(0, 0.02, 0));
        }
        if(input.isKeyDown('KeyS')) {
            this._x.move(new Vector3(0, -0.02, 0));
        }

        if(input.isKeyDown('KeyQ')) {
            this._x.move(new Vector3(0, 0, 0.02));
        }
        if(input.isKeyDown('KeyE')) {
            this._x.move(new Vector3(0, 0, -0.02));
        }
    }
}