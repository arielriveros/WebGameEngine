export class Input {

    private _body!:HTMLBodyElement;

    public constructor() {
        console.log("New Input Instance")
    }

    public initialize() {
        console.log("Input poller initialized");
        this._body = document.querySelector("body") as HTMLBodyElement;
        this._body.addEventListener("keydown", this.KeyDown, false);
        this._body.addEventListener("keyup", this.KeyUp, false);
    }

    private KeyDown(  event: KeyboardEvent ): void{
        console.log(event);
    }

    private KeyUp(  event: KeyboardEvent ): void{
        console.log(event);
    }
    
}