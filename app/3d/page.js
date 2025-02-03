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

    // 성운(네뷸라) Shader 추가
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform float time;
        varying vec2 vUv;

        // Simple 2D noise function
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        // Fractal Brownian Motion (FBM) for a more cloudy look
        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          for (int i = 0; i < 5; i++) {
            value += amplitude * noise(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }


        void main() {
          vec2 uv = vUv * 3.0; // 확대 효과
          float nebula = fbm(uv + time * 0.1); // 움직이는 효과

          // 보라색 성운 컬러 (파랑 + 보라 조합)
          vec3 color = mix(vec3(0.2, 0.0, 0.5), vec3(0.6, 0.2, 1.0), nebula);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true
    });

    // 평면 (Plane)에 성운 Shader 적용
    const nebulaGeometry = new THREE.PlaneGeometry(5000, 5000);
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula)

    const nebula2 = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    nebula2.position.set(1000, 1000, -1500); // 다른 위치에 배치
    scene.add(nebula2);


    // 카메라 위치 설정
    camera.position.z = 500;
    nebula.position.z = -500;

    // 애니메이션 및 렌더링
    function animate() {
      requestAnimationFrame(animate);

      stars.rotation.x += 0.001;
      stars.rotation.y += 0.001;

      nebulaMaterial.uniforms.time.value += 0.01 // 시간 업데이트 (움직임 효과)

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