import { collisionManager } from "../../engine";
import { Vector3 } from "math";
import { AxisAlignedBouningBox } from "../../physics/axisAlignedBoundingBox";
import { CollisionShape } from "../../physics/collisionShape";
import { Component } from "./component";

export class RigidBody extends Component
{
    private _mass: number;
    private _velocity: Vector3;
    private _acceleration: Vector3;
    private _force: Vector3;
    private _isKinematic: boolean;
    private _enableGravity: boolean;
    private _collision!: CollisionShape;

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

    private registerCollision(): void
    {
        let collisionShape: CollisionShape = new AxisAlignedBouningBox(this.entity.transformStruct, 1, 1, 1)
        this._collision = collisionShape;

        collisionManager.addCollisionShape(this._collision);
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
            this._acceleration.y += -9.8;
        }
    }

    public override initialize(): void
    {
        this.registerCollision();
    }

    public override update(delta: number): void
    {
        if (this._isKinematic) {
            let time: number = delta / 1000; // seconds

            let friction: number = -0.01;
            let frictionVector: Vector3 = (this._velocity.clone()).scale(friction);

            // vf = vi + a * dt - friction * vi
            this.velocity.add(this._acceleration.clone().scale(time).clone().add(frictionVector));

            // pf = pi + vf * dt
            this.entity.position.add(this.velocity.clone().scale(time));
        }
    }

    public override delete(): void {
        collisionManager.removeCollisionShape(this._collision);
    }

}