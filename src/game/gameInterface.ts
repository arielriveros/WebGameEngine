import { Camera, Scene, InputManager } from 'core';

export abstract class GameBase{

    protected _camera!: Camera;
    protected _scene!: Scene;

    public constructor() { }
    public get camera(): Camera { return this._camera; }
    public set camera(camera: Camera) { this._camera = camera; }
    public get scene(): Scene { return this._scene; }
    public set scene(scene: Scene) { this._scene = scene; }
    public setUp(): void { }
    public start(): void { }
    public inputListen(input: InputManager, delta: number): void { }
    public onUpdate(delta: number): void { }
}