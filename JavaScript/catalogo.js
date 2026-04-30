function showToast(gameName) {
  document.getElementById("toastMsg").textContent =
    gameName + " adicionado ao carrinho!";
  const toast = new bootstrap.Toast(document.getElementById("gameToast"), {
    delay: 3000,
  });
  toast.show();
}

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
  items.forEach((item) => {
    const nome = item.dataset.nome;
    const genero = item.dataset.genero;
    const plataforma = item.dataset.plataforma;
    const plataformasDoJogo = new Set(plataforma.split(/\s+/));
    const matchBusca = nome.includes(busca);
    const matchGenero =
      generosFiltro.length === 0 ||
      generosFiltro.some((g) => genero.includes(g));
    const matchPlat =
      plataformasFiltro.length === 0 ||
      plataformasFiltro.some((p) => plataformasDoJogo.has(p));
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

function limparFiltros() {
  document
    .querySelectorAll(".form-check-input")
    .forEach((c) => (c.checked = false));
  document.getElementById("searchInput").value = "";
  filtrarJogos();
}
