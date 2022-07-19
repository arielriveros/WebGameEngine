import { Camera } from "../world/camera";
import { Scene } from "../world/scene";
import { LOG } from "utils";
import { Shaders } from "core";
import { PipelineManager } from "./pipeline/pipelineManager";

/**
 * WebGL Global interface for rendering context.
 */
let gl: WebGLRenderingContext; 

/**
 * Global rendering pipeline manager.
 */
let pipelineManager = new PipelineManager();

class Render
{
    private _canvas!: HTMLCanvasElement ;
    private _camera!: Camera;
    private _scene!: Scene;

    /**
    * Initializes WebGL rendering context. 
    * @param elementID Id of the canvas element to render in.
    */
    public constructor(elementID: string)
    {
        LOG("New Render Instance", 'info');
        this.initializeContext(elementID);
        pipelineManager.addPipeline("simple", new Shaders.SimpleShader());
        pipelineManager.addPipeline("textured", new Shaders.TextureShader());
        pipelineManager.addPipeline("skybox", new Shaders.SkyboxShader());
    }

    public get canvas(): HTMLCanvasElement { return this._canvas; }

    /**
     * Renders the camera and scene.
     * @param camera
     * @param scene 
     */
    public initialize(camera: Camera, scene: Scene): void
    {
        pipelineManager.initialize();
        this._camera = camera;
        this._camera.initialize();
        pipelineManager.setCamera(this._camera);
        this._scene = scene;
        this._scene.initialize();
        pipelineManager.setDirectionalLight(this._scene.directionalLight);
        this.resize();
    }

    /**
     * Draws renderable elements every frame.
     */
    private render(): void
    {
        // clears buffers to preset values.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        pipelineManager.update();
    }

    /**
     * Gets called every frame
     */
    public update(): void {
        this._camera.update();
        this.render();
    }

    /**
     * Resizes canvas to fit window.
     */
    public resize(): void
    {
        if (this._canvas)
        {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            if(this._camera)
            {
                this._camera.refreshProjection();
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }
    }

    private initializeContext(elementID: string): void
    {
        let canvas: HTMLCanvasElement;
        
        if (elementID !== undefined)
        {
            canvas = document.getElementById(elementID) as HTMLCanvasElement;
            if (canvas === undefined)
            {
                LOG(`No canvas element of id ${elementID}`, 'error', true);
            }
        }
        else
        {
            // If there is no element of id elementID then its created and appended
            canvas = document.createElement("canvas") as HTMLCanvasElement;
            document.body.appendChild(canvas);
        }
        
        this._canvas = canvas;

        if (!this._canvas.getContext("webgl2"))
        {
            LOG("Cannot initialize WebGL by the browser", 'error', true);
        }

        // gets webGL context object from the canvas and stores it in _context
        gl = this._canvas.getContext("webgl2") as WebGLRenderingContext; 
        // Dark gray initial color
        gl.clearColor(0.05, 0.05, 0.05, 1.0);
        gl.enable(gl.DEPTH_TEST);
        //gl.enable(gl.CULL_FACE);
        //gl.frontFace(gl.CCW);
        //gl.cullFace(gl.BACK);
        // gl.cullFace(gl.FRONT);
    }
}

export { Render, gl, pipelineManager };