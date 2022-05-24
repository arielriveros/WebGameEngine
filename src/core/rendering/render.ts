import { Camera } from "../world/camera";
import { Scene } from "../world/scene";
import { LOG } from "utils";

/**
 * WebGL Global interface for rendering context
 */
export let gl: WebGLRenderingContext; 

export class Render
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
    }

    public get canvas(): HTMLCanvasElement { return this._canvas; }

    /**
     * Renders the camera and scene.
     * @param camera
     * @param scene 
     */
    public initialize(camera: Camera, scene: Scene): void
    {
        this._camera = camera;
        this._camera.initialize();
        this._scene = scene;
        this._scene.initialize(this._camera);
        this.resize();
    }

    /**
     * Draws renderable elements every frame.
     */
    public render(): void
    {
        // clears buffers to preset values.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for(const e of this._scene.entities)
        { 
            e.shape?.draw(this._camera); 
        };
    }

    /**
     * Gets called every frame
     */
    public update(): void { }

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

        if (!this._canvas.getContext("webgl"))
        {
            LOG("Cannot initialize WebGL by the browser", 'error', true);
        }

        // gets webGL context object from the canvas and stores it in _context
        gl = this._canvas.getContext("webgl") as WebGLRenderingContext; 
        // Dark gray initial color
        gl.clearColor(0.2, 0.2, 0.2, 1.0);
        gl.enable(gl.DEPTH_TEST);
        //gl.enable(gl.CULL_FACE);
        //gl.frontFace(gl.CCW);
        //gl.cullFace(gl.BACK);
        // gl.cullFace(gl.FRONT);
    }
}