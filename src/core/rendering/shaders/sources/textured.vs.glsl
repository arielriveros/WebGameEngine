precision mediump float;

attribute vec3 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

uniform mat4 u_viewProj;
        
void main() {
    v_texCoord = a_texCoord;
    gl_Position = u_viewProj * vec4(a_position, 1.0);
}