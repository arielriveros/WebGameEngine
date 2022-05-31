import { Entity } from "../entity";

export abstract class Component
{
    private _name: string;
    private _entity!: Entity;

    /**
     * Components handle owner entity's behavior and functionality.
     * @param name The name of this component.
     */
    public constructor(name: string)
    {
        this._name = name;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get entity(): Entity { return this._entity; }
    public set entity(value: Entity) { this._entity = value; }

    /**
     * Initializes the component.
     */
    public initialize(): void { }
    /**
     * Runs every frame.
     */
    public update(): void  { }
    /**
     * Deletes the component.
     */
    public delete(): void { }
}