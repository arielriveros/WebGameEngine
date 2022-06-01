import { Vector3 } from "math";
import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { gl } from "../render";
import { Shader } from "../shaders/shader";
import { Options, Renderable } from "./renderable";


export class SimpleShape extends Renderable {
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

export class Line extends SimpleShape {

    public constructor(options: Options = {}, origin?: Vector3, end?: Vector3) {
        let base: number = options.base || 1;
        let color: number[] = options.color || [0, 0, 0];

        let x_0 = origin ? origin.x : 0;
        let y_0 = origin ? origin.y : 0;
        let z_0 = origin ? origin.z : 0;

        let x_1 = end ? end.x : base;
        let y_1 = end ? end.y : 0;
        let z_1 = end ? end.z : 0;

        super();
        this.vertices = [
        //  X    Y    Z    R         G         B
            x_0, y_0, z_0, color[0], color[1], color[2],
            x_1, y_1, z_1, color[0], color[1], color[2]];
        }
}
