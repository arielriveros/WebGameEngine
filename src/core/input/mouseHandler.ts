import { MouseMapping } from "./inputMaps";
import { Vector2 } from "math";

export class MouseHandler
{
    private static _mousePosition: Vector2 = new Vector2();
    private static _mouseSpeed: Vector2 = new Vector2();

    private static _pressedButtons: boolean[];

    public constructor() {
        MouseHandler._pressedButtons = [];
    }

    public static inititialize(): void {
        MouseHandler._pressedButtons = Array(5).fill(false);
    }
    
    public static get mousePosition(): Vector2 { return MouseHandler._mousePosition; }
    public static get mouseSpeed(): Vector2 { return MouseHandler._mouseSpeed; }
        
    public static onButtonDown(button: number): void
    {
        MouseHandler._pressedButtons[button] = true;
    }

    public static onButtonUp(button: number): void
    {
        MouseHandler._pressedButtons[button] = false;
    }

    public static isButtonPressed(buttonName: string): boolean
    {
        if (buttonName in MouseMapping)
        {
            const buttonCode = MouseMapping[buttonName]['button'];
            return MouseHandler._pressedButtons[buttonCode];
        }
        return false;
    }

    public static onMouseMove(x_pos: number, y_pos: number, x_speed: number, y_speed: number): void
    {
        MouseHandler._mousePosition.x = x_pos;
        MouseHandler._mousePosition.y = y_pos;
        MouseHandler._mouseSpeed.x = x_speed;
        MouseHandler._mouseSpeed.y = y_speed;
    }
}