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
}