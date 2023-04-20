// en esta parte se declaran las constantes y variables que se utilizaran en este script

const listaDigimon = document.querySelector("#lista-digimon") //lista digimon es el div que va a contener todos los digimons
const url = 'https://digimon-api.vercel.app/api/digimon' // url de la api
const itemsPerPage = 9 // itemsPerPage son los elementos o cards que tendrá la página web
var totalPages = 0 // total pages será el total de páginas que tendrá. en este caso se inicializa en 0 ya que va a depender de la cantidad de objetos que trae la api
let currentPage = 1 // current page es el numero en el que iniciará la paginación
let home = document.querySelector("#home") // aquí se llama al objeto de id home para posteriormente asignarle un evento
let logo = document.querySelector("#img-nav") // aquí se llama al objeto de id img-nav para posteriormente asignarle un evento

// eventos que se utilizaron en el Script. todos ellos son utilizados para cargar los datos de la página
logo.addEventListener("click",function(){
    cargarDatos()
})
home.addEventListener("click",function(){
    cargarDatos()
})
document.addEventListener("DOMContentLoaded", function(){
    cargarDatos()
})

// funciones
// la funcion cargar datos se encarga de cargar todos los datos en la página 
function cargarDatos()
{
    fetch(url).then(response => response.json()).then(data => datos(data)).catch(error => console.log(error))
}
// aqui se filtraran los datos por el nivel del digimon
function filtarNivel(nivel)
{
    listaDigimon.innerHTML=''
    fetch(`${url}/level/${nivel}`).then(response => response.json()).then(data => datos(data)).catch(error => console.log(error))
}

// esta funcion la creé para poder pasar los datos a las dos funciones principales como la paginacion y el mostrar, 
//tambien ayuda en el tema de la paginacion para poder cargar los datos de las otras páginas.
function datos(digimon)
{
    totalPages= Math.ceil(digimon.length / itemsPerPage);
    var items = paginate(digimon,currentPage,itemsPerPage)
    showPage(items)

    // Muestra los botones de navegación

    const pagination = document.querySelector('#pagination');
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add("btn");
        button.textContent = i;
        button.disabled = (i === currentPage);
        if (i === currentPage) {
            button.disabled = true;
            previousButton = button;
        }
        button.addEventListener('click', () => {
            if (previousButton !== null) {
                previousButton.disabled = false;
            }
            currentPage = i;
            const pageItems = paginate(digimon, currentPage, itemsPerPage);
            showPage(pageItems);
            button.disabled = true;
            previousButton = button;
        });
        pagination.appendChild(button);
    }
}

// intento de paginacion

function paginate(items, currentPage, itemsPerPage) 
{
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
}

function showPage(items) 
{
    // Muestra los elementos de la página actual
    listaDigimon.innerHTML = '';
    items.forEach(digi => {
        const div = document.createElement("div")
        div.setAttribute("class",`digimon ${digi.level}`)
        div.innerHTML = `
        <div class="digimon-img">
            <img src="${digi.img}" id="img-card" alt="digimon">
        </div>
        <div class="digimon-info">
            <div class="nombre-contenedor">
                <h2 class="digimon-nombre">${digi.name}</h2>
                <p class="digimon-level">${digi.level}</p>
            </div>
        </div>`
        listaDigimon.append(div)
    });
}

