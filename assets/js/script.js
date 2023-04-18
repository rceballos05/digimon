const listaDigimon = document.querySelector("#lista-digimon")
const url = 'https://digimon-api.vercel.app/api/digimon'
fetch(url).then(response => response.json()).then(data => datos(data)).catch(error => console.log(error))

// aqui se filtraran los datos por el nivel del digimon
function filtarNivel(nivel)
{
    listaDigimon.innerHTML=''
    fetch(`${url}/level/${nivel}`).then(response => response.json()).then(data => datos(data)).catch(error => console.log(error))
}

const itemsPerPage = 9
var totalPages = 0
let currentPage = 1

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
        //div.classList.add("digimon")
        div.setAttribute("class",`digimon ${digi.level}`)
        // div.setAttribute("id",`${i}`)
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
