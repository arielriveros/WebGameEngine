import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { Shader } from "../shaders/shader";
import { Matrix4x4 } from "math";
import { Texture } from "./texture";
import { gl } from "../render";
import { randomNumber } from "math";

export interface Options
{
    height?: number,
    base?: number,
    color?: number[],
    texturePath?: string
}

/**
 * Parent class for any object that can be rendered on scene.
 */
export abstract class Renderable
{
    private _name: string;

    protected _vertices: number[];
    protected _indices: number[] | null;

    protected _buffer!: GLArrayBuffer;
    protected _indexBuffer!: GLElementArrayBuffer;
    
    protected _worldMatrix: Matrix4x4;

    protected _type: string;
    
    public constructor(type: string = "simple", name: string = `renderable-id-${randomNumber(9999)}`) 
    {
        this._name = name;
        this._vertices = [];
        this._indices = null;
        this._worldMatrix = new Matrix4x4();
        this._type = type;
    }

    public get name(): string { return this._name; }

    public get worldMatrix(): Matrix4x4 { return this._worldMatrix; }
    public set worldMatrix(matrix: Matrix4x4) { this._worldMatrix = matrix; }

    public get vertices(): number[] { return this._vertices; }
    public get indices(): number[] | null { return this._indices; }

    /**
     * Sets the vertices of the object for the vertex array buffer.
     */
    protected set vertices(newVertices: number[]) { this._vertices = newVertices; }
    /**
     * Sets the indices of the object for the element array buffer.
     */
    protected set indices(newIndices: number[] | null) { this._indices = newIndices; }

    public get type(): string { return this._type; }

    /**
     * Loads current object's vertices into WebGL Buffer for rendering.
     */
    public load(shader: Shader): void { }
    
    /**
     * Runs every frame.
     */
    public update(): void { }

    /**
     * Deletes shader program and unbind buffer associated with this shape.
     */
    public unload(): void
    {
        this._buffer.unbind();
    }

    /**
     * Draws data from the shape's buffers.
     */
    public draw(): void
    {
        this._buffer.bind();
        if(this._indices) { this._indexBuffer.draw(); }
        else { this._buffer.draw(); }
    }
}