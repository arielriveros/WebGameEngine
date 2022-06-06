precision mediump float;

/* Attributes */
attribute vec3 a_position;  // vertex position
attribute vec3 a_color;     
attribute vec2 a_texCoord;
attribute vec3 a_normal;

/* Constants */

const float ambient_coefficient = 0.05;

/* Vaying variables */
varying vec3 v_color;
varying vec2 v_texCoord;
varying float v_brightness;

/* Uniforms */
uniform mat4 u_viewProj;    // view projection matrix
uniform mat4 u_normalMatrix;
uniform vec3 u_lightDirection;
uniform float u_lightIntensity;
        
void main() {
    /* Color */
    v_color = a_color;
    /* Texture */
    v_texCoord = a_texCoord;
    /* Lighting */
    vec3 world_normal = (u_normalMatrix * vec4(a_normal, 1.0)).xyz;
    vec3 directional_light = normalize(u_lightDirection);
    v_brightness = max(ambient_coefficient, dot( world_normal, directional_light )) * u_lightIntensity;
    /* To fragment shader */
    gl_Position = u_viewProj * vec4(a_position, 1.0);
}