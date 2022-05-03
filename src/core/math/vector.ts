export class Vector2 {
    private _x: number;
    private _y: number;
    public constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }
    public get x(): number {
        return this._x
    }
    public set x(value: number) {
        this._x = value;
    }
    public get y(): number {
        return this._y
    }
    public set y(value: number) {
        this._y = value;
    }
    public toArray(): number[] {
        return [this._x, this._y];
    }
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
    public length(): number {
        let x2 = this._x * this._x;
        let y2 = this._y * this._y;
        return Math.sqrt(x2+y2);
    }
}

export class Vector3 extends Vector2{
    private _z: number;
    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y);
        this._z = z;
    }
    public get z(): number {
        return this._z;
    }
    public set z(value: number) {
        this._z = value;
    }
    public toArray(): number[] {
        return [this.x, this.y, this._z];
    }
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
    public length(): number {
        let x2 = this.x * this.x;
        let y2 = this.y * this.y;
        let z2 = this._z * this._z;
        return Math.sqrt(x2+y2+z2);
    }
}

export class Vector4 extends Vector3 {
    private _w: number;
    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        super(x, y, z);
        this._w = w;
    }
    public get w(): number {
        return this._w;
    }
    public set w(value: number) {
        this._w = value;
    }
    public toArray(): number[] {
        return [this.x, this.y, this.z, this._w];
    }
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
    public length(): number {
        let x2 = this.x * this.x;
        let y2 = this.y * this.y;
        let z2 = this.z * this.z;
        let w2 = this._w * this._w;
        return Math.sqrt(x2+y2+z2+w2);
    }
}