'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Orb() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} scale={1.8}>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshTransmissionMaterial
                    backside={false}
                    samples={6}
                    resolution={512}
                    transmission={0.95}
                    roughness={0.0}
                    thickness={1.5}
                    ior={1.5}
                    chromaticAberration={0.5}
                    anisotropy={0.1}
                    distortion={0.4}
                    distortionScale={0.3}
                    temporalDistortion={0.1}
                    iridescence={0.5}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    clearcoat={0.5}
                    clearcoatRoughness={0}
                    toneMapped={true}
                    color="#ffffff"
                />
            </mesh>
        </Float>
    );
}

export default function GlassOrbBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <ambientLight intensity={1} />
                <Orb />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
