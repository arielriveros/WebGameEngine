import * as handlers from "./handlers";

export class Input {

    private _body!:HTMLBodyElement;

    public constructor() {
        console.log("New Input Instance")
    }

    public initialize() {
        console.log("Input poller initialized");
        this._body = document.querySelector("body") as HTMLBodyElement;
        this._body.addEventListener("keydown", handlers.KeyDown, false);
        this._body.addEventListener("keyup", handlers.KeyUp, false);
        this._body.addEventListener("click", handlers.MouseLeftClick, false);
        // Disable context menu on body if right mouse button is clicked
        this._body.addEventListener("contextmenu", handlers.MouseRightClick, false);
        this._body.addEventListener("mousemove", handlers.MouseMove, false);
    } 
}