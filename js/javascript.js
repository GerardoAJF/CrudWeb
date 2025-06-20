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
                    <button onclick="AbrirModalEditar('${integrante.id}', '${integrante.nombre}', '${integrante.apellido}', '${integrante.correo}')">Editar</button>
                    <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerIntegrantes();

// Proceso para agregar un nuevo integrante
const modal = document.getElementById("mdAgregar"); // Cuadro de diálogo
const add_button = document.getElementById("btnAgregar"); // Botón de agregar
const close_button = document.getElementById("btnCerrar"); // Botón para cerrar el popup


add_button.addEventListener("click", () => {
    modal.showModal();
});

close_button.addEventListener("click", () => {
    modal.close();
});

// Agregar nuevo integrante desde el formulario

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); // "e" representa a "submit". Evita que el formulario se envíe de un solo

    // Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim(); 
    const apellido = document.getElementById("txtApellido").value.trim(); 
    const correo = document.getElementById("txtEmail").value.trim(); 

    // Validación básica
    if (!nombre || !apellido || ! correo) {
        alert("No se permiten valores nulos");
        return; // Para evitar que el código se siga ejecutando
    }

    // Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST", // Tipo de solicitud
        headers: {'Content-Type':'application/json'}, // Tipo de dato enviado
        body: JSON.stringify({correo, nombre, apellido}) // Datos enviados
    });

    // Verificar si la API responde que los datos fueron enviados correctamente

    if (respuesta.ok) {
        alert("El registro fue agregado correctamente");

        // Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        // Cerrar el modal (dialog)
        modal.close();

        // Recargar la tabla
        ObtenerIntegrantes();
    } else {
        // En caso de que la API devuelva un código diferente a 200-299
        alert("El registro no pudo ser agregado");
    }

});

// Función para borrar registros
async function EliminarPersona(id) {
    const confirmacion = confirm("¿Realmente desea eliminar el registro?");

    // Validamos si el usuario sí escogió borrar
    if (confirmacion) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        // Recargar la tabla después de eliminar
        ObtenerIntegrantes();
    }
}


/* Proceso para editar un registro*/

const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", () => {
    modalEditar.close();
})

function AbrirModalEditar (id, nombre, apellido, correo) {
    // Se agregan los valores del registro en los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;

    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault(); // Evita que el formulario se envíe

    // Capturar los valores del formulario
    const id = document.getElementById("txtIdEditar").value
    const nombre = document.getElementById("txtNombreEditar").value.trim(); 
    const apellido = document.getElementById("txtApellidoEditar").value.trim(); 
    const correo = document.getElementById("txtEmailEditar").value.trim(); 

    // Validación básica
    if (!id || !nombre || !apellido || ! correo) {
        alert("No se permiten actualizar los valores a nulos");
        return; // Para evitar que el código se siga ejecutando
    }

    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT", // Tipo de solicitud
        headers: {'Content-Type':'application/json'}, // Tipo de dato enviado
        body: JSON.stringify({correo, nombre, apellido}) // Datos enviados
    });

    if (respuesta.ok) {
        alert("El registro fue actualizado correctamente");

        // Limpiar el formulario
        document.getElementById("frmEditar").reset();

        // Cerrar el modal (dialog)
        modalEditar.close();

        // Recargar la tabla
        ObtenerIntegrantes();
    } else  {
        alert("El registro no pudo ser actualizado");
    }

});