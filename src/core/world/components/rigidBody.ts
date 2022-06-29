import { Vector3 } from "math";
import { Component } from "./component";

export class RigidBody extends Component
{
    private _mass: number;
    private _velocity: Vector3;
    private _acceleration: Vector3;
    private _force: Vector3;
    private _isKinematic: boolean;


    public constructor()
    {
        super("rigidBody");
        this._mass = 0;
        this._velocity = new Vector3(0, 0, 0);
        this._acceleration = new Vector3(0, 0, 0);
        this._force = new Vector3(0, 0, 0);
        this._isKinematic = true;
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

    public override update(delta: number): void {
        if (this._isKinematic) {
            console.log(delta);
            console.log("Kinematic");
        }
    }

}