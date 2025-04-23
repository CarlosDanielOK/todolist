class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        let nuevaActividad = new Activity(++this.id, title, description, imgUrl);
        this.activities.push(nuevaActividad);

        const divContenedor = document.getElementById("contenedor-actividades");
        const textoNoActividades = document.getElementById("textoNoHayActividades");

        const actividadDiv = document.createElement('div');
        actividadDiv.classList.add('actividades');

        const tituloH3 = document.createElement('h3');
        tituloH3.classList.add('actividades-titulo');
        tituloH3.textContent = title;

        const imagen = document.createElement('img');
        imagen.classList.add('actividades-img');
        imagen.src = imgUrl;

        const textoP = document.createElement('p');
        textoP.classList.add('actividades-texto');
        textoP.textContent = description;

        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('boton-eliminar');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.id = this.id;

        botonEliminar.addEventListener('click', function (event) {
            repositorio.deleteActivity(event.target.id);
            actividadDiv.remove();
        });

        actividadDiv.appendChild(tituloH3);
        actividadDiv.appendChild(imagen);
        actividadDiv.appendChild(textoP);
        actividadDiv.appendChild(botonEliminar);

        divContenedor.appendChild(actividadDiv);

        if (textoNoActividades) {
            textoNoActividades.remove();
        }
    }

    deleteActivity(id) {
        const tarjetaBorrada = this.activities.filter((activity) => Number(activity.id) !== Number(id));
        this.activities = tarjetaBorrada;
    }
}

const repositorio = new Repository();

const formulario = document.getElementById("form");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputNombre = document.getElementById("inombre").value;
    const inputDescripcion = document.getElementById("idescripcion").value;
    const inputUrlimagen = document.getElementById("iurlimagen").value;
    repositorio.createActivity(inputNombre, inputDescripcion, inputUrlimagen);
});