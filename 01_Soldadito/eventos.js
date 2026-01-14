import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Referencia al elemento HTML
const divHola = document.getElementById('mensaje-hola');

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

            // LA OCULTAMOS AUTOMÁTICAMENTE después de 2 segundos
            setTimeout(() => {
                divHola.style.display = 'none';
            }, 2000);
        }
    }
});