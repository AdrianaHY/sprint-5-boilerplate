var todosLosTemas = {
  url:'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
}

var $mostrarTemas= $("#mostrarTemas");

var cargarPagina = function(){
  mostrarTodosTemas();
  $("#add-form").submit(agregarTemaNuevo);
};
var mostrarTodosTemas = function(){
 $.getJSON(todosLosTemas.url, function(temas){
   console.log(temas);
   temas.forEach(crearTema);
});
}
var crearTema = function(tema){
  var autor = tema.author_name;
  // console.log(autor);
  var numRespuestas = tema.responses_count;
  // console.log(tema.responses_count);
  var contenidoTema = tema.content;
  // console.log(contenidoTema);

  //Para crear elementos
  var $contenedorTema = $("<div />");
  var $tituloTema = $("<h1 />");
  var $contenido = $("<p />");
  $contenido.text(contenidoTema);
  var $autor = $("<p></p>");
  $autor.text(autor);
  var $contadorRespuestas = $("<p></p>");
  $contadorRespuestas.text(numRespuestas);

  //Para agregarles clases
  $contenedorTema.addClass("jumbotron");
  $contadorRespuestas.addClass("small");

  //Para anidarlos
  $contenedorTema.append($tituloTema);
  $contenedorTema.append($contenido);
  $contenedorTema.append($autor);
  $contenedorTema.append($contadorRespuestas);

  //Para agregarlos al DOM
  $mostrarTemas.append($contenedorTema);

}

var agregarTemaNuevo = function(e){
  e.preventDefault();
  // var titulo = $("#titulo-tema").val();
  var autor = $("#autor-tema").val();
  var contenido = $("#contenido").val();

  $.post(todosLosTemas.url, {
    author_name:autor,
    content:contenido,

  },function(tema){
    crearTema(tema);
    $("#myModal").modal("hide");
  });
}





$(document).ready(cargarPagina);
