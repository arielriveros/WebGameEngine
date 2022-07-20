import { Matrix4x4, Rotator, Transform, Vector3 } from "math";
import { TransformParameters } from "../math/transform";
import { Component } from "./components/component";

export abstract class Entity {
    private _name: string;
    private _transform: Transform;

    private _components: Component[];

    public constructor(name: string, transformParameters: TransformParameters = {})
    {
        this._name = name;
        this._transform = new Transform({
            position: transformParameters.position || new Vector3(), 
            rotation: transformParameters.rotation || new Rotator(), 
            scale: transformParameters.scale || new Vector3(1, 1, 1)
            }
        );
        this._components = [];
        this.transform();
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    /**
     * Adds a component to the entity.
     * @param component Component to add.
     */
    public addComponent(component: Component): void
    {
        component.entity = this;
        component.initialize();
        this._components.push(component);
    }

    /**
     * Gets a component of the entity.
     * @param name Name of the component to get.
     * @returns the component with the given name, null if it doesn't exist.
     */
    public getComponent(name: string): Component | null
    {
        for(let component of this._components)
        {
            if(component.name === name)
            {
                return component;
            }
        }
        return null;
    }

    /**
     * Removes a component from the entity.
     * @param name Name of the component to remove.
     */
    public removeComponent(name: string): void
    {
        const component = this.getComponent(name);
        if(component)
        {
            component.delete();
            this._components = this._components.filter(c => c !== component);
        }
    }

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

    public get transformStruct(): Transform { return this._transform; }

    /**
     * Gets the transform matrix of the object.
     */
    public get worldMatrix(): Matrix4x4 { return this._transform.matrix; }

    /**
     * Gets the forward vector of the object calculated in its transform.
    */
    public getForward(): Vector3
    { 
        return this._transform.forward;
    }

    /**
     * Gets the forward vector translated into world space.
     */
    public getWorldForward(): Vector3
    {
        return this._transform.worldForward;
    }

    /**
     * Gets the right vector of the object calculated in its transform.
    */
    public getRight(): Vector3
    {
        return this._transform.right;
    }

    public getUp(): Vector3
    {
        return this._transform.up;
    }

    /**
     * Moves the object towards the forward vector.
     * @param distance Distance to move.
     */
    public moveForward(distance: number): void
    {
        this._transform.position.add(new Vector3(this.getForward().x * distance, this.getForward().y * distance, this.getForward().z * distance));
    }

    /**
     * Moves the object towards the right vector.
     * @param distance Distance to move.
     */
    public moveRight(distance: number): void
    {
        this._transform.position.add(new Vector3(this.getRight().x * distance, this.getRight().y * distance, this.getRight().z * distance));
    }

    public moveUp(distance: number): void
    {
        this._transform.position.add(new Vector3(this.getUp().x * distance, this.getUp().y * distance, this.getUp().z * distance));
    }

    /**
     * Translates the object by a given vector.
     * @param delta Position to translate.
     */
    public move(delta: Vector3): void
    {
        this._transform.position.add(delta);
    }

    /**
     * Rotates the object by a given rotator.
     * @param delta Rotation to translate.
     */
    public rotate(delta: Rotator): void
    {
        this._transform.rotation.add(delta);
    }

    /**
     * Rescales the object by a given vector.
     * @param delta Vector to upscale or downscale.
     */
    public rescale(delta: Vector3): void
    {
        this._transform.scale.add(delta);
    }

    /**
     * Deletes all components of the entity.
     */
    public delete(): void
    {
        for(let component of this._components)
        {
            component.delete();
        }
    }

    /**
     * Applies the transform of the object.
     */
    public transform(): void
    {
        this._transform.applyTransform();
    }

    public initialize(): void { }

    /**
     * Runs every frame.
     */
    public update(delta: number = 0): void
    {
        this.transform();
        for(let component of this._components)
        {
            component.update(delta);
        }
    }
}