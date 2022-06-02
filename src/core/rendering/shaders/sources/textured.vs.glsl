precision mediump float;

/* Attributes */
attribute vec3 a_position;  // vertex position
attribute vec3 a_color;     
attribute vec2 a_texCoord;
attribute vec3 a_normal;

/* Constants */
const vec3 directional_light = normalize(vec3(1.0, 1.0, 1.0));
const float ambient_coefficient = 0.05;

/* Vaying variables */
varying vec3 v_color;
varying vec2 v_texCoord;
varying float v_brightness;

/* Uniforms */
uniform mat4 u_viewProj;
uniform mat4 u_normalMatrix;
        
void main() {
    v_color = a_color;
    v_texCoord = a_texCoord;
    vec3 world_normal = (u_normalMatrix * vec4(a_normal, 1.0)).xyz;
    v_brightness = max(ambient_coefficient, dot( world_normal, directional_light ));
    gl_Position = u_viewProj * vec4(a_position, 1.0);
}