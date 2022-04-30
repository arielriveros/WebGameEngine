import { Vector3 } from "../../math/vector";
import { Buffer } from "../gl/buffer";
import { AttributeInfo } from "../gl/buffer";


    export interface I2DDimensions{
        width: number;
        height: number;
    }

    /**
     * Common class for graphics representations.
     */
    export class GraphicsElement {

        private _name: string;
        private _dimensions: I2DDimensions;
        private _buffer!: Buffer;
        private _position: Vector3
        private _vertices: number[];

        public constructor(name: string, dimensions:I2DDimensions, vertices: number[], initialPosition:Vector3 = new Vector3()) {
            this._name = name;
            this._dimensions = dimensions;
            this._position = initialPosition;
            this._vertices = vertices;
        }

        public get name(): string { return this._name; }
        public get position(): Vector3 { return this._position; }
        public get dimensions(): I2DDimensions { return this._dimensions; }

        public load():void {
            this._buffer = new Buffer(3); // CHANGE THIS VALUE LATER
            let positionAttribute: AttributeInfo = {
                location: 0,
                offset: 0,
                size: 3 }; // CHANGE THIS VALUE LATER
            this._buffer.addAttributeLocation(positionAttribute);
            this._buffer.pushBackData(this._vertices);
            this._buffer.uploadData();
            this._buffer.unbind();
        }

        public update(time: number): void {
            
        }

        public draw(): void {
            this._buffer.bind();
            this._buffer.draw();
        }
    }

     export class Triangle extends GraphicsElement {

        public constructor(name: string, width: number = 100, height: number = 100) {
           super(name, {width, height}, 
               [//X   Y       Z
               0,     0,      0,
               0,     height, 0,
               width, height, 0
           ]);
       }
   }

     export class Quad extends GraphicsElement {

        public constructor(name: string, width: number = 100, height: number = 100) {
           super(name, {width, height}, 
               [//X   Y       Z
               0,     0,      0,
               0,     height, 0,
               width, height, 0,
               width, height, 0,
               width, 0,      0,
               0,     0,      0
           ]);
       }
   }
