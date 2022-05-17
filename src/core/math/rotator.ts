export class Rotator {
    private _roll: number;
    private _yaw: number;
    private _pitch: number;

    private PI: number = 3.141592653589793;
    private PI_2: number = 1.5707963267948966;

    public constructor(yaw: number = 0, pitch: number = 0, roll: number = 0) {
        this._roll = roll % 360;
        this._yaw = yaw % 360;
        this._pitch = pitch % 360;
    }
    public get roll(): number { return this._roll; }

    public set roll(value: number) { this._roll = value % 360; }

    public get yaw(): number { return this._yaw; }

    public set yaw(value: number) { this._yaw = value % 360; }

    public get pitch(): number { return this._pitch; }

    public set pitch(value: number) { this._pitch = value % 360; }

    public add(rotator: Rotator): void {
        this._roll += rotator.roll % 360;
        this._yaw += rotator.yaw % 360;
        this._pitch += rotator.pitch % 360;
    }

}