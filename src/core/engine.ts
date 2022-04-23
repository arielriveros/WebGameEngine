namespace ENGINE {
    /**
     *  Main Engine Class 
     */
    export class Engine{

        private _canvas: HTMLCanvasElement;
        private _shader: RENDER.Shader;
        private _projection: MATH.Matrix4x4;
        private _sprite: RENDER.Sprite;
        
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

            this._projection = MATH.Matrix4x4.orthographic(0.0, this._canvas.width, 0.0, this._canvas.height, -100.0, 100.0);
            this._sprite = new RENDER.Sprite("Test");
            this._sprite.load();
            this._sprite.position.x = 200;

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

                RENDER.gl.viewport(-1, 1, -1, 1);
            }
        }

        /**
         * Main game loop, called every frame.
         */
        private loop(): void {
            RENDER.gl.clear(RENDER.gl.COLOR_BUFFER_BIT); // clears buffers to preset values.
            let colorPosition: WebGLUniformLocation = this._shader.getUniformLocation("u_color");
            RENDER.gl.uniform4f(colorPosition, 1, 0.5, 0, 1);
            
            let projectionPosition = this._shader.getUniformLocation("u_projection");
            RENDER.gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

            let modelLocation = this._shader.getUniformLocation("u_model");
            RENDER.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(MATH.Matrix4x4.translation(this._sprite.position).data));

            this._sprite.draw();

            requestAnimationFrame(this.loop.bind( this ));
        }

        private loadShaders(): void {
            let vertexShaderSource = `
            attribute vec3 a_position;
            uniform mat4 u_projection;
            uniform mat4 u_model;
            void main() {
                gl_Position = u_projection * u_model * vec4(a_position, 1.0);
            }`;
            let fragmentShaderSource = `
            precision mediump float;
            uniform vec4 u_color;
            void main() {
                gl_FragColor = u_color;
            }`;
            this._shader = new RENDER.Shader("basic", vertexShaderSource, fragmentShaderSource);
        }
        
    }
}