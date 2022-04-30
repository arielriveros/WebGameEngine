import { gl } from './gl';

export interface AttributeInfo {
    location: number;
    size: number;
    offset: number;
}
/**
 * Class that encapsulates WebGL Buffer behaviour and functionality.
 */
export class Buffer {
    private _hasAttributeLocation: boolean = false;
    private _elementSize: number;
    private _stride: number;
    private _buffer: WebGLBuffer | null;
    private _targetBufferType: number;
    private _dataType: number;
    private _mode: number;
    private _typeSize: number;
    private _data: number[] = [];
    private _attributes: AttributeInfo[] = [];
    public constructor(
        elementSize: number, 
        dataType: number = gl.FLOAT, 
        targetBufferType: number = gl.ARRAY_BUFFER,
        mode: number = gl.TRIANGLES) {
            this._elementSize = elementSize;
            this._dataType = dataType;
            this._targetBufferType = targetBufferType;
            this._mode = mode;
            // Determine byte size
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
                    throw new Error(`Bad data type ${dataType.toString()}`);
            }
            this._stride = this._elementSize * this._typeSize;
            this._buffer = gl.createBuffer();
    }
    /**
     * Destructor for the current buffer in use.
     */
    public destroy(): void {
        gl.deleteBuffer(this._buffer);
    }
    /**
     * Binds this buffer.
     * @param normalized flag for normalizing vertex attribute pointer
     */
    public bind(normalized: boolean = false): void {
        gl.bindBuffer(this._targetBufferType, this._buffer);
        if (this._hasAttributeLocation) {
            for(let it of this._attributes) {
                gl.vertexAttribPointer(
                    it.location, 
                    it.size, 
                    this._dataType, 
                    normalized, 
                    this._stride,
                    it.offset * this._typeSize);
                gl.enableVertexAttribArray(it.location);
            }
        }
    }
    /**
     * Unbinds this buffer.
     */
    public unbind(): void {
        for(let it of this._attributes) {
            gl.disableVertexAttribArray(it.location);
        }
        gl.bindBuffer(this._targetBufferType, null);
    }
    public addAttributeLocation(info: AttributeInfo): void {
        this._hasAttributeLocation = true;
        this._attributes.push(info);
    }
    public uploadData():void {
        gl.bindBuffer(this._targetBufferType, this._buffer);
        let bufferData: ArrayBuffer|null = null;
        switch (this._dataType) {
            case gl.FLOAT:
                bufferData = new Float32Array(this._data);
                break;
            case gl.INT:
                bufferData = new Int32Array(this._data);
                break
            case gl.UNSIGNED_INT:
                bufferData = new Uint32Array(this._data);
                break;
            case gl.SHORT:
                bufferData = new Int16Array(this._data);
                break;
            case gl.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this._data);
                break;
            case gl.BYTE:
                bufferData = new Int8Array(this._data);
                break;
            case gl.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this._data);
                break;
        }
        gl.bufferData(this._targetBufferType, bufferData, gl.STATIC_DRAW);
    }
    public pushBackData(data: number[]): void {
        for(let d of data) {
            this._data.push(d);
        }
    }
    /**
     * Renders the content of the buffer
     */
    public draw(): void {
        if (this._targetBufferType === gl.ARRAY_BUFFER) {
            gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
        }
        else if (this._targetBufferType === gl.ELEMENT_ARRAY_BUFFER) {
            gl.drawElements(this._mode, this._data.length, this._dataType, 0);
        }
    }
}
