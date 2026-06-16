import { useEffect, useRef } from "react";
import * as THREE from "three";

function isWebGLAvailable(): boolean {
  try {
    const test = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (test.getContext("webgl") || test.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!isWebGLAvailable()) return; // graceful no-op in headless/GPU-less envs

    const W = window.innerWidth;
    const H = window.innerHeight;

    // ── Renderer ─────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    } catch {
      return; // WebGL context creation failed — silently degrade
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 600);
    camera.position.set(0, 0, 35);

    // ── Helpers ───────────────────────────────────────────────────
    const hex = (c: string) => new THREE.Color(c);
    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    // ── 1. STAR FIELD ─────────────────────────────────────────────
    {
      const N = 2800;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = rand(90, 200);
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: hex("#E4A390"),
        size: 0.13,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const stars = new THREE.Points(geo, mat);
      stars.name = "stars";
      scene.add(stars);
    }

    // ── 2. FLOATING PARTICLES ────────────────────────────────────
    const PART_N = 500;
    const partBase = new Float32Array(PART_N * 3);
    const partPhase = new Float32Array(PART_N);
    for (let i = 0; i < PART_N; i++) {
      partBase[i * 3]     = rand(-50, 50);
      partBase[i * 3 + 1] = rand(-35, 35);
      partBase[i * 3 + 2] = rand(-30, 10);
      partPhase[i] = Math.random() * Math.PI * 2;
    }
    const partGeo = new THREE.BufferGeometry();
    const partPos = partBase.slice();
    partGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
      color: hex("#D49C68"),
      size: 0.18,
      transparent: true,
      opacity: 0.40,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // ── 3. WIREFRAME SPHERES ──────────────────────────────────────
    type SphereSpec = {
      radius: number;
      segments: number;
      pos: [number, number, number];
      color: string;
      opacity: number;
      rotSpeed: [number, number, number];
    };
    const sphereSpecs: SphereSpec[] = [
      { radius: 9,  segments: 14, pos: [18,  8, -18],  color: "#8A4F55", opacity: 0.14, rotSpeed: [0.003, 0.006, 0.002] },
      { radius: 6,  segments: 12, pos: [-16, -7, -8],  color: "#E4A390", opacity: 0.18, rotSpeed: [0.005, 0.003, 0.007] },
      { radius: 14, segments: 16, pos: [4, -15, -30],  color: "#D49C68", opacity: 0.08, rotSpeed: [0.002, 0.004, 0.003] },
      { radius: 4,  segments: 10, pos: [-10, 12,  2],  color: "#E4A390", opacity: 0.22, rotSpeed: [0.008, 0.004, 0.005] },
      { radius: 7,  segments: 12, pos: [25, -3, -12],  color: "#8A4F55", opacity: 0.12, rotSpeed: [0.003, 0.007, 0.004] },
    ];
    const wireMeshes: Array<THREE.LineSegments & { rotSpeed: [number, number, number] }> = [];
    sphereSpecs.forEach(({ radius, segments, pos, color, opacity, rotSpeed }) => {
      const sGeo = new THREE.SphereGeometry(radius, segments, Math.round(segments * 0.7));
      const wGeo = new THREE.WireframeGeometry(sGeo);
      const mat = new THREE.LineBasicMaterial({
        color: hex(color),
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ls = new THREE.LineSegments(wGeo, mat) as THREE.LineSegments & { rotSpeed: [number, number, number] };
      ls.position.set(...pos);
      ls.rotSpeed = rotSpeed;
      sGeo.dispose();
      scene.add(ls);
      wireMeshes.push(ls);
    });

    // ── 4. GLOWING ORB FILL (solid, very low opacity) ─────────────
    [
      { r: 7,  pos: [18,  8, -18],  color: "#8A4F55", o: 0.05 },
      { r: 5,  pos: [-16, -7, -8],  color: "#E4A390", o: 0.04 },
      { r: 11, pos: [4,  -15, -30], color: "#D49C68", o: 0.03 },
    ].forEach(({ r, pos, color, o }) => {
      const geo = new THREE.SphereGeometry(r, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: hex(color),
        transparent: true,
        opacity: o,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      scene.add(mesh);
    });

    // ── 5. ORBITING LIGHT ORBS ────────────────────────────────────
    type OrbSpec = {
      radius: number;
      color: string;
      orbitR: number;
      speed: number;
      offset: number;
      yBase: number;
      yWave: number;
    };
    const orbSpecs: OrbSpec[] = [
      { radius: 0.55, color: "#E4A390", orbitR: 22, speed: 0.28, offset: 0,    yBase: 6,  yWave: 4 },
      { radius: 0.40, color: "#D49C68", orbitR: 16, speed: 0.42, offset: 2.1,  yBase: -9, yWave: 3 },
      { radius: 0.30, color: "#8A4F55", orbitR: 30, speed: 0.18, offset: 4.2,  yBase: 10, yWave: 5 },
      { radius: 0.20, color: "#E4A390", orbitR: 12, speed: 0.55, offset: 1.05, yBase: -4, yWave: 2 },
    ];
    const orbs: Array<{ mesh: THREE.Mesh; spec: OrbSpec }> = [];
    orbSpecs.forEach((spec) => {
      const geo = new THREE.SphereGeometry(spec.radius, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: hex(spec.color),
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      orbs.push({ mesh, spec });
    });

    // ── 6. WAVE MESH GRID ─────────────────────────────────────────
    const WAVE_SEG = 50;
    const waveGeo = new THREE.PlaneGeometry(120, 100, WAVE_SEG, WAVE_SEG);
    const waveMat = new THREE.MeshBasicMaterial({
      color: hex("#4A3F40"),
      wireframe: true,
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 3.2;
    waveMesh.position.set(0, -22, -5);
    scene.add(waveMesh);
    const waveVerts = waveGeo.attributes.position.array as Float32Array;
    const waveBaseY = new Float32Array(waveVerts.length / 3);
    for (let i = 0; i < waveBaseY.length; i++) waveBaseY[i] = 0;

    // ── 7. SECOND WAVE (top, faint) ───────────────────────────────
    const waveGeo2 = new THREE.PlaneGeometry(120, 100, WAVE_SEG, WAVE_SEG);
    const waveMat2 = new THREE.MeshBasicMaterial({
      color: hex("#8A4F55"),
      wireframe: true,
      transparent: true,
      opacity: 0.035,
      depthWrite: false,
    });
    const waveMesh2 = new THREE.Mesh(waveGeo2, waveMat2);
    waveMesh2.rotation.x = Math.PI / 3.5;
    waveMesh2.position.set(0, 24, -10);
    scene.add(waveMesh2);
    const waveVerts2 = waveGeo2.attributes.position.array as Float32Array;

    // ── Mouse tracking ────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const camTarget = { x: 0, y: 0 };
    const camCurrent = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5);
      mouse.y = (e.clientY / window.innerHeight - 0.5);
      camTarget.x = mouse.x * 5;
      camTarget.y = -mouse.y * 3.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────
    let rafId: number;
    const t0 = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = (performance.now() - t0) / 1000;

      // Stars drift
      const stars = scene.getObjectByName("stars") as THREE.Points;
      if (stars) {
        stars.rotation.y = t * 0.006;
        stars.rotation.x = t * 0.002;
      }

      // Floating particles drift
      const pa = partGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PART_N; i++) {
        pa[i * 3]     = partBase[i * 3]     + Math.sin(t * 0.35 + partPhase[i]) * 2.5;
        pa[i * 3 + 1] = partBase[i * 3 + 1] + Math.cos(t * 0.28 + partPhase[i] + 1) * 2.5;
        pa[i * 3 + 2] = partBase[i * 3 + 2] + Math.sin(t * 0.22 + partPhase[i] + 2) * 1.5;
      }
      partGeo.attributes.position.needsUpdate = true;

      // Rotate wireframe spheres
      wireMeshes.forEach((ls) => {
        ls.rotation.x += ls.rotSpeed[0];
        ls.rotation.y += ls.rotSpeed[1];
        ls.rotation.z += ls.rotSpeed[2];
      });

      // Orbit light orbs
      orbs.forEach(({ mesh, spec }) => {
        const angle = t * spec.speed + spec.offset;
        mesh.position.x = Math.cos(angle) * spec.orbitR;
        mesh.position.z = Math.sin(angle) * spec.orbitR - 12;
        mesh.position.y = spec.yBase + Math.sin(t * 0.4 + spec.offset) * spec.yWave;
      });

      // Animate wave mesh (bottom)
      for (let i = 0; i < waveVerts.length / 3; i++) {
        const x = waveVerts[i * 3];
        const z = waveVerts[i * 3 + 2];
        waveVerts[i * 3 + 1] = Math.sin((x + t * 1.2) * 0.12) * 2.5 + Math.cos((z + t * 0.8) * 0.12) * 2;
      }
      waveGeo.attributes.position.needsUpdate = true;

      // Animate wave mesh (top)
      for (let i = 0; i < waveVerts2.length / 3; i++) {
        const x = waveVerts2[i * 3];
        const z = waveVerts2[i * 3 + 2];
        waveVerts2[i * 3 + 1] = Math.sin((x - t * 0.9) * 0.10) * 2 + Math.cos((z + t * 1.1) * 0.10) * 1.8;
      }
      waveGeo2.attributes.position.needsUpdate = true;

      // Smooth camera parallax
      const lerpK = 0.04;
      camCurrent.x += (camTarget.x - camCurrent.x) * lerpK;
      camCurrent.y += (camTarget.y - camCurrent.y) * lerpK;

      camera.position.x = camCurrent.x + Math.sin(t * 0.07) * 1.5;
      camera.position.y = camCurrent.y + Math.cos(t * 0.05) * 1.2;
      camera.position.z = 35 + Math.sin(t * 0.04) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, width: "100%", height: "100%" }}
    />
  );
}
