import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- CONFIGURACIÓN ESCENA ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 15, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

// --- CREACIÓN DEL CIRCUITO (CURVA) ---
// Definimos puntos por donde pasa el tren (un circuito cerrado)
const points = [
    new THREE.Vector3(-10, 0, -10),
    new THREE.Vector3(10, 0, -10),
    new THREE.Vector3(15, 0, 0),
    new THREE.Vector3(10, 0, 10),
    new THREE.Vector3(-10, 0, 10),
    new THREE.Vector3(-15, 0, 0),
];
const curve = new THREE.CatmullRomCurve3(points, true); // true = cerrado

// Dibujar la vía (visual)
const pathPoints = curve.getPoints(100);
const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
const pathMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
const road = new THREE.Line(pathGeometry, pathMaterial);
scene.add(road);

// --- CREACIÓN DEL TREN (Basado en la imagen) ---
const train = new THREE.Group();

// Cuerpo Principal (Blanco)
const bodyGeom = new THREE.BoxGeometry(1, 1.2, 4);
const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const body = new THREE.Mesh(bodyGeom, whiteMat);
train.add(body);

// Cabina Frontal (Negra y Roja)
const frontGeom = new THREE.BoxGeometry(1.02, 1.22, 0.5);
const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
const front = new THREE.Mesh(frontGeom, blackMat);
front.position.z = 2; // Al frente
train.add(front);

const redStripGeom = new THREE.BoxGeometry(1.05, 0.3, 0.4);
const redMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const redStrip = new THREE.Mesh(redStripGeom, redMat);
redStrip.position.set(0, 0.4, 1.9);
train.add(redStrip);

// Ruedas (Cilindros pequeños)
const wheelGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 16);
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const positions = [[-0.4, -0.6, 1.5], [0.4, -0.6, 1.5], [-0.4, -0.6, -1.5], [0.4, -0.6, -1.5]];
positions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeom, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(...pos);
    train.add(wheel);
});

scene.add(train);

// --- ANIMACIÓN Y MOVIMIENTO ---
const controls = new OrbitControls(camera, renderer.domElement);
let progress = 0; // Valor de 0 a 1 para recorrer la curva
const speed = 0.001; // Velocidad del tren

function animate() {
    requestAnimationFrame(animate);

    // 1. Calcular posición actual en la curva
    progress += speed;
    if (progress > 1) progress = 0;

    const trainPosition = curve.getPointAt(progress);
    train.position.copy(trainPosition);

    // 2. Orientar el tren hacia donde va
    const tangent = curve.getTangentAt(progress).normalize();
    const lookAtPos = trainPosition.clone().add(tangent);
    train.lookAt(lookAtPos);

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Ajuste ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});