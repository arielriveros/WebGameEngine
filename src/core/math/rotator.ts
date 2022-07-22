import { PI_180, Vector3 } from "math";

export class Rotator {
    private _pitch: number;
    private _yaw: number;
    private _roll: number;

    public constructor(pitch: number = 0, yaw: number = 0, roll: number = 0) {
        this._pitch = pitch % 360;
        this._yaw = yaw % 360;
        this._roll = roll % 360;
    }
    public get pitch(): number { return this._pitch; }
    public set pitch(value: number) { this._pitch = value % 360; }
    public getRadiansPitch(): number { return this._pitch * PI_180; }
    
    public get yaw(): number { return this._yaw; }
    public set yaw(value: number) { this._yaw = value % 360; }
    public getRadiansYaw(): number { return this._yaw * PI_180; }
    
    public get roll(): number { return this._roll; }
    public set roll(value: number) { this._roll = value % 360; }
    public getRadiansRoll(): number { return this._roll * PI_180; }

    public add(rotator: Rotator): void {
        this.roll = (this._roll + rotator.roll);
        this.yaw = (this._yaw + rotator.yaw);
        this.pitch = (this._pitch + rotator.pitch);
    }

    public toVector3(): Vector3 {
        return new Vector3(this._pitch * PI_180, this._yaw * PI_180, this._roll * PI_180);
    }

    public rotateVector3(out: Vector3): Vector3 {
        const pitch = this._pitch * PI_180;
        const yaw = this._yaw * PI_180;
        const roll = this._roll * PI_180;
        
    //   (  cos(y) cos(z) | -sin(z) | sin(y) cos(z)
    //      cos(x) cos(y) sin(z) + sin(x) sin(y) | cos(x) cos(z) | cos(x) sin(y) sin(z) - sin(x) cos(y)
    //      sin(x) cos(y) sin(z) - cos(x) sin(y) | sin(x) cos(z) | sin(x) sin(y) sin(z) + cos(x) cos(y))
        out.x = Math.cos(yaw) * Math.cos(roll) * out.x + Math.cos(pitch) * Math.sin(roll) * out.y + Math.sin(pitch) * Math.sin(yaw) * out.z;
        out.y = Math.cos(pitch) * Math.cos(yaw) * out.y + Math.cos(roll) * Math.sin(yaw) * out.z + Math.sin(roll) * Math.sin(pitch) * out.x;
        out.z = Math.cos(roll) * Math.sin(pitch) * out.y - Math.sin(roll) * Math.cos(pitch) * out.x + Math.cos(roll) * Math.cos(pitch) * out.z;
        return out;
    }

    public static fromQuaternion(quaternion: Array<number>): Rotator
    {
        // asin(2 (q0 * q1 - q2 * q3))
        const pitch = Math.asin(2 * quaternion[2] * quaternion[3] + 2 * quaternion[0] * quaternion[1]);
        // atan2(2*(q0*q1 + q2*q3), 1 - 2*(q1q1 + q2q2))
        const yaw = Math.atan2(2 * quaternion[1] * quaternion[3] - 2 * quaternion[0] * quaternion[2], 1 - 2 * (quaternion[1] * quaternion[1] - quaternion[2] * quaternion[2]));
        // atan2(2*(q0*q3 + q1*q2), 1 - 2*(q2q2 + q2q3))
        const roll = Math.atan2(2 * quaternion[0] * quaternion[3] - 2 * quaternion[1] * quaternion[2], 1 - 2 * quaternion[2] * quaternion[2] - 2 * quaternion[3] * quaternion[3]);
        return new Rotator(pitch, yaw, roll);
    }

}