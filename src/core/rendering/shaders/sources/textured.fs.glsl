precision mediump float;

varying vec3 v_color;
varying vec2 v_texCoord;

uniform sampler2D u_texture;

void main() {
    gl_FragColor = texture2D(u_texture, v_texCoord) * vec4(v_color, 1.0);
}