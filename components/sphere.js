export default function Sphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 1. Canvas 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 2. Sphere 설정
    const radius = 200;
    const points = [];
    const particleCount = 1000;

    // 3. Sphere Point 생성
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI; // 0 ~ π
      const phi = Math.random() * 2 * Math.PI; // 0 ~ 2π

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      points.push({ x, y, z });
    }

    // 4. Sphere Rotation 설정
    let angleX = 0;
    let angleY = 0;

    function rotate(point, angleX, angleY) {
      let { x, y, z } = point;

      // X축 회전
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // Y축 회전
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      return { x: x1, y: y1, z: z2 };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length; i++) {
        const rotated = rotate(points[i], angleX, angleY);

        // 점의 Z값에 따라 원근감을 적용
        const scale = 300 / (300 + rotated.z);
        const x2D = rotated.x * scale + centerX;
        const y2D = rotated.y * scale + centerY;

        // 점 그리기
        ctx.beginPath();
        ctx.arc(x2D, y2D, 2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${scale})`;
        ctx.fill();
        ctx.closePath();
      }

      // 회전 속도
      angleX += 0.005;
      angleY += 0.007;

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}