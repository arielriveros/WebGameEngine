import { Camera } from "src/core/world/camera";
import { Renderable } from "../graphics/renderable";
import { gl } from "../render";
import { Shader } from "../shaders/shader";

export class Pipeline
{
    private _name: string;
    private _shader: Shader;
    private _camera: Camera | null;
    private _renderables!: Renderable[];

    /**
     * A Pipeline handles the rendering of objects under the same shader program.
     * @param name Name of the pipeline.
     * @param shader Shader this pipeline will use.
     */
    public constructor(name: string, shader: Shader)
    {
        this._name = name;
        this._shader = shader;
        this._renderables = [];
        this._camera = null;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get camera(): Camera | null { return this._camera; }
    public set camera(value: Camera | null) { this._camera = value; }

    public get shader(): Shader { return this._shader; }
    public set shader(value: Shader) { this._shader = value; }

    /**
     * Initializes the pipeline and its shader.
     */
    public initialize(): void
    { 
        this._shader.initialize();
    }

    /**
     * Loads a renderable to the pipeline.
     * @param renderable Renderable to be loaded into the pipeline.
     */
    public loadRenderable(renderable: Renderable): void
    {
        this.shader.use();
        renderable.load(this.shader);
        this._renderables.push(renderable);
    }

    /**
     * Unloads a renderable from the pipeline.
     * @param renderableName Name of the renderable object to be unloaded from the pipeline.
     */
    public unloadRenderable(renderableName: string): void
    {
        for( const r of this._renderables)
        {
            if(r.name === renderableName)
            {
                r.unload();
                this._renderables.splice(this._renderables.indexOf(r), 1);
            }
        }
    }

    /**
     * Deletes this pipeline unloading all renderables from it and deleting the shader program.
    */
    public delete(): void
    {
        for( const r of this._renderables)
        {
            r.unload();
        }
        this._shader.remove();
    }

    /**
     * Renders all renderables in the pipeline.
     */
    public update(): void {
        this.shader.use();
        let _uViewProj;

        if(this._camera)
        {
            _uViewProj = this._shader.getUniformLocation('u_viewProj');
        }
        
        for(const renderable of this._renderables)
        {
            if(this._camera && _uViewProj)
            {
                gl.uniformMatrix4fv(_uViewProj, false, this._camera.getViewProjection(renderable.worldMatrix).toFloat32Array());
            }
            renderable.draw();
        }
    }
}