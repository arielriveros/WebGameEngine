import { gl } from "../render";
import { GLArrayBuffer } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { AttributeInformation } from "../interfaces";
import { Shader, SimpleShader, SimpleShaderTest } from "../shaders/shader";
import { Vector3 } from "../../math/vector";
import { Matrix4x4 } from "../../math/matrix";

interface Options{
    height?: number,
    base?: number,
    color?: number[],
    position?: Vector3,
    shader?: Shader
}

/**
 * Basic Shape class for rendering vertices on screen using a shader
 */
export class Shape {
    private _buffer!: GLArrayBuffer;
    private _indexBuffer!: GLElementArrayBuffer;
    private _vertices: number[];
    private _indices: number[] | null;
    private _shader!:Shader;
    private _position: Vector3;
    private _translateUniformLocation!: WebGLUniformLocation;
    private _worldMatrix: Matrix4x4

    public get shader(): Shader {
        return this._shader;
    }

    public get position(): Vector3 {
        return this._position;
    }

    protected set vertices(newVertices: number[]) {
        this._vertices = newVertices;
    }

    protected set indices(newIndices: number[]) {
        this._indices = newIndices;
    }

    public constructor(position: Vector3 = new Vector3(), shader: Shader = new SimpleShader() ) {
        this._vertices = [
        // X   Y    Z    R    G    B
        -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
         0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
         0.0,  0.5, 0.0, 0.0, 0.0, 1.0];
         this._indices = null;
         this._position = position;
         this._shader = shader;
         this._worldMatrix = new Matrix4x4();
    }

    /**
     * Loads current object's vertices into WebGL Buffer for rendering
     */
    public load(): void {
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

        this._translateUniformLocation = this._shader.getUniformLocation('u_world');
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }

    public update(): void {
        this._shader.use();
        Matrix4x4.translation(this._worldMatrix, this._position);
        gl.uniformMatrix4fv(this._translateUniformLocation, false, this._worldMatrix.toFloat32Array());
        this.draw();
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

    public move(delta: Vector3): void {
        this._position.add(delta);
    }
}

export class Triangle extends Shape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     * @param name  Custom name of this object.
     * @param base  Length of triangle base.
     * @param height Length from the base to the opposite vertex. i.e. Height of a triangle.
     * @param color RGB Color of the triangle.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base ? options.base : 1;
        let height: number = options.height ? options.height : 1;
        let color: number[] = options.color ? options.color : [0, 0, 0];
        let position: Vector3 = options.position ? options.position : new Vector3(0, 0, 0);
        let shader: Shader = options.shader ? options.shader : new SimpleShader();
        super(position, shader);
        this.vertices = [
        //  X       Y          Z    R         G         B
           -base/2, -height/2, 0.0, color[0], color[1], color[2],
            base/2, -height/2, 0.0, color[0], color[1], color[2],
            0.0,     height/2, 0.0, color[0], color[1], color[2]];
        }
}

export class Quad extends Shape {

