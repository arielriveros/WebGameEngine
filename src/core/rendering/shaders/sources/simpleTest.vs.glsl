precision mediump float;

attribute vec3 a_position;
attribute vec3 a_color;
        
varying vec3 v_color;

uniform mat4 u_world;
uniform mat4 u_view;
uniform mat4 u_proj;
        
void main() {
    mat4 model_view = u_proj * u_view * u_world;
    vec4 current_pos = model_view * vec4(a_position, 1.0);
    v_color = a_color + current_pos.xyz / 10.0;
    gl_Position = current_pos;
}