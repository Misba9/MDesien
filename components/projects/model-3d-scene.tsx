'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function ModelMesh({
  url,
  onLoaded,
  onError,
}: {
  url: string
  onLoaded: () => void
  onError: (err: unknown) => void
}) {
  const [scene, setScene] = useState<THREE.Group | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    let active = true
    const loader = new GLTFLoader()

    loader.load(
      url,
      (gltf) => {
        if (!active) return

        // Compute model bounding box to center and scale uniformly
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const size = new THREE.Vector3()
        box.getSize(size)
        const center = new THREE.Vector3()
        box.getCenter(center)

        // Center model at origin
        gltf.scene.position.x += gltf.scene.position.x - center.x
        gltf.scene.position.y += gltf.scene.position.y - center.y
        gltf.scene.position.z += gltf.scene.position.z - center.z

        // Ensure proper shadow casting and materials
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh
            m.castShadow = true
            m.receiveShadow = true
          }
        })

        setScene(gltf.scene)
        onLoaded()
      },
      undefined,
      (err) => {
        if (!active) return
        console.error('Failed to load GLTF model:', err)
        onError(err)
      },
    )

    return () => {
      active = false
      if (scene) {
        scene.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh
            mesh.geometry?.dispose()
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => mat.dispose())
            } else if (mesh.material) {
              mesh.material.dispose()
            }
          }
        })
      }
    }
  }, [url, onLoaded, onError])

  if (!scene) return null

  return <primitive ref={groupRef} object={scene} />
}

function ControlsHandler({
  autoRotate,
  resetTrigger,
}: {
  autoRotate: boolean
  resetTrigger: number
}) {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (controlsRef.current) {
      camera.position.set(10, 6, 12)
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
    }
  }, [resetTrigger, camera])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      autoRotate={autoRotate}
      autoRotateSpeed={1.0}
      minDistance={3}
      maxDistance={35}
      maxPolarAngle={Math.PI / 2.05}
    />
  )
}

export default function Model3DScene({
  url,
  autoRotate,
  resetTrigger,
  onLoaded,
  onError,
}: {
  url: string
  autoRotate: boolean
  resetTrigger: number
  onLoaded: () => void
  onError: (err: unknown) => void
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [10, 6, 12], fov: 42 }}
      gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      className="h-full w-full"
    >
      <color attach="background" args={['#241c16']} />
      <fog attach="fog" args={['#241c16', 22, 50]} />

      <hemisphereLight args={['#fdf8f0', '#3b2f27', 0.8]} />
      <directionalLight
        position={[14, 18, 10]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0002}
      />

      <ModelMesh url={url} onLoaded={onLoaded} onError={onError} />

      <ContactShadows
        position={[0, -0.05, 0]}
        opacity={0.4}
        scale={24}
        blur={2.0}
        far={10}
      />

      <Environment preset="apartment" />

      <ControlsHandler autoRotate={autoRotate} resetTrigger={resetTrigger} />
    </Canvas>
  )
}
