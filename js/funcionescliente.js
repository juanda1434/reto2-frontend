
function insertar2() {

            var cliente;
            var clienteid = document.getElementById("idCliente").value; 
            var nombre = document.getElementById("idNombre").value; 
            var Correo = document.getElementById("idCorreo").value; 
            var edad = document.getElementById("idEdad").value;
            console.log("Hola mundo");
            
           cliente = {id: clienteid, name: nombre, email: Correo, age: edad};
            $.ajax (
                {
                    
        
                    url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
                    type         : 'POST',
                    data         :  cliente,
        
                    success      :  function(response){
                                       console.log(response);
                                       consultar();
                                    },
                    error       :   function(xhr,status){
                                    console.log(status);
                                    }
                                
                }
            );
           
}

function consultar() {
    $.ajax(
             {
                url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
                type         : 'GET',
                dataType     : 'json',
                success      :  function(json){
                    
                                    
                                    $("#message").empty();
                                    $("#idmessage").empty();
                                    $("#res").empty();

                                    document.getElementById("tablaid").style.display="";
                                    for (i=0; i < json.items.length; i++){
                                        var id= json.items[i].id;
                                        var nombre = json.items[i].name;
                                        var correo = json.items[i].email;
                                        var edad = json.items[i].age;
                                        $("#res").append("<tr>");
                                        $("#res").append("<td>" + json.items[i].id + "</td>");
                                        $("#res").append("<td>" + json.items[i].name + "</td>");
                                        $("#res").append("<td>" + json.items[i].email + "</td>");
                                        $("#res").append("<td>" + json.items[i].age + "</td>");
                                       $("#res").append("<td> <a id='boton' class=\"btn btn-outline-primary\">DETALLES</a></td>");
                                       $("#boton").click(()=>mostrarinfo(id,nombre,correo,edad));
                                       $("#res").append("<td> <a class=\"btn btn-outline-danger\" onclick=borrar(" +id+")>ELIMINAR</a> </td>");
                                        
                                        $("#res").append("</tr> ");

                                    }
                                    console.log(json)
                                },

                 error       :  function(xhr,status){
                                    console.log(xhr)
                                }
             }
    );    
}
function mostrarinfo(id,nombre,correo,edad){
    document.getElementById("clienteinformation").style.display="";
    document.getElementById("botoninfo").style.display="";
    document.getElementById("idinfo").value = id;
    document.getElementById("nombreinfo").value = nombre;
    document.getElementById("correoinfo").value = correo;
    document.getElementById("edadinfo").value = edad;
    
}
function borrar(deleteid) {

    var datos;

    datos      = {id : deleteid};
    datosEnvio   = JSON.stringify(datos);

    $.ajax (
        {

            url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
            type         : 'DELETE',
            data         :  datosEnvio,
            contentType  : 'application/json',

            success      :  function(response){
                                console.log("Delete exitoso");
                                consultar();

                            },
            error       :   function(xhr,status){
                                console.log(xhr);

                            }
        }
    );

}
function actualizar() {
    var id = document.getElementById("idinfo").value;
    var nombre = document.getElementById("nombreinfo").value;
    var correo = document.getElementById("correoinfo").value;
    var edad = document.getElementById("edadinfo").value;
    cambio      = {id: id, name: nombre, email: correo, age: edad};
    datosEnvio   = JSON.stringify(cambio);
    $.ajax (
                {
                    url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',

                    success      :  function(response){
                                        console.log(response);
                                        consultar();
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }
                }
            );
}
        
        