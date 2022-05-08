import { KeyHandler } from "./keyHandler";

export class InputManager {

    public constructor() {
        console.log("New Input Instance")
    }

    public initialize() {
        console.log("Input poller initialized");
        KeyHandler.inititialize();
        let body = document.querySelector("body") as HTMLBodyElement;
        body.addEventListener("keydown", this.KeyDown, false);
        body.addEventListener("keyup", this.KeyUp, false);
        body.addEventListener("click", this.MouseLeftClick, false);
        // Disable context menu on body if right mouse button is clicked
        body.addEventListener("contextmenu", this.MouseRightClick, false);
        body.addEventListener("mousemove", this.MouseMove, false);
    }

    public isKeyDown(code: string): boolean {
        return KeyHandler.isKeyDown(code);
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
        //console.log(event);
    }

    private MouseRightClick(event: MouseEvent): void { 
        event.preventDefault();
        //console.log(event);
    }

    private MouseMove(event: MouseEvent): void {
        event.preventDefault();
        //console.log(event);
    }

    
}