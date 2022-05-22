import { Vector2 } from "math";
import { LOG } from "utils";
import { KeyHandler } from "./keyHandler";
import { MouseHandler } from "./mouseHandler";

export class InputManager {

    public constructor() {
        LOG("New Input Instance", 'info')
    }

    public initialize() {
        LOG("Input poller initialized", "info");
        KeyHandler.inititialize();
        MouseHandler.inititialize();
        let body = document.querySelector("body") as HTMLBodyElement;
        body.addEventListener("keydown", this.KeyDown, false);
        body.addEventListener("keyup", this.KeyUp, false);
        body.addEventListener("click", this.MouseLeftClick, false);
        body.addEventListener("drag", this.MouseRightClick, false);
        // Disable context menu on body if right mouse button is clicked
        body.addEventListener("contextmenu", this.MouseRightClick, false);
        body.addEventListener("mousemove", this.MouseMove, false);
    }

    private KeyDown(event: KeyboardEvent): void{
        event.preventDefault();
        event.stopPropagation();
        KeyHandler.onKeyDown(event.code);
    }

    private KeyUp(event: KeyboardEvent): void{
        event.preventDefault();
        event.stopPropagation();
        KeyHandler.onKeyUp(event.code);
    }

    private MouseLeftClick(event: MouseEvent): void {
        event.preventDefault();
    }

    private MouseRightClick(event: MouseEvent): void { 
        event.preventDefault();
    }

    private MouseMove(event: MouseEvent): void {
        event.preventDefault();
        MouseHandler.onMouseMove(event.clientX, event.clientY, event.movementX, event.movementY);
    }

    
    public isKeyDown(code: string): boolean {
        return KeyHandler.isKeyDown(code);
    }

    public getMousePosition(): Vector2 {
        return MouseHandler.mousePosition;
    }   

    public getMouseSpeed(): Vector2 {
        return MouseHandler.mouseSpeed;
    }
}