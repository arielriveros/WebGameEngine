import { Rotator } from "../math/rotator";
import { Vector3 } from "../math/vector";
import { Entity } from "./entity";

abstract class Light extends Entity {
    private _color: number[];
    private _intensity: number;

    public constructor(name: string, color: number[] = [1, 1, 1], intensity: number = 1) {
        super(name, new Vector3(), new Rotator(), new Vector3(1, 1, 1));
        this._color = color;
        this._intensity = intensity;
    }   
}

class DirectionalLight extends Light {

    public constructor(name: string) {
        super(name);
    }

    public get direction(): Vector3 { return this.forward; }
}

export { Light, DirectionalLight };