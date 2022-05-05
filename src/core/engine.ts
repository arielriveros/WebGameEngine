import { InputManager } from './input/manager';
import { Vector3 } from './math/vector';
import { Camera } from './rendering/graphics/camera';
import { Render } from './rendering/render';

interface cam{
    cam: Camera
}

/**
 *  Main Engine Class 
 */
export class Engine{
    private _render:Render;
    private _input: InputManager;
    private _camera: Camera;


    public constructor() {
        console.log("New Game Instance");
        this._render = new Render();
        this._input = new InputManager();
        this._camera = new Camera();
    }
    /** 
     * Initializes the engine and starts the game loop.
     */
    public start(): void {
        
        this._render.initialize("render-viewport", this._camera);
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
        this._camera.move({'x': 0.01, 'y': -0.01, 'z': 0.005})
        requestAnimationFrame(this.loop.bind( this ));
    }
}
