import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { gl } from "../render";
import { Shader } from "../shaders/shader";
import { Renderable } from "./renderable";
import { Texture } from "./texture";

export class CompoundShape extends Renderable
{
    private _texture: Texture;

    public constructor(texturePath?: string)
    {
        super("textured");
        this._texture = new Texture(texturePath);
    }

    public override load(shader: Shader): void
    {
        this._vertexBuffer = new GLArrayBuffer(8, gl.FLOAT, gl.TRIANGLES );
        
        if(this._indices)
        {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }
        
        let positionAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
            this._vertexBuffer.addAttribLocation(positionAttribute);

        let colorAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_color"),
            size: 3, 
            offset: 3 };
        this._vertexBuffer.addAttribLocation(colorAttribute);
            
        this._texture.load();
        let textureAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_texCoord"),
            size: 2, 
            offset: 6 };
        this._vertexBuffer.addAttribLocation(textureAttribute);

        if(this._normals)
        {
            this._normalBuffer = new GLArrayBuffer(3, gl.FLOAT, gl.TRIANGLES);
            let normalAttribute:AttributeInformation = {
                location: shader.getAttributeLocation("a_normal"),
                size: 3, 
                offset: 0 };
            this._normalBuffer.addAttribLocation(normalAttribute);

            this._normalBuffer.bind();
            this._normalBuffer.pushData(this._normals);
            this._normalBuffer.upload();
        }

        this._vertexBuffer.pushData(this._vertices);
        this._vertexBuffer.upload();
        }
        
    /**
     * Draws data from the shape's buffers.
     */
     public override draw(): void
     {
         this._vertexBuffer.bind();
         this._texture.bind();
         if(this.normals) { this._normalBuffer.bind(); }

         if(this._indices) { this._indexBuffer.bind(); this._indexBuffer.draw(); }
         else { this._vertexBuffer.draw(); }
     }
}
