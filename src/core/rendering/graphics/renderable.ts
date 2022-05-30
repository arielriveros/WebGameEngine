import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { Shader } from "../shaders/shader";
import { Matrix4x4 } from "math";
import { Texture } from "./texture";
import { gl } from "../render";

export interface Options
{
    height?: number,
    base?: number,
    color?: number[],
}

/**
 * Parent class for any object that can be rendered on scene.
 */
export abstract class Renderable
{
    protected _vertices: number[];
    protected _indices: number[] | null;

    protected _buffer!: GLArrayBuffer;
    protected _indexBuffer!: GLElementArrayBuffer;
    
    protected _worldMatrix: Matrix4x4;

    protected _type: string;
    
    public constructor(type: string = "simple") 
    {
        this._vertices = [];
        this._indices = null;
        this._worldMatrix = new Matrix4x4();
        this._type = type;
    }

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
     * @param camera Camera to use for rendering.
     */
    public draw(): void
    {
        this._buffer.bind();
        if(this._indices)
        {
            this._indexBuffer.draw();
        }
        else
        {
            this._buffer.draw();
        }
    }
}

export class SimpleShape extends Renderable
{
    public constructor()
    {
        super("simple");
    }

    public override load(shader: Shader): void
    {
        this._buffer = new GLArrayBuffer(6, gl.FLOAT, gl.TRIANGLES );

        if(this._indices)
        {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.bind();
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }

        let positionAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
        this._buffer.addAttribLocation(positionAttribute);

        let colorAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_color"),
            size: 3, 
            offset: 3 };
        this._buffer.addAttribLocation(colorAttribute);

        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }
}

export class TexturedShape extends Renderable
{
    private _texture: Texture;

    public constructor(texture: HTMLImageElement)
    {
        super("textured");
        this._texture = new Texture(texture);
    }

    public override load(shader: Shader): void
    {
        this._buffer = new GLArrayBuffer(5, gl.FLOAT, gl.TRIANGLES );
        
        if(this._indices)
        {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.bind();
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }
        
        let positionAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
            this._buffer.addAttribLocation(positionAttribute);
            
        this._texture.load();
        let textureAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_texCoord"),
            size: 2, 
            offset: 3 };
        this._buffer.addAttribLocation(textureAttribute);
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }
}

export class LineShape extends Renderable {
    public constructor()
    {
        super("simple");
    }

    public override load(shader: Shader): void
    {
        this._buffer = new GLArrayBuffer(6, gl.FLOAT, gl.LINES );

        let positionAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
        this._buffer.addAttribLocation(positionAttribute);

        let colorAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_color"),
            size: 3, 
            offset: 3 };
        this._buffer.addAttribLocation(colorAttribute);
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }
}