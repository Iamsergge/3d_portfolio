import { useRef, useEffect } from 'react';
import birdScene from '../assets/3d/bird.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Bird = () => {
  const birdRef = useRef();
  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
   actions['Take 001'].play();
  }, []);

  useFrame(({ clock, camera }) => {
    if (!birdRef.current) return;

    // Log the bird's current animation state
    console.log('Bird animation state:', actions['Take 001']?.isRunning());
    // Update the Y position to simulate bird-like motion using a sin wave
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
   

    // Check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 10) {
   // change direction to backward and rotate the bird 180 degrees
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      //change deirection to foward and reset the birds rotation
      birdRef.current.rotation.y = 0;
    }
      //Update the x and Z position based on the direction
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      // Moving backward 
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
  });

  return (
    <mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]} ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
