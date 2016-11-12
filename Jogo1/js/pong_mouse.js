//função coordenadas
function coordenadas(evento) {
    //Inicializamos a variável y
    var y = 0;

    //Se o navegador é Firefox, usa o objeto 'window.event'
    if (window.event) {
        y = window.event.clientY;
    } else {
        y = evento.clientY;
    }

    //Alterar a posição 'top' do elemento padlle1
    $("#paddle1").css("top", y - 80);
}

//Ao carregar o documento
$(function () {
    //Define a função coordenada() para o evento de mover o muse no documento
    jQuery(document).mousemove(coordenadas);
});