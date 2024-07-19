import React, { useEffect, useRef } from 'react';
import planeScene from '../assets/3d/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  const bladeRef = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions['Take 001']) {
      if (isRotating) {
        actions['Take 001'].reset().play();
        actions['Take 001'].setLoop(THREE.LoopRepeat);
      } else {
        actions['Take 001'].stop();
      }
    } else {
      console.error('Animation "Take 001" not found.');
    }
  }, [actions, isRotating]);

  useFrame(() => {
    if (isRotating && bladeRef.current) {
      bladeRef.current.rotation.z += 0.1;
    }
  });

  useEffect(() => {
    // Assuming your blade object is named "Blade" in the GLTF model
    const blade = scene.getObjectByName('Blade');
    if (blade) {
      bladeRef.current = blade;
    } else {
      console.error('Blade object not found in GLTF model.');
    }
  }, [scene]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
