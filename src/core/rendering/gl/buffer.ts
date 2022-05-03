import { gl } from "../render";
import { AttributeInformation } from "./interfaces";

/**
 * Encapsulates a WebGL Buffer
 */
export class Buffer{
    private _size: number;
    private _dataType: number;
    private _target: number;
    private _mode: number;
    private _typeSize: number;
    private _stride: number;
    private _buffer: WebGLBuffer;    
    
    private _data: number[] = [];
    private _hasAttribLocation: boolean = false;
    private _attributes: AttributeInformation[] = [] ;
    
    /**
     * Creates a new WebGL Buffer.
     * @param size Size of each element.
     * @param dataType Data type of buffer.
     * @param target Target type of buffer. gl.ARRAY_BUFFER || gl.ELEMENT_ARRAY_BUFFER
     * @param mode Primitive drawing mode of the buffer.
     */
    public constructor( size: number, dataType: number = gl.FLOAT, target: number = gl.ARRAY_BUFFER, mode: number = gl.TRIANGLES) {
        this._size = size;
        this._dataType = dataType;
        this._target = target;
        this._mode = mode;
        

        // Type size is based on the data type passed to the buffer.
        switch(this._dataType) {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                this._typeSize = 4;
                break;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                this._typeSize = 2;
                break;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                this._typeSize = 1;
                break
            default:
                throw new Error(`Invalid datatype ${dataType.toString()}`);
        }

        // Stride is determined by the element size and the type size of each the element
        this._stride = this._size * this._typeSize;

        // Creates a not null WebGLBuffer object and asigns it to this buffer object.
        this._buffer = gl.createBuffer() as WebGLBuffer;
    }

    /**
     * Clean up function for destroying buffers
     */
    public destroy(): void {
        gl.deleteBuffer(this._buffer);
    }

    /**
     * Binds this buffer.
     */
    public bind(): void {
        gl.bindBuffer(this._target, this._buffer);

        // Checks for attribute location
        if (this._hasAttribLocation) {
            for( let attrib of this._attributes) {
                gl.vertexAttribPointer(
                    attrib.location,
                    attrib.size,
                    this._dataType,
                    false,
                    this._stride,
                    attrib.offset * this._typeSize);
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

    /**
     * Adds data to this buffer.
     */
    public pushData( data: number[]) {
        gl.bindBuffer(this._target, this._buffer);
        let dataToBuffer: ArrayBuffer|null = null;
        // Array type is based on the data type passed to the buffer.
        switch(this._dataType){
            case gl.FLOAT:
                dataToBuffer = new Float32Array(this._data);
                break
            case gl.INT:
                dataToBuffer = new Int32Array(this._data);
                break
            case gl.UNSIGNED_INT:
                dataToBuffer = new Uint32Array(this._data);
                break
            case gl.SHORT:
                dataToBuffer = new Int16Array(this._data);
                break
            case gl.UNSIGNED_SHORT:
                dataToBuffer = new Uint16Array(this._data);
                break
            case gl.BYTE:
                dataToBuffer = new Int8Array(this._data);
                break
            case gl.UNSIGNED_BYTE:
                dataToBuffer = new Uint8Array(this._data);
                break
            default:
                dataToBuffer = null;
                break;
        }
        if (dataToBuffer){
            gl.bufferData(this._target, dataToBuffer, this._mode);
        }   
    }

    /** 
     * Draws this Buffer
     */
    public draw() {
        if (this._target === gl.ARRAY_BUFFER) {
            gl.drawArrays(this._mode, 0, this._data.length/this._size);
        }

        else if (this._target === gl.ELEMENT_ARRAY_BUFFER) {
            gl.drawElements(this._mode, this._data.length, this._dataType, 0);
        }
    }
}