
export const SIMPLE_VERTEX_SHADER = `
    precision mediump float;
    attribute vec3 vertex_position;
    attribute vec3 vertex_color;
    varying vec3 out_color;

    void main() {
        out_color = vertex_color;
        gl_Position = vec4(vertex_position, 1.0);
    }
`;

export const SIMPLE_FRAGMENT_SHADER = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;