"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function Home() {
  useEffect(() => {
    // 씬, 카메라, 렌더러 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 배경색 설정: 검은색과 보라색 (은하수 느낌)
    scene.background = new THREE.Color(0x000000); // 어두운 검은색

    // 별들 추가
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000; // 별의 개수

    // 별 위치, 크기, 밝기 설정을 위한 배열
    const positions = [];
    const sizes = [];
    const brightness = [];

    for (let i = 0; i < starCount; i++) {
      // 랜덤 위치로 별 생성
      positions.push((Math.random() - 0.5) * 2000); // X
      positions.push((Math.random() - 0.5) * 2000); // Y
      positions.push((Math.random() - 0.5) * 2000); // Z

      // 랜덤 크기 및 밝기 설정
      sizes.push(Math.random() * 3); // 작은 별들
      brightness.push(Math.random()); // 밝기 랜덤
    }

    // BufferGeometry에 별의 위치 추가
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.8 + 1 * Math.random(),  // 기본 크기
      sizeAttenuation: true,  // 카메라에 가까운 별은 더 크게 보이게
      color: new THREE.Color(0xffffff),  // 별 색상
      opacity: 1,
      transparent: true,
    });

    // 별 객체 생성
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 카메라 위치 설정
    camera.position.z = 500;

    // 애니메이션 및 렌더링
    function animate() {
      requestAnimationFrame(animate);

      stars.rotation.x += 0.001;
      stars.rotation.y += 0.001;

      renderer.render(scene, camera);
    }

    // 애니메이션 시작
    animate();
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