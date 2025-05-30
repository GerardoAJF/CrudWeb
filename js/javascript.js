const API_URL = "https://retoolapi.dev/VJ75lA/integrantes";

// Función que manda a traer el JSON con GET
async function ObtenerIntegrantes() {
    // Respuesta del servidor
    const respuesta = await fetch(API_URL);

    // Pasamos a JSON la respuesta del servidor
    const data = await respuesta.json(); // Esto es increible

    // Enviamos el JSON a la función que genera las filas en la tabla
    MostrarDatos(data);
}

// Función para crear las filas de la tabla en base a un JSON
// "datos" representará al JSON donde viene la información
function MostrarDatos(datos) {

    // Se llama a la tabla con elemento "id" y luego al tbody
    const tabla = document.querySelector("#tabla tbody") 

    // Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; // Vacíamos el contenido de la tabla

    datos.forEach(integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerIntegrantes();