precision mediump float;

attribute vec3 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

uniform mat4 u_world;
uniform mat4 u_view;
uniform mat4 u_proj;
        
void main() {
    v_texCoord = a_texCoord;
    mat4 model_view = u_proj * u_view * u_world;
    gl_Position = model_view * vec4(a_position, 1.0);
}