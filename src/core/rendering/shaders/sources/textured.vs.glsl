precision mediump float;

/* Attributes */
attribute vec3 a_position;  // vertex position
attribute vec3 a_color;     
attribute vec2 a_texCoord;
attribute vec3 a_normal;

/* Constants */
const vec3 light_position = normalize(vec3(0.0, 0.0, 1.0));

/* Vaying variables */
varying vec3 v_color;
varying vec2 v_texCoord;

/* Uniforms */
uniform mat4 u_viewProj;
        
void main() {
    v_color = a_color;
    a_normal;
    v_texCoord = a_texCoord;
    gl_Position = u_viewProj * vec4(a_position, 1.0);
}