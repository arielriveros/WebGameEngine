import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { Shader } from "../shaders/shader";
import { Matrix4x4, Transform } from "math";
import { randomNumber } from "math";

export interface Options
{
    height?: number,
    base?: number,
    color?: number[],
    radius?: number,
    texturePath?: string,
    transform?: Transform
}

/**
 * Parent class for any object that can be rendered on scene.
 */
export abstract class Renderable
{
    private _name: string;

    protected _vertices: number[];
    protected _indices: number[] | null;
    protected _normals: number[] | null;
    protected _colors: number[] | null;
    protected _uvs: number[] | null;

    protected _vertexBuffer!: GLArrayBuffer;
    protected _indexBuffer!: GLElementArrayBuffer;
    protected _normalBuffer!: GLArrayBuffer;
    protected _colorBuffer!: GLArrayBuffer;
    protected _uvBuffer!: GLArrayBuffer;
    
    protected _worldMatrix: Matrix4x4;
    protected _localMatrix: Matrix4x4;

    protected _transform: Transform;

    protected _type: string;
    
    public constructor(type: string = "simple", name: string = `renderable-id-${randomNumber(9999)}`)
    {
        this._name = name;
        this._vertices = [];
        this._indices = null;
        this._normals = null;
        this._colors = null;
        this._uvs = null;
        this._worldMatrix = new Matrix4x4();
        this._localMatrix = new Matrix4x4();
        this._type = type;
        this._transform = new Transform();
    }

    public get name(): string { return this._name; }

    public get worldMatrix(): Matrix4x4 {
        let result: Matrix4x4 = new Matrix4x4();
        this._localMatrix = this._transform.applyTransform();

        Matrix4x4.multiply(result, this._worldMatrix, this._localMatrix);
        return result;
    }
    public set worldMatrix(matrix: Matrix4x4) { this._worldMatrix = matrix; }

    public get localMatrix(): Matrix4x4 { return this._localMatrix; }
    public set localMatrix(matrix: Matrix4x4) { this._localMatrix = matrix; }

    public get vertices(): number[] { return this._vertices; }
    public get indices(): number[] | null { return this._indices; }
    public get normals(): number[] | null { return this._normals; }
    public get colors(): number[] | null { return this._colors; }
    public get uvs(): number[] | null { return this._uvs; }

    /**
     * Sets the vertices of the object for the vertex array buffer.
     */
    protected set vertices(newVertices: number[]) { this._vertices = newVertices; }
    /**
     * Sets the indices of the object for the element array buffer.
     */
    protected set indices(newIndices: number[] | null) { this._indices = newIndices; }
    /**
     * Sets the normals of the object for the normal array buffer.
     */
    protected set normals(newNormals: number[] | null) { this._normals = newNormals; }

    /**
     * Sets the colors of the object for the color array buffer.
     * @param newColors The new colors of the object.
    */
     protected set colors(newColors: number[] | null) { this._colors = newColors; }

    /**
     * Sets the uvs of the object for the uv array buffer.
     * @param newUvs The new uvs of the object.
     */
    protected set uvs(newUvs: number[] | null) { this._uvs = newUvs; }

    protected set transform(newTransform: Transform) { this._transform = newTransform; }

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
        this._vertexBuffer.unbind();
        if(this.normals)
        {
            this._normalBuffer.unbind();
        }
        if(this.colors)
        {
            this._colorBuffer.unbind();
        }
        if(this.uvs)
        {
            this._uvBuffer.unbind();
        }
    }

    /**
     * Draws data from the shape's buffers.
     */
    public draw(): void
    {
        this._vertexBuffer.bind();
        if(this.normals) { this._normalBuffer?.bind(); }
        if(this.colors) { this._colorBuffer?.bind(); }
        if(this.uvs) { this._uvBuffer?.bind(); }
        if(this._indices) { this._indexBuffer?.draw(); }
        else { this._vertexBuffer.draw(); }
    }
}