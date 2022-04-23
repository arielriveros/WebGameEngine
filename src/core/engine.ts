namespace ENGINE {
    /**
     *  Main Engine Class 
     */
    export class Engine{

        private _canvas: HTMLCanvasElement;
        private _shader: RENDER.Shader;
        private _buffer: RENDER.Buffer;

        public constructor() {

        }

        /** 
         * Initializes the engine and starts the game loop.
         */
        public start(): void {
            this._canvas = RENDER.initialize("render-viewport");
            RENDER.gl.clearColor(0, 0, 0, 1);
            this.loadShaders();
            this._shader.use();
            this.createBuffer();
            this.resize();
            this.loop();
        }

        /**
         * Rezises canvas to fit window.
         */
        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;

                RENDER.gl.viewport(0, 0, this._canvas.width, this._canvas.height);
            }
        }

        /**
         * Main game loop, called every frame.
         */
        private loop(): void {
            RENDER.gl.clear(RENDER.gl.COLOR_BUFFER_BIT); // clears buffers to preset values.
            let colorPosition: WebGLUniformLocation = this._shader.getUniformLocation("u_color");
            RENDER.gl.uniform4f(colorPosition, 1, 0.5, 0, 1);
            this._buffer.bind();
            this._buffer.draw();

            requestAnimationFrame(this.loop.bind( this ));
        }

        private loadShaders(): void {
            let vertexShaderSource = `
            attribute vec3 a_position;
            void main() {
                gl_Position = vec4(a_position, 1.0);
            }`;
            let fragmentShaderSource = `
            precision mediump float;
            uniform vec4 u_color;
            void main() {
                gl_FragColor = u_color;
            }`;
            this._shader = new RENDER.Shader("basic", vertexShaderSource, fragmentShaderSource);
        }
        
        private createBuffer(): void {
            this._buffer = new RENDER.Buffer(3);
            let positionAttribute: RENDER.AttributeInfo = {
                location: this._shader.getAttributeLocation("a_position"),
                offset: 0,
                size: 3
            };
            
            this._buffer.addAttributeLocation(positionAttribute);
            
            let vertices = [
                //X Y Z
                0,   0,   0,
                0,   0.5, 0,
                0.5, 0.5, 0];
            
            this._buffer.pushBackData(vertices);
            this._buffer.uploadData();
            this._buffer.unbind();
        }
    }
}