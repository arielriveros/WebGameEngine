import { Transform } from "math";
import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { gl } from "../render";
import { Shader } from "../shaders/shader";
import { Cubemap } from "./cubemap";
import { Renderable } from "./shapes";

export class Skybox extends Renderable
{
    private _cubemap: Cubemap;

    public constructor(texturePaths: string[])
    {
      super("skybox");
      this._cubemap = new Cubemap(texturePaths);

      let base: number = 10000;
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
        // VERTEX POSITION
        // X    Y    Z  
        // TOP
          -l2,  l2, -l2,
          -l2,  l2,  l2,
           l2,  l2,  l2,
           l2,  l2, -l2,
        // LEFT
          -l2,  l2,  l2,
          -l2, -l2,  l2,
          -l2, -l2, -l2,
          -l2,  l2, -l2,
        // Right
           l2,  l2,  l2,
           l2, -l2,  l2,
           l2, -l2, -l2,
           l2,  l2, -l2,
        // Front
           l2,  l2,  l2,
           l2, -l2,  l2,
          -l2, -l2,  l2,
          -l2,  l2,  l2,
        // Back
           l2,  l2, -l2,
           l2, -l2, -l2,
          -l2, -l2, -l2,
          -l2,  l2, -l2,
        // Bottom
          -l2, -l2, -l2,
          -l2, -l2,  l2,
           l2, -l2,  l2,
           l2, -l2, -l2,
        ];
    }

    public override load(shader: Shader): void
    {
      this._vertexBuffer = new GLArrayBuffer(3, gl.FLOAT, gl.TRIANGLES );
      
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
          
      this._cubemap.load();

      this._vertexBuffer.pushData(this._vertices);
      this._vertexBuffer.upload();
    }
        
    /**
     * Draws data from the shape's buffers.
     */
     public override draw(): void
     {
      this._vertexBuffer.bind();
      this._cubemap.bind();

      if(this._indices) { this._indexBuffer.bind(); this._indexBuffer.draw(); }
      else { this._vertexBuffer.draw(); }
     }
}