# Shader Example with Design Patterns and ES6 Modules

This project demonstrates the use of the Flyweight Pattern and the Prototype Pattern to manage WebGL resources efficiently.

## Changes from the Initial Code

### 1. **Introduction of Flyweight Pattern**

The Flyweight Pattern is applied to manage shared WebGL resources like shaders and buffers. This pattern helps reduce memory usage and improve performance by sharing common resources.

- **WebGLResources.js**: A new class `WebGLResources` is introduced to manage shared shaders and buffers. This class ensures that the same shader or buffer is not created multiple times.

### 2. **Introduction of Prototype Pattern**

The Prototype Pattern is used to create new instances of shader programs efficiently. This pattern allows for the cloning of objects, reducing the overhead of creating new instances from scratch.

- **ShaderProgram.js**: A new class `ShaderProgram` is introduced to create and manage shader programs. This class utilizes WebGLResources to reuse existing shaders and buffers.