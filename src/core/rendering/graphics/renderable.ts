import { GLArrayBuffer } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { AttributeInformation } from "../interfaces";
import { Shader, SimpleShader, TextureShader } from "../shaders/shader";
import { Vector3, Matrix4x4, Rotator } from "math";
import { Texture } from "./texture";
import { gl } from "../render";
import { Camera } from "../../world/camera";

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
    private _position: Vector3;
    private _rotation: Rotator;
    private _scale: Vector3;

    protected _vertices: number[];
    protected _indices: number[] | null;

    private _shader: Shader;
    protected _buffer!: GLArrayBuffer;
    protected _indexBuffer!: GLElementArrayBuffer;
    protected _uWorld!: WebGLUniformLocation;
    protected _uViewProj!: WebGLUniformLocation;
    
    protected _worldMatrix: Matrix4x4;
    protected _viewProjection: Matrix4x4;;
    
    /**
     * @param shader   Shader to use for rendering.
     */
    public constructor(shader: Shader = new SimpleShader() ) 
    {
        this._position = new Vector3();
        this._rotation = new Rotator();
        this._scale = new Vector3(1, 1, 1);
        this._vertices = [];
        this._indices = null;
        this._shader = shader;
        this._worldMatrix = new Matrix4x4();
        this._viewProjection = new Matrix4x4();
    }
    
    /**
     * Gets the position of the object in world space.
     */
    public get position(): Vector3 { return this._position; }
    /**
     * Sets the position of the object in world space.
     */
    public set position(pos: Vector3) { this._position = pos; }
    
    /**
     * Gets the rotation of the object in world space.
     */
    public get rotation(): Rotator { return this._rotation; }
    /**
     * Sets the rotation of the object in world space.
     */
    public set rotation(rot: Rotator) { this._rotation = rot; }

    /**
     * Gets the scale of the object in world space.
     */
    public get scale(): Vector3 { return this._scale; }
    /**
     * Sets the scale of the object in world space.
     */
    public set scale(scale: Vector3) { this._scale = scale; }

    /**
     * Gets the shader used for rendering.
     */
    public get shader(): Shader { return this._shader; }
    /**
     * Sets the shader used for rendering.
     */
    public set shader(shader: Shader) { this._shader=shader; }

    /**
     * Sets the vertices of the object for the vertex array buffer.
     */
    protected set vertices(newVertices: number[]) { this._vertices = newVertices; }
    /**
     * Sets the indices of the object for the element array buffer.
     */
    protected set indices(newIndices: number[]) { this._indices = newIndices; }

    /**
     * Updates the world matrix of the object.
     */
    private updateTransforms(): void
    {
        Matrix4x4.translate(this._worldMatrix, new Matrix4x4(),this._position);
        Matrix4x4.rotateWithRotator(this._worldMatrix, this._worldMatrix, this._rotation);
        Matrix4x4.scale(this._worldMatrix, this._worldMatrix, this._scale);
    }

    /**
     * Updates the view projection matrix of the object.
     * @param viewMatrix Camera View matrix.
     * @param projectionMatrix Camera Projection Matrix
     */
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
     * @param camera Camera to use for rendering.
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

export class SimpleShape extends Renderable
{
    public constructor()
    {
        super(new SimpleShader() );
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

export class TexturedShape extends Renderable
{
    private _texture: Texture;

    public constructor(texture: HTMLImageElement)
    {
        super(new TextureShader() );
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

export class LineShape extends Renderable {
    public constructor()
    {
        super(new SimpleShader() );
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