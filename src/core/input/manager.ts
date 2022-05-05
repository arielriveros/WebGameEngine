import { Camera } from "../rendering/graphics/camera";

export class InputManager {

    private _body!:HTMLBodyElement;

    public constructor() {
        console.log("New Input Instance")
    }

    public initialize() {
        console.log("Input poller initialized");
        this._body = document.querySelector("body") as HTMLBodyElement;
        this._body.addEventListener("keydown", this.KeyDown, true);
        this._body.addEventListener("keyup", this.KeyUp, false);
        this._body.addEventListener("click", this.MouseLeftClick, false);
        // Disable context menu on body if right mouse button is clicked
        this._body.addEventListener("contextmenu", this.MouseRightClick, false);
        this._body.addEventListener("mousemove", this.MouseMove, false);
    } 

    private KeyDown(event: KeyboardEvent): void{
        //console.log(event);
    }

    private KeyUp(event: KeyboardEvent): void{
        //console.log(event);
    }

    private MouseLeftClick(event: MouseEvent): void {
        //console.log(event);
    }

    private MouseRightClick(event: MouseEvent): void { 
        event.preventDefault();
        //console.log(event);
    }

    private MouseMove(event: MouseEvent): void {
        //console.log(event);
    }
}