import { Matrix4x4, Rotator, Vector3 } from "math";

export abstract class Entity {
    private _name: string;
    private _position: Vector3;
    private _rotation: Rotator;
    private _scale: Vector3;

    protected _worldMatrix: Matrix4x4;

    public constructor(
        name: string,
        position: Vector3 = new Vector3(),
        rotation: Rotator = new Rotator(),
        scale: Vector3 = new Vector3(1, 1, 1))
        {
            this._name = name;
            this._position = position;
            this._rotation = rotation;
            this._scale = scale;
            this._worldMatrix = new Matrix4x4();
            this.updateTransforms();
        }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    /**
    * Gets the position of the object.
    */
    public get position(): Vector3 { return this._position; }
    /**
     * Sets the position of the object.
     */
    public set position(pos: Vector3) { this._position = pos; }

    /**
     * Gets the rotation of the object.
     */
    public get rotation(): Rotator { return this._rotation; }
    /**
     * Sets the rotation of the object.
     */
    public set rotation(rot: Rotator) { this._rotation = rot; }

    /**
     * Gets the scale of the object.
     */
    public get scale(): Vector3 { return this._scale; }
    /**
     * Sets the scale of the object.
     */
    public set scale(scale: Vector3) { this._scale = scale; }

    public get worldMatrix(): Matrix4x4 { return this._worldMatrix; }

    public move(delta: Vector3): void
    {
        this._position.add(delta);
    }

    public rotate(delta: Rotator): void
    {
        this._rotation.add(delta);
    }

    public rescale(delta: Vector3): void
    {
        this._scale.add(delta);
    }

    public delete(): void { }

    /**
     * Updates the world matrix of the object.
     */
    public updateTransforms(): Matrix4x4
    {
        Matrix4x4.translate(this._worldMatrix, new Matrix4x4(),this._position);
        Matrix4x4.rotateWithRotator(this._worldMatrix, this._worldMatrix, this._rotation);
        return Matrix4x4.scale(this._worldMatrix, this._worldMatrix, this._scale);
    }

    public getWorldPosition(): Vector3
    {
        this.updateTransforms();
        return Matrix4x4.getTranslation(this._worldMatrix);
    }
}