import { LOG } from "utils";
import { gl } from "../render";

/**
 * Encapsulates a WebGL Buffer
 */
export class Buffer{

    private _dataType: number;
    private _target: number;
    private _mode: number;
    private _typeSize: number;
    private _buffer: WebGLBuffer;
    private _data: number[] = [];

    protected get dataType(): number {
        return this._dataType
    }

    protected get target(): number {
        return this._target;
    }

    protected get mode(): number {
        return this._mode;
    }

    protected get typeSize(): number {
        return this._typeSize;
    }

    protected get buffer(): WebGLBuffer {
        return this._buffer;
    }

    protected get data(): number[] {
        return this._data;
    }
    
    /**
     * Creates a new WebGL Buffer.
     * @param dataType Data type of buffer.
     * @param mode Primitive drawing mode of the buffer.
     */
    public constructor(dataType: number = gl.FLOAT, target: number = gl.ARRAY_BUFFER, mode: number = gl.TRIANGLES) {
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
                break;
            default:
                LOG(`Invalid datatype ${dataType.toString()}`, 'error', true);
                throw new Error()
                break;
        }

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
    }

    /**
     * Adds data to this buffer.
     */
    public pushData( data: number[]): void {
        for (let d of data) {
            this._data.push(d);
        }
    }

    /**
     * Uploads content from this buffer to the GPU
     */
    public upload(): void {
        gl.bindBuffer(this._target, this._buffer);
        let dataToBuffer: ArrayBuffer | null = null;
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

        if (dataToBuffer) {
            gl.bufferData(this._target, dataToBuffer, gl.STATIC_DRAW);
        }   
    }

    /** 
     * Draws this Buffer
     */
    public draw(): void { }
}