export class Vector
{
    private _x: number;
    private _y: number;

    public constructor(x: number = 0, y: number = 0)
    {
        this._x = x;
        this._y = y;
    }

    public get x(): number
    {
        return this._x;
    }

    public set x(value: number)
    {
        this._x = value;
    }

    public get y(): number
    {
        return this._y;
    }

    public set y(value: number)
    {
        this._y = value;
    }

    public length(): number
    {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    public toArray(): number[]
    {
        return [this._x, this._y];
    }

    public toFloat32Array(): Float32Array
    {
        return new Float32Array(this.toArray());
    }

    public toString(): string
    {
        return `{x: ${this._x}, y: ${this._y}}`;
    }

    public clone(): Vector
    {
        return new Vector(this._x, this._y);
    }

    public add(v: Vector): Vector
    {
        this._x += v._x;
        this._y += v._y;
        return this;
    }

    public scale(v: number): Vector
    {
        this._x *= v;
        this._y *= v;
        return this;
    }

    public multiply(v: Vector): Vector
    {
        this._x *= v._x;
        this._y *= v._y;
        return this;
    }

    public opposite(): Vector
    {
        this.scale(-1);
        return this;
    }
}

export class Vector3
{
    private _x: number;
    private _y: number;
    private _z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0)
    {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public get x(): number
    {
        return this._x;
    }

    public set x(value: number)
    {
        this._x = value;
    }

    public get y(): number
    {
        return this._y;
    }

    public set y(value: number)
    {
        this._y = value;
    }

    public get z(): number
    {
        return this._z;
    }

    public set z(value: number)
    {
        this._z = value;
    }

    public length(): number
    {
        let x = this._x;
        let y = this._y;
        let z = this._z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    public toArray(): number[]
    {
        return [this._x, this._y, this._z];
    }

    public toFloat32Array(): Float32Array
    {
        return new Float32Array(this.toArray());
    }

    public toString(): string
    {
        return `{x: ${this._x}, y: ${this._y}, z: ${this._z}}`;
    }

    public clone(): Vector3
    {
        return new Vector3(this._x, this._y, this._z);
    }

    public add(v: Vector3): Vector3
    {
        this._x += v._x;
        this._y += v._y;
        this._z += v._z;
        return this;
    }

    public scale(v: number): Vector3
    {
        this._x *= v;
        this._y *= v;
        this._z *= v;
        return this;
    }

    public multiply(v: Vector3): Vector3
    {
        this._x *= v._x;
        this._y *= v._y;
        this._z *= v._z;
        return this;
    }

    public opposite(): Vector3
    {
        this.scale(-1);
        return this;
    }

    public inverse(): Vector3
    {
        this._x = this._x !== 0 ? 1 / this._x : 0;
        this._y = this._y !== 0 ? 1 / this._y : 0;
        this._z = this._z !== 0 ? 1 / this._z : 0;
        return this;
    }
}

export class Vector4
{
    private _x: number;
    private _y: number;
    private _z: number;
    private _w: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0)
    {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }

    public get x(): number
    {
        return this._x;
    }

    public set x(value: number)
    {
        this._x = value;
    }

    public get y(): number
    {
        return this._y;
    }

    public set y(value: number)
    {
        this._y = value;
    }

    public get z(): number
    {
        return this._z;
    }

    public set z(value: number)
    {
        this._z = value;
    }

    public get w(): number
    {
        return this._w;
    }

    public set w(value: number)
    {
        this._w = value;
    }

    public length(): number
    {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }

    public toArray(): number[]
    {
        return [this._x, this._y, this._z, this._w];
    }

    public toFloat32Array(): Float32Array
    {
        return new Float32Array(this.toArray());
    }

    public toString(): string
    {
        return `{x: ${this._x}, y: ${this._y}, z: ${this._z}, w: ${this._w}}`;
    }

    public clone(): Vector4
    {
        return new Vector4(this._x, this._y, this._z, this._w);
    }

    public add(v: Vector4): Vector4
    {
        this._x += v._x;
        this._y += v._y;
        this._z += v._z;
        this._w += v._w;
        return this;
    }

    public scale(v: number): Vector4
    {
        this._x *= v;
        this._y *= v;
        this._z *= v;
        this._w *= v;
        return this;
    }

    public multiply(v: Vector4): Vector4
    {
        this._x *= v._x;
        this._y *= v._y;
        this._z *= v._z;
        this._w *= v._w;
        return this;
    }

    public opposite(): Vector4
    {
        this.scale(-1);
        return this;
    }
}