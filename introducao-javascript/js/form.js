var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
	event.preventDefault();
	
	var form = document.querySelector("#form-adiciona");
	
	var paciente = obtemPacienteDoFormulario(form);
	
	var erros = validaPaciente(paciente);
	console.log(erros);
	if(erros.length > 0){
		exibeMenssagensDeErro(erros);
		return;/*Retorna vazio*/
	}
	
	adicionaPacienteNaTabela(paciente);
	
	/*Limpa os campos e as menssagens de erro depois que os dados são adicionadosa na tabela*/
	form.reset();
	var menssagensErro = document.querySelector("#menssagens-erro");
	menssagensErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente){
	var pacienteTr = montaTr(paciente);
	/*Adicionando o paciente na tabela*/
	var tabela = document.querySelector("#tabela-pacientes")
	tabela.appendChild(pacienteTr);
}

function exibeMenssagensDeErro(erros){
	/*Cria ul*/
	var ul = document.querySelector("#menssagens-erro");
	ul.innerHTML = "";
	/*forEach*/
	erros.forEach(function(erro){
		var li = document.createElement("li");
		li.textContent = erro;
		ul.appendChild(li);
	});
}

function obtemPacienteDoFormulario(form){
	/*Objeto com as suas propriedades*/
	var paciente = {
		nome: form.nome.value,
		altura: form.altura.value,
		peso: form.peso.value,
		gordura: form.gordura.value,
		imc: calculaImc(form.peso.value, form.altura.value)
	}
	/*value pega o valor dentro do campo*/
	
	return paciente;
}

function montaTr(paciente){
	var pacienteTr = document.createElement("tr");
	pacienteTr.classList.add("paciente");
	
	/*appendChild() coloca o td no tr*/
	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
	pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
	
	return pacienteTr;
}

function montaTd(dado, classe){
	var td = document.createElement("td");
	td.textContent = dado;
	td.classList.add(classe);
	return td;
}

function validaPaciente(paciente){
	var erros = [];
	
	if(paciente.nome.length == 0){
		erros.push("O nome não pode ser em branco")
	}
	
	if(!validaPeso(paciente.peso)){
		erros.push("Peso é inválido");
	}
	
	if(!validaAltura(paciente.altura)){	
		erros.push("Altura é inválida");
	}
	
	if(paciente.gordura.length == 0){
		erros.push("A gordura não pode ser em branco");
	}
	
	if(paciente.peso.length == 0){
		erros.push("O peso não pode ser em branco");
	}
	
	if(paciente.altura.length == 0){
		erros.push("A altura não pode ser em branco");
	}
	return erros;
}