import { PI_180, Vector3 } from "math";

export class Rotator {
    private _roll: number;
    private _yaw: number;
    private _pitch: number;

    public constructor(yaw: number = 0, pitch: number = 0, roll: number = 0) {
        this._roll = roll % 360;
        this._yaw = yaw % 360;
        this._pitch = pitch % 360;
    }
    
    public get roll(): number { return this._roll; }
    public set roll(value: number) { this._roll = value % 360; }
    public getRadiansRoll(): number { return this._roll * PI_180; }

    public get yaw(): number { return this._yaw; }
    public set yaw(value: number) { this._yaw = value % 360; }
    public getRadiansYaw(): number { return this._yaw * PI_180; }

    public get pitch(): number { return this._pitch; }
    public set pitch(value: number) { this._pitch = value % 360; }
    public getRadiansPitch(): number { return this._pitch * PI_180; }

    public add(rotator: Rotator): void {
        this.roll = (this._roll + rotator.roll);
        this.yaw = (this._yaw + rotator.yaw);
        this.pitch = (this._pitch + rotator.pitch);
    }

    public toVector3(): Vector3 {
        return new Vector3(this._yaw * PI_180, this._pitch * PI_180, this._roll * PI_180);
    }
}