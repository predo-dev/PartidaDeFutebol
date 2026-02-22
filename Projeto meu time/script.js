// ===============================
// REFERÊNCIAS A ELEMENTOS DO DOM
// ===============================

// Relógio da partida (minutos)
const relogio = document.getElementById("relogio");

// Botão para iniciar nova partida
const btnComecar = document.getElementById("btn-comecar");

// Elementos que mostram os gols no placar
const spanGolsCasa = document.getElementById("gols-casa");
const spanGolsVisitante = document.getElementById("gols-visitante");

// Área onde os eventos da partida aparecem
const eventos = document.getElementById("eventos");

// Começa com os eventos escondidos
eventos.classList.add("oculto");


// ===============================
// VARIÁVEIS DE CONTROLE DO JOGO
// ===============================

// Tempo atual da partida
let tempo = 0;

// Guarda o setInterval ativo
let intervalo = null;

// Placar
let golsCasa = 0;
let golsVisitante = 0;

// Força dos times (influencia chance de gol)
let forca_casa = 70;
let forca_visi = 68;


// ===============================
// FUNÇÃO QUE INICIA A PARTIDA
// ===============================

function iniciarPartida() {

    // Evita iniciar várias partidas ao mesmo tempo
    if (intervalo !== null) return; 

    // Esconde o botão enquanto o jogo está rodando
    btnComecar.classList.add("oculto");

    // Zera o placar
    golsCasa = 0;
    golsVisitante = 0;

    // Atualiza o placar visualmente
    spanGolsCasa.textContent = golsCasa;
    spanGolsVisitante.textContent = golsVisitante;

    // Mostra a área de eventos
    eventos.classList.remove("oculto");

    // Limpa eventos da partida anterior
    eventos.textContent ="";

    // Reinicia o relógio
    tempo = 0;
    relogio.textContent = "0'";

    // Inicia o cronômetro (500ms = 1 minuto do jogo)
    intervalo = setInterval(() => {

        // Incrementa o tempo
        tempo++;

        // Atualiza o relógio na tela
        relogio.textContent = tempo + "'";

        // Gera evento do minuto
        geraEvento(tempo);
        
        // Encerra aos 90 minutos
        if (tempo >= 90) {
            encerrarPartida();
        }

    }, 500);
}


// ===============================
// FUNÇÃO QUE ENCERRA A PARTIDA
// ===============================

function encerrarPartida() {

    // Para o cronômetro
    clearInterval(intervalo);

    // Libera para nova partida
    intervalo = null;

    // Mostra novamente o botão
    btnComecar.classList.remove("oculto");

    // Verifica o resultado final
    if(golsCasa > golsVisitante){

        adicionarEvento("Fortaleza ganhou !");

    }else if(golsCasa === golsVisitante){

        adicionarEvento("Jogo terminou empatado!");

    }else{

        adicionarEvento("Ceará ganhou!");
    }
}


// ===============================
// DEFINE O QUE ACONTECE EM CADA MINUTO
// ===============================

function geraEvento(minutoAtual) {

    // Sorteia número de 0 a 99
    const sorteio = Math.floor(Math.random() * 100);

    // 60% nada acontece
    if (sorteio < 60) {

        console.log("Nada ocorreu");

    } 
    // 20% chance do time da casa atacar
    else if (sorteio < 80) {

        chanceCasa(minutoAtual);

    } 
    // 20% chance do visitante atacar
    else {

        chanceVisitante(minutoAtual);
    }
}


// ===============================
// TENTATIVA DE GOL - TIME DA CASA
// ===============================

function chanceCasa(minutoAtual){

    // Sorteio complementar para definir sucesso
    const sorteio = Math.floor(Math.random() * 55);

    // Cálculo da chance baseado na diferença de força
    chanceGol = forca_casa - forca_visi + sorteio;

    // Se ultrapassar 50, é gol
    if(chanceGol > 50){

        golsCasa++;

        // Atualiza placar
        spanGolsCasa.textContent = golsCasa;

        // Adiciona evento na tela
        adicionarEvento(`Min ${minutoAtual}: Gol do Fortaleza`);
    }
}


// ===============================
// TENTATIVA DE GOL - VISITANTE
// ===============================

function chanceVisitante(minutoAtual){

    const sorteio = Math.floor(Math.random() *55);

    chanceGol = forca_visi - forca_casa + sorteio;

    if(chanceGol > 50){

        golsVisitante++;

        spanGolsVisitante.textContent = golsVisitante;

        adicionarEvento(`Min ${minutoAtual}: Gol do Ceará `);
    }
}


// ===============================
// ADICIONA EVENTO NA TELA
// ===============================

function adicionarEvento(texto) {

    // Cria novo parágrafo
    const p = document.createElement("p");

    // Define o texto
    p.textContent = texto;

    // Adiciona na área de eventos
    eventos.appendChild(p);

    // Faz scroll automático para o último evento
    eventos.scrollTop = eventos.scrollHeight;
}