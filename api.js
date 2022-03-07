/**
 * Consumo de API de covid 19.
 * disponible en https://api.covid19api.com/summary
 */

// capturamos l evento load de la pagina
window.addEventListener('load', () => {
    let btn = document.getElementById('datos');//referencia del boton para listar los datos.
    btn.addEventListener('click', () => {
        //realizamos la peticion a nuestra api
        fetch('https://api.covid19api.com/summary')
            .then(datos => datos.json())// parseamos los datos a Json 
            .then((datos) => {
                // agregamos a la variable cadenaGlobal todo el html que vamos a imprimir con los datos globales del covid 19
                let cadenaGlobal = `
            <div class="container"><h1>Datos Globales</h1> 
                    <div class="card text-white bg-primary ms-3 mb-3" style="max-width: 18rem;">
                    <div class="card-body text-black">
                    <h5 class="card-title">Global</h5>
                    <div class="card-header"></div>
                        <ul>
                            <li><b>Casos Nuevos:</b> ${datos.Global.NewConfirmed}</li>
                            <li><b>Total Confirmados: </b>${datos.Global.TotalConfirmed}</li>
                            <li><b>Nuevas Mueres:</b> ${datos.Global.NewDeaths}</li>
                            <li><b>Total Muertes:</b> ${datos.Global.TotalDeaths}</li>
                            <li><b>Nuevos Recuperados:</b> ${datos.Global.NewRecovered}</li>
                            <li><b>Total Recuperados:</b> ${datos.Global.TotalRecovered}</li>
                        </ul> 
                        <div class="card-footer bg-transparent border-success">Fecha: ${datos.Global.Date}</div>
                    </div>
                    </div>
            </div> `;
                cadenaGlobal += `<div class="container"><h1>Datos Por Paises</h1>`;
                let i = 0;
                let contador = 0;
                //mapeamos los datos por paises 
                datos.Countries.map((datos, c) => {
                    if (i == (contador + 3)) {
                        contador += 3;
                        cadenaGlobal += '<div class="card-group ">';//agregamos un nuevo grupo de tarjetas cada ves que se agregan 3 tarjetas
                    } else if (i == 0) {
                        cadenaGlobal += '<div class="card-group ">';//agregamos un grupo de tarjetas la primera vez que empieza el ciclo
                    }
                    cadenaGlobal += `
                <div class="card mt-3 ms-3 ">
                    <div class="card-body text-black bg-info">
                     <div class="card-header">${datos.Country}</div>
                        <h5 class="card-title">${c + 1}.</h5>              
                             <ul>
                              <li><b>Codigo Ciudad:</b> ${datos.CountryCode}</li>
                              <li><b>Casos Nuevos:</b> ${datos.NewConfirmed}</li>
                              <li><b>Total Confirmados: </b>${datos.TotalConfirmed}</li>
                              <li><b>Nuevas Mueres:</b> ${datos.NewDeaths}</li>
                              <li><b>Total Muertes:</b> ${datos.TotalDeaths}</li>
                              <li><b>Nuevos Recuperados:</b> ${datos.NewRecovered}</li>
                              <li><b>Total Recuperados:</b> ${datos.TotalRecovered}</li>
                             </ul> 
                     <div class="card-footer bg-transparent border-success">Fecha: ${datos.Date}</div>
                    </div>             
                </div>`;
                    i++;//imvrementamos el contador.
                    if (i == (contador + 3)) {
                      cadenaGlobal += '</div>'; //cerramos cada grupo de tarjetas.
                    }
                })
                cadenaGlobal += '</div>';//cerramos el contenedor.
                document.getElementById("contenido").innerHTML = cadenaGlobal;//agregamos todo el contenido que se contruyo al div de id contenido.
            })
        btn.disabled = true;//deshabilitamos el boton.

    })
})
