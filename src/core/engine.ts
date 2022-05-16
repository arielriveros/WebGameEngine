import { Game } from '../game/game';
import { InputManager } from './input/manager';
import { Render } from './rendering/render';

/**
 *  Main Engine Class 
 */
export class Engine{
    private _render:Render;
    private _input: InputManager;
    private _game: Game;

    public constructor() {
        console.log("New Game Instance");
        this._render = new Render();
        this._input = new InputManager();
        this._game = new Game();

        this._input.initialize();
        this._render.initialize("render-viewport");
        this._game.setUp();
    }
    /** 
     * Initializes the engine and starts the game loop.
     */
    public start(): void {
        this._game.start();
        this._render.render(this._game.camera, this._game.scene);
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
        this._game.inputListen(this._input);
        this._render.update();        
        requestAnimationFrame(this.loop.bind( this ));
    }
}
