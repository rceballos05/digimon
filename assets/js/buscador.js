$('#buscar').click(function(){
    console.log("pasa x aqui??")
    $.ajax({
        url: `https://digimon-api.vercel.app/api/digimon/`,
        type:"GET",
        dataType: "json",
        
        success : function(data){
            console.log("entra al ajax??")
            const buscador = document.querySelector('#buscador')
            let palabra = buscador.value.toLowerCase()
            console.log("data")
            const listaDigimon = document.querySelector('#lista-digimon')
            listaDigimon.innerHTML=''
            $.each(data,function(i,itm){
                console.log("palabra "+palabra)
                let nombre = itm.name.toLowerCase()
                if(nombre.indexOf(palabra) !== -1){
                    const div = document.createElement("div")
                    div.setAttribute("class",`digimon ${itm.level}`)
                    div.innerHTML = `
                    <div class="digimon-img">
                        <img src="${itm.img}" alt="digimon">
                    </div>
                    <div class="digimon-info">
                        <div class="nombre-contenedor">
                            <h2 class="digimon-nombre">${itm.name}</h2>
                            <p class="digimon-level">${itm.level}</p>
                        </div>
                    </div>`
                    listaDigimon.append(div)
                }
            })
            if(listaDigimon.innerHTML === '')
            {
                alert("digimon no encontrado")
            }
        },
        error: function(jqXHR, textStatus, errorThrown ){
            console.log("error "+textStatus)
        }
    })
    console.log("llega a acá??")
})
