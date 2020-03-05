var botaoAdicionar = document.querySelector("#buscar-pacientes");
botaoAdicionar.addEventListener("click", function(){
	console.log("Buscando pacientes...");
	/*Ajax para fazer requisicao a algum servidor*/
	var xhr = new XMLHttpRequest();/*XMLHttpRequest() faz requisicoes http*/
	xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");/*Abre e cria a requisicao http*/
	var erroAjax = document.querySelector("#erro-ajax");
	xhr.addEventListener("load", function(){
		if(xhr.status == 200){
			erroAjax.classList.add("invisivel");
			//console.log(xhr.responseText);/*Exibe no console do navegador a resposta da requisição*/
			var resposta = xhr.responseText;
			//console.log(resposta);
			//console.log(typeof resposta);/*typeof mostra qual é o tipo da resposta*/
			var pacientes = JSON.parse(resposta);
			/*JSON.parse() Pega o texto recebido da resposta da requisição e transforma em um objeto/array*/
			//console.log(pacientes);
			//console.log(typeof pacientes);
			pacientes.forEach(function(paciente){
				adicionaPacienteNaTabela(paciente);
			});
		}
		else{
			/*Exibe erro de requisicao no console do navegador*/
			console.log(xhr.status);
			console.log(xhr.responseText);
			erroAjax.classList.remove("invisivel");
		}
	});
	xhr.send();/*Envia a requisicao*/
});