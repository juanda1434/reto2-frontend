const registrar = () => {
  const id = document.getElementById("id").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const idCategoria = document.getElementById("idCategoria").value;
  const nombreCategoria = document.getElementById("nombreCategoria").value;

  if (
    id == "" ||
    marca == "" ||
    modelo == "" ||
    idCategoria == "" ||
    nombreCategoria == ""
  ) {
    alert(
      "id, marca, modelo, id categoria y nombre categoria no pueden estar vacios"
    );
    return;
  }
  const data = {
    id: id,
    brand: marca,
    model: modelo,
    category_id: idCategoria,
    name: nombreCategoria,
  };

  fetch(
    "https://g8d82331278aa84-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/bike/bike",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        return res.json();
      }
      if (res.status == 201) return true;
    })
    .then((response) => {
      if (response === true) {
        listar();
      } else {
        alert(
          "Error al registrar mensaje, recuerde que no debe ingresar id repetidos."
        );
      }
    })
    .catch((error) => console.error(error));
};

const listar = () => {
  btnsActualizar = {};
  btnsEliminar = {};
  fetch(
    "https://g8d82331278aa84-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/bike/bike",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      if (undefined !== response.items) {
        llenarTabla(response.items);
        document.getElementById("btnActualizar").disabled = true;
        const id = document.getElementById("idActualizar");
        const marca = document.getElementById("marcaActualizar");
        const modelo = document.getElementById("modeloActualizar");
        const idCategoria = document.getElementById("idCategoriaActualizar");
        const nombre = document.getElementById("nombreCategoriaActualizar");
        id.value = "";
        marca.value = "";
        marca.disabled = true;
        modelo.value = "";
        modelo.disabled = true;
        idCategoria.value = "";
        idCategoria.disabled = true;
        nombre.value = "";
        nombre.disabled = true;
      }
    })
    .catch((error) => console.error(error));
};

const actualizar = () => {
  const id = document.getElementById("idActualizar").value;
  const marca = document.getElementById("marcaActualizar").value;
  const modelo = document.getElementById("modeloActualizar").value;
  const idCategoria = document.getElementById("idCategoriaActualizar").value;
  const nombre = document.getElementById("nombreCategoriaActualizar").value;
  const data = {
    id: id,
    brand: marca,
    model: modelo,
    category_id: idCategoria,
    name: nombre,
  };
  fetch(
    "https://g8d82331278aa84-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/bike/bike",
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        return res.json();
      }
      console.log(res.status);
      if (res.status == 201) return true;
    })
    .then((response) => {
      console.log(response);
      if (true === response) {
        listar();
      }
    })
    .catch((error) => console.error(error));
};

const eliminar = (id) => {
  const data = {
    id: id,
  };
  fetch(
    "https://g8d82331278aa84-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/bike/bike",
    {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        return res.json();
      }
      console.log(res.status);
      if (res.status == 204) return true;
    })
    .then((response) => {
      console.log(response);
      if (true === response) {
        listar();
      }
    })
    .catch((error) => console.error(error));
};

const llenarTabla = (items) => {
  if (items.length === 0) return;
  const tbody = items.reduce((previo, actual) => {
    btnsActualizar[`btnActualizar${actual.id}`] = {
      id: actual.id,
      marca: actual.brand,
      modelo: actual.model,
      idCategoria: actual.category_id,
      nombre: actual.name,
    };
    btnsEliminar[`btnEliminar${actual.id}`] = {
      id: actual.id,
    };
    return (
      previo +
      `<tr>
        <td>${actual.id}</td>
        <td>${actual.brand}</td>
        <td>${actual.category_id}</td>
        <td>${actual.name}</td>

        <td>
        <button id='btnActualizar${actual.id}' class="btn btn-primary">Actualizar</button>
        <button class="btn btn-danger mx-2" id='btnEliminar${actual.id}'>Eliminar</button>
        </td>
        </tr>`
    );
  }, "");
  document.getElementById("tbody").innerHTML = tbody;

  for (let key in btnsActualizar) {
    document.getElementById(key).onclick = () => {
      const id = document.getElementById("idActualizar");
      const marca = document.getElementById("marcaActualizar");
      const modelo = document.getElementById("modeloActualizar");
      const idCategoria = document.getElementById("idCategoriaActualizar");
      const nombre = document.getElementById("nombreCategoriaActualizar");
      id.value = btnsActualizar[key].id;
      marca.value = btnsActualizar[key].marca;
      marca.disabled = false;
      modelo.value = btnsActualizar[key].modelo;
      modelo.disabled = false;
      idCategoria.value = btnsActualizar[key].idCategoria;
      idCategoria.disabled = false;
      nombre.value = btnsActualizar[key].nombre;
      nombre.disabled = false;
      document.getElementById("btnActualizar").disabled = false;
    };
  }
  for (let key in btnsEliminar) {
    document.getElementById(key).onclick = () => {
      eliminar(btnsEliminar[key].id);
    };
  }
};

let btnsActualizar = {};
let btnsEliminar = {};
document.getElementById("btnEnviar").onclick = registrar;
document.getElementById("btnListar").onclick = listar;
document.getElementById("btnActualizar").onclick = actualizar;
