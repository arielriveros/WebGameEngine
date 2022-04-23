namespace RENDER {
    /**
     * WebGL Rendering context.
     */
    export let gl:WebGLRenderingContext;
    
    /**
     * Initializes WebGL rendering context.
     * @param elementID Id of the canvas element to render in.
     */
    export function initialize(elementID?: string): HTMLCanvasElement {
        let canvas: HTMLCanvasElement;
        if (elementID !== undefined) {
            canvas = document.getElementById(elementID) as HTMLCanvasElement;
            if (canvas === undefined) {
                throw new Error(`No canvas element of id ${elementID}`);
            }
        }
        else {
            canvas = document.createElement("canvas") as HTMLCanvasElement;
            document.body.appendChild(canvas);
        }
        
        gl = canvas.getContext("webgl");
        if (gl === undefined) {
            throw new Error("Cannot initialize WebGL by the browser");
        }
        return canvas;
    }
    
}