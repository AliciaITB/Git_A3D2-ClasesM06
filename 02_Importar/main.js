import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x090909);

// CÁMARA
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 4);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- B. LUCES  ---
// Luz ambiental (ilumina todo suavemente)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Luz direccional (como el sol)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// --- D. CONTROLES (La navegación) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añade inercia al movimiento (más suave)

// CREAR EL LOADER, objeto que me permite cargar un modelo GLB
const loader = new GLTFLoader();

// CARGAR MODELO
// loader.load(
//   'models/LuffyHat.glb',
//   function (gltf) {
//     scene.add(gltf.scene);
//   },
//   undefined,
//   function (error) {
//     console.error('Error cargando GLB:', error);
//   }
// );

loader.load('models/LuffyHat.glb', (gltf) => {
    const model = gltf.scene;
    
    // 1. Recorrer todos los elementos para ver sus nombres en la consola
    model.traverse((object) => {
        if (object.isMesh) {
            console.log("Nombre del objeto:", object.name);
        }
    });

    // 2. Acceder a un elemento específico por su nombre
    const sombrero = model.getObjectByName("Luffy's hat");
    const cinta = model.getObjectByName("Hat tape");

    // Ejemplo: Cambiar el color de la cinta a un rojo brillante si existe

        cinta.material.color.set(0xff0000);


    scene.add(model);
});

//console.log(loader.asset())

// LOOP
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Ajustar si cambian el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/*******EVENTOS *******/
// Referencia al elemento HTML
const divHola = document.getElementById('saludos');

// Variables para el Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(soldier.children, true);

    if (intersects.length > 0) {
        const objectHit = intersects[0].object;

        if (objectHit.userData.name === "sombrero") {
            // MOSTRAMOS LA CAPA
            divHola.style.display = 'block';
            divHola.innerHTML+="<p>Me has dado en el sombrero</p>"

            // LA OCULTAMOS AUTOMÁTICAMENTE después de 2 segundos
            setTimeout(() => {
                divHola.style.display = 'none';
            }, 6000);
        }
    }
});

