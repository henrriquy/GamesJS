//Definições de variáveis
var paddle1;
var paddle2;
var som;

var TECLA = {
    CIMA: 38,
    BAIXO: 40,
    W: 87,
    S: 83
};

var pontuacao = {
    jogador1: 0,
    jogador2: 0
};

var jogo = {};//Objeto
jogo.pressionou = [];//Array
jogo.asteroide = {
    velocidade: 5,
    x: 150,
    y: 100,
    direcaoX: 1,
    direcaoY: 1
}

//Funcões

function moveBatedores() {


    //paddle1
    if (jogo.pressionou[TECLA.W]) {
        paddle1.css("top", parseInt(paddle1.css("top")) - 5)
    } else if (jogo.pressionou[TECLA.S]) {
        paddle1.css("top", parseInt(paddle1.css("top")) + 5);
    }

    //paddle2
    if (jogo.pressionou[TECLA.CIMA]) {
        paddle2.css("top", parseInt(paddle2.css("top")) - 5)
    } else if (jogo.pressionou[TECLA.BAIXO]) {
        paddle2.css("top", parseInt(paddle2.css("top")) + 5);
    }
}

function moveAsteroide() {
    //Propriedades da div 'fundo'
    var fundo = $("#fundo");
    var fundoAltura = parseInt(fundo.height());
    var fundoLargura = parseInt(fundo.width());
    var asteroidDom = $("#asteroide");
    //Movimentação
    var asteroide = jogo.asteroide;
    asteroide.x += asteroide.velocidade * asteroide.direcaoX;
    asteroide.y += asteroide.velocidade * asteroide.direcaoY;

    //Não deixa ultrapassar o limite inferior do fundo
    if (((asteroide.y + asteroide.velocidade * asteroide.direcaoY) + parseInt(asteroidDom.height())) > fundoAltura) {
        asteroide.direcaoY = -1;
    }
    //Nao deixa ultrapassar o limite lateral direito do fundo
    if (((asteroide.x + asteroide.velocidade * asteroide.direcaoX) + parseInt(asteroidDom.width())) > fundoLargura) {
        asteroide.direcaoX = -1;
        //Incrementa a pontuação do Jogador1
        pontuacao.jogador1++;
        $("#jogador1").html(pontuacao.jogador1);
    }

    //Não deixa ultrapassar o limite superior do fundo
    if ((asteroide.y + asteroide.velocidade * asteroide.direcaoY) < 0) {
        asteroide.direcaoY = 1;
    }
    //Nao deixa ultrapassar o limite lateral esquerdo do fundo
    if ((asteroide.x + asteroide.velocidade * asteroide.direcaoX) < 0) {
        asteroide.direcaoX = 1;

        //Incrementa a pontuação do jogador2
        pontuacao.jogador2++;
        $("#jogador2").html(pontuacao.jogador2);
    }

    //Detectando as colisões

    var paddle1X = parseInt(paddle1.css("left")) + parseInt(paddle1.css("width")) - 3;
    var paddle1YBaixo = parseInt(paddle1.css("top")) + parseInt(paddle1.css("height"));
    var paddleYTopo = parseInt(paddle1.css("top"));

    var paddle2X = parseInt(paddle2.css("left")) + parseInt(paddle2.css("width")) - 51;
    var paddle2YBaixo = parseInt(paddle2.css("top")) + parseInt(paddle2.css("height"));
    var paddle2YTopo = parseInt(paddle2.css("top"));

    if ((asteroide.x + asteroide.velocidade * asteroide.direcaoX) < paddle1X) {
        if ((asteroide.y + asteroide.velocidade * asteroide.direcaoY) <= paddle1YBaixo &&
            ((asteroide.y + asteroide.velocidade * asteroide.direcaoY >= paddleYTopo))
            ) {
            asteroide.direcaoX = 1;
            som.play();
        }
    }

    if ((asteroide.x + asteroide.velocidade * asteroide.direcaoX) >= paddle2X) {
        if (((asteroide.y + asteroide.velocidade * asteroide.direcaoX) <= paddle2YBaixo) &&
            ((asteroide.y + asteroide.velocidade * asteroide.direcaoX) >= paddle2YTopo)) {
            asteroide.direcaoX = -1;
            som.play();
        }
    }

    //Condições para finalizar o jogo
    if (pontuacao.jogador1 == 5 || pontuacao.jogador2 == 5)
        gameOver();

    asteroidDom.css({
        "left": asteroide.x,
        "top": asteroide.y
    });
}
function infoGame() {
    $("#p_data").html(localStorage.getItem("data"));
    $("#p_jogador1").html(localStorage.getItem("jog1"));
    $("#p_jogador2").html(localStorage.getItem("jog2"));
}
function gameOver() {
    //Para a música de fundo
    document.getElementById("musica").pause();

    //Armazena a data/hora
    var dt = new Date();
    localStorage.setItem("data", dt);

    //Armazena a pontuação do jogadores
    localStorage.setItem("jog1", pontuacao.jogador1);
    localStorage.setItem("jog2", pontuacao.jogador2);

    //Escreve na página as informações sobre 
    infoGame();

    //Exibe um alerta informando o ganhador
    if (pontuacao.jogador1 > pontuacao.jogador2) {
        alert("Jogador 1 Ganhou!!");
        window.location.reload();
    } else {
        alert("Jogador 2 Ganhou!!");
        window.location.reload();
    }
}


function loop() {
    //Executa a funcao moveBatedores()
    moveBatedores();

    //Executa a função moveAsteroida()
    moveAsteroide();
}
//Ao carregar o documento

$(function () {
    paddle1 = $("#paddle1");
    paddle2 = $("#paddle2");

    //Esccreve na página as informações sobre o último jogo
    infoGame();

    //Sons
    som = document.getElementById('som');

    //Armazenar a propriedade 'timer' a função setInterval
    jogo.timer = setInterval(loop, 30);//Executa a função loop() a cada 30 milisegundos.

    //Ao precionar um tecla
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });

    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });
});