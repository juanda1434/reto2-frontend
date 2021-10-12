function consultarBI() {
    $.ajax(
        {
            url       :'https://g949b420d24a8d9-dbreto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike',
            type      :'GET',
            dataType  :'json',

            success      :  function(json){

                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<table>");
                $("#idDivConsulta").append("<caption>Tabla de Bicicletas</caption>");
                $("#idDivConsulta").append("<tr><th>ID</th><th>BRAND</th><th>MODEL</th><th>CATEGORY_ID</th><th>NAME</th></tr>");

                for (i=0; i < json.items.length; i++){
                    var idd= json.items[i].id;
                    var brandd= json.items[i].brand;
                    var modeld= json.items[i].model;
                    var category_idd= json.items[i].category_id;
                    var named= json.items[i].name;
                    $("#idDivConsulta").append("<tr>");
                    $("#idDivConsulta").append("<td>" + idd + "</td>");
                    $("#idDivConsulta").append("<td>" + brandd + "</td>");
                    $("#idDivConsulta").append("<td>" + modeld + "</td>");
                    $("#idDivConsulta").append("<td>" + category_idd + "</td>");
                    $("#idDivConsulta").append("<td>" + named + "</td>");
                    $("#idDivConsulta").append('<td><button onclick="borrarBI('+ idd +')">Borrar</button></td>');
                    $("#idDivConsulta").append('<td><button onclick="obtenerItemBI('+ idd +')">Detalle</button></td>');
                    
                    $("#idDivConsulta").append("</tr>");
                }
                $("#idDivConsulta").append("</table>");

                console.log(json)
            },
            error     : function(xhr,status){
                console.log(xhr)
            }
        }        
            );
    
}

function insertarBI(){
    var bicicleta;

    bicicleta = {
        id:              $("#miID").val(), //esto viene del ID en el HTML
        brand:           $("#miBRAND").val(),
        model:           $("#miMODEL").val(),
        category_id:     $("#miCATEGORY_ID").val(),
        name:            $("#miNAME").val()
    };

    $.ajax(
        {
            url       :'https://g949b420d24a8d9-dbreto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike',
            type      :'POST',
            data      :bicicleta,
            success   :function(response){
                console.log(response);
                consultar();
            },
            error     : function(xhr,status){
                console.log(xhr);
            }
        }
        
            );
}

function borrarBI(idd) {
    var bicicleta;

    bicicleta     = {id : idd};
    datosEnvio    = JSON.stringify(bicicleta);
    
    $.ajax (
        {

            url          : 'https://g949b420d24a8d9-dbreto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike',
            type         : 'DELETE',
            data         :  datosEnvio,
            contentType  : 'application/json',

            success      :  function(response){
                                console.log(response);
                                consultarBI();

                            },
            error       :   function(xhr,status){
                                console.log(xhr);

                            }
        }
    );
}

function actualizarBI(){

    bicicleta = {
        id:              $("#infomiID").val(), //esto viene del ID en el HTML
        brand:           $("#infomiBRAND").val(),
        model:           $("#infomiMODEL").val(),
        category_id:     $("#infomiCATEGORY_ID").val(),
        name:            $("#infomiNAME").val()
    };

    datosEnvio    = JSON.stringify(bicicleta);

    $.ajax (
        {

            url          : 'https://g949b420d24a8d9-dbreto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike',
            type         : 'PUT',
            data         :  datosEnvio,
            contentType  : 'application/json',

            success      :  function(response){
                                console.log(response);
                                consultarBI();
                            },
            error       :   function(xhr,status){
                                console.log( xhr);

                            }
        }
    );
}

function obtenerItemBI(id){

    document.getElementById("userinformation").style.display="";
    document.getElementById("botoninfo").style.display="";
    $.ajax (
        {

            url          : 'https://g949b420d24a8d9-dbreto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/bike/bike/' + id ,
            type         : 'GET',
            dataType     : 'json',


            success      :  function(response){
                console.log(response);
                var item=response.items[0];

                $("#infomiID").val(item.id); //esto viene del ID en el HTML
                $("#infomiBRAND").val(item.brand);
                $("#infomiMODEL").val(item.model);
                $("#infomiCATEGORY_ID").val(item.category_id);
                $("#infomiNAME").val(item.name);
            },
            error: function(jqXHR, textStatus, errorThrown){

            }
        });


}