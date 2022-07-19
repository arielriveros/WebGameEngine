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
        this._vertexBuffer = new GLArrayBuffer(3, gl.FLOAT, gl.LINES );

        let positionAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
        this._vertexBuffer.addAttribLocation(positionAttribute);

        if(this._colors)
        {
            this._colorBuffer = new GLArrayBuffer(3, gl.FLOAT, gl.TRIANGLES);
            let colorAttribute:AttributeInformation = {
                location: shader.getAttributeLocation("a_color"),
                size: 3,
                offset: 0 };
            this._colorBuffer.addAttribLocation(colorAttribute);
            
            this._colorBuffer.pushData(this._colors);
            this._colorBuffer.upload();
        }
        
        this._vertexBuffer.pushData(this._vertices);
        this._vertexBuffer.upload();
    }
}
