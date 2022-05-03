
export function KeyDown(event: KeyboardEvent): void{
    switch(event.key){
        case "w":
        case "ArrowUp":
            console.log("UP+");
            break;
        case "s":
        case "ArrowDown":
            console.log("DOWN+");
            break;
        case "d":
        case "ArrowRight":
            console.log("RIGHT+");
            break;
        case "a":
        case "ArrowLeft":
            console.log("LEFT+");
            break;
        default:
            console.log(event);
            break;
    }
}

export function KeyUp(event: KeyboardEvent): void{
    switch(event.key){
        case "w":
        case "ArrowUp":
            console.log("UP-");
            break;
        case "s":
        case "ArrowDown":
            console.log("DOWN-");
            break;
        case "d":
        case "ArrowRight":
            console.log("RIGHT-");
            break;
        case "a":
        case "ArrowLeft":
            console.log("LEFT-");
            break;
        default:
            console.log(event);
            break;
    }
}

export function MouseLeftClick(event: MouseEvent): void {
    switch(event.buttons) {
        case 0:
            console.log("BUTTON 0");
            break;
        case 1:
            console.log("BUTTON 1");
            break;
        case 2:
            console.log("BUTTON 2");
            break;
        default:
            console.log(event);
            break;
    }
}

export function MouseMove(event: MouseEvent): void {
    console.log(event);
}