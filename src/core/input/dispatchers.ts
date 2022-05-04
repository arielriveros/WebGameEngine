const DEBUG = false;

export function UP_KeyDown() {
    if(DEBUG) {
        console.log("UP+");
    }
}

export function DOWN_KeyDown() {
    if(DEBUG) {
        console.log("DOWN+");
    }
}

export function LEFT_KeyDown() {
    if(DEBUG) {
        console.log("LEFT+");
    }
}

export function RIGHT_KeyDown() {
    if(DEBUG) {
        console.log("RIGHT+");
    }
}


export function UP_KeyUp() {
    if(DEBUG) {
        console.log("UP-");
    }
}

export function DOWN_KeyUp() {
    if(DEBUG) {
        console.log("DOWN-");
    }
}

export function LEFT_KeyUp() {
    if(DEBUG) {
        console.log("LEFT-");
    }
}

export function RIGHT_KeyUp() {
    if(DEBUG) {
        console.log("RIGHT-");
    }
}

export function LCLICK() {
    if(DEBUG) {
        console.log("Left mouse");
    }
}

export function RCLICK() {
    if(DEBUG) {
        console.log("Right mouse");
    }
}

export function CURSOR() {
    if(DEBUG) {
        console.log("Cursor moving");
    }
}

export function NOT_RECOGNIZED() {
    if(DEBUG) {
        console.log("Input not recognized");
    }
}