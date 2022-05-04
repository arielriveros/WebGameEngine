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

    public toFloat32Array(): Float32Array {
        return new Float32Array(this._data);
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

    public static lookAt(eye: Vector3, at: Vector3, up: Vector3): Matrix4x4 {
        /* GLMATRIX LIBRARY IMPLEMENTATION */

        let out:Matrix4x4 = Matrix4x4.identity();
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        let eyex = eye.x;
        let eyey = eye.y;
        let eyez = eye.z;
        let upx = up.x;
        let upy = up.y;
        let upz = up.z;
        let centerx = at.x;
        let centery = at.y;
        let centerz = at.z;

        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;
        len = 1 / Math.hypot(z0, z1, z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.hypot(x0, x1, x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        len = Math.hypot(y0, y1, y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }
        out._data[0] = x0;
        out._data[1] = y0;
        out._data[2] = z0;
        out._data[3] = 0;
        out._data[4] = x1;
        out._data[5] = y1;
        out._data[6] = z1;
        out._data[7] = 0;
        out._data[8] = x2;
        out._data[9] = y2;
        out._data[10] = z2;
        out._data[11] = 0;
        out._data[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out._data[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out._data[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out._data[15] = 1;
        return out;
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

    public static rotate(out: Matrix4x4, a: Matrix4x4, rad: number, axis:Vector3): Matrix4x4 {
        /* GLMATRIX LIBRARY IMPLEMENTATION */
        let x = axis.x,
        y = axis.y,
        z = axis.z;
        let len = Math.hypot(x, y, z);
        let s, c, t;
        let a00, a01, a02, a03;
        let a10, a11, a12, a13;
        let a20, a21, a22, a23;
        let b00, b01, b02;
        let b10, b11, b12;
        let b20, b21, b22;
 
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
        a00 = a._data[0];
        a01 = a._data[1];
        a02 = a._data[2];
        a03 = a._data[3];
        a10 = a._data[4];
        a11 = a._data[5];
        a12 = a._data[6];
        a13 = a._data[7];
        a20 = a._data[8];
        a21 = a._data[9];
        a22 = a._data[10];
        a23 = a._data[11];
        // Construct the elements of the rotation matrix
        b00 = x * x * t + c;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c;
        // Perform rotation-specific matrix multiplication
        out._data[0] = a00 * b00 + a10 * b01 + a20 * b02;
        out._data[1] = a01 * b00 + a11 * b01 + a21 * b02;
        out._data[2] = a02 * b00 + a12 * b01 + a22 * b02;
        out._data[3] = a03 * b00 + a13 * b01 + a23 * b02;
        out._data[4] = a00 * b10 + a10 * b11 + a20 * b12;
        out._data[5] = a01 * b10 + a11 * b11 + a21 * b12;
        out._data[6] = a02 * b10 + a12 * b11 + a22 * b12;
        out._data[7] = a03 * b10 + a13 * b11 + a23 * b12;
        out._data[8] = a00 * b20 + a10 * b21 + a20 * b22;
        out._data[9] = a01 * b20 + a11 * b21 + a21 * b22;
        out._data[10] = a02 * b20 + a12 * b21 + a22 * b22;
        out._data[11] = a03 * b20 + a13 * b21 + a23 * b22;
        if (a !== out) {
            // If the source and destination differ, copy the unchanged last row
            out._data[12] = a._data[12];
            out._data[13] = a._data[13];
            out._data[14] = a._data[14];
            out._data[15] = a._data[15];
        }
        return out;
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