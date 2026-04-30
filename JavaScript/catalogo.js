"use strict";

// =================================================================
// CATALOGO.JS – Happy Games  |  Fase 3
//
// Refatorado para:
//  - usar o vetor JOGOS de dados.js (array de objetos)
//  - gerar os cards com laço FOR (renderização dinâmica)
//  - aplicar filtros e busca sobre os elementos renderizados
//  - exibir preço formatado em cada card
// =================================================================

// ---- FUNÇÕES UTILITÁRIAS ----------------------------------------

/** Formata número para moeda brasileira. */
function formatarPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Exibe o toast de confirmação. */
function showToast(gameName) {
  document.getElementById("toastMsg").textContent =
    gameName + " adicionado ao carrinho!";
  const toast = new bootstrap.Toast(document.getElementById("gameToast"), {
    delay: 3000,
  });
  toast.show();
}

// ---- RENDERIZAÇÃO DOS CARDS -------------------------------------

/**
 * Constrói o HTML de um card de jogo a partir de um objeto do vetor JOGOS.
 * Usa laço FOR para gerar os badges de plataforma.
 */
function buildCardHTML(jogo) {
  const plataformasData = jogo.plataformas
    .map((p) => p.toLowerCase())
    .join(" ");

  // FOR – percorre as plataformas para gerar um badge por plataforma
  let badgesPlat = "";
  for (let i = 0; i < jogo.plataformas.length; i++) {
    badgesPlat += `<span class="badge bg-secondary badge-genero mb-2 ms-1">${jogo.plataformas[i]}</span>`;
  }

  return `
    <div class="col game-item"
         data-nome="${jogo.nome.toLowerCase()}"
         data-genero="${jogo.genero}"
         data-plataforma="${plataformasData}">
      <div class="card game-card h-100">
        <img src="${jogo.imagem}" class="card-img-top" alt="${jogo.nome}" loading="lazy" />
        <div class="card-body">
          <span class="badge ${jogo.badgeClasse} badge-genero mb-2">${jogo.badgeTexto}</span>
          ${badgesPlat}
          <h5 class="card-title mt-1">${jogo.nome}</h5>
          <p class="card-text">${jogo.descricao}</p>
        </div>
        <div class="card-footer bg-transparent border-0 pb-3">
          <div class="d-flex align-items-center justify-content-between mb-2 px-1">
            <span class="preco-tag">${formatarPreco(jogo.preco)}</span>
          </div>
          <a href="compra.html" class="btn btn-comprar w-100"
             onclick="showToast('${jogo.nome.replace(/'/g, "\\'")}')">
            <i class="bi bi-cart-plus me-1"></i>Comprar este jogo
          </a>
        </div>
      </div>
    </div>`;
}

/**
 * Renderiza todos os cards no grid a partir do vetor JOGOS.
 * FOR – percorre o array completo e concatena o HTML de cada card.
 */
function renderizarJogos() {
  const grid = document.getElementById("jogosGrid");
  let html = "";

  // FOR – laço de repetição sobre o vetor de objetos JOGOS
  for (let i = 0; i < JOGOS.length; i++) {
    html += buildCardHTML(JOGOS[i]);
  }

  grid.innerHTML = html;
}

// ---- FILTRO E BUSCA ---------------------------------------------

/**
 * Aplica filtros de busca, gênero e plataforma sobre os cards renderizados.
 * Usa forEach (laço) e operadores relacionais/lógicos.
 */
function filtrarJogos() {
  const busca = document.getElementById("searchInput").value.toLowerCase();
  const generosFiltro = [
    ...document.querySelectorAll('[data-filter-type="genero"]:checked'),
  ].map((c) => c.value);
  const plataformasFiltro = [
    ...document.querySelectorAll('[data-filter-type="plataforma"]:checked'),
  ].map((c) => c.value);

  const items = document.querySelectorAll(".game-item");
  let visiveis = 0;

  // FOREACH – itera sobre cada card e aplica critérios com IF/ELSE
  items.forEach((item) => {
    const nome = item.dataset.nome;
    const genero = item.dataset.genero;
    const plataformasDoJogo = new Set(item.dataset.plataforma.split(/\s+/));

    const matchBusca = nome.includes(busca);
    const matchGenero =
      generosFiltro.length === 0 ||
      generosFiltro.some((g) => genero.includes(g));
    const matchPlat =
      plataformasFiltro.length === 0 ||
      plataformasFiltro.some((p) => plataformasDoJogo.has(p));

    // IF – exibe ou oculta o card com base nos três critérios combinados
    if (matchBusca && matchGenero && matchPlat) {
      item.style.display = "";
      visiveis++;
    } else {
      item.style.display = "none";
    }
  });

  document.getElementById("noResults").style.display =
    visiveis === 0 ? "block" : "none";
}

/** Limpa todos os filtros e reexibe todos os jogos. */
function limparFiltros() {
  document
    .querySelectorAll(".form-check-input")
    .forEach((c) => (c.checked = false));
  document.getElementById("searchInput").value = "";
  filtrarJogos();
}

// ---- INICIALIZAÇÃO ----------------------------------------------
renderizarJogos();
