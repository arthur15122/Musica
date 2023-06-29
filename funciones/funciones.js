$(document).ready(function(){
    //alert('Hola');
llenadoTabla();    
});

function llenadoTabla() {
var cuerpo = '';
$.ajax({
    type: 'GET',
    url: 'http://localhost:7222/api/Musica/listar',
    success: function (comodin){
        console.log("Correcto listar"+JSON.stringify(comodin));
        for (var i=0; i<comodin.length; i++){
            cuerpo += '<tr>' +
            '<td>'+comodin[i].idmusica+'</td>' +
            '<td>'+comodin[i].genero+'</td>' +
            '<td>'+comodin[i].nombre+'</td>' +
            '<td>'+comodin[i].duracion+'</td>' +
            '<td>'+comodin[i].albumn+'</td>' +
            '<td>'+comodin[i].artista+'</td>' +    
            '<td><a class="btn btn-warning" data="' + comodin[i].idmusica + '"><i class="fa fa-fw fa-refresh"></i></a></td>' +
            '<td><a class="btn btn-danger" data="' + comodin[i].idmusica + '"><i class="fa fa-fw fa-refresh"></i></a></td>' +       
            '</tr>';
        }
        $('#cuerpoT').html(cuerpo);
    },
    error: function(sasu){
        console.log("error al listar "+JSON.stringify(sasu));
    }
});//cierra ajax
}//cierra llenado tabla

//inicia guardar musica
$(document).on('click', '#btnGuardar', function (e){
    e.preventDefault(); //evitamos el comportamiento del boton 
    console.log("Boton precionado");

    var idmusica = $('#idmusica').val();
    var genero = $('#genero').val();
    var nombre = $('#nombre').val();
    var duracion = ($('#duracion').val());
    var albumn = $('#albumn').val();
    var artista = $('#artista').val();
    
    console.log("#" + idmusica);
    console.log("genero:"+ genero);
    console.log("nombre:"+ nombre);
    console.log("duracion:"+ duracion);
    console.log("albumn:"+ albumn);
    console.log("artista:"+ artista);


    var json = {
    "idmusica": idmusica,
    "genero": genero,
    "nombre": nombre,
    "duracion": duracion,
    "albumn": albumn,
    "artista": artista
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:7222/api/Musica/guardar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        success: function(goku){
            console.log("Correcto guardar"+JSON.stringify(goku));
            $('#formularioGuardar')[0].reset();
            $('.alert-success').html("Musica Registrado de Forma Correcta: "+nombre).fadeIn().delay(8000).fadeOut('slow');
            llenadoTabla();
        },
        error: function(sasu){
            console.log("error al guardar "+JSON.stringify(sasu));
            $('.alert-danger').html("Error al guardar").show();
        }   
    });//cierra ajax
});//cierra document


function buscarTable() {
    $.ajax({
      type: 'ajax',
      method: 'get',
      url: 'http://localhost:7222/api/Musica/listar',
      success: function(gato) {
        console.log("correcto listar" + JSON.stringify(gato));
  
        var cuerpo = '';
        for (var i = 0; i < gato.length; i++) {
          cuerpo += '<tr>' +
            '<td>' + gato[i].idmusica + '</td>' +
            '<td>' + gato[i].genero + '</td>' +
            '<td>' + gato[i].nombre + '</td>' +
            '<td>' + gato[i].duracion + '</td>' +
            '<td>' + gato[i].albumn + '</td>' +
            '<td>' + gato[i].artista + '</td>' +
            '<td><a class="btn btn-warning" data="' + comodin[i].idmusica + '"><i class="fa fa-fw fa-refresh"></i></a></td>' +
            '<td><a class="btn btn-danger" data="' + comodin[i].idmusica + '"><i class="fa fa-fw fa-refresh"></i></a></td>' +  
            '</tr>';
        }
        $('#cuerpoT').html(cuerpo);
  
        // Asignar el evento de búsqueda al campo de entrada
        $('#table_search_input').on('input', function() {
          searchTable();
        });
  
      }, // cierra success
      error: function(sasu) {
        console.log("error listar" + JSON.stringify(sasu));
      }
    }); // cierra ajax
  }
  //funcion de buscar 
  function searchTable() {
    var searchText = $('#table_search_input').val().toLowerCase();
    $('#cuerpoT tr').each(function() {
      var found = false;
      $(this).each(function() {
        if ($(this).text().toLowerCase().indexOf(searchText) !== -1) {
          found = true;
          return false; // Salir del bucle interno
        }
      });
      $(this).toggle(found);
    });
  }

  //inicia boton eliminar
