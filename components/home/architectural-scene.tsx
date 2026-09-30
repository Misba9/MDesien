'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import type { MotionValue } from 'framer-motion'

const IVORY = '#f2ede4'
const SAND = '#e5ded2'
const ESPRESSO = '#241c16'
const BRONZE = '#8c5a32'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

type SceneProps = {
  progress: MotionValue<number>
  reduceMotion: boolean
  simplified: boolean
  mouseParallax: boolean
}

function ArchitecturalVolumes({
  progress,
  reduceMotion,
  simplified,
}: Omit<SceneProps, 'mouseParallax'>) {
  const roomRef = useRef<THREE.Group>(null)
  const wallLRef = useRef<THREE.Mesh>(null)
  const wallRRef = useRef<THREE.Mesh>(null)
  const frameRef = useRef<THREE.Group>(null)
  const columnRef = useRef<THREE.Mesh>(null)
  const slabRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    const p = reduceMotion ? 0.35 : progress.get()
    const t = easeInOut(THREE.MathUtils.clamp(p, 0, 1))

    if (roomRef.current) {
      roomRef.current.position.y = lerp(0, 0.15, t)
      roomRef.current.rotation.y = lerp(0.12, -0.08, t)
    }
    if (wallLRef.current) {
      wallLRef.current.position.x = lerp(-2.2, -1.85, t)
    }
    if (wallRRef.current) {
      wallRRef.current.position.x = lerp(2.35, 2.0, t)
      wallRRef.current.position.z = lerp(-0.4, 0.2, t)
    }
    if (frameRef.current) {
      frameRef.current.position.z = lerp(-1.4, -0.6, t)
      frameRef.current.rotation.y = lerp(-0.05, 0.04, t)
    }
    if (columnRef.current && !simplified) {
      columnRef.current.position.y = lerp(0.9, 1.05, t)
      columnRef.current.position.x = lerp(1.1, 0.85, t)
    }
    if (slabRef.current) {
      slabRef.current.position.z = lerp(0.8, 0.2, t)
    }
  })

  return (
    <group ref={roomRef}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow={!simplified}
      >
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color={SAND} roughness={0.88} metalness={0.02} />
      </mesh>

      <mesh position={[0, 1.4, -2.4]} receiveShadow={!simplified}>
        <boxGeometry args={[5.2, 2.8, 0.12]} />
        <meshStandardMaterial color={IVORY} roughness={0.82} metalness={0.01} />
      </mesh>

      <mesh
        ref={wallLRef}
        position={[-2.2, 1.4, -0.6]}
        castShadow={!simplified}
        receiveShadow={!simplified}
      >
        <boxGeometry args={[0.12, 2.8, 3.6]} />
        <meshStandardMaterial color={IVORY} roughness={0.82} metalness={0.01} />
      </mesh>

      <mesh
        ref={wallRRef}
        position={[2.35, 1.2, -0.4]}
        castShadow={!simplified}
      >
        <boxGeometry args={[0.9, 2.4, 2.2]} />
        <meshStandardMaterial color={SAND} roughness={0.88} metalness={0.02} />
      </mesh>

      <mesh ref={slabRef} position={[0, 0.04, 0.8]} receiveShadow={!simplified}>
        <boxGeometry args={[3.2, 0.08, 1.6]} />
        <meshStandardMaterial color={BRONZE} roughness={0.72} metalness={0.08} />
      </mesh>

      <group ref={frameRef} position={[0, 1.35, -1.4]}>
        <mesh>
          <boxGeometry args={[1.8, 0.06, 0.06]} />
          <meshStandardMaterial
            color={ESPRESSO}
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[1.8, 0.06, 0.06]} />
          <meshStandardMaterial
            color={ESPRESSO}
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
        <mesh position={[-0.87, 0.6, 0]}>
          <boxGeometry args={[0.06, 1.2, 0.06]} />
          <meshStandardMaterial
            color={ESPRESSO}
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
        <mesh position={[0.87, 0.6, 0]}>
          <boxGeometry args={[0.06, 1.2, 0.06]} />
          <meshStandardMaterial
            color={ESPRESSO}
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
        {!simplified && (
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[0.04, 1.2, 0.04]} />
            <meshStandardMaterial
              color={BRONZE}
              roughness={0.72}
              metalness={0.08}
            />
          </mesh>
        )}
      </group>

      {!simplified && (
        <mesh ref={columnRef} position={[1.1, 0.9, 0.2]} castShadow>
          <boxGeometry args={[0.22, 1.8, 0.22]} />
          <meshStandardMaterial
            color={BRONZE}
            roughness={0.72}
            metalness={0.08}
          />
        </mesh>
      )}

      {!simplified && (
        <mesh position={[0, 2.75, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.2, 3.6]} />
          <meshStandardMaterial
            color={IVORY}
            roughness={0.9}
            metalness={0}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  )
}

function CameraRig({
  progress,
  reduceMotion,
  mouseParallax,
}: {
  progress: MotionValue<number>
  reduceMotion: boolean
  mouseParallax: boolean
}) {
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef(new THREE.Vector3())
  const look = useRef(new THREE.Vector3())

  useFrame((state) => {
    if (mouseParallax && !reduceMotion) {
      mouse.current.x = THREE.MathUtils.lerp(
        mouse.current.x,
        state.pointer.x * 0.15,
        0.04,
      )
      mouse.current.y = THREE.MathUtils.lerp(
        mouse.current.y,
        state.pointer.y * 0.08,
        0.04,
      )
    } else {
      mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, 0, 0.06)
      mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, 0, 0.06)
    }

    const p = reduceMotion ? 0.35 : progress.get()
    const t = easeInOut(THREE.MathUtils.clamp(p, 0, 1))

    const x = lerp(-0.9, 0.45, t) + mouse.current.x
    const y = lerp(1.45, 1.75, t) + mouse.current.y * 0.3
    const z = lerp(6.4, 4.6, t)

    target.current.set(x, y, z)
    state.camera.position.lerp(target.current, reduceMotion ? 1 : 0.08)

    look.current.set(
      lerp(0.1, 0.2, t),
      lerp(1.1, 1.25, t),
      lerp(-0.8, -0.3, t),
    )
    state.camera.lookAt(look.current)
  })

  return null
}

export function ArchitecturalScene({
  progress,
  reduceMotion,
  simplified,
  mouseParallax,
}: SceneProps) {
  return (
    <>
      <color attach="background" args={[IVORY]} />
      <fog attach="fog" args={[IVORY, 8, 18]} />

      <ambientLight intensity={0.55} color={IVORY} />
      <directionalLight
        position={[4, 7, 3]}
        intensity={1.05}
        color="#fff6ea"
        castShadow={!simplified}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight position={[-3, 3, 2]} intensity={0.35} color="#e8dcc8" />
      <hemisphereLight args={[IVORY, SAND, 0.35]} />

      <ArchitecturalVolumes
        progress={progress}
        reduceMotion={reduceMotion}
        simplified={simplified}
      />

      <CameraRig
        progress={progress}
        reduceMotion={reduceMotion}
        mouseParallax={mouseParallax}
      />
    </>
  )
}

export default ArchitecturalScene
