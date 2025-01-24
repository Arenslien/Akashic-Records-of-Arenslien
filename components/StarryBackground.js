"use client";

import { useEffect, useRef } from "react";

export default function StarryBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 별 데이터 생성
    let stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
    }));

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
      });

      requestAnimationFrame(drawStars);

    };

    drawStars();

    // 브라우저 크기 변경 시 Canvas 크기 조정
    const handleResize = () => {
      if (window.innerWidth > canvas.width) {
        let newStars = Array.from({ length: 50 }, () => ({
          x: Math.random() * (window.innerWidth-canvas.width) + canvas.width,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
        }));

        console.log(newStars);
        for (let i=0; i<newStars.length; i++) {
          stars.push(newStars[i]);
        }
      }
      else {
        let tempStars = [];
        for (let i=0; i<stars.length; i++) {
          if (stars[i].x < window.innerWidth) {
            tempStars.push(stars[i]);
          }
        }

        stars = tempStars;
      }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{ position: "fixed", top:0, left: 0, zIndex: 1 }}>
      </canvas>
      <>..</>
    </>
  );
}