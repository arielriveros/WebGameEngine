import { gl } from "../render";
import { GLArrayBuffer } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { AttributeInformation } from "../interfaces";
import { Shader, SimpleShader, SimpleShaderTest, TextureShader } from "../shaders/shader";
import { Vector3, Matrix4x4, Rotator } from "math";
import { Texture } from "./texture";

export interface Options{
    height?: number,
    base?: number,
    color?: number[],
    position?: Vector3,
    rotation?: Rotator,
}

/**
 * Basic Shape class for rendering vertices on screen using a shader
 */
export abstract class Shape {
    protected _buffer!: GLArrayBuffer;
    protected _indexBuffer!: GLElementArrayBuffer;
    protected _vertices: number[];
    protected _indices: number[] | null;
    protected _shader!: Shader;
    protected _position: Vector3;
    protected _rotation: Rotator;
    protected _uWorld!: WebGLUniformLocation;
    protected _worldMatrix: Matrix4x4

    public get shader(): Shader { return this._shader; }

    public get position(): Vector3 { return this._position; }
    public set position(value: Vector3) { this._position = value; }

    public get rotation(): Rotator { return this._rotation; }
    public set rotation(value: Rotator) { this._rotation = value; }

    protected set vertices(newVertices: number[]) { this._vertices = newVertices; }
    protected set indices(newIndices: number[]) { this._indices = newIndices; }

    public constructor(position: Vector3 = new Vector3(), rotation: Rotator = new Rotator(), shader: Shader = new SimpleShader() ) {
        this._vertices = [];
        this._indices = null;
        this._position = position;
        this._rotation = rotation;
        this._shader = shader;
        this._worldMatrix = new Matrix4x4();
    }

    /**
     * Loads current object's vertices into WebGL Buffer for rendering
     */
    public load(): void { }

    public update(): void {
        this._shader.use();
        let trans = Matrix4x4.translate(this._worldMatrix, new Matrix4x4(),this._position);
        let pitchRot = Matrix4x4.rotate(this._worldMatrix, trans , this._rotation.getRadiansPitch(), new Vector3(1, 0, 0));
        let yawRot = Matrix4x4.rotate(this._worldMatrix, pitchRot, this._rotation.getRadiansYaw(), new Vector3(0, 1, 0));
        let rollRot = Matrix4x4.rotate(this._worldMatrix, yawRot, this._rotation.getRadiansRoll(), new Vector3(0, 0, 1));
        gl.uniformMatrix4fv(this._uWorld, false, this._worldMatrix.toFloat32Array());
        this.draw();
    }

    public unload(): void {
        this._shader.remove();
        this._buffer.unbind();
    }

    public draw(): void {
        this._buffer.bind();
        if(this._indices) {
            this._indexBuffer.draw();
        }
        else{
            this._buffer.draw();
        }
    }
}

export class SimpleShape extends Shape {
    public constructor(position: Vector3 = new Vector3(), rotation: Rotator = new Rotator()) {
        super(position, rotation, new SimpleShader() );
    }

    public override load(): void {
        this._shader.use();
        this._buffer = new GLArrayBuffer(6, gl.FLOAT, gl.TRIANGLES );

        if(this._indices) {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.bind();
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }

        let positionAttribute:AttributeInformation = {
            location: this._shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
        this._buffer.addAttribLocation(positionAttribute);

        let colorAttribute:AttributeInformation = {
            location: this._shader.getAttributeLocation("a_color"),
            size: 3, 
            offset: 3 };
        this._buffer.addAttribLocation(colorAttribute);

        this._uWorld = this._shader.getUniformLocation('u_world');
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }
}

export class TexturedShape extends Shape {

    private _texture: Texture;

    public constructor(position: Vector3 = new Vector3(), rotation: Rotator = new Rotator(), texture: HTMLImageElement) {
        super(position, rotation, new TextureShader() );
        this._texture = new Texture(texture);
    }

    public override load(): void {
        this._shader.use();
        this._buffer = new GLArrayBuffer(5, gl.FLOAT, gl.TRIANGLES );
        
        if(this._indices) {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.bind();
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }
        
        let positionAttribute:AttributeInformation = {
            location: this._shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
            this._buffer.addAttribLocation(positionAttribute);
            
        this._texture.load();
        let textureAttribute:AttributeInformation = {
            location: this._shader.getAttributeLocation("a_texCoord"),
            size: 2, 
            offset: 3 };
        this._buffer.addAttribLocation(textureAttribute);
        
        this._uWorld = this._shader.getUniformLocation('u_world');
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }
}