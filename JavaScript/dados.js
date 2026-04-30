"use strict";

// =================================================================
// DADOS CENTRALIZADOS – Happy Games  |  Fase 3
//
// Vetor de objetos (array) com todos os jogos disponíveis.
// Usado por: catalogo.js, compra.js e script.js
//
// Conceito aplicado: array de objetos (vetor de registros),
// acesso por índice, iteração com for/forEach.
// =================================================================

const JOGOS = [
  {
    id: 1,
    nome: "The Last Of Us",
    genero: "sobrevivência",
    plataformas: ["PS5"],
    preco: 199.90,
    imagem: "../Imagens/TLOU.jpg",
    descricao:
      "Aventura e sobrevivência em um mundo pós-apocalíptico com uma narrativa emocionante.",
    badgeClasse: "bg-danger",
    badgeTexto: "Sobrevivência",
    destaque: true,
  },
  {
    id: 2,
    nome: "GTA 6",
    genero: "mundo aberto",
    plataformas: ["PS5", "Xbox"],
    preco: 349.90,
    imagem: "../Imagens/GTA.jpg",
    descricao:
      "Mundo aberto com missões, ação intensa e liberdade para explorar uma cidade cheia de possibilidades.",
    badgeClasse: "bg-warning text-dark",
    badgeTexto: "Mundo Aberto",
    destaque: true,
  },
  {
    id: 3,
    nome: "Fortnite",
    genero: "battle royale",
    plataformas: ["PC", "Xbox"],
    preco: 149.90,
    imagem: "../Imagens/FORT.jpg",
    descricao:
      "Batalhas rápidas, construção estratégica e eventos sazonais com muito conteúdo competitivo.",
    badgeClasse: "bg-success",
    badgeTexto: "Battle Royale",
    destaque: true,
  },
  {
    id: 4,
    nome: "EA Sports FC 26",
    genero: "esporte",
    plataformas: ["PC", "Xbox"],
    preco: 249.90,
    imagem: "../Imagens/FC26.jpg",
    descricao:
      "Simulação de futebol com modos online e carreira para quem quer jogar com os maiores clubes do mundo.",
    badgeClasse: "bg-primary",
    badgeTexto: "Esporte",
    destaque: false,
  },
  {
    id: 5,
    nome: "Minecraft",
    genero: "sandbox",
    plataformas: ["PC", "Xbox"],
    preco: 99.90,
    imagem: "../Imagens/MINE.jpg",
    descricao:
      "Crie, explore e sobreviva em um universo de blocos com infinitas possibilidades de construção.",
    badgeClasse: "bg-success",
    badgeTexto: "Sandbox",
    destaque: false,
  },
  {
    id: 6,
    nome: "God of War Ragnarök",
    genero: "ação",
    plataformas: ["PS5", "PC"],
    preco: 299.90,
    imagem: "../Imagens/GOW.jpg",
    descricao:
      "Kratos e Atreus enfrentam os maiores guerreiros da mitologia nórdica em combates épicos.",
    badgeClasse: "bg-danger",
    badgeTexto: "Ação",
    destaque: false,
  },
];

// Exporta o preço de um jogo pelo nome (usado em compra.js)
function getPrecoByNome(nome) {
  for (let i = 0; i < JOGOS.length; i++) {
    if (JOGOS[i].nome === nome) return JOGOS[i].preco;
  }
  return 0;
}

// Exporta jogo pelo id (usado em carrinho.js)
function getJogoPorId(id) {
  for (let i = 0; i < JOGOS.length; i++) {
    if (JOGOS[i].id === id) return JOGOS[i];
  }
  return null;
}

// =============================================
// FUNÇÕES MATEMÁTICAS DE PREÇO
// (utilizadas em compra.js e carrinho.js)
// =============================================

/** Função linear (1º grau): subtotal sem desconto. f(q) = preco * q */
function calcularSubtotal(preco, quantidade) {
  return preco * quantidade;
}

/** Função quadrática (2º grau): taxa de desconto por volume.
 *  f(q) = 0.005 * (q-1)²  — cresce quadraticamente; cap: 20% */
function calcularTaxaDesconto(quantidade) {
  const taxa = 0.005 * Math.pow(quantidade - 1, 2);
  return Math.min(taxa, 0.20);
}

/** Combina as duas funções e retorna { subtotal, taxa, desconto, total }. */
function calcularPedido(preco, quantidade) {
  const subtotal = calcularSubtotal(preco, quantidade);
  const taxa = calcularTaxaDesconto(quantidade);
  const desconto = subtotal * taxa;
  const total = subtotal - desconto;
  return { subtotal, taxa, desconto, total };
}

/** Formata número para moeda brasileira (R$). */
function formatarReais(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// =============================================
// PARCELAMENTO — FUNÇÃO LINEAR (1º GRAU)
// =============================================

/**
 * Calcula o valor de cada parcela no cartão de crédito.
 *
 * Regra de negócio da Happy Games:
 *   • Até 3x → sem juros:          parcela = total / n
 *   • De 4x a 12x → juros simples de 1,99% ao mês:
 *       totalFinal = total × (1 + 0,0199 × n)
 *       parcela    = totalFinal / n
 *
 * Ambas as fórmulas são funções lineares em relação ao total:
 *   f(total) = total / n              (sem juros)
 *   f(total) = total × (1 + 0,0199 × n) / n  (com juros)
 *
 * @param {number} total      - Valor total da compra (R$)
 * @param {number} nParcelas  - Número de parcelas escolhido (1–12)
 * @returns {{ parcela: number, totalFinal: number, juros: number, temJuros: boolean }}
 */
function calcularParcelas(total, nParcelas) {
  const TAXA_JUROS    = 0.0199; // 1,99% ao mês
  const SEM_JUROS_ATE = 3;      // parcelas sem juros

  let totalFinal, juros;

  if (nParcelas <= SEM_JUROS_ATE) {
    totalFinal = total;
    juros      = 0;
  } else {
    // Juros simples: J = C × i × n
    juros      = total * TAXA_JUROS * nParcelas;
    totalFinal = total + juros;
  }

  const parcela = totalFinal / nParcelas;
  return { parcela, totalFinal, juros, temJuros: juros > 0 };
}

// =============================================
// PONTOS DE FIDELIDADE — FUNÇÃO QUADRÁTICA (2º GRAU)
// =============================================

/**
 * Calcula os pontos de fidelidade ganhos em uma compra.
 *
 * Regra de negócio da Happy Games:
 *   • Pontos base (1º grau):    pontosBase = Math.floor(totalGasto / 10)
 *       → 1 ponto a cada R$ 10 gastos (proporcional linear ao valor)
 *   • Bônus por volume (2º grau): bonus = Math.floor(0.5 × (totalItens − 1)²)
 *       → Quem compra mais itens recebe bônus crescente de forma quadrática
 *       → Com 1 item: bônus = 0; com 5 itens: bônus = 8; com 10 itens: bônus = 40
 *   • total = pontosBase + bonus
 *
 * Justificativa do 2º grau no bônus:
 *   A curva quadrática recompensa desproporcionalmente quem diversifica
 *   o carrinho, incentivando a compra de títulos variados em vez de
 *   muitas unidades do mesmo jogo.
 *
 * @param {number} totalGasto  - Valor total pago após descontos (R$)
 * @param {number} totalItens  - Número total de itens no pedido
 * @returns {{ pontosBase: number, bonus: number, total: number }}
 */
function calcularPontosFidelidade(totalGasto, totalItens) {
  const pontosBase = Math.floor(totalGasto / 10);                        // linear
  const bonus      = Math.floor(0.5 * Math.pow(totalItens - 1, 2));     // quadrático
  return { pontosBase, bonus, total: pontosBase + bonus };
}
