var titulo = document.querySelector(".Titulo");
titulo.textContent = "Aparecida Nutricionista";/*Altera o texto da tag*/

var pacientes = document.querySelectorAll(".paciente");
/*Retorna uma lista(array) com todos os itens das tags com a classe .paciente*/

for(var i = 0; i < pacientes.length; i++){
	var paciente = pacientes[i];
	
	var tdPeso = paciente.querySelector(".info-peso");
	var peso = tdPeso.textContent;

	var tdAltura = paciente.querySelector(".info-altura");
	var altura = tdAltura.textContent;

	var tdImc = paciente.querySelector(".info-imc");

	var pesoEhValido = validaPeso(peso);
	var alturaEhValida = validaAltura(altura);

	/*Operador lógico || : ou*/
	/*Operador lógico ! : diferente*/
	if(!pesoEhValido){
		pesoEhValido = false;
		tdImc.textContent = "Peso inválido!";
		paciente.classList.add("paciente-invalido");
		/*Adiciona classes/metodos css ao objeto para mudar a cor*/
	}
	if(!alturaEhValida){
		alturaEhValida = false;
		tdImc.textContent = "Altura inválida!";
		paciente.classList.add("paciente-invalido");
	}
	
	/*Operador lógico && : e*/
	if(pesoEhValido && alturaEhValida){
		var imc = calculaImc(peso, altura);
		tdImc.textContent = imc;
	}
}

function validaPeso(peso){
	if(peso >= 0 && peso <1000){
		return true;
	}
	else{
		return false;
	}
}

function validaAltura(altura){
	if(altura >= 0 && altura <= 3.00){
		return true;
	}
	else{
		return false;
	}
}

function calculaImc(peso, altura){
	var imc = 0;
	imc = peso/(altura * altura);
	return imc.toFixed(2);
	/*toFixed() Controla o numero de casas decimais exibidas,
	toFixed(2) : duas casas decimais*/
}