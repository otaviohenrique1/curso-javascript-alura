function umaPropaganda(){
	var propagandas = [
		"O que acha de comprar uma motocicleta?",
		"O que acha de comprar uma lancha?",
		"O que acha de comprar uma bicicleta?",
		"O que acha de comprar uma carro?"
	];//Array de propagandas
	var posicao = Math.floor(propagandas.length * Math.random());
	//Math.random() Numero aleatorio
	//Math.floor() Arredonda numero
	var texto = propagandas[posicao];
	var tr = $("<tr>").addClass("propaganda").append($("<td>"));//Cria o tr e cria o td
	tr.find("td").attr("colspan", 6).text(texto);//Coloca o texto no td
	return tr;
}

function atualizaDados(){
	var carrinhos = $(".carrinho");
	carrinhos.each(function(){
		var carrinho = $(this);
		var itens = carrinho.find(".item-total:visible");
		/*Soma os preços*/
		var total = 0;
		for(var i = 0; i < itens.length; i++){
			var item = $(itens[i]);
			var valor = parseFloat(item.text());
			total = total + valor;
		}
		carrinho.find(".valor-total").text(total);
		carrinho.find(".quantidade-itens").text(itens.length);
		//Pega os itens dentro da tabela
	});
	//each() Função do jquery parecida com o for
}

function removeItem(event){
	event.preventDefault();
	var item = $(this);
	//this Referencia o proprio item
	item.closest("tr").hide();
	// item.closest("tr").remove();
	//closest() Procura o elemento acima
	atualizaDados();
}

function undo(){
	var carrinho = $(this).closest(".carrinho");//Procura tag com a classe carrinho
	carrinho.find("tr:visible").removeClass("recuperado");//Procura e pega as trs visiveis
	
	var trs = carrinho.find("tr:hidden");//Procura e pega as trs invisiveis
	trs.addClass("recuperado").show();
	atualizaDados();
}

function daDestaque(){
	$(this).find(".remove-item").fadeIn();
	$(this).addClass("hovering");
}

function tiraDestaque(){
	$(this).find(".remove-item").fadeOut();
	$(this).removeClass("hovering");
}

function alternaPropagandas(event){
	event.preventDefault();
	$(".propaganda").fadeToggle();
	$(".alterna-propaganda").toggle();
}

function aposInicializado(){
	atualizaDados();
	$(".undo").click(undo);
	$(".remove-item").click(removeItem);
	$(".carrinho").each(function(){
		//Para cada carrinho executada a função
		$(this).find("tr:nth-child(3n)").each(function(){
			//tr:nth-child(3n) Para cada 3 elementos da tabela uma propaganda é gerada
			umaPropaganda().insertAfter($(this));//Insere apos a tag atual
		});
	});
	
	$(".carrinho tbody tr").hover(daDestaque, tiraDestaque);
	//hover() Quando o ponteiro do mouse passar por cima de algum item da tabela, o item muda de cor
	
	$(".alterna-propaganda").click(alternaPropagandas);
}
aposInicializado();