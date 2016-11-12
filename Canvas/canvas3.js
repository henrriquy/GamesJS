var imagemMapeada;
var context;
var animationFrames = [1, 2, 3, 4, 5, 6, 7, 8];
var frameIndex = 0;
var rotation = 90;
var x = 50;
var y = 50;


window.addEventListener('load', eventoJanela, false);
function eventoJanela() {
    canvasApl();
}
function canvasApl() {
    var exibeCanvas = document.getElementById("canvas");
    context = exibeCanvas.getContext("2d");
    imagemMapeada = new Image();
    imagemMapeada.addEventListener("load", inicia, false);
    imagemMapeada.src = "canvas/tanks.png";
}

function desenhaTela() {
    context.fillStyle = "#a8903f";
    context.fillRect(0, 0, 500, 500);
    context.setTransform(1, 0, 0, 1, 0, 0);
    var angleInRadians = rotation * Math.PI / 180;
    context.translate(x + 16, y + 16);
    context.rotate(angleInRadians);
    var sourceX = Math.floor(animationFrames[frameIndex] % 8) * 32;
    var sourceY = Math.floor(animationFrames[frameIndex] / 8) * 32;
    context.drawImage(imagemMapeada, sourceX, sourceY, 32, 32, -16, 16, 32, 32);
    frameIndex++;
    if (frameIndex == animationFrames.length) {
        frameIndex = 0;
    }
}

function gameLoop() {
    desenhaTela();
}

function inicia() {
    setInterval(gameLoop, 100);
}