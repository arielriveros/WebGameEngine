import { Camera } from "src/core/world/camera";
import { Renderable } from "../graphics/renderable";
import { gl } from "../render";
import { Shader } from "../shaders/shader";

export class PipeLine
{
    private _name: string;
    private _shader: Shader;
    private _camera: Camera | null;
    private _renderables!: Renderable[];

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

    public initialize(): void
    { 
        this._shader.initialize();
    }

    public loadRenderable(renderable: Renderable): void
    {
        this.shader.use();
        renderable.load(this.shader);
        this._renderables.push(renderable);
    }

    public delete(): void
    {
        this._shader.remove();
    }

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