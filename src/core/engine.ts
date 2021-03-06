import { Game } from '../game/game';
import { InputManager } from './input/manager';
import { Render } from './rendering/render';
import { LOG, Performance } from 'utils';
import { CollisionManager } from './physics/collisionManager';
import { Scene } from './world/scene';

/* GLOBAL COLLISION MANAGER
    SHOULD CHANGE LATER FOR BETTER IMPLEMENTATION
*/
export let collisionManager: CollisionManager = new CollisionManager();

/**
 *  Main Engine Class 
 */
export class Engine{
    private _render: Render;
    private _input: InputManager;
    private _game: Game;
    private _scene: Scene;
    private _performance: Performance;

    public constructor() {
        LOG("New Game Instance", 'info');
        this._render = new Render("render-viewport");
        this._input = new InputManager();
        this._game = new Game();
        this._game.setUp();
        this._scene = this._game.scene;
        this._render.initialize(this._game.camera, this._scene);
        this._performance = new Performance();
    }

    /** 
     * Initializes the engine and starts the game loop.
     */
    public start(): void {
        this._input.initialize();
        let previousTime = performance.now()
        this._game.start();
        LOG(`Game set up in ${(performance.now() - previousTime).toFixed(2)} ms`, 'info');
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

        this._performance.measure();

        if(this._performance.showPerformance) {
            this._performance.sendToHUD();
        }
        // END DEBUG

        this._game.inputListen(this._input, this._performance.time);
        collisionManager.update();
        this._game.onUpdate(this._performance.time);
        this._scene.update(this._performance.time);
        this._render.update();
        requestAnimationFrame(this.loop.bind( this ));
    }
}
