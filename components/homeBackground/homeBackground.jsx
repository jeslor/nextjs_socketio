"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function DarkStripesBackground() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    meshRef.current.material.uniforms.uTime.value = elapsedTime * 0.2; // Adjust speed of movement
  });

  return (
    <mesh  ref={meshRef}>
      <planeGeometry args={[5, 5, 32, 32]} />
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            float stripes = sin(vUv.y * 20.0 + uTime) * 0.5 + 0.5;
            vec3 color1 = vec3(0.05, 0.05, 0.1); // Dark Blue
            vec3 color2 = vec3(0.1, 0.1, 0.2); // Slightly Brighter Blue
            vec3 gradient = mix(color1, color2, stripes);
            gl_FragColor = vec4(gradient, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function BackgroundCanvas() {
  return (
    <Canvas className='w-screen h-screen'>
      <DarkStripesBackground />
    </Canvas>
  );
}