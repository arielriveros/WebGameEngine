import { InputManager } from './input/manager';
import { Vector3 } from './math/vector';
import { Camera } from './rendering/graphics/camera';
import { Render } from './rendering/render';
import { Scene } from './world/scene';
import * as SHAPE from './rendering/graphics/shape'

/**
 *  Main Engine Class 
 */
export class Engine{
    private _render:Render;
    private _input: InputManager;
    private _camera: Camera;
    private _scene: Scene;


    public constructor() {
        console.log("New Game Instance");
        this._render = new Render();
        this._input = new InputManager();
        this._camera = new Camera(new Vector3( 1, 1, 1));
        this._scene = new Scene();
    }
    /** 
     * Initializes the engine and starts the game loop.
     */
    public start(): void {

        this._render.initialize("render-viewport");

        this._scene.addShape(new SHAPE.Shape('test0'));
        this._scene.addShape(new SHAPE.Triangle('test1', 1, 2, [0.0, 0.0, 0.0]));
        this._scene.addShape(new SHAPE.Quad("test2", 1, 1, [0.5, 0.2, 1.0]));
        this._scene.addShape(new SHAPE.ColorCube('test0', 0.2));

        this._render.render(this._camera, this._scene);
        this._input.initialize();
        this.loop();
    }

    /**
     * Gets called on every resize event
     */
    public resize(): void {
        this._render.resize();
    }
    /**
     * Main game loop, called every frame.
     */
    private loop(): void {
        this._render.update();
        //this._input.listen();
        //this._camera.move({'x': 0.0, 'y': 0.0, 'z': 0.002});
        requestAnimationFrame(this.loop.bind( this ));
    }
}
