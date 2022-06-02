precision mediump float;

varying vec3 v_color;
varying vec2 v_texCoord;
//varying vec3 v_normal;
varying float v_brightness;

uniform sampler2D u_texture;

void main() {
    vec4 texel = texture2D(u_texture, v_texCoord);
    texel = texel * vec4(v_color, 1.0) ;
    texel.xyz = texel.xyz * v_brightness;
    gl_FragColor = texel;
}