var tecla = {
    w: 87,
    s: 83,
    cima: 38,
    baixo: 40
};

//Ao carregar o documento
$(function () {

    // Ao pressionar alguma tecla
    $(document).keydown(function (e) {

        //Seleciona e armazena as referências dos elementos
        var paddle1 = $("#paddle1");
        var paddle2 = $("#paddle2");
        
        switch (e.which) {
            case tecla.w:
                paddle1.css("top", parseInt(paddle1.css("top")) - 5);
                break;
            case tecla.s:
                paddle1.css("top", parseInt(paddle1.css("top")) + 5);
                break;
            case tecla.cima:
                paddle2.css("top", parseInt(paddle2.css("top")) - 5);
                break;
            case tecla.baixo:
                paddle2.css("top", parseInt(paddle2.css("top")) + 5);
                break;
            default:
                break;

        }

    });

});