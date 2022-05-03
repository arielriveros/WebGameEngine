import { Vector2, Vector3, Vector4 } from './vector'

export class Matrix4x4 {
    private _data: number[] = [];
    private constructor() {
        this._data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1 
        ];
    }

    public get data(): number[] {
        return this._data;
    }

    public static identity(): Matrix4x4 {
        return new Matrix4x4;
    }

    public static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4x4 {
        let m = new Matrix4x4();
        let lr: number = 1.0 / (left - right);
        let bt: number = 1.0 / (bottom - top);
        let nf: number = 1.0 / (near - far);
        m._data[0] = -2.0 * lr;
        m._data[5] = -2.0 * bt;
        m._data[10] = 2.0 * nf;
        m._data[12] = (left + right) * lr;
        m._data[13] = (bottom + top) * bt;
        m._data[14] = (near + far) * nf;
        return m;
    }

    public static translation(position: Vector3): Matrix4x4 {
        let m = new Matrix4x4();
        m._data[12] = position.x;
        m._data[13] = position.y;
        m._data[14] = position.z;
        return m;
    }

    public static xRotation(angle: number): Matrix4x4 {
        let m = new Matrix4x4();
        m._data[5] = Math.cos(angle);
        m._data[6] = -1.0 * Math.sin(angle);
        m._data[9] = Math.sin(angle);
        m._data[10] = Math.cos(angle);
        return m;
    }

    public static yRotation(angle: number): Matrix4x4 {
        let m = new Matrix4x4();
        m._data[0] = Math.cos(angle);
        m._data[2] = Math.sin(angle);
        m._data[8] = -1.0 * Math.sin(angle);
        m._data[10] = Math.cos(angle);
        return m;
    }

    public static zRotation(angle: number): Matrix4x4 {
        let m = new Matrix4x4();
        m._data[0] = Math.cos(angle);
        m._data[1] = -1.0 * Math.sin(angle);
        m._data[4] = Math.sin(angle);
        m._data[5] = Math.cos(angle);
        return m;
    }

    public static applyToVec2(mat: Matrix4x4, inVector: Vector2): Vector2 {
        let outVector = new Vector2;
        outVector.x = mat._data[0] * inVector.x + mat._data[1] * inVector.y;
        outVector.y = mat._data[4] * inVector.x + mat._data[5] * inVector.y;
        return outVector;
    }

    public static applyToVec3(mat: Matrix4x4, inVector: Vector3): Vector3 {
        let outVector = new Vector3;
        outVector.x = mat._data[0] * inVector.x + mat._data[1] * inVector.y + mat._data[2] * inVector.z;
        outVector.y = mat._data[4] * inVector.x + mat._data[5] * inVector.y + mat._data[6] * inVector.z;
        outVector.z = mat._data[8] * inVector.x + mat._data[9] * inVector.y + mat._data[10] * inVector.z;
        return outVector;
    }

    public static applyToVec4(mat: Matrix4x4, inVector: Vector4): Vector4 {
        let outVector = new Vector4;
        outVector.x = mat._data[0] * inVector.x + mat._data[1] * inVector.y + mat._data[2] * inVector.z + mat._data[3] * inVector.z;
        outVector.y = mat._data[4] * inVector.x + mat._data[5] * inVector.y + mat._data[6] * inVector.z + mat._data[7] * inVector.z;
        outVector.z = mat._data[8] * inVector.x + mat._data[9] * inVector.y + mat._data[10] * inVector.z + mat._data[11] * inVector.z;
        outVector.w = mat._data[12] * inVector.x + mat._data[13] * inVector.y + mat._data[14] * inVector.z + mat._data[15] * inVector.z;
        return outVector;
    }

    /**
     * Matrix multiplication implementation.
     * @param mat1 Leftmost matrix to multiply
     * @param mat2 Rightmost matrix to multiply
     * @returns mat1 * mat2
     */
    public static mult(mat1: Matrix4x4, mat2: Matrix4x4): Matrix4x4 {
        let outMatrix = new Matrix4x4;

        let r1 = new Vector4(mat2._data[0], mat2._data[1], mat2._data[2], mat2._data[3]);
        let r2 = new Vector4(mat2._data[4], mat2._data[5], mat2._data[6], mat2._data[7]);
        let r3 = new Vector4(mat2._data[8], mat2._data[9], mat2._data[10], mat2._data[11]);
        let r4 = new Vector4(mat2._data[12], mat2._data[13], mat2._data[14], mat2._data[15]);

        let out0 = this.applyToVec4(mat1, r1);
        let out1 = this.applyToVec4(mat1, r2);
        let out2 = this.applyToVec4(mat1, r3);
        let out3 = this.applyToVec4(mat1, r4);

        outMatrix._data[0] = out0.x;
        outMatrix._data[1] = out0.y;
        outMatrix._data[2] = out0.z;
        outMatrix._data[3] = out0.w;
        outMatrix._data[4] = out1.x;
        outMatrix._data[5] = out1.y;
        outMatrix._data[6] = out1.z;
        outMatrix._data[7] = out1.w;
        outMatrix._data[8] = out2.x;
        outMatrix._data[9] = out2.y;
        outMatrix._data[10] = out2.z;
        outMatrix._data[11] = out2.w;
        outMatrix._data[12] = out3.x;
        outMatrix._data[13] = out3.y;
        outMatrix._data[14] = out3.z;
        outMatrix._data[15] = out3.w;

        return outMatrix;
    }
}