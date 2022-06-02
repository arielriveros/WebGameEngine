import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { gl } from "../render";
import { Shader } from "../shaders/shader";
import { Renderable } from "./renderable";

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
