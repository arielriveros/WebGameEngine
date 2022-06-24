import { Vector } from "math";
import { LOG } from "utils";
import { KeyHandler } from "./keyHandler";
import { MouseHandler } from "./mouseHandler";

export class InputManager {

    public constructor() {
        LOG("New Input Instance", 'info')
    }

    public initialize() {
        KeyHandler.inititialize();
        MouseHandler.inititialize();

        let body = document.querySelector("body") as HTMLBodyElement;
        //let canvas = document.getElementById("render-viewport") as HTMLCanvasElement;

        // Keyboard Events
        window.addEventListener("keydown", this.KeyDown, false);
        window.addEventListener("keyup", this.KeyUp, false);
        
        // Mouse Events
        //window.addEventListener("click", this.MouseLeftClick, false);
        window.addEventListener("mousedown", this.MouseButtonDown, false);
        window.addEventListener("mouseup", this.MouseButtonUp, false);

        window.addEventListener("contextmenu", this.MouseRightClick, false); // Disable context menu on body if right mouse button is clicked
        window.addEventListener("mousemove", this.MouseMove, false);

        LOG("Input poller initialized", "info");
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

    private MouseButtonDown(event: MouseEvent): void {
        event.preventDefault();
        MouseHandler.onButtonDown(event.button);
    }

    private MouseButtonUp(event: MouseEvent): void {
        event.preventDefault();
        MouseHandler.onButtonUp(event.button);
    }

    private MouseRightClick(event: MouseEvent): void { 
        event.preventDefault();
    }

    private MouseMove(event: MouseEvent): void {
        event.preventDefault();
        MouseHandler.onMouseMove(event.clientX, event.clientY, event.movementX, event.movementY);
    }

    public isMouseButtonPressed(button: string): boolean {
        return MouseHandler.isButtonPressed(button);
    }
    
    public isKeyDown(code: string): boolean {
        return KeyHandler.isKeyDown(code);
    }

    public getMousePosition(): Vector {
        return MouseHandler.mousePosition;
    }   

    public getMouseSpeed(): Vector {
        return MouseHandler.mouseSpeed;
    }

    public isMouseMoving(): boolean {
        return MouseHandler.mouseSpeed.x != 0 || MouseHandler.mouseSpeed.y != 0;
    }
}