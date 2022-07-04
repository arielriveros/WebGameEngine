#version 300 es

precision mediump float;

layout (location = 0) in vec3 a_position;

out vec3 TexCoords;

uniform mat4 u_viewProj;    // view projection matrix

void main()
{
    TexCoords = a_position;
    gl_Position = u_viewProj* vec4(a_position, 1.0);
} 
