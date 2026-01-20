import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- A. CONFIGURACIÓN BÁSICA ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333); // Fondo gris oscuro para que resalten los colores

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 6); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- B. LUCES ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// --- C. EL SOLDADITO (Grupo) ---
const soldier = new THREE.Group();

// Materiales
const matRed = new THREE.MeshStandardMaterial({ color: 0xff0000 });   // Chaqueta
const matBlue = new THREE.MeshStandardMaterial({ color: 0x0000ff });  // Pantalones
const matBlack = new THREE.MeshStandardMaterial({ color: 0x111111 }); // Sombrero/Botas
const matSkin = new THREE.MeshStandardMaterial({ color: 0xffdbac });  // Piel
const matGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 }); // Detalles

// 1. Cuerpo (Cilindro)
const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32), matRed);
torso.position.y = 2;
soldier.add(torso);

// 2. Cabeza (Esfera)
const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), matSkin);
head.position.y = 2.9;
soldier.add(head);

// 3. Sombrero (Cilindro alto)
const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 32), matBlack);
hat.position.y = 3.4;
hat.userData.name = "sombrero"; // Etiqueta para identificarlo
soldier.add(hat);


// --- 4. Brazos con pivote en el extremo ---
const armHeight = 0.8;
const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, armHeight, 32);

// DESPLAZAMOS LA GEOMETRÍA: 
// La movemos hacia abajo la mitad de su altura. 
// Así, el punto de rotación (0,0,0) queda arriba del todo.
armGeometry.translate(0, -armHeight / 2, 0);

const leftArm = new THREE.Mesh(armGeometry, matRed);
// Ajustamos la posición Y para que el "hombro" (pivote) coincida con la parte alta del torso
leftArm.position.set(-0.6, 2.5, 0); 
soldier.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, matRed);
rightArm.position.set(0.6, 2.5, 0);
soldier.add(rightArm);



/* // 4. Brazos (Cilindros pequeños)
const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 32);
const leftArm = new THREE.Mesh(armGeometry, matRed);
leftArm.position.set(-0.7, 2.1, 0);
leftArm.rotation.z = -Math.PI / 4; // Inclinado

//PROBAMOS MOVIMIENTO HACIA DELANTE
leftArm.rotation.y = -Math.PI / 4; // Inclinado
//Añadimos ejes
const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  leftArm.add(axes);
soldier.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, matRed);
rightArm.position.set(0.7, 2.1, 0);
rightArm.rotation.z = Math.PI / 4;

//PROBAMOS MOVIMIENTO HACIA DELANTE
rightArm.rotation.y = -Math.PI / 4; // Inclinado
soldier.add(rightArm); */

// 5. Piernas (Cilindros)
const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
const leftLeg = new THREE.Mesh(legGeometry, matBlue);
leftLeg.position.set(-0.25, 1, 0);
soldier.add(leftLeg);

const rightLeg = new THREE.Mesh(legGeometry, matBlue);
rightLeg.position.set(0.25, 1, 0);
soldier.add(rightLeg);

// 6. Base (Caja/Pedestal para que parezca de juguete)
const base = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 1.5), matGold);
base.position.y = 0.4;
soldier.add(base);

// Añadimos el grupo completo a la escena
scene.add(soldier);

// --- D. CONTROLES ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- E. ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);

  /*   // 1. Obtenemos el tiempo transcurrido
    // El número que multiplica a Date.now determina la velocidad (0.005 es un buen paso)
    const t = Date.now() * 0.005;

    // 2. Calculamos la oscilación
    // Math.sin devuelve un valor entre -1 y 1. 
    // Lo multiplicamos por 0.5 para que el brazo no dé una vuelta completa.
    const swing = Math.sin(t) * 0.5;

    // 3. Aplicamos el movimiento a los brazos
    // El brazo derecho hace lo opuesto al izquierdo (signo menos)
    leftArm.rotation.x = swing;
    rightArm.rotation.x = -swing; */


    const t = Date.now() * 0.005;
    const swing = Math.sin(t) * 0.5;

    // Rotación de caminata (atrás/adelante)
    leftArm.rotation.x = swing;
    rightArm.rotation.x = -swing;

    // Rotación lateral (opcional: para que no choquen con el cuerpo)
    leftArm.rotation.z = -0.1; 
    rightArm.rotation.z = 0.1;

    //soldier.rotation.y += 0.01;


    controls.update();
    renderer.render(scene, camera);
}

animate();

// Ajuste de ventana
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

