import { gl } from "../render";
import { Buffer } from "../gl/buffer";
import { AttributeInformation } from "../interfaces";
import { Shader } from "../shaders/shader";

/**
 * Basic Shape class for rendering vertices on screen using a shader
 */
export class Shape {
    private _name: string;
    private _buffer!: Buffer;
    private _indexBuffer!: Buffer;
    protected _vertices: number[];
    protected _indices: number[] | null;
    private _shader!:Shader;

    public constructor(name:string) {
        this._name = name;
        this._shader = new Shader();
        this._shader.use();
        this._vertices = [
        // X   Y    Z    R    G    B
        -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
         0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
         0.0,  0.5, 0.0, 0.0, 0.0, 1.0];
         this._indices = null;
    }

    /**
     * Loads current object's vertices into WebGL Buffer for rendering
     */
    public load(): void {
        this._buffer = new Buffer(6, gl.FLOAT, gl.ARRAY_BUFFER, gl.TRIANGLES );

        if(this._indices) {
            this._indexBuffer = new Buffer(6, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER, gl.TRIANGLES);
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

        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }

    public update(deltaTime: number): void {}

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

export class Triangle extends Shape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     * @param name  Custom name of this object.
     * @param base  Length of triangle base.
     * @param height Length from the base to the opposite vertex. i.e. Height of a triangle.
     * @param color RGB Color of the triangle.
     */
    public constructor(name: string, base: number = 1, height: number = 1, color: number[] = [1.0, 1.0, 1.0]) {
        super(name);
        super._vertices = [
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
    public constructor(name: string, base: number = 1, height: number = 1, color: number[] = [1.0, 1.0, 1.0]) {
        super(name);
        super._vertices = [
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
     * @param length Length of each cube's edge.
     * @param color Color of the cube
     */
    public constructor(name: string, length: number = 1, color: number[] = [1.0, 1.0, 1.0]) {
        super(name);
        const l2 = length/2;
        super._indices = [
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
        super._vertices = [
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

        super._indices = [
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
    public constructor(name: string, length: number = 1) {
        super(name);
        const l2 = length/2;
        super._vertices = [
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