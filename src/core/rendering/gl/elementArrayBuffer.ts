import { Buffer } from "./buffer";
import { gl } from "../render";

export class GLElementArrayBuffer extends Buffer {
    public constructor(dataType: number = gl.UNSIGNED_SHORT, mode: number = gl.TRIANGLES) {
        super(dataType, gl.ELEMENT_ARRAY_BUFFER, mode);
    }

    public override draw(): void {
        gl.drawElements(this.mode, this.data.length, this.dataType, 0);
    }
}