    /**
     * Quad Basic 2D Shape. Rendered in origin. Consists of 2 adyacent Triangles.
     * @param name  Custom name of this object.
     * @param base  Length of Quad base.
     * @param height Length of Quad height.
     * @param color RGB Color of the Quad.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base ? options.base : 1;
        let height: number = options.height ? options.height : 1;
        let color: number[] = options.color ? options.color : [0, 0, 0];
        let position: Vector3 = options.position ? options.position : new Vector3(0, 0, 0);
        let shader: Shader = options.shader ? options.shader : new SimpleShader();
        super(position, shader);
        this.vertices = [
        //  X       Y          Z    R         G         B
           -base/2, -height/2, 0.0, color[0], color[1], color[2],
            base/2, -height/2, 0.0, color[0], color[1], color[2],
           -base/2,  height/2, 0.0, color[0], color[1], color[2],
        
           -base/2,  height/2, 0.0, color[0], color[1], color[2],
            base/2, -height/2, 0.0, color[0], color[1], color[2],
            base/2,  height/2, 0.0, color[0], color[1], color[2]];
        }
}

export class Cube extends Shape {

    /**
     * Cube Basic 3D Shape. Consists of 6 Quads, 1 for each face.
     * @param name Custom name of this object.
     * @param base Length of each cube's edge.
     * @param color Color of the cube
     */
    public constructor(options: Options = {}) {
        let base: number = options.base ? options.base : 1;
        let color: number[] = options.color ? options.color : [0, 0, 0];
        let position: Vector3 = options.position ? options.position : new Vector3(0, 0, 0);
        let shader: Shader = options.shader ? options.shader : new SimpleShader();
        super(position, shader);
        const l2 = base/2;
        this.indices = [
            // Top
            0, 1, 2,
            0, 2, 3,
            // Left
            5, 4, 6,
            6, 4, 7,
            // Right
            8, 9, 10,
            8, 10, 11,
            // Front
            13, 12, 14,
            15, 14, 12,
            // Back
            16, 17, 18,
            16, 18, 19,
            // Bottom
            21, 20, 22,
            22, 20, 23
        ];
        this.vertices = [
        //   X   Y    Z   R         G         B
            // TOP
            -l2,  l2, -l2, color[0], color[1], color[2],
            -l2,  l2,  l2, color[0], color[1], color[2],
             l2,  l2,  l2, color[0], color[1], color[2],
             l2,  l2, -l2, color[0], color[1], color[2],
 
            // LEFT
            -l2,  l2,  l2, color[0], color[1], color[2],
            -l2, -l2,  l2, color[0], color[1], color[2],
            -l2, -l2, -l2, color[0], color[1], color[2],
            -l2,  l2, -l2, color[0], color[1], color[2],

            // Right
             l2,  l2,  l2, color[0], color[1], color[2],
             l2, -l2,  l2, color[0], color[1], color[2],
             l2, -l2, -l2, color[0], color[1], color[2],
             l2,  l2, -l2, color[0], color[1], color[2],

            // Front
            l2,  l2,  l2, color[0], color[1], color[2],
            l2, -l2,  l2, color[0], color[1], color[2],
           -l2, -l2,  l2, color[0], color[1], color[2],
           -l2,  l2,  l2, color[0], color[1], color[2],

            // Back
            l2,  l2, -l2, color[0], color[1], color[2],
            l2, -l2, -l2, color[0], color[1], color[2],
           -l2, -l2, -l2, color[0], color[1], color[2],
           -l2,  l2, -l2, color[0], color[1], color[2],

            // Bottom
           -l2, -l2, -l2, color[0], color[1], color[2],
           -l2, -l2,  l2, color[0], color[1], color[2],
            l2, -l2,  l2, color[0], color[1], color[2],
            l2, -l2, -l2, color[0], color[1], color[2],
        ];

        this.indices = [
            // Top
            0, 1, 2,
            0, 2, 3,
            // Left
            5, 4, 6,
            6, 4, 7,
            // Right
            8, 9, 10,
            8, 10, 11,
            // Front
            13, 12, 14,
            15, 14, 12,
            // Back
            16, 17, 18,
            16, 18, 19,
            // Bottom
            21, 20, 22,
            22, 20, 23
        ];
    }
}

export class ColorCube extends Cube {
    public constructor(options: Options = {shader: new SimpleShaderTest()}) {
        super(options);
        const l2 = options.base ? options.base/2 : 0.5;
        this.vertices = [
        //   X   Y    Z    R    G    B
            // TOP
            -l2,  l2, -l2, 1.0, 0.0, 0.0,
            -l2,  l2,  l2, 1.0, 0.0, 0.0,
             l2,  l2,  l2, 1.0, 0.0, 0.0,
             l2,  l2, -l2, 1.0, 0.0, 0.0,
    
            // LEFT
            -l2,  l2,  l2, 0.0, 1.0, 0.0,
            -l2, -l2,  l2, 0.0, 1.0, 0.0,
            -l2, -l2, -l2, 0.0, 1.0, 0.0,
            -l2,  l2, -l2, 0.0, 1.0, 0.0,

            // Right
             l2,  l2,  l2, 0.0, 0.0, 1.0,
             l2, -l2,  l2, 0.0, 0.0, 1.0,
             l2, -l2, -l2, 0.0, 0.0, 1.0,
             l2,  l2, -l2, 0.0, 0.0, 1.0,

            // Front
            l2,  l2,  l2, 1.0, 1.0, 0.0,
            l2, -l2,  l2, 1.0, 1.0, 0.0,
           -l2, -l2,  l2, 1.0, 1.0, 0.0,
           -l2,  l2,  l2, 1.0, 1.0, 0.0,

            // Back
            l2,  l2, -l2, 1.0, 0.0, 1.0,
            l2, -l2, -l2, 1.0, 0.0, 1.0,
           -l2, -l2, -l2, 1.0, 0.0, 1.0,
           -l2,  l2, -l2, 1.0, 0.0, 1.0,

            // Bottom
           -l2, -l2, -l2, 0.0, 1.0, 1.0,
           -l2, -l2,  l2, 0.0, 1.0, 1.0,
            l2, -l2,  l2, 0.0, 1.0, 1.0,
            l2, -l2, -l2, 0.0, 1.0, 1.0,
        ];
    }
}