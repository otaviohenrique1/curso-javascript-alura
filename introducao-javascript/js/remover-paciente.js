var pacientes = document.querySelectorAll(".paciente");
var tabela = document.querySelector("table");/*ou tbody*/
tabela.addEventListener("dblclick", function(event){
	//var alvoEvento = event.target;
	//var paiDoAlavo = alvoEvento.parentNode;/*parentNode seleciona o Pai do alvo, tr é o pai do td*/
	//paiDoAlavo.remove();
	event.target.parentNode.classList.add("fadeOut");/*Desaparece devagar da tabela*/
	
	setTimeout(function(){
		/*setTimeout() Coloca tempo de espera, para executar alguma outra função*/
		event.target.parentNode.remove();/*target mostra quem foi o alvo do evento*/
	},500);
});
/*
	pacientes.forEach(function(paciente){
		paciente.addEventListener("dblclick", function(){
			//dblclick usado em eventos de duplo clique
			console.log("Fui clicado com um duplo click");
			this.remove();//Remove item da tabela
			//this é dono do evento
		})
	});
*/