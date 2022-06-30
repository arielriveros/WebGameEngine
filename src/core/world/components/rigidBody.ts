import { Vector3 } from "math";
import { Component } from "./component";

export class RigidBody extends Component
{
    private _mass: number;
    private _velocity: Vector3;
    private _acceleration: Vector3;
    private _force: Vector3;
    private _isKinematic: boolean;
    private _enableGravity: boolean;

    public constructor()
    {
        super("rigidBody");
        this._mass = 0;
        this._velocity = new Vector3(0, 0, 0);
        this._acceleration = new Vector3(0, 0, 0);
        this._force = new Vector3(0, 0, 0);
        this._isKinematic = true;
        this._enableGravity = false;
    }

    public get mass(): number { return this._mass; }
    public set mass(value: number) { this._mass = value; }

    public get velocity(): Vector3 { return this._velocity; }
    public set velocity(value: Vector3) { this._velocity = value; }

    public get acceleration(): Vector3 { return this._acceleration; }
    public set acceleration(value: Vector3) { this._acceleration = value; }

    public get force(): Vector3 { return this._force; } 
    public set force(value: Vector3) { this._force = value; }

    public get isKinematic(): boolean { return this._isKinematic; }
    public set isKinematic(value: boolean) { this._isKinematic = value; }

    public get enableGravity(): boolean { return this._enableGravity; }
    public set enableGravity(value: boolean)
    { 
        this._enableGravity = value;
        if(this._enableGravity)
        {
            this._acceleration.y += -0.098;
        }
    }

    public override update(delta: number): void {

        if (this._isKinematic) {
            let time: number = delta / 1000; // seconds
            // pos_f = pos_i + vel_i * time + 0.5 * a * time * time
            let dA = this._acceleration.multiply(time * time * 0.5) as Vector3;
            let dV = new Vector3(this._velocity.x * time, this._velocity.y * time, this._velocity.z * time);
            let dP = new Vector3(dV.x + dA.x, dV.y + dA.y, dV.z + dA.z);
            this.entity.position.add(dP);
        }
    }

}