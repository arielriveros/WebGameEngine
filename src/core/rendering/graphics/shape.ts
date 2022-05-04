import { gl } from "../render";
import { Buffer } from "../gl/buffer";
import { AttributeInformation } from "../interfaces";
import { Shader } from "../shaders/shader";

export class Shape {
    private _name: string;
    private _buffer!: Buffer;
    protected _vertices: number[];
    private _shader!:Shader;

    public constructor(shader:Shader, name:string) {
        this._name = name;
        this._shader = shader;
        this._vertices = [
        //  X    Y    Z    R    G    B
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    }

    public load(): void {
        this._buffer = new Buffer(6, gl.FLOAT, gl.ARRAY_BUFFER, gl.TRIANGLES );

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

    public update(deltaTime: number): void {

    }

    public draw(): void {
        this._buffer.bind();
        this._buffer.draw();
    }
}

export class ColorTriangle extends Shape {

    public constructor(shader:Shader, name: string, base: number = 1, height: number = 1) {
        super(shader, name);
        super._vertices = [
        //  X       Y          Z    R    G    B
           -base/2, -height/2, 0.0, 1.0, 0.0, 0.0,
            base/2, -height/2, 0.0, 0.0, 1.0, 0.0,
            0.0,     height/2, 0.0, 0.0, 0.0, 1.0];
        }
}

export class Triangle extends Shape {

    public constructor(shader:Shader, name: string, base: number = 1, height: number = 1, color: number[] = [1.0, 1.0, 1.0]) {
        super(shader, name);
        super._vertices = [
        //  X       Y          Z    R         G         B
           -base/2, -height/2, 0.0, color[0], color[1], color[2],
            base/2, -height/2, 0.0, color[0], color[1], color[2],
            0.0,     height/2, 0.0, color[0], color[1], color[2]];
        }
}

export class Quad extends Shape {

    public constructor(shader:Shader, name: string, base: number = 1, height: number = 1, color: number[] = [1.0, 1.0, 1.0]) {
        super(shader, name);
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