import StarryBackground from "@/components/StarryBackground";

export default function Home() {
  return (
    <div>
      <h1 style={{ color: "white", position: "absolute", top: "20%", left: "50%", transform: 'translateX(-50%)' }}>PROJECT: AROA</h1>
      <StarryBackground/>
      <h2 style={{ color: "white", position: "absolute", top: "28%", left: "50%", transform: 'translateX(-50%)' }}>This page is  a test page</h2>
      <a href="/3d">
        <h2 style={{ color: "white", position: "absolute", top: "35%", left: "50%", transform: 'translateX(-50%)' }}>move to 3D Page</h2>
      </a>
    </div>
  );
}
