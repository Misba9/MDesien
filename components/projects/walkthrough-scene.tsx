'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import {
  getMassing,
  massingTones,
  type Massing,
  type MassingElement,
  type MassingTone,
} from '@/lib/massing'

function toneMaterialProps(tone: MassingTone) {
  const color = massingTones[tone]
  if (tone === 'glass') {
    return {
      color,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.42,
    }
  }
  if (tone === 'water') {
    return {
      color,
      roughness: 0.08,
      metalness: 0.3,
      transparent: true,
      opacity: 0.75,
    }
  }
  if (tone === 'bronze') {
    return { color, roughness: 0.35, metalness: 0.6 }
  }
  if (tone === 'espresso') {
    return { color, roughness: 0.6, metalness: 0.1 }
  }
  return { color, roughness: 0.85, metalness: 0 }
}

function Element({ element }: { element: MassingElement }) {
  const matProps = toneMaterialProps(element.tone)
  const isGlass = element.tone === 'glass' || element.tone === 'water'
  if (element.shape === 'cylinder') {
    const [radius, height] = element.size
    return (
      <mesh
        position={element.pos}
        castShadow={!isGlass}
        receiveShadow={!isGlass}
      >
        <cylinderGeometry args={[radius, radius, height, 48]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    )
  }
  return (
    <mesh position={element.pos} castShadow={!isGlass} receiveShadow={!isGlass}>
      <boxGeometry args={element.size} />
      <meshStandardMaterial {...matProps} />
    </mesh>
  )
}

function Tree({
  pos,
  scale,
}: {
  pos: [number, number, number]
  scale: number
}) {
  return (
    <group position={pos} scale={scale}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 1.2, 8]} />
        <meshStandardMaterial color={massingTones.bronze} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color={massingTones.greenery} roughness={1} />
      </mesh>
      <mesh position={[0.25, 1.1, 0.2]} castShadow>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color={massingTones.greenery} roughness={1} />
      </mesh>
    </group>
  )
}

function Slats({ massing }: { massing: Massing }) {
  const slats = massing.slats
  if (!slats) return null
  const items = []
  for (let i = 0; i < slats.count; i++) {
    const offset = (i - (slats.count - 1) / 2) * slats.spacing
    const pos: [number, number, number] =
      slats.axis === 'z'
        ? [slats.origin[0] + offset, slats.origin[1], slats.origin[2]]
        : [slats.origin[0], slats.origin[1], slats.origin[2] + offset]
    const size: [number, number, number] =
      slats.axis === 'z' ? [0.18, 0.18, slats.length] : [slats.length, 0.18, 0.18]
    items.push(
      <mesh key={i} position={pos} castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={massingTones[slats.tone]}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>,
    )
  }
  return <group>{items}</group>
}

function FlyCamera({
  curve,
  target,
  enabled,
}: {
  curve: THREE.CatmullRomCurve3
  target: THREE.Vector3
  enabled: boolean
}) {
  const { camera } = useThree()
  const tRef = useRef(0)
  useFrame((_, delta) => {
    if (!enabled) return
    tRef.current = (tRef.current + delta * 0.028) % 1
    const point = curve.getPointAt(tRef.current)
    camera.position.lerp(point, 0.05)
    camera.lookAt(target)
  })
  return null
}

function Scene({ slug, playing }: { slug: string; playing: boolean }) {
  const massing = getMassing(slug)

  const { curve, target } = useMemo(() => {
    const m = massing
    const r = m.radius
    const t = new THREE.Vector3(...m.target)
    const pts = [
      new THREE.Vector3(r, t.y + 3.5, r),
      new THREE.Vector3(0, t.y + 2.5, r * 1.15),
      new THREE.Vector3(-r, t.y + 3.5, r * 0.9),
      new THREE.Vector3(-r * 1.15, t.y + 5, 0),
      new THREE.Vector3(-r, t.y + 6, -r * 0.9),
      new THREE.Vector3(0, t.y + 4, -r * 1.1),
      new THREE.Vector3(r, t.y + 5, -r * 0.9),
      new THREE.Vector3(r * 1.15, t.y + 3.5, 0),
    ]
    const c = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5)
    return { curve: c, target: t }
  }, [massing])

  if (!massing) return null

  return (
    <>
      <color attach="background" args={['#e9dfce']} />
      <fog attach="fog" args={['#e9dfce', massing.radius * 1.8, massing.radius * 4]} />

      <hemisphereLight args={['#fbf4e6', '#7c6b56', 0.6]} />
      <directionalLight
        position={[massing.radius, massing.radius * 1.4, massing.radius * 0.6]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0004}
      />

      {/* ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color={massingTones[massing.ground]} roughness={1} />
      </mesh>

      {massing.elements.map((el, i) => (
        <Element key={i} element={el} />
      ))}
      <Slats massing={massing} />
      {massing.trees.map((tree, i) => (
        <Tree key={i} pos={tree.pos} scale={tree.scale} />
      ))}

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.35}
        scale={massing.radius * 3}
        blur={2.4}
        far={20}
      />

      <Environment preset="sunset" />

      <FlyCamera curve={curve} target={target} enabled={playing} />
      <OrbitControls
        enabled={!playing}
        enablePan={false}
        target={target}
        minDistance={massing.radius * 0.6}
        maxDistance={massing.radius * 2.4}
        maxPolarAngle={Math.PI / 2.15}
        autoRotate={false}
      />
    </>
  )
}

export default function WalkthroughScene({
  slug,
  playing,
}: {
  slug: string
  playing: boolean
}) {
  const massing = getMassing(slug)
  const initial: [number, number, number] = massing
    ? [massing.radius, massing.target[1] + 4, massing.radius]
    : [14, 8, 14]
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: initial, fov: 42 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <Scene slug={slug} playing={playing} />
    </Canvas>
  )
}
