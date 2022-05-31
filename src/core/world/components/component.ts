import { Entity } from "../entity";

export abstract class Component
{
    private _name: string;
    private _entity: Entity;

    /**
     * Components handle owner entity's behavior and functionality.
     * @param entity The entity that owns this component.
     * @param name The name of this component.
     */
    public constructor(entity: Entity, name: string)
    {
        this._entity = entity;
        this._name = name;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get entity(): Entity { return this._entity; }
    public set entity(value: Entity) { this._entity = value; }

    public initialize(): void { }
    public update(): void  { }
    public delete(): void { }
}