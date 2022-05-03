import { Input } from './input/poller';
import { Render } from './rendering/render';

/**
 *  Main Engine Class 
 */
export class Engine{
    private _render:Render;
    private _input: Input;
    
    public constructor() {
        console.log("New Game Instance");
        this._render = new Render();
        this._input = new Input();
    }
    /** 
     * Initializes the render engine and starts the game loop.
     */
    public start(): void {
        this._render.initialize("render-viewport");
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
        requestAnimationFrame(this.loop.bind( this ));
    }
}
