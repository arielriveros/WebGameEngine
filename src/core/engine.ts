import { Game } from '../game/game';
import { InputManager } from './input/manager';
import { Render } from './rendering/render';
import { LOG } from './logger';

/**
 *  Main Engine Class 
 */
export class Engine{
    private _render: Render;
    private _input: InputManager;
    private _game: Game;
    private _performance;

    public constructor() {
        LOG("New Game Instance", 'info');
        this._render = new Render();
        this._input = new InputManager();
        this._game = new Game();

        this._render.initialize("render-viewport");
        this._game.setUp();
        this._performance = {showPerformance: true, frameTime: 0, fps: 0, previousTime: 0};
    }
    /** 
     * Initializes the engine and starts the game loop.
     */
    public start(): void {
        this._input.initialize();

        let previousTime = performance.now()
        this._game.start();
        LOG(`Game set up in ${(performance.now() - previousTime).toFixed(2)} ms`, 'info');
        
        this._render.render(this._game.camera, this._game.scene);
        this.loop();
    }

    /**
     * Gets called on every resize event
     */
    public resize(): void {
        this._render.resize();
    }

    private getPerformance(): void {
        if(!this._performance.previousTime) {
            this._performance.previousTime = performance.now();
            this._performance.fps = 0;
            this._performance.frameTime = 0;
        }
        let delta = (performance.now() - this._performance.previousTime);
        this._performance.previousTime = performance.now();
        this._performance.frameTime = delta;
        this._performance.fps = 1000/delta;

        let fpsMeter = document.getElementById('fps-meter') as HTMLDivElement;
        fpsMeter.textContent = this._performance.fps.toFixed(2).toString();

        let frameTimeMeter = document.getElementById('frametime-meter') as HTMLDivElement;
        frameTimeMeter.textContent = this._performance.frameTime.toFixed(2).toString() + ' ms';
    }
    /**
     * Main game loop, called every frame.
     */
    private loop(): void {
        
        // DEBUG
        if(this._input.isKeyDown('KeyP')) {
            let console = document.getElementById('debug-hud')
            if( console !== null){
                this._performance.showPerformance = true;
                console.style.display = 'block';
            }
        }

        if(this._input.isKeyDown('KeyO')) {
            let console = document.getElementById('debug-hud')
            if( console !== null){
                this._performance.showPerformance = false;
                console.style.display = 'none';
            }
        }

        if(this._performance.showPerformance) {
            this.getPerformance();
        }
        // END DEBUG

        this._render.update();        
        this._game.inputListen(this._input);
        this._game.onUpdate();
        requestAnimationFrame(this.loop.bind( this ));
    }
}
