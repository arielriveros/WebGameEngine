export class Vector2
{
    protected _data: number[];

    public constructor(x: number = 0, y: number = 0)
    {
        this._data = [x, y];
    }

    public get x(): number
    {
        return this._data[0];
    }

    public set x(value: number)
    {
        this._data[0] = value;
    }

    public get y(): number
    {
        return this._data[1];
    }

    public set y(value: number)
    {
        this._data[1] = value;
    }

    public length(): number
    {
        let sum: number = 0.0;
        this._data.forEach( i => { sum += i * i; }  );
        return Math.sqrt(sum);
    }

    public toArray(): number[]
    {
        return this._data;
    }

    public toFloat32Array(): Float32Array
    {
        return new Float32Array(this.toArray());
    }

    public toString(): string
    {
        const map = ['x', ', y', ', z', ', w']
        let out = '{';
        for (const [i, e] of this._data.entries())
        {
            out += `${map[i]}: ${e}`;
        }
        out += '}';
        return out;
    }

    public add(v: Vector3): void
    {
        for (const i in this._data)
        {
            this._data[i] += v._data[i];
        }
    }

    public multiply(v: number): void
    {
        for (const i in this._data)
        {
            this._data[i] * v;
        }
    }

    public opposite(): void
    {
        for (const i in this._data)
        {
            this._data[i] = -this._data[i];
        }
    }
}

export class Vector3 extends Vector2
{
    
    public constructor(x: number = 0, y: number = 0, z: number = 0)
    {
        super(x, y);
        this._data.push(z);
    }

    public get z(): number
    {
        return this._data[2];
    }

    public set z(value: number)
    {
        this._data[2] = value;
    }

    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }
}

export class Vector4 extends Vector3
{
    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0)
    {
        super(x, y, z);
        this._data.push(w);
    }

    public get w(): number
    {
        return this._data[3];
    }

    public set w(value: number)
    {
        this._data[3] = value;
    }
}