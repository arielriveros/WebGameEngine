import { MouseMapping } from "./inputMaps";
import { Vector } from "math";

export class MouseHandler
{
    private static _mousePosition: Vector = new Vector();
    private static _mouseSpeed: Vector = new Vector();

    private static _pressedButtons: boolean[];

    public constructor() {
        MouseHandler._pressedButtons = [];
    }

    public static inititialize(): void {
        MouseHandler._pressedButtons = Array(5).fill(false);
    }
    
    public static get mousePosition(): Vector { return MouseHandler._mousePosition; }
    public static get mouseSpeed(): Vector { return MouseHandler._mouseSpeed; }
        
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