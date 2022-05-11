
export const SIMPLE_VERTEX_SHADER: string = `
    precision mediump float;
    attribute vec3 a_position;
    attribute vec3 a_color;

    varying vec3 v_color;

    uniform vec3 u_trans;
    uniform mat4 u_world;
    uniform mat4 u_view;
    uniform mat4 u_proj;
    

    void main() {
        v_color = a_color;
        mat4 model_view = u_proj * u_view * u_world;
        gl_Position = model_view * vec4(u_trans + a_position, 1.0);
    }
`;

export const SIMPLE_FRAGMENT_SHADER: string = `
    precision mediump float;
    varying vec3 v_color;
    void main() {
        gl_FragColor = vec4(v_color, 1.0);
    }
`;