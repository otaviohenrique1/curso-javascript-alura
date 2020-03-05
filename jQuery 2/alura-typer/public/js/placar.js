function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Usuario";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.append(linha);
    $(".placar").slidedown(500);
    scrollPlacar();
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(() => {
        linha.remove();
    }, 1000);
}

$("#botao-placar").click(mostraPlacar);
function mostraPlacar() {
    $(".placar").slideToggle(600);
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top();
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

$("#botao-sync").click(sincronizaPlacar);

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(() => {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };
    
    $.post("http://localhost:3000/placar", dados, () => {
        console.log("Placar sincronizado com sucesso");
    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar", (data) => {
        $(data).each(() => {
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}