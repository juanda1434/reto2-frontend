function consultar() {
    $.ajax(
             {
                url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                type         : 'GET',
                dataType     : 'json',
                success      :  function(json){
                    
                                    
                                    $("#message").empty();
                                    $("#idmessage").empty();
                                    $("#res").empty();

                                    document.getElementById("tablaid").style.display="";
                                    for (i=0; i < json.items.length; i++){
                                        var idd= json.items[i].id;
                                        var mensaje = json.items[i].messagetext;
                                        
                                        $("#res").append("<tr>");
                                        $("#res").append("<td>" + json.items[i].id + "</td>");
                                        $("#res").append("<td>" + json.items[i].messagetext + "</td>");
                                       $("#res").append("<td> <a id='boton' class=\"btn btn-outline-primary\"> DETAIL </a></td>");
                                      //llamar por medio de jquery el accionar del boton detail
                                       $("#boton").click(()=>mostrarinfo(idd,mensaje));
                                        //insertar y llamar dentro de una columna por medio de JS
                                       $("#res").append("<td> <a class=\"btn btn-outline-danger\" onclick=borrar(" + idd +")>DELETE MESSAGE</a> </td>");
                                        
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

function insertar() {

            var message;
            //obtener valores de las cajas de texto
            var inputValue = document.getElementById("messageform").value; 
            var formid = document.getElementById("idmessageform").value;
            //imprimir valores por consola para comprobar que esta obteniendo los valores deseados
            console.log(inputValue);
            console.log(formid);
            //asignar valores en formato JSON
           message = {id: formid, messagetext: inputValue};
            $.ajax (
                {
        
                    url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                    type         : 'POST',
                    data         :  message,
        
                    success      :  function(response){
                                       console.log(response);
                                       //refresh a la tabla
                                       consultar();
                                    },
                    error       :   function(xhr,status){
                                    console.log( xhr);
        
                                    }
                                
                }
            );
           
        }
        
        
        function borrar(deleteid) {

            var datos;
        
            datos      = {id : deleteid};
            datosEnvio   = JSON.stringify(datos);
        
            $.ajax (
                {
        
                    url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
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
        


        function editarmensaje()
        {
            
            var message;
           //obtener valores de los inputs (cajas de texto)
           var idDetail= document.getElementById("idinfo").value;
           var infomessage= document.getElementById("messageinfo").value;
          
       
            //asignar en formato JSON
            message = {id: idDetail, messagetext: infomessage};
            datosEnvio= JSON.stringify(message);
        
            $.ajax (
                {
        
                    url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',

                    success      :  function(response){
                                        console.log(response);
                                        
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }

                                
                }
            );
        }
    


        function mostrarinfo(id, sms){
            //hacer visible el editar informacion (boton detail)
            document.getElementById("userinformation").style.display="";
            document.getElementById("botoninfo").style.display="";
            //asignarle los valores a las cajas de editar
            document.getElementById("idinfo").value = id;
            document.getElementById("messageinfo").value = sms;
            
        }

        function actualizar() {


            var idi = document.getElementById("idinfo").value;
            var sms = document.getElementById("messageinfo").value;
            console.log(idi);
            console.log(sms);

            planeta      = {id : idi, messagetext: sms};
            datosEnvio   = JSON.stringify(planeta);
        
        
            $.ajax (
                        {
        
                            url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
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
        