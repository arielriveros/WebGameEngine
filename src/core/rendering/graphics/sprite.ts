namespace RENDER {
    export class Sprite {

        private _name: string;
        private _width: number;
        private _height: number;
        private _buffer: Buffer;
        private _position: MATH.Vector3

        public constructor(name: string, width: number = 100, height: number = 100) {
            this._name = name;
            this._width = width;
            this._height = height;
            this._position = new MATH.Vector3();
        }

        public get position(): MATH.Vector3{
            return this._position;
        }

        public load():void {
            this._buffer = new Buffer(3);
            let positionAttribute: AttributeInfo = {
                //location: this._shader.getAttributeLocation("a_position"),
                location: 0,
                offset: 0,
                size: 3
            };
            
            this._buffer.addAttributeLocation(positionAttribute);
            
            let vertices = [
                //X          Y             Z
                0,           0,            0,
                0,           this._height, 0,
                this._width, this._height, 0,
                this._width, this._height, 0,
                this._width, 0,            0,
                0,           0,            0
            ];
            
            this._buffer.pushBackData(vertices);
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
}