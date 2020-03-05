var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
});

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaMarcadores() {
    campo.on("input", () => {
        var frase = $(".frase").text();
        var digitado = campo.val;
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function inicializaContadores() {
    campo.on("input", () => {
        var conteudo = campo.val();
    
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", () => {
        var cronometroID =  setInterval(() => {
            tempoRestante--;
            $("#tempo-restante").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                campo.attr("disabled", true);
                campo.toggleClass("campo-desativado");
                inserePlacar();
            }
        }, 1000);
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}