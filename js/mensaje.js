const registrar = () => {
  const id = document.getElementById("id").value;
  const mensaje = document.getElementById("mensaje").value;
  console.log(id, mensaje);
  if (id == "" || mensaje == "") {
    alert("id y mensaje no pueden estar vacios");
    return;
  }
  const data = {
    id: id,
    messagetext: mensaje,
  };

  fetch(
    "https://g8d82331278aa84-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
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
    .catch((error) => console.error("error"));
};

const listar = () => {
  btnsActualizar = {};
  btnsEliminar = {};
  fetch(
    "https://g8d82331278aa84-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
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
        const mensaje = document.getElementById("mensajeActualizar");
        id.value = "";
        mensaje.value = "";
        mensaje.disabled = true;
      }
    })
    .catch((error) => console.error(error));
};

const actualizar = () => {
  const id = document.getElementById("idActualizar").value;
  const mensaje = document.getElementById("mensajeActualizar").value;
  const data = {
    id: id,
    messagetext: mensaje,
  };
  fetch(
    "https://g8d82331278aa84-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
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
    "https://g8d82331278aa84-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
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
  if (items.length === 0) {
    document.getElementById("tbody").innerHTML = ` <tr>
  <td>SIN DATOS</td>
  <td>SIN DATOS</td>
  <td>SIN DATOS</td>
</tr>`;
    return;
  }
  const tbody = items.reduce((previo, actual) => {
    btnsActualizar[`btnActualizar${actual.id}`] = {
      id: actual.id,
      msg: actual.messagetext,
    };
    btnsEliminar[`btnEliminar${actual.id}`] = {
      id: actual.id,
    };
    return (
      previo +
      `<tr>
      <td>${actual.id}</td>
      <td>${actual.messagetext}</td>
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
      const mensaje = document.getElementById("mensajeActualizar");
      id.value = btnsActualizar[key].id;
      mensaje.value = btnsActualizar[key].msg;
      mensaje.disabled = false;
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
