import { Vector2, Vector3, Vector4 } from './vector'

export class Matrix4x4 {
    private _data: number[] = [];
    public constructor() {
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

    public static multiply(out: Matrix4x4, a: Matrix4x4, b: Matrix4x4) {
        /* GLMATRIX LIBRARY IMPLEMENTATION */
        let a00 = a._data[0],
          a01 = a._data[1],
          a02 = a._data[2],
          a03 = a._data[3];
        let a10 = a._data[4],
          a11 = a._data[5],
          a12 = a._data[6],
          a13 = a._data[7];
        let a20 = a._data[8],
          a21 = a._data[9],
          a22 = a._data[10],
          a23 = a._data[11];
        let a30 = a._data[12],
          a31 = a._data[13],
          a32 = a._data[14],
          a33 = a._data[15];
        // Cache only the current line of the second matrix
        let b0 = b._data[0],
          b1 = b._data[1],
          b2 = b._data[2],
          b3 = b._data[3];
        out._data[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out._data[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out._data[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out._data[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b._data[4];
        b1 = b._data[5];
        b2 = b._data[6];
        b3 = b._data[7];
        out._data[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out._data[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out._data[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out._data[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b._data[8];
        b1 = b._data[9];
        b2 = b._data[10];
        b3 = b._data[11];
        out._data[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out._data[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out._data[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out._data[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b._data[12];
        b1 = b._data[13];
        b2 = b._data[14];
        b3 = b._data[15];
        out._data[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out._data[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out._data[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out._data[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
      }

    public static perspective(out: Matrix4x4, fovy: number, aspect: number, near: number, far: number) {

        /* GLMATRIX LIBRARY IMPLEMENTATION */

        let f = 1.0 / Math.tan(fovy / 2),
        nf;
        out._data[0] = f / aspect;
        out._data[1] = 0;
        out._data[2] = 0;
        out._data[3] = 0;
        out._data[4] = 0;
        out._data[5] = f;
        out._data[6] = 0;
        out._data[7] = 0;
        out._data[8] = 0;
        out._data[9] = 0;
        out._data[11] = -1;
        out._data[12] = 0;
        out._data[13] = 0;
        out._data[15] = 0;
        if (far != null && far !== Infinity) {
            nf = 1 / (near - far);
            out._data[10] = (far + near) * nf;
            out._data[14] = 2 * far * near * nf;
        } else {
            out._data[10] = -1;
            out._data[14] = -2 * near;
        }
        return out;
    }

    public static orthographic(out: Matrix4x4, left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4x4 {
        let lr: number = 1.0 / (left - right);
        let bt: number = 1.0 / (bottom - top);
        let nf: number = 1.0 / (near - far);
        out._data[0] = -2.0 * lr;
        out._data[5] = -2.0 * bt;
        out._data[10] = 2.0 * nf;
        out._data[12] = (left + right) * lr;
        out._data[13] = (bottom + top) * bt;
        out._data[14] = (near + far) * nf;
        return out;
    }

    public static lookAt(out: Matrix4x4, eye: Vector3, at: Vector3, up: Vector3): Matrix4x4 {
        /* GLMATRIX LIBRARY IMPLEMENTATION */

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

    public static targetTo(out: Matrix4x4, eye: Vector3, target: Vector3, up: Vector3): Matrix4x4 {
      let eyex = eye.x,
        eyey = eye.y,
        eyez = eye.z,
        upx = up.x,
        upy = up.y,
        upz = up.z;
      let z0 = eyex - target.x,
        z1 = eyey - target.y,
        z2 = eyez - target.z;
      let len = z0 * z0 + z1 * z1 + z2 * z2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
      }
      let x0 = upy * z2 - upz * z1,
        x1 = upz * z0 - upx * z2,
        x2 = upx * z1 - upy * z0;
      len = x0 * x0 + x1 * x1 + x2 * x2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      out._data[0] = x0;
      out._data[1] = x1;
      out._data[2] = x2;
      out._data[3] = 0;
      out._data[4] = z1 * x2 - z2 * x1;
      out._data[5] = z2 * x0 - z0 * x2;
      out._data[6] = z0 * x1 - z1 * x0;
      out._data[7] = 0;
      out._data[8] = z0;
      out._data[9] = z1;
      out._data[10] = z2;
      out._data[11] = 0;
      out._data[12] = eyex;
      out._data[13] = eyey;
      out._data[14] = eyez;
      out._data[15] = 1;
      return out;
    }

    public static translation( out: Matrix4x4, trans: Vector3) {
        out._data[12] = trans.x;
        out._data[13] = trans.y;
        out._data[14] = trans.z;

        return out;
    }

    public static translate(out:Matrix4x4, a:Matrix4x4, v: Vector3) {
        /* GLMATRIX LIBRARY IMPLEMENTATION */
        let x = v.x,
        y = v.y,
        z = v.z;
        let a00, a01, a02, a03;
        let a10, a11, a12, a13;
        let a20, a21, a22, a23;
        if (a === out) {
            out._data[12] = a._data[0] * x + a._data[4] * y + a._data[8] * z + a._data[12];
            out._data[13] = a._data[1] * x + a._data[5] * y + a._data[9] * z + a._data[13];
            out._data[14] = a._data[2] * x + a._data[6] * y + a._data[10] * z + a._data[14];
            out._data[15] = a._data[3] * x + a._data[7] * y + a._data[11] * z + a._data[15];
        } else {
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
            out._data[0] = a00;
            out._data[1] = a01;
            out._data[2] = a02;
            out._data[3] = a03;
            out._data[4] = a10;
            out._data[5] = a11;
            out._data[6] = a12;
            out._data[7] = a13;
            out._data[8] = a20;
            out._data[9] = a21;
            out._data[10] = a22;
            out._data[11] = a23;
            out._data[12] = a00 * x + a10 * y + a20 * z + a._data[12];
            out._data[13] = a01 * x + a11 * y + a21 * z + a._data[13];
            out._data[14] = a02 * x + a12 * y + a22 * z + a._data[14];
            out._data[15] = a03 * x + a13 * y + a23 * z + a._data[15];
        }
        return out;
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

    public static rotateX(out: Matrix4x4, a: Matrix4x4, rad: number) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a10 = a._data[4];
        let a11 = a._data[5];
        let a12 = a._data[6];
        let a13 = a._data[7];
        let a20 = a._data[8];
        let a21 = a._data[9];
        let a22 = a._data[10];
        let a23 = a._data[11];
        if (a !== out) {
          // If the source and destination differ, copy the unchanged rows
          out._data[0] = a._data[0];
          out._data[1] = a._data[1];
          out._data[2] = a._data[2];
          out._data[3] = a._data[3];
          out._data[12] = a._data[12];
          out._data[13] = a._data[13];
          out._data[14] = a._data[14];
          out._data[15] = a._data[15];
        }
        // Perform axis-specific matrix multiplication
        out._data[4] = a10 * c + a20 * s;
        out._data[5] = a11 * c + a21 * s;
        out._data[6] = a12 * c + a22 * s;
        out._data[7] = a13 * c + a23 * s;
        out._data[8] = a20 * c - a10 * s;
        out._data[9] = a21 * c - a11 * s;
        out._data[10] = a22 * c - a12 * s;
        out._data[11] = a23 * c - a13 * s;
        return out;
      }

    public static rotateY(out: Matrix4x4, a: Matrix4x4, rad: number) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a00 = a._data[0];
        let a01 = a._data[1];
        let a02 = a._data[2];
        let a03 = a._data[3];
        let a20 = a._data[8];
        let a21 = a._data[9];
        let a22 = a._data[10];
        let a23 = a._data[11];
        if (a !== out) {
          // If the source and destination differ, copy the unchanged rows
          out._data[4] = a._data[4];
          out._data[5] = a._data[5];
          out._data[6] = a._data[6];
          out._data[7] = a._data[7];
          out._data[12] = a._data[12];
          out._data[13] = a._data[13];
          out._data[14] = a._data[14];
          out._data[15] = a._data[15];
        }
        // Perform axis-specific matrix multiplication
        out._data[0] = a00 * c - a20 * s;
        out._data[1] = a01 * c - a21 * s;
        out._data[2] = a02 * c - a22 * s;
        out._data[3] = a03 * c - a23 * s;
        out._data[8] = a00 * s + a20 * c;
        out._data[9] = a01 * s + a21 * c;
        out._data[10] = a02 * s + a22 * c;
        out._data[11] = a03 * s + a23 * c;
        return out;
      }

    public static rotateZ(out: Matrix4x4, a: Matrix4x4, rad: number) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a00 = a._data[0];
        let a01 = a._data[1];
        let a02 = a._data[2];
        let a03 = a._data[3];
        let a10 = a._data[4];
        let a11 = a._data[5];
        let a12 = a._data[6];
        let a13 = a._data[7];
        if (a !== out) {
          // If the source and destination differ, copy the unchanged last row
          out._data[8] = a._data[8];
          out._data[9] = a._data[9];
          out._data[10] = a._data[10];
          out._data[11] = a._data[11];
          out._data[12] = a._data[12];
          out._data[13] = a._data[13];
          out._data[14] = a._data[14];
          out._data[15] = a._data[15];
        }
        // Perform axis-specific matrix multiplication
        out._data[0] = a00 * c + a10 * s;
        out._data[1] = a01 * c + a11 * s;
        out._data[2] = a02 * c + a12 * s;
        out._data[3] = a03 * c + a13 * s;
        out._data[4] = a10 * c - a00 * s;
        out._data[5] = a11 * c - a01 * s;
        out._data[6] = a12 * c - a02 * s;
        out._data[7] = a13 * c - a03 * s;
        return out;
      }

}