import { Matrix4x4, Rotator, Transform, Vector3 } from "math";

export abstract class Entity {
    private _name: string;
    private _forwardVector: Vector3;
    private _transform: Transform;

    protected _worldMatrix: Matrix4x4;

    public constructor(
        name: string,
        position: Vector3 = new Vector3(),
        rotation: Rotator = new Rotator(),
        scale: Vector3 = new Vector3(1, 1, 1))
        {
            this._name = name;
            this._transform = new Transform(position, rotation, scale);
            this._worldMatrix = this._transform.matrix;
            this._forwardVector = new Vector3(position.x + 1, this.position.y, this.position.z);
        }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    /**
    * Gets the position of the object.
    */
    public get position(): Vector3 { return this._transform.position; }
    /**
     * Sets the position of the object.
     */
    public set position(pos: Vector3) { this._transform.position = pos; }

    /**
     * Gets the rotation of the object.
     */
    public get rotation(): Rotator { return this._transform.rotation; }
    /**
     * Sets the rotation of the object.
     */
    public set rotation(rot: Rotator) { this._transform.rotation = rot; }

    /**
     * Gets the scale of the object.
     */
    public get scale(): Vector3 { return this._transform.scale; }
    /**
     * Sets the scale of the object.
     */
    public set scale(scale: Vector3) { this._transform.scale = scale; }

    public get worldMatrix(): Matrix4x4 { return this._worldMatrix; }

    public get forwardVector(): Vector3 { return this._forwardVector; }

    public move(delta: Vector3): void
    {
        this._transform.position.add(delta);
    }

    public rotate(delta: Rotator): void
    {
        this._transform.rotation.add(delta);
    }

    public rescale(delta: Vector3): void
    {
        this._transform.scale.add(delta);
    }

    public delete(): void { }

    public update(): void { }

    /**
     * Updates the world matrix of the object.
     */
    public updateTransforms(): void
    {
        this._worldMatrix = this._transform.matrix;
    }

    public getWorldPosition(): Vector3
    {
        console.log(this._worldMatrix);
        return Matrix4x4.getTranslation(this._worldMatrix);
    }
}