import { GLArrayBuffer } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { AttributeInformation } from "../interfaces";
import { Shader, SimpleShader, TextureShader } from "../shaders/shader";
import { Vector3, Matrix4x4, Rotator } from "math";
import { Texture } from "./texture";
import { gl } from "../render";
import { Camera } from "./camera";

export interface Options{
    height?: number,
    base?: number,
    color?: number[],
    position?: Vector3,
    rotation?: Rotator,
}

/**
 * Shape parent class for rendering vertices.
 */
export abstract class Shape {

    private _position: Vector3;
    private _rotation: Rotator;

    protected _vertices: number[];
    protected _indices: number[] | null;

    private _shader: Shader;
    protected _buffer!: GLArrayBuffer;
    protected _indexBuffer!: GLElementArrayBuffer;
    protected _uWorld!: WebGLUniformLocation;
    protected _uViewProj!: WebGLUniformLocation;
    
    protected _worldMatrix: Matrix4x4;
    protected _viewProjection: Matrix4x4;;
    
    public constructor(position: Vector3 = new Vector3(), rotation: Rotator = new Rotator(), shader: Shader = new SimpleShader() ) 
    {
        this._position = position;
        this._rotation = rotation;
        this._vertices = [];
        this._indices = null;
        this._shader = shader;
        this._worldMatrix = new Matrix4x4();
        this._viewProjection = new Matrix4x4();
    }
    
    public get position(): Vector3 { return this._position; }
    public set position(pos: Vector3) { this._position = pos; }
    
    public get rotation(): Rotator { return this._rotation; }
    public set rotation(rot: Rotator) { this._rotation = rot; }

    public get shader(): Shader { return this._shader; }
    public set shader(shader: Shader) { this._shader=shader; }

    protected set vertices(newVertices: number[]) { this._vertices = newVertices; }
    protected set indices(newIndices: number[]) { this._indices = newIndices; }

    private updateTransforms(): void
    {
        Matrix4x4.translate(this._worldMatrix, new Matrix4x4(),this._position);
        Matrix4x4.rotate(this._worldMatrix, this._worldMatrix , this._rotation.getRadiansPitch(), new Vector3(1, 0, 0));
        Matrix4x4.rotate(this._worldMatrix, this._worldMatrix, this._rotation.getRadiansYaw(), new Vector3(0, 1, 0));
        Matrix4x4.rotate(this._worldMatrix, this._worldMatrix, this._rotation.getRadiansRoll(), new Vector3(0, 0, 1));
    }

    private updateViewProjection(viewMatrix: Matrix4x4 = new Matrix4x4(), projectionMatrix: Matrix4x4 = new Matrix4x4()): void
    {
        Matrix4x4.multiply(
            this._viewProjection,
            viewMatrix,
            this._worldMatrix
        );
        Matrix4x4.multiply(
            this._viewProjection,
            projectionMatrix,
            this._viewProjection
        );
    }

    /**
     * Loads current object's vertices into WebGL Buffer for rendering.
     */
    public load(): void { }
    
    /**
     * Runs every frame.
     */
    public update(): void { }

    /**
     * Deletes shader program and unbind buffer associated with this shape.
     */
    public unload(): void
    {
        this._shader.remove();
        this._buffer.unbind();
    }

    /**
     * Draws data from the shape's buffers.
     */
    public draw(camera: Camera): void
    {
        this._shader.use();
        this.updateTransforms();
        this.updateViewProjection(camera.viewMatrix, camera.projectionMatrix);
        gl.uniformMatrix4fv(this._uViewProj, false, this._viewProjection.toFloat32Array());

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

export class SimpleShape extends Shape
{
    public constructor(position: Vector3 = new Vector3(), rotation: Rotator = new Rotator())
    {
        super(position, rotation, new SimpleShader() );
    }

    public override load(): void
    {
        this.shader.use();
        this._buffer = new GLArrayBuffer(6, gl.FLOAT, gl.TRIANGLES );

        if(this._indices)
        {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.bind();
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }

        let positionAttribute:AttributeInformation = {
            location: this.shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
        this._buffer.addAttribLocation(positionAttribute);

        let colorAttribute:AttributeInformation = {
            location: this.shader.getAttributeLocation("a_color"),
            size: 3, 
            offset: 3 };
        this._buffer.addAttribLocation(colorAttribute);

        this._uViewProj = this.shader.getUniformLocation('u_viewProj');
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }
}

export class TexturedShape extends Shape
{
    private _texture: Texture;

    public constructor(position: Vector3 = new Vector3(), rotation: Rotator = new Rotator(), texture: HTMLImageElement)
    {
        super(position, rotation, new TextureShader() );
        this._texture = new Texture(texture);
    }

    public override load(): void
    {
        this.shader.use();
        this._buffer = new GLArrayBuffer(5, gl.FLOAT, gl.TRIANGLES );
        
        if(this._indices)
        {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.bind();
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }
        
        let positionAttribute:AttributeInformation = {
            location: this.shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
            this._buffer.addAttribLocation(positionAttribute);
            
        this._texture.load();
        let textureAttribute:AttributeInformation = {
            location: this.shader.getAttributeLocation("a_texCoord"),
            size: 2, 
            offset: 3 };
        this._buffer.addAttribLocation(textureAttribute);
        
        this._uViewProj = this.shader.getUniformLocation('u_viewProj');
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }
}


export class LineShape extends Shape {
    public constructor(position: Vector3 = new Vector3(), rotation: Rotator = new Rotator())
    {
        super(position, rotation, new SimpleShader() );
    }

    public override load(): void
    {
        this.shader.use();
        this._buffer = new GLArrayBuffer(6, gl.FLOAT, gl.LINES );

        let positionAttribute:AttributeInformation = {
            location: this.shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
        this._buffer.addAttribLocation(positionAttribute);

        let colorAttribute:AttributeInformation = {
            location: this.shader.getAttributeLocation("a_color"),
            size: 3, 
            offset: 3 };
        this._buffer.addAttribLocation(colorAttribute);

        this._uViewProj = this.shader.getUniformLocation('u_viewProj');
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }
}