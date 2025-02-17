"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function Home() {
  useEffect(() => {
    /* 1. 씬, 카메라, 렌더러 설정 */
    let scene, camera;
    let renderer = new THREE.WebGLRenderer();
    let cloudParticles = [];

    /* 2. 별 객체 생성 */
    const starCount = 5000; 

    // 2.1 별 Geometry & Material 설정
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      size: 0.8 + 1 * Math.random(),  // 기본 크기
      sizeAttenuation: true,  // 카메라에 가까운 별은 더 크게 보이게
      color: new THREE.Color(0xffffff),  // 별 색상
      opacity: 1,
      transparent: true,
    });

    // 2.2 별 객체
    const stars = new THREE.Points(starGeometry, starMaterial);

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 500
      // camera.position.z = 1;
      // camera.rotation.x = 1.16;
      // camera.rotation.y = -0.12
      // camera.rotation.z = 0.27;

      let ambient = new THREE.AmbientLight(0x555555);
      scene.add(ambient);

      // let directionalLight = new THREE.DirectionalLight(0xff8c19);
      // directionalLight.position.set(0, 0, 1);
      // scene.add(directionalLight);

      let orangeLight = new THREE.PointLight(0xcc6600, 50, 540, 1.7);
      orangeLight.position.set(200, 300, 100);
      scene.add(orangeLight);

      let redLight = new THREE.PointLight(0xd8547e, 50, 540, 1.7);
      redLight.position.set(100, 300, 100);
      scene.add(redLight);

      let blueLight = new THREE.PointLight(0x3677ac, 50, 540, 1.7);
      blueLight.position.set(300, 300, 100);
      scene.add(blueLight);

      // 배경색 설정: 검은색과 보라색 (은하수 느낌)
      scene.background = new THREE.Color(0x000000); // 어두운 검은색
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      scene.fog = new THREE.FogExp2(0X03544E, 0.001);
      renderer.setClearColor(scene.fog.color);

      document.body.appendChild(renderer.domElement);

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

      // 별 객체 생성
      scene.add(stars);

      

      /* 3. 성운 생성 코드 */
      let loader = new THREE.TextureLoader();
      let cloudGeometry, cloudMaterial;
      loader.load("smoke.png", function (texture) {
        cloudGeometry = new THREE.PlaneGeometry(500, 500);
        cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });

        for (let i=0; i<70; i++) {
          let cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);

          cloud.position.set(
            Math.random() * 1000 - 500,
            Math.random() * 500 - 250,
            Math.random() * 50 + 50,
          );

          cloud.rotation.z = Math.random() * 2 * Math.PI;
          cloud.material.opacity = 0.20;
          cloudParticles.push(cloud);
          scene.add(cloud)
        }
      });

      render();
    }


    function render() {
      renderer.render(scene, camera);
      requestAnimationFrame(render);

      stars.rotation.x += 0.001;
      stars.rotation.y += 0.001;

      cloudParticles.forEach(cloud => {
        cloud.rotation.z -= 0.0025;
        // cloud.rotation.z -= Math.random() < 0.5 ? -0.003 : 0.003;
      })
    }
    
    // 애니메이션 시작
    init();
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