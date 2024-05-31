import vertexShaderSource from './src/shaders/vertex.js';
import fragmentShaderSource from './src/shaders/fragment.js';

import { ShaderProgram } from './src/shaderProgram.js';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('WebGL is not supported');
        return;
    }

 const shaderProgram = new ShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

    const positionAttributeLocation = shaderProgram.getAttribLocation('position');
    const resolutionUniformLocation = shaderProgram.getUniformLocation('iResolution');
    const timeUniformLocation = shaderProgram.getUniformLocation('iTime');
    const mouseUniformLocation = shaderProgram.getUniformLocation('iMouse');

    const positions = [-1, -1, 1, -1, -1, 1, 1, 1];
    const positionBuffer = shaderProgram.resources.createBuffer(positions);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    shaderProgram.use();
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

    let startTime = Date.now();
    let lastEvent = null;
    let cameraX = 0;
    let cameraY = 0;

    function render() {
        const currentTime = (Date.now() - startTime) / 1000;
        gl.uniform1f(timeUniformLocation, currentTime);

        if (lastEvent) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (lastEvent.clientX - rect.left) / canvas.width;
            const mouseY = (lastEvent.clientY - rect.top) / canvas.height;
            cameraX = (mouseX - 0.5) * 2;
            cameraY = (mouseY - 0.5) * 2;
            lastEvent = null;
        }
        gl.uniform2f(mouseUniformLocation, cameraX, cameraY);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(render);
    }

    canvas.addEventListener('mousemove', (event) => {
        lastEvent = event;
    });

    render();
});