let titulo = document.getElementById("titulo");
titulo.textContent = "Titulo actualizado";

document.getElementById("paragrafo").textContent = "Texto actualizado desde js";


let mascota = document.getElementById("mascota");
mascota.src = "imagenes/perro.jpg";
mascota.alt = "Perrito mono";
mascota.setAttribute("Miinvento", "Esto me lo invento");

for (let i = 0; i <= 100; i++) {
    let newArticle = document.createElement("article");
    newArticle.innerHTML = "<h3>Titulo del articulo</h3><p>Parrafp del articulo></p>";

    document.getElementById("main").appendChild(newArticle);
}
//document.body.appendChild(newArticle);


