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

                                    
                                    //let res =document.querySelector('#res');
                                    //res.innerHTML = '';
                                    document.getElementById("tablaid").style.display="";
                                    for (i=0; i < json.items.length; i++){
                                        var idd= json.items[i].id;
                                        var mensaje = json.items[i].messagetext;
                                        
                                        $("#res").append("<tr>");
                                        $("#res").append("<td>" + json.items[i].id + "</td>");
                                        $("#res").append("<td>" + json.items[i].messagetext + "</td>");
                                       // $("#res").append("<td> <a id='boton' class=\"btn btn-primary\" onclick=mostrarinfo(" + idd + ", "+ mensaje +  ")> DETAIL </a></td>");
                                       $("#res").append("<td> <a id='boton' class=\"btn btn-outline-primary\"> DETAIL </a></td>");
                                       $("#res").click(()=>mostrarinfo(idd,mensaje));
                                        
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
            var inputValue = document.getElementById("messageform").value; 
            var formid = document.getElementById("idmessageform").value;
            console.log(inputValue);
            console.log(formid);
           message = {id: formid, messagetext: inputValue};
        
            $.ajax (
                {
        
                    url          : 'https://gb3fef91024b680-databasebike.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                    type         : 'POST',
                    data         :  message,
        
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
                                        console.log("Registro exitoso");
        
                                    },
                    error       :   function(xhr,status){
                                        console.log(xhr);
        
                                    }
                }
            );
        
        }
        


        function editarmensaje()
        {
            
            console.log("hello, i will go edit to message")
            var message;
           
           var idDetail= document.getElementById("idinfo").value;
           var infomessage= document.getElementById("messageinfo").value;
          
       

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
                                        console.log("lo hizoo..")
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }

                                
                }
            );
            console.log("estamos listos");
        }
    


        function mostrarinfo(id, sms){
            console.log("estoy en mostrar xD");
            document.getElementById("userinformation").style.display="";
            document.getElementById("botoninfo").style.display="";
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
        