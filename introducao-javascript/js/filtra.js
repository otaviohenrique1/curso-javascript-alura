var campoFiltro = document.querySelector("#filtrar-tabela");
campoFiltro.addEventListener("input", function(){
	/*input evento de digitar no campo*/
	//console.log(this.value);
	var pacientes = document.querySelectorAll(".paciente");
	if(this.value.length > 0){
		for(var i = 0; i < pacientes.length; i++){
			var paciente = pacientes[i];
			var tdNome = paciente.querySelector(".info-nome");
			var nome = tdNome.textContent;
			var expressao = new RegExp(this.value, "i");
			/*RegExp(this.value, "i") expressão regular,filtra letra por letra, 
			this.value é o texto que vai ser procurado , 
			"i" é como a busca deve ser feita, no caso o "i" é 
			para buscar palavras com letras maiusculas e minusculas*/
			if(!expressao.test(nome)){
				//se for diferente do pesquisado coloca a classe
				//test() testa se o nome buscado contem ou não a expressão
				paciente.classList.add("invisivel");
			}
			/*
				if(nome != this.value){
					paciente.classList.add("invisivel");
					//coloca a classe no td
				}
			*/
			else{
				//se não for diferente do pesquisado não coloca a classe
				paciente.classList.remove("invisivel");
			}
		}
	}
	else{
		for(var i = 0; i < pacientes.length; i++){
			var paciente = pacientes[i];
			paciente.classList.remove("invisivel");
			/*retira a classe no td*/
		}
	}
});