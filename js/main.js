var todosLosTemas = {
  url:'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
}

var $mostrarTemas= $("#mostrarTemas");

var cargarPagina = function(){
  mostrarTodosTemas();
  $("#add-form").submit(agregarTemaNuevo);
  $("#search-form").submit(filtrarTemas);
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
  // $tituloTema.attr("id", Date.Now())
  var $contenido = $("<span />");
  $contenido.text(contenidoTema);
  var $autor = $("<p />");
  $autor.text(autor);
  var $contadorRespuestas = $("<p />");
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

//Para filtrar los temas
var filtrarTemas = function(e){
  e.preventDefault();
  var criterioBusqueda = $("#search").val().toLowerCase();
  var objetoFiltro = $("body").find("#mostrarTemas").find("div").find("span");
  console.log(objetoFiltro);
  var temasFiltrados = objetoFiltro.filter(function(objeto,nombre)
  {
    console.log(objeto);
    console.log(nombre);
    //  return objeto..toLowerCase().indexOf(criterioBusqueda) >= 0;
  });
  mostrarTodosTemas(temasFiltrados);
}






$(document).ready(cargarPagina);
