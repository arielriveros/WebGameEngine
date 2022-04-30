import { gl, initialize } from './rendering/gl/gl';
import { Shader } from './rendering/shaders/shader';
import { Quad } from './rendering/graphics/shapes';
import { Triangle } from './rendering/graphics/shapes';
import { vertexShaderSource, fragmentShaderSource } from './rendering/shaders/shaderSources';
import { Matrix4x4 } from './math/matrix';

/**
 *  Main Engine Class 
 */
export class Engine{
    private _canvas!: HTMLCanvasElement;
    private _shader!: Shader;
    private _projection!: Matrix4x4;
    private _sprite!: Quad;
    private _triangle!: Triangle;
    
    public constructor() {
    }
    /** 
     * Initializes the engine and starts the game loop.
     */
    public start(): void {
        this._canvas = initialize("render-viewport");
        gl.clearColor(0, 0, 0, 1);
        this.loadShaders();
        this._shader.use();
        this._projection = Matrix4x4.orthographic(0.0, this._canvas.width, 0.0, this._canvas.height, -100.0, 100.0);
        this._sprite = new Quad("Test");
        this._sprite.load();
        this._sprite.position.x = 200;
        this._triangle = new Triangle("Test");
        this._triangle.load();
        this._triangle.position.x = 100;
        this.resize();
        this.loop();
    }
    /**
     * Rezises canvas to fit window.
     */
    public resize(): void {
        if (this._canvas !== undefined) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            gl.viewport(-1, 1, -1, 1);
        }
    }
    /**
     * Main game loop, called every frame.
     */
    private loop(): void {
        gl.clear(gl.COLOR_BUFFER_BIT); // clears buffers to preset values.
        let colorPosition: WebGLUniformLocation = this._shader.getUniformLocation("u_color");
        gl.uniform4f(colorPosition, 1, 0.5, 0, 1);
        
        let projectionPosition = this._shader.getUniformLocation("u_projection");
        gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
        let modelLocation = this._shader.getUniformLocation("u_model");
        gl.uniformMatrix4fv(modelLocation, false, new Float32Array(Matrix4x4.translation(this._sprite.position).data));
        gl.uniformMatrix4fv(modelLocation, false, new Float32Array(Matrix4x4.translation(this._triangle.position).data));
        this._triangle.draw();
        //this._sprite.draw();
        
        requestAnimationFrame(this.loop.bind( this ));
    }
    private loadShaders(): void {
        this._shader = new Shader("basic", vertexShaderSource, fragmentShaderSource);
    }
    
}
