import { Buffer } from "./buffer";
import { gl } from "../render";

/**
 * (location, size, offset)
 */
 export interface AttributeInformation {
    /**
     * Location of the attribute.
     */
    location: number;
    /**
     * Number of elements in this attribute. If Vector2 then = 2, Vector3 = 3 and so on.
     */
    size: number;
    /**
     * Number of elements starting from the beggining of the buffer.
     */
    offset: number;
}


export class GLArrayBuffer extends Buffer {
    private _size: number;
    private _stride: number;
    private _hasAttribLocation: boolean = false;
    private _attributes: AttributeInformation[] = [] ;

    public constructor( size: number, dataType: number = gl.FLOAT, mode: number = gl.TRIANGLES) {
        super(dataType, gl.ARRAY_BUFFER, mode);
        this._size = size;
        // Stride is determined by the element size and the type size of each the element
        this._stride = this._size * this.typeSize;
    }

    /**
     * Binds this buffer.
     */
     public override bind(): void {
        gl.bindBuffer(this.target, this.buffer);

        // Checks for attribute location
        if (this._hasAttribLocation) {
            for( let attrib of this._attributes) {
                gl.vertexAttribPointer(
                    attrib.location, // Attribute location
                    attrib.size,     // Number of elements of each attribute
                    this.dataType,  // Type of elements
                    false,           // Normalized?
                    this._stride,    // Size of a vertex
                    attrib.offset * this.typeSize);
                gl.enableVertexAttribArray(attrib.location);
            }
        }
    }

    /**
     * Unbinds this buffer.
     */
     public unbind(): void {
        for( let attrib of this._attributes) {
            gl.disableVertexAttribArray( attrib.location );
        }
    }

    /**
     * Adds attributes to the buffer.
     * @param info information to provide the buffer with.
     */
    public addAttribLocation(info: AttributeInformation): void {
        this._hasAttribLocation = true;
        this._attributes.push(info);
    }

    public override draw(): void {
        gl.drawArrays(this.mode, 0, this.data.length/this._size);
    }
}