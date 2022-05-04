import * as DISPATCHERS from './dispatchers';

export function KeyDown(event: KeyboardEvent): void{
    switch(event.key){
        case "w":
        case "ArrowUp":
            DISPATCHERS.UP_KeyDown();
            break;
        case "s":
        case "ArrowDown":
            DISPATCHERS.DOWN_KeyDown();
            
            break;
        case "d":
        case "ArrowRight":
            DISPATCHERS.RIGHT_KeyDown();
            break;
        case "a":
        case "ArrowLeft":
            DISPATCHERS.LEFT_KeyDown();
            break;
        default:
            DISPATCHERS.NOT_RECOGNIZED();
            break;
    }
}

export function KeyUp(event: KeyboardEvent): void{
    switch(event.key){
        case "w":
        case "ArrowUp":
            DISPATCHERS.UP_KeyUp();
            break;
        case "s":
        case "ArrowDown":
            DISPATCHERS.DOWN_KeyUp();
            break;
        case "d":
        case "ArrowRight":
            DISPATCHERS.RIGHT_KeyUp();
            break;
        case "a":
        case "ArrowLeft":
            DISPATCHERS.LEFT_KeyUp();
            break;
        default:
            DISPATCHERS.NOT_RECOGNIZED();
            break;
    }
}

export function MouseLeftClick(event: MouseEvent): void {
    if (event.button === 0) {
        DISPATCHERS.LCLICK();
    }
}

export function MouseRightClick(event: MouseEvent): void { 
    if (event.button === 2) { 
        event.preventDefault();
        DISPATCHERS.RCLICK();
     }
}

export function MouseMove(event: MouseEvent): void {
    DISPATCHERS.CURSOR();
}