$('#btnEliminar').click(function(){
    console.log("boton de eliminar funciona");

    var idmusica= $('#idmusica').val();
    var genero= $('#genero').val();
    var nombre= $('#nombre').val();
    var duracion= ($('#duracion').val());
    var albumn= $('#albumn').val();
    var artista= $('#artista').val();

    var json = {
        "idmusica": idmusica,
        "genero": genero,
        "nombre": nombre,
        "duracion": duracion,
        "albumn": albumn,
        "artista": artista
        };
    
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7222/api/Musica/eliminar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto eliminacion"+JSON.stringify(gato));
            llenadoTabla();
            $('.alert-danger').html("se elimino la musica "+nombre).fadeIn().delay(8000).fadeOut('slow');
            limpiar();


    },
    error: function(sasu){
                    console.log("error eliminar"+JSON.stringify(sasu));
                 }

    });

});//fin del boton eliminar

//iniciar buscar eliminar la tabla

$('#cuerpoT').on('click', '.btn-danger', function(){
    var idmusica = $(this).attr('data')
    console.log("idmusica: "+idmusica);
    var json = {"idmusica": idmusica};
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7222/api/Musica/buscar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto buscar"+JSON.stringify(gato));
            $('#idmusica').val(gato.idmusica);
            $('#genero').val(gato.genero);
            $('#nombre').val(gato.nombre);
            $('#duracion').val(gato.duracion);
            $('#albumn').val(gato.albumn);
            $('#artista').val(gato.artista);
            llenadoTabla();
        },
        error: function(sasu){
                    console.log("error eliminar "+JSON.stringify(sasu));
        }


});
});//cierrar buscar eliminair




  //inicia boton editar
  $('#btnEditar').click(function(){
    console.log("boton de editar funciona");

    var idmusica= $('#idmusica').val();
    var genero= $('#genero').val();
    var nombre= $('#nombre').val();
    var duracion= ($('#duracion').val());
    var albumn= $('#albumn').val();
    var artista= $('#artista').val();

    var json = {
        "idmusica": idmusica,
        "genero": genero,
        "nombre": nombre,
        "duracion": duracion,
        "albumn": albumn,
        "artista": artista
        };
    
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7222/api/Musica/editar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto edicion "+JSON.stringify(gato));
            llenadoTabla();
            $('.alert-warning').html("se edito la musica "+nombre).fadeIn().delay(8000).fadeOut('slow');
           limpiar();

    },
    error: function(sasu){
                    console.log("error editar"+JSON.stringify(sasu));
                 }

    });

});//fin del boton editar

//iniciar buscar editar la tabla

$('#cuerpoT').on('click', '.btn-warning', function(){
    var idmusica = $(this).attr('data')
    console.log("idmusica: "+idmusica);
    var json = {"idmusica": idmusica};
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7222/api/Musica/buscar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto buscar"+JSON.stringify(gato));
            $('#idmusica').val(gato.idmusica);
            $('#genero').val(gato.genero);
            $('#nombre').val(gato.nombre);
            $('#duracion').val(gato.duracion);
            $('#albumn').val(gato.albumn);
            $('#artista').val(gato.artista);
            llenadoTabla();
        },
        error: function(sasu){
                    console.log("error ediccion "+JSON.stringify(sasu));
        }


});
});//cierrar buscar editar
//limpiar
function limpiar(){
$('#idmusica').val('');
    $('#genero').val('');
    $('#nombre').val('');
    $('#duracion').val('');
    $('#albumn').val('');
    $('#artista').val('');

}
