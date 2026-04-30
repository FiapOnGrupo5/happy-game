const destaques = [
  "Nosso catálogo foi atualizado com novos jogos para todos os estilos.",
  "A comunidade escolheu GTA 6 como um dos jogos mais esperados da semana.",
  "Fortnite continua entre os títulos com maior procura na loja.",
];

const rankingJogadores = [
  { nome: "Ana", score: 1200 },
  { nome: "Bruno", score: 980 },
  { nome: "Carlos", score: 870 },
];

let indiceDestaque = 0;

function mostrarProximoDestaque() {
  const textoDestaque = document.getElementById("textoDestaque");
  textoDestaque.textContent = destaques[indiceDestaque];
  indiceDestaque++;

  if (indiceDestaque >= destaques.length) {
    indiceDestaque = 0;
  }
}

function mostrarRanking() {
  const listaRanking = document.getElementById("listaRanking");
  listaRanking.innerHTML = "";

  for (let i = 0; i < rankingJogadores.length; i++) {
    const jogador = rankingJogadores[i];
    listaRanking.innerHTML +=
      '<li class="list-group-item d-flex justify-content-between align-items-center">' +
      jogador.nome +
      '<span class="badge bg-primary rounded-pill">' +
      jogador.score +
      " pts</span>" +
      "</li>";
  }
}

function mostrarErro(campo, mensagemId, mensagem) {
  campo.classList.add("is-invalid");
  document.getElementById(mensagemId).textContent = mensagem;
}

function limparErro(campo, mensagemId) {
  campo.classList.remove("is-invalid");
  document.getElementById(mensagemId).textContent = "";
}

function cadastrarComunidade(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeCadastro");
  const jogo = document.getElementById("jogoCadastro");
  const mensagemCadastro = document.getElementById("mensagemCadastro");
  let formularioValido = true;

  limparErro(nome, "erroNome");
  limparErro(jogo, "erroJogo");
  mensagemCadastro.innerHTML = "";

  if (nome.value.trim() === "") {
    mostrarErro(nome, "erroNome", "Digite seu nome.");
    formularioValido = false;
  }

  if (jogo.value.trim() === "") {
    mostrarErro(jogo, "erroJogo", "Digite seu jogo favorito.");
    formularioValido = false;
  }

  if (formularioValido) {
    mensagemCadastro.innerHTML =
      '<div class="alert alert-success mt-3" role="alert">Cadastro realizado com sucesso.</div>';
    document.getElementById("formCadastro").reset();
  }
}

document
  .getElementById("btnTrocarConteudo")
  .addEventListener("click", mostrarProximoDestaque);
document
  .getElementById("formCadastro")
  .addEventListener("submit", cadastrarComunidade);

mostrarRanking();
