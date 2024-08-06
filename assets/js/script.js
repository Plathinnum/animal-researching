import { Leon, Lobo, Oso, Serpiente, Aguila } from "./classes/types.js";
import animalesData from "./animals.js";

// Función para mostrar modales de bootstrap
function showErrorModal(message) {
  $('#modalMessage').text(message);
  $('#errorModal').modal('show');
}

let animales = [];

const reloadTable = () => {
  const animalesTemplate = document.getElementById("researchedAnimal");
  animalesTemplate.innerHTML = "";
  animales.forEach((p, i) => {
    animalesTemplate.innerHTML += `
          <div class="col-6 col-md-3 mb-4">
            <div class="card bg-dark text-white">
            <div class="cursor-pointer">
              <img src="${p.getImg()}" class="card-img-top" onclick="modalDetails('${i}')" alt="Animal Image" />
            </div>
            <div class="card-body">
              <button onclick="playSound('${p.getNombre()}')" class="btn btn-secondary w-100">
                <img height="30" src="assets/img/audio.svg" />
              </button>
          </div>
      </div>
  </div>
    `;
  });
  document
    .querySelectorAll(".card-body button")
    .forEach((b) => b.addEventListener("click", activarHabiblidad));
};

window.playSound = (nombre) => {
  const animal = animales.find((a) => a.getNombre() == nombre);
  console.log(animal);
  nombre == "Leon"
    ? animal.Rugir()
    : nombre == "Lobo"
      ? animal.Aullar()
      : nombre == "Oso"
        ? animal.Grunir()
        : nombre == "Serpiente"
          ? animal.Sisear()
          : nombre == "Aguila"
            ? animal.Chillar()
            : undefined;
};

window.modalDetails = (i) => {
  const modalBody = document.getElementsByClassName("modal-body")[0];
  const animal = animales[i];
  modalBody.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <div class="card bg-dark text-white border-0 modal-card-container">
        <img
          src="${animal.getImg()}"
          class="d-block mx-auto modal-card"
        />
        <div class="card-body text-center">
          <h6 class="card-text ">${animal.getEdad()}</h6>
          <h6 class="card-text m-0">Comentarios</h6>
          <hr/>
          <p>${animal.getComentarios()}</p>
        </div>
      </div>
    </div>
    `;
  const modal = new bootstrap.Modal(document.getElementById('animalModal'));
  modal.show();
};

let imagenSrc;
let sonido;
document.getElementById("animal").addEventListener("change", async (e) => {
  const animalSelected = e.target.value;
  console.log({ animalSelected });
  const animales = await animalesData.getData();
  const animalObject = animales.find((a) => a.name == animalSelected);
  console.log({ animalObject })
  imagenSrc = `/assets/img/${animalObject.image}`;
  console.log({ imagenSrc });
  sonido = animalObject.sound;
  const preview = document.getElementById("bg-svg");
  preview.parentElement.classList.remove("p-5");
  preview.style.backgroundImage = `url(${imagenSrc})`;
});

document.getElementById("registerBtn").addEventListener("click", async (e) => {
  const nombreElement = document.getElementById("animal");
  const edadElement = document.getElementById("age");
  const comentariosElement = document.getElementById("comments");
  const nombre = nombreElement.value;
  const edad = edadElement.value;
  const comentarios = comentariosElement.value;
  // Por alguna razón no me funcionaba "if (nombre && edad && comentarios)" el 100% de las veces, así que hice este monstruo jaosjaos
  if (
    nombre !== "Selecciona un animal" &&
    edad !== "Selecciona un rango etario" &&
    comentarios.trim() !== ""
  ) {
    let animal =
      nombre == "Leon"
        ? new Leon(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Lobo"
          ? new Lobo(nombre, edad, imagenSrc, comentarios, sonido)
          : nombre == "Oso"
            ? new Oso(nombre, edad, imagenSrc, comentarios, sonido)
            : nombre == "Serpiente"
              ? new Serpiente(nombre, edad, imagenSrc, comentarios, sonido)
              : nombre == "Aguila"
                ? new Aguila(nombre, edad, imagenSrc, comentarios, sonido)
                : undefined;

    nombreElement.selectedIndex = 0;
    edadElement.selectedIndex = 0;
    comentariosElement.value = "";
    document.getElementById("bg-svg").style.backgroundImage =
      "url(assets/img/lion.svg)";
    animales.push(animal);
    reloadTable();
  } else {
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
  }
});
