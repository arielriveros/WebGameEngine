import { KeyboardMapping } from "./inputMaps";

export class KeyHandler {
    private static _pressedKeys: boolean[];

    public constructor() {
        KeyHandler._pressedKeys = [];
    }

    public static inititialize(): void {
        KeyHandler._pressedKeys = Array(255).fill(false);
    }

    public static isKeyDown(code: string): boolean {
        if (code in KeyboardMapping) {
            const keyCode = KeyboardMapping[code]['keyCode'];
            return KeyHandler._pressedKeys[keyCode];
        }
        return false;
    }

    public static onKeyDown(code: string): void {
        if (code in KeyboardMapping) {
            const keyCode = KeyboardMapping[code]['keyCode'];
            KeyHandler._pressedKeys[keyCode] = true;
        }
    }

    public static onKeyUp(code: string): void {
        if (code in KeyboardMapping) {
            const keyCode = KeyboardMapping[code]['keyCode'];
            KeyHandler._pressedKeys[keyCode] = false;
        }
    }
}