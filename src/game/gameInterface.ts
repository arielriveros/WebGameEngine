import { Camera } from '../core/rendering/graphics/camera';
import { Scene } from '../core/world/scene';
import { InputManager } from '../core/input/manager';
import { Shape } from '../core/rendering/graphics/shape';

export class GameInterface{

    protected _camera!: Camera;
    protected _scene!: Scene;
    protected _controllable!: Shape;

    public constructor() { }
    public get camera(): Camera { return this._camera; }
    public get scene(): Scene { return this._scene; }
    public get controllable(): Shape { return this._controllable; }
    public start(): void { }
    public inputListen(input: InputManager): void { }
}