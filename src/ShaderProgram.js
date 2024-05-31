import { WebGLResources } from './webglResources.js';

export class ShaderProgram {
    constructor(gl, vertexShaderSource, fragmentShaderSource) {
        this.gl = gl;
        this.resources = new WebGLResources(gl);

        const vertexShader = this.resources.createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.resources.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('Error linking program:', gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
            this.program = null;
        }
    }

    use() {
        this.gl.useProgram(this.program);
    }

    getAttribLocation(name) {
        return this.gl.getAttribLocation(this.program, name);
    }

    getUniformLocation(name) {
        return this.gl.getUniformLocation(this.program, name);
    }
}
