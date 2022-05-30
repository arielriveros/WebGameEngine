import { Camera } from "src/core/world/camera";
import { AttributeInformation, GLArrayBuffer } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { Renderable } from "../graphics/renderable";
import { gl } from "../render";
import { Shader } from "../shaders/shader";

export class PipeLine
{
    private _name: string;
    private _shader: Shader;
    private _camera!: Camera;
    private _renderables!: Renderable[];
    private _ready: boolean;

    public constructor(name: string, shader: Shader)
    {
        this._name = name;
        this._shader = shader;
        this._renderables = [];
        this._ready = false;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get camera(): Camera { return this._camera; }
    public set camera(value: Camera) { this._camera = value; }

    public get shader(): Shader { return this._shader; }
    public set shader(value: Shader) { this._shader = value; }

    public initialize(): void
    { 
        this._shader.initialize();
        this._ready = true;
    }

    public loadRenderable(renderable: Renderable): void
    {
        this.shader.use();
        renderable.load(this.shader);
        this._renderables.push(renderable);
    }

    public update(): void {
        this.shader.use();
        for(const renderable of this._renderables)
        {
            renderable.draw(this._camera);
        }
    }
}