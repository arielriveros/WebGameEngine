import { MouseMapping } from "./inputMaps";
import { Vector2 } from "math";

export class MouseHandler
{
    private static _mousePosition: Vector2 = new Vector2();
    private static _mouseSpeed: Vector2 = new Vector2();
    
    
    public constructor() { }
    
    public static get mousePosition(): Vector2 { return MouseHandler._mousePosition; }
    public static get mouseSpeed(): Vector2 { return MouseHandler._mouseSpeed; }

    public static inititialize(): void { }
    
    public static onMouseMove(x_pos: number, y_pos: number, x_speed: number, y_speed: number): void
    {
        MouseHandler._mousePosition.x = x_pos;
        MouseHandler._mousePosition.y = y_pos;
        MouseHandler._mouseSpeed.x = x_speed;
        MouseHandler._mouseSpeed.y = y_speed;
    }
}