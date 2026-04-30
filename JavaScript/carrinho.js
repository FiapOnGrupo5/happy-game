"use strict";

// =============================================
// CHAVE DE ARMAZENAMENTO
// =============================================
const CART_KEY = "happygames_cart";

// =============================================
// OPERAÇÕES DO CARRINHO
// =============================================

function getCarrinho() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function salvarCarrinho(itens) {
  localStorage.setItem(CART_KEY, JSON.stringify(itens));
  atualizarBadgeCarrinho();
}

function adicionarAoCarrinho(jogoId, quantidade) {
  const jogo = getJogoPorId(jogoId); // função de dados.js
  if (!jogo) return false;

  const carrinho = getCarrinho();
  const idx = carrinho.findIndex(function (item) { return item.id === jogoId; });

  if (idx >= 0) {
    carrinho[idx].quantidade = Math.min(carrinho[idx].quantidade + quantidade, 10);
  } else {
    carrinho.push({
      id: jogo.id,
      nome: jogo.nome,
      preco: jogo.preco,
      imagem: jogo.imagem,
      quantidade: quantidade,
    });
  }
  salvarCarrinho(carrinho);
  return true;
}

function removerDoCarrinho(jogoId) {
  const carrinho = getCarrinho().filter(function (item) { return item.id !== jogoId; });
  salvarCarrinho(carrinho);
}

function atualizarQuantidadeCarrinho(jogoId, novaQtd) {
  const carrinho = getCarrinho();
  const idx = carrinho.findIndex(function (item) { return item.id === jogoId; });
  if (idx >= 0) {
    if (novaQtd < 1) {
      carrinho.splice(idx, 1);
    } else {
      carrinho[idx].quantidade = Math.min(novaQtd, 10);
    }
  }
  salvarCarrinho(carrinho);
}

function limparCarrinho() {
  localStorage.removeItem(CART_KEY);
  atualizarBadgeCarrinho();
}

// =============================================
// CÁLCULOS DO CARRINHO
// =============================================

function totalCarrinho() {
  // usa calcularPedido() de dados.js
  return getCarrinho().reduce(function (acc, item) {
    return acc + calcularPedido(item.preco, item.quantidade).total;
  }, 0);
}

function contarItensCarrinho() {
  return getCarrinho().reduce(function (acc, item) { return acc + item.quantidade; }, 0);
}

// =============================================
// BADGE DO CARRINHO NA NAVBAR
// =============================================

function atualizarBadgeCarrinho() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = contarItensCarrinho();
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

// Inicializa o badge ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarBadgeCarrinho);
