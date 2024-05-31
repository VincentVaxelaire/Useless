export class WebGLResources {
    constructor(gl) {
        this.gl = gl;
        this.shaders = new Map();
        this.buffers = new Map();
    }

    createShader(type, source) {
        if (this.shaders.has(source)) {
            return this.shaders.get(source);
        }

        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Error compiling shader:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        this.shaders.set(source, shader);
        return shader;
    }

    createBuffer(data) {
        const key = JSON.stringify(data);
        if (this.buffers.has(key)) {
            return this.buffers.get(key);
        }

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);

        this.buffers.set(key, buffer);
        return buffer;
    }
}