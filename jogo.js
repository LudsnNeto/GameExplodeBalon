var timerId = null;

function iniciaJogo(){

	var url = window.location.search;
	
	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	if(nivel_jogo == 1) { //1 fácil -> 120segundos
		tempo_segundos = 30;
	}

	if(nivel_jogo == 2) { //2 normal -> 60segundos
		tempo_segundos = 30;
	}
	
	if(nivel_jogo == 3) { //3 difícil -> 30segundos
		tempo_segundos = 25;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// quantidade de balões
	var qtde_baloes = 0;

	if(nivel_jogo == 1){
		qtde_baloes =40
	}
	if(nivel_jogo == 2){
		qtde_baloes =40
	}
	if(nivel_jogo == 3){
		qtde_baloes =35
	}

	
	
	cria_baloes(qtde_baloes);

	//imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;
	contagem_tempo(tempo_segundos + 1)
}


function contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); //para a execução do settimeout
		game_over();
		return false;
		

	}


	document.getElementById('cronometro').innerHTML = segundos;
	timerId=setTimeout("contagem_tempo("+segundos+")", 1000); //1000 milesimos = 1 segundo


}



function game_over(){

	alert('Fim de jogo, você não estourou os balões a tempo')

	    remove_eventos_baloes();
		}situacao_jogo:
	
	



function cria_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){  //repetição para ciração dos balões

		var balao = document.createElement("img");
		balao.src = 'imagens/pbpequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b' + i;
		balao.onclick = function () { estourar(this);};

		document.getElementById('cenario').appendChild(balao); // appendChield cria um novo nó dentro de uma estrutura
	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/estourado.png'
	pontuacao(-1);
	
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML; //muda valor na tag
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros, baloes_estourados);


}

function situacao_jogo(baloes_inteiros){


	if(baloes_inteiros == 0){
		alert('Parabéns vocÊ completou o desafio');
		parar_jogo();
	}


}
function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; 
    
   
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}


