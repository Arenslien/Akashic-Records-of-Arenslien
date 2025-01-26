"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function Home() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      renderer.render(scene, camera);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }

    renderer.setAnimationLoop(animate);

  }, []);

  return (
    <div>
      <h1 style={{ color: "white", position: "absolute", top: "20%", left: "50%", transform: 'translateX(-50%)' }}>3D Page</h1>
      <a href="/">
        <h2 style={{ color: "white", position: "absolute", top: "35%", left: "50%", transform: 'translateX(-50%)' }}>move to main page</h2>
      </a>
    </div>
  );
}
