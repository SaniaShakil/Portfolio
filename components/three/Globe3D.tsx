'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GLOBE_RADIUS = 1.4;

/**
 * Flight arc definitions — [lat, lon] pairs in degrees.
 * alphaHex is the last two hex digits controlling line opacity (00–FF).
 */
const ARCS: Array<{
  start: [number, number];
  end: [number, number];
  alphaHex: string;
}> = [
  { start: [41.0, 29.0],  end: [39.9, 32.9],  alphaHex: '8C' }, // Istanbul → Ankara
  { start: [36.9, 30.7],  end: [41.0, 29.0],  alphaHex: '66' }, // Antalya → Istanbul
  { start: [39.9, 32.9],  end: [38.4, 27.1],  alphaHex: '80' }, // Ankara → Izmir
  { start: [36.9, 30.7],  end: [37.0, 35.3],  alphaHex: '59' }, // Antalya → Mersin
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Converts geographic coordinates (degrees) to a THREE.Vector3 on the globe
 * surface at the given radius.
 */
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Returns a bezier control point lifted above the sphere surface so the arc
 * curves visibly away from the globe body.
 */
function arcMidPoint(
  start: THREE.Vector3,
  end: THREE.Vector3,
  liftFactor: number = 0.32
): THREE.Vector3 {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(GLOBE_RADIUS * (1 + liftFactor));
  return mid;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Small amber sphere marking a city/airport endpoint on the globe. */
function CityDot({ position }: { position: THREE.Vector3 }): JSX.Element {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.022, 8, 8]} />
      <meshBasicMaterial color="#10B981" transparent opacity={0.9} />
    </mesh>
  );
}

/**
 * One great-circle flight arc with city dots at each endpoint.
 * Opacity is encoded into the 8-character hex color (#RRGGBBAA) because
 * the underlying LineMaterial does not expose an `opacity` JSX prop in
 * the current drei type definitions.
 */
function FlightArc({
  startLatLon,
  endLatLon,
  alphaHex,
}: {
  startLatLon: [number, number];
  endLatLon: [number, number];
  alphaHex: string;
}): JSX.Element {
  const startVec = latLonToVec3(startLatLon[0], startLatLon[1], GLOBE_RADIUS);
  const endVec   = latLonToVec3(endLatLon[0],   endLatLon[1],   GLOBE_RADIUS);
  const midVec   = arcMidPoint(startVec, endVec);

  // 8-digit hex encodes alpha — works with three's ColorRepresentation in LineMaterial
  const colorWithAlpha = `#10B981${alphaHex}`;

  return (
    <group>
      <QuadraticBezierLine
        start={startVec.toArray() as [number, number, number]}
        end={endVec.toArray() as [number, number, number]}
        mid={midVec.toArray() as [number, number, number]}
        color={colorWithAlpha}
        lineWidth={1.2}
      />
      <CityDot position={startVec} />
      <CityDot position={endVec} />
    </group>
  );
}

/** Wireframe globe that auto-rotates on the Y axis. */
function GlobeWireframe(): JSX.Element {
  // useRef on THREE.Group because the ref is attached to <group>, not <mesh>
  const groupRef = useRef<THREE.Group>(null);

  // Rotate ~4° per second — slow, atmospheric drift
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe lattice */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          color="#10B981"
          wireframe
          transparent
          opacity={0.13}
        />
      </mesh>

      {/* Very faint back-face fill — adds subtle inner depth without lighting */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          color="#10B981"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Flight path arcs */}
      {ARCS.map((arc, i) => (
        <FlightArc
          key={i}
          startLatLon={arc.start}
          endLatLon={arc.end}
          alphaHex={arc.alphaHex}
        />
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

/**
 * Globe3D — a 3D wireframe globe with flight path arcs representing the
 * aviation domain. Intended to be dynamically imported (ssr: false).
 * Parent must supply explicit width/height dimensions.
 */
export default function Globe3D(): JSX.Element {
  return (
    <div
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* OrbitControls present but all interactions disabled — rotation handled via useFrame */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
        <GlobeWireframe />
      </Canvas>
    </div>
  );
}
