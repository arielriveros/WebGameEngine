import { Matrix4x4, Rotator, Transform, Vector3 } from "math";
import { Component } from "./components/component";

export abstract class Entity {
    private _name: string;
    private _transform: Transform;

    private _components: Component[];

    public constructor(
        name: string,
        position: Vector3 = new Vector3(),
        rotation: Rotator = new Rotator(),
        scale: Vector3 = new Vector3(1, 1, 1))
        {
            this._name = name;
            this._transform = new Transform(position, rotation, scale);
            this._components = [];
            this.transform();
        }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public addComponent(component: Component): void
    {
        component.entity = this;
        component.initialize();
        this._components.push(component);
    }

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

    public get worldMatrix(): Matrix4x4 { return this._transform.matrix; }

    public getForward(): Vector3
    { 
        let x: number =  Math.cos(this._transform.rotation.getRadiansPitch()) * Math.sin(this._transform.rotation.getRadiansYaw());
        let y: number = -Math.sin(this._transform.rotation.getRadiansPitch());
        let z: number =  Math.cos(this._transform.rotation.getRadiansPitch()) * Math.cos(this._transform.rotation.getRadiansYaw());
        return new Vector3(x, y, z);
    }

    public getRight(): Vector3
    {
        let x: number = -Math.cos(this._transform.rotation.getRadiansYaw());
        let y: number = 0;
        let z: number = Math.sin(this._transform.rotation.getRadiansYaw());
        return new Vector3(x, y, z);
    }

    public moveForward(distance: number): void
    {
        this._transform.position.x += this.getForward().x * distance;
        this._transform.position.y += this.getForward().y * distance;
        this._transform.position.z += this.getForward().z * distance;
    }

    public moveRight(distance: number): void
    {
        this._transform.position.x += this.getRight().x * distance;
        this._transform.position.y += this.getRight().y * distance;
        this._transform.position.z += this.getRight().z * distance;
    }

    public move(delta: Vector3): void
    {
        this._transform.position.add(delta);
        this.transform();
    }

    public rotate(delta: Rotator): void
    {
        this._transform.rotation.add(delta);
        this.transform();
    }

    public rescale(delta: Vector3): void
    {
        this._transform.scale.add(delta);
        this.transform();
    }

    public delete(): void
    {
        for(let component of this._components)
        {
            component.delete();
        }
    }

    public transform(): void
    {
        this._transform.applyTransform();
        //this._transform.rotation.rotateVector3(this._forward);
        //this._transform.applyToVector(this._forward);
    }

    public initialize(): void { }

    /**
     * Runs every frame.
     */
    public update(): void
    {
        this.transform();
        for(let component of this._components)
        {
            component.update();
        }
    }


    public getWorldPosition(): Vector3
    {
        return this._transform.position;
    }
}