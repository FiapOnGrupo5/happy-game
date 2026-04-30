"use strict";

let currentStep = 1;

// =============================================
// PAINEL DE PREÇO – STEP 2
// =============================================

/**
 * Atualiza o painel de resumo de preço (boxPreco) no step 2.
 * Chamado toda vez que o usuário muda o jogo ou a quantidade.
 */
function atualizarBoxPreco() {
  const boxPreco = document.getElementById("boxPreco");
  if (!boxPreco) return;

  const jogoSelect = document.getElementById("jogo");
  const quantidade = Math.max(1, parseInt(document.getElementById("quantidade").value, 10) || 1);
  const preco = getPrecoByNome(jogoSelect.value); // função de dados.js

  const r = calcularPedido(preco, quantidade);

  let descontoHTML = "";
  if (r.desconto > 0) {
    descontoHTML = `
      <div class="resumo-item text-success">
        <span><i class="bi bi-tag-fill me-1"></i>Desconto (${(r.taxa * 100).toFixed(1)}%)</span>
        <span>- ${formatarReais(r.desconto)}</span>
      </div>`;
  }

  // Pontos de fidelidade — função quadrática (2º grau)
  const pontos = calcularPontosFidelidade(r.total, quantidade);
  const pontosTexto = pontos.bonus > 0
    ? `${pontos.total} pts <span class="text-muted small">(${pontos.pontosBase} base + ${pontos.bonus} bônus volume)</span>`
    : `${pontos.total} pts`;

  boxPreco.innerHTML = `
    <div class="resumo-item">
      <span>Preço unitário</span><span>${formatarReais(preco)}</span>
    </div>
    <div class="resumo-item">
      <span>Subtotal (${quantidade}x)</span><span>${formatarReais(r.subtotal)}</span>
    </div>
    ${descontoHTML}
    <div class="resumo-item fw-bold total-row">
      <span>Total</span><span>${formatarReais(r.total)}</span>
    </div>
    <div class="resumo-item text-success small mt-1">
      <span><i class="bi bi-star-fill me-1"></i>Pontos que você vai ganhar</span>
      <span>${pontosTexto}</span>
    </div>`;
}

// =============================================
// FUNCOES AUXILIARES DE VALIDACAO
// =============================================

function mostrarErro(campo, mensagem) {
  campo.classList.add("is-invalid");
  campo.classList.remove("is-valid");
  let feedback = campo.parentElement.querySelector(".invalid-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    campo.parentElement.appendChild(feedback);
  }
  feedback.textContent = mensagem;
}

function mostrarSucesso(campo) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
  const feedback = campo.parentElement.querySelector(".invalid-feedback");
  if (feedback) feedback.textContent = "";
}

function limparValidacao(campo) {
  campo.classList.remove("is-invalid", "is-valid");
}

// =============================================
// VALIDACAO ETAPA 1 - DADOS PESSOAIS
// =============================================

function validarEtapa1() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  let valido = true;

  if (nome.value.trim() === "") {
    mostrarErro(nome, "Por favor, digite seu nome completo.");
    valido = false;
  } else if (nome.value.trim().length < 3) {
    mostrarErro(nome, "O nome precisa ter pelo menos 3 caracteres.");
    valido = false;
  } else {
    mostrarSucesso(nome);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    mostrarErro(email, "Por favor, digite seu e-mail.");
    valido = false;
  } else if (!emailRegex.test(email.value.trim())) {
    mostrarErro(email, "Digite um e-mail valido. Ex: nome@email.com");
    valido = false;
  } else {
    mostrarSucesso(email);
  }

  if (!valido) {
    alert(
      "Preencha todos os campos de dados pessoais corretamente antes de continuar.",
    );
  }
  return valido;
}

// =============================================
// VALIDACAO ETAPA 2 - PEDIDO
// =============================================

function validarEtapa2() {
  const quantidade = document.getElementById("quantidade");
  let valido = true;

  const qtd = parseInt(quantidade.value, 10);
  if (isNaN(qtd) || qtd < 1) {
    mostrarErro(quantidade, "A quantidade minima e 1.");
    valido = false;
  } else if (qtd > 10) {
    mostrarErro(quantidade, "A quantidade maxima e 10 por compra.");
    valido = false;
  } else {
    mostrarSucesso(quantidade);
  }

  if (!valido) {
    alert("Verifique a quantidade antes de continuar.");
  }
  return valido;
}

// =============================================
// VALIDACAO ETAPA 3 - PAGAMENTO
// =============================================

function getMetodoPagamento() {
  const radio = document.querySelector('input[name="pagamento"]:checked');
  return radio ? radio.value : "cartao";
}

function validarEtapa3() {
  const metodo = getMetodoPagamento();

  // PIX e Boleto não precisam de campos extras
  if (metodo !== "cartao") return true;

  const cartao = document.getElementById("cartao");
  const validade = document.getElementById("validade");
  const cvv = document.getElementById("cvv");
  let valido = true;

  const cartaoNumeros = cartao.value.replace(/\D/g, "");
  if (cartaoNumeros.length < 16) {
    mostrarErro(cartao, "O numero do cartao precisa ter 16 digitos.");
    valido = false;
  } else {
    mostrarSucesso(cartao);
  }

  const validadeRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!validadeRegex.test(validade.value)) {
    mostrarErro(validade, "Digite a validade no formato MM/AA.");
    valido = false;
  } else {
    mostrarSucesso(validade);
  }

  const cvvNumeros = cvv.value.replace(/\D/g, "");
  if (cvvNumeros.length < 3) {
    mostrarErro(cvv, "O CVV precisa ter 3 digitos.");
    valido = false;
  } else {
    mostrarSucesso(cvv);
  }

  if (!valido) {
    alert(
      "Preencha todos os dados do cartão corretamente para revisar o pedido.",
    );
  }
  return valido;
}

// =============================================
// PARCELAMENTO — FUNÇÃO LINEAR (1º GRAU)
// =============================================

/**
 * Preenche o <select id="parcelas"> com as opções de 1x a 12x
 * e exibe o valor da parcela calculado por calcularParcelas().
 * Aplicando a fórmula linear: parcela = total / n (sem juros)
 * ou parcela = total × (1 + 0,0199 × n) / n (com juros).
 */
function atualizarParcelamento() {
  const select = document.getElementById("parcelas");
  const info   = document.getElementById("parcelamentoInfo");
  if (!select) return;

  const jogoSelect = document.getElementById("jogo");
  const quantidade = Math.max(1, parseInt(document.getElementById("quantidade").value, 10) || 1);
  const preco      = getPrecoByNome(jogoSelect.value);
  const r          = calcularPedido(preco, quantidade);
  const total      = r.total;

  const nAtual = parseInt(select.value, 10) || 1;

  // Rebuilds options preserving the chosen value
  select.innerHTML = "";
  for (let n = 1; n <= 12; n++) {
    const p = calcularParcelas(total, n);
    const label = p.temJuros
      ? `${n}x de ${formatarReais(p.parcela)} (total ${formatarReais(p.totalFinal)})`
      : `${n}x de ${formatarReais(p.parcela)} sem juros`;
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = label;
    if (n === nAtual) opt.selected = true;
    select.appendChild(opt);
  }

  // Info text below the select
  const nSel = parseInt(select.value, 10);
  const pSel = calcularParcelas(total, nSel);
  if (pSel.temJuros) {
    info.className = "form-text text-warning";
    info.textContent = `Juros de 1,99%/mês — total final: ${formatarReais(pSel.totalFinal)}`;
  } else {
    info.className = "form-text text-success";
    info.textContent = `Sem acréscimo — total: ${formatarReais(total)}`;
  }
}

// =============================================
// NAVEGACAO ENTRE ETAPAS (COM VALIDACAO)
// =============================================

function irPara(step) {
  if (step > currentStep) {
    if (currentStep === 1 && !validarEtapa1()) return;
    if (currentStep === 2 && !validarEtapa2()) return;
  }

  document.getElementById("step" + currentStep).classList.remove("active");
  document.getElementById("label" + currentStep).classList.remove("active");
  currentStep = step;
  document.getElementById("step" + currentStep).classList.add("active");
  document.getElementById("label" + currentStep).classList.add("active");

  const pct = step === 1 ? 33 : step === 2 ? 66 : 100;
  document.getElementById("progressBar").style.width = pct + "%";

  // Ao entrar no step 3, inicializa o parcelamento com o total atual
  if (step === 3) atualizarParcelamento();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =============================================
// RESUMO DO PEDIDO NO MODAL
// =============================================

function atualizarResumo() {
  const user = getUsuarioLogado();
  const jogoSelect = document.getElementById("jogo");
  const quantidade = parseInt(document.getElementById("quantidade").value, 10) || 1;
  const preco = getPrecoByNome(jogoSelect.value);
  const r = calcularPedido(preco, quantidade);

  const nomeFinal = document.getElementById("nome").value.trim() || (user ? user.nome : "");
  const emailFinal = document.getElementById("email").value.trim() || (user ? user.email : "");

  document.getElementById("rNome").textContent =
    nomeFinal || "\u2014";
  document.getElementById("rEmail").textContent =
    emailFinal || "\u2014";
  document.getElementById("rJogo").textContent = jogoSelect.value;
  document.getElementById("rQtd").textContent = quantidade;

  // Mostra total calculado (com possível desconto) no modal
  let precoTexto = formatarReais(r.total);
  if (r.desconto > 0) {
    precoTexto += ` (desconto de ${(r.taxa * 100).toFixed(1)}% aplicado)`;
  }
  document.getElementById("rPreco").textContent = precoTexto;

  // Pagamento
  const metodo = getMetodoPagamento();
  const metodoTextos = { cartao: "Cartão de crédito", pix: "PIX", boleto: "Boleto bancário" };
  document.getElementById("rPagamento").textContent = metodoTextos[metodo] || metodo;

  // Parcelamento — função linear: mostra apenas quando cartão
  const rParcelasRow = document.getElementById("rParcelasRow");
  if (metodo === "cartao" && rParcelasRow) {
    const nParcelas = parseInt(document.getElementById("parcelas").value, 10) || 1;
    const p = calcularParcelas(r.total, nParcelas);
    const labelParcela = p.temJuros
      ? `${nParcelas}x de ${formatarReais(p.parcela)} (total ${formatarReais(p.totalFinal)})`
      : `${nParcelas}x de ${formatarReais(p.parcela)} sem juros`;
    document.getElementById("rParcelas").textContent = labelParcela;
    rParcelasRow.style.display = "";
  } else if (rParcelasRow) {
    rParcelasRow.style.display = "none";
  }

  // Pontos de fidelidade — função quadrática
  const pontos = calcularPontosFidelidade(r.total, quantidade);
  document.getElementById("rPontos").textContent =
    pontos.bonus > 0
      ? `${pontos.total} pts (${pontos.pontosBase} base + ${pontos.bonus} bônus)`
      : `${pontos.total} pts`;
}

// =============================================
// VALIDACAO COMPLETA (TODAS AS ETAPAS)
// =============================================

function validarTudo() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const quantidade = document.getElementById("quantidade");
  const cartao = document.getElementById("cartao");
  const validade = document.getElementById("validade");
  const cvv = document.getElementById("cvv");
  let valido = true;
  let primeiroErro = null;

  // --- Etapa 1: nome ---
  if (nome.value.trim() === "") {
    mostrarErro(nome, "Por favor, digite seu nome completo.");
    valido = false;
    if (!primeiroErro) primeiroErro = 1;
  } else if (nome.value.trim().length < 3) {
    mostrarErro(nome, "O nome precisa ter pelo menos 3 caracteres.");
    valido = false;
    if (!primeiroErro) primeiroErro = 1;
  } else {
    mostrarSucesso(nome);
  }

  // --- Etapa 1: email ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    mostrarErro(email, "Por favor, digite seu e-mail.");
    valido = false;
    if (!primeiroErro) primeiroErro = 1;
  } else if (!emailRegex.test(email.value.trim())) {
    mostrarErro(email, "Digite um e-mail valido. Ex: nome@email.com");
    valido = false;
    if (!primeiroErro) primeiroErro = 1;
  } else {
    mostrarSucesso(email);
  }

  // --- Etapa 2: quantidade ---
  const qtd = parseInt(quantidade.value, 10);
  if (isNaN(qtd) || qtd < 1) {
    mostrarErro(quantidade, "A quantidade minima e 1.");
    valido = false;
    if (!primeiroErro) primeiroErro = 2;
  } else if (qtd > 10) {
    mostrarErro(quantidade, "A quantidade maxima e 10 por compra.");
    valido = false;
    if (!primeiroErro) primeiroErro = 2;
  } else {
    mostrarSucesso(quantidade);
  }

  // --- Etapa 3: campos do cartão (apenas quando método = cartão) ---
  if (getMetodoPagamento() === "cartao") {
    const cartaoNumeros = cartao.value.replace(/\D/g, "");
    if (cartaoNumeros.length < 16) {
      mostrarErro(cartao, "O numero do cartao precisa ter 16 digitos.");
      valido = false;
      if (!primeiroErro) primeiroErro = 3;
    } else {
      mostrarSucesso(cartao);
    }

    const validadeRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!validadeRegex.test(validade.value)) {
      mostrarErro(validade, "Digite a validade no formato MM/AA.");
      valido = false;
      if (!primeiroErro) primeiroErro = 3;
    } else {
      mostrarSucesso(validade);
    }

    const cvvNumeros = cvv.value.replace(/\D/g, "");
    if (cvvNumeros.length < 3) {
      mostrarErro(cvv, "O CVV precisa ter 3 digitos.");
      valido = false;
      if (!primeiroErro) primeiroErro = 3;
    } else {
      mostrarSucesso(cvv);
    }
  }

  // Se invalido, mostra alert e volta para a etapa com erro
  if (!valido) {
    if (primeiroErro === 1) {
      alert("Preencha seus dados pessoais (nome e e-mail) corretamente.");
      irParaSemValidar(1);
    } else if (primeiroErro === 2) {
      alert("Verifique a quantidade do pedido.");
      irParaSemValidar(2);
    } else {
      alert("Preencha todos os dados de pagamento (cartao, validade e CVV).");
    }
  }

  return valido;
}

// Navegar para etapa sem validar (usado internamente para voltar ao erro)
function irParaSemValidar(step) {
  document.getElementById("step" + currentStep).classList.remove("active");
  document.getElementById("label" + currentStep).classList.remove("active");
  currentStep = step;
  document.getElementById("step" + currentStep).classList.add("active");
  document.getElementById("label" + currentStep).classList.add("active");

  const pct = step === 1 ? 33 : step === 2 ? 66 : 100;
  document.getElementById("progressBar").style.width = pct + "%";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =============================================
// EVENT LISTENERS
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  // Mascara do cartao
  document.getElementById("cartao").addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "").substring(0, 16);
    this.value = valor.replace(/(.{4})/g, "$1 ").trim();
  });

  // Mascara da validade
  document.getElementById("validade").addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "").substring(0, 4);
    if (valor.length >= 2) {
      valor = valor.substring(0, 2) + "/" + valor.substring(2);
    }
    this.value = valor;
  });

  // Mascara do CVV
  document.getElementById("cvv").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").substring(0, 3);
  });

  // Validacao em tempo real - Nome (blur)
  document.getElementById("nome").addEventListener("blur", function () {
    if (this.value.trim() === "") {
      mostrarErro(this, "Por favor, digite seu nome completo.");
    } else if (this.value.trim().length < 3) {
      mostrarErro(this, "O nome precisa ter pelo menos 3 caracteres.");
    } else {
      mostrarSucesso(this);
    }
  });

  // Validacao em tempo real - Email (blur)
  document.getElementById("email").addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() === "") {
      mostrarErro(this, "Por favor, digite seu e-mail.");
    } else if (!emailRegex.test(this.value.trim())) {
      mostrarErro(this, "Digite um e-mail valido. Ex: nome@email.com");
    } else {
      mostrarSucesso(this);
    }
  });

  // Troca do método de pagamento: mostra/oculta seções
  document.querySelectorAll('input[name="pagamento"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      document.getElementById("secCartao").style.display = this.value === "cartao" ? "block" : "none";
      document.getElementById("secPix").style.display = this.value === "pix" ? "block" : "none";
      document.getElementById("secBoleto").style.display = this.value === "boleto" ? "block" : "none";
    });
  });

  // Validacao em tempo real - Quantidade (change)
  document.getElementById("quantidade").addEventListener("change", function () {
    const qtd = parseInt(this.value, 10);
    if (isNaN(qtd) || qtd < 1) {
      mostrarErro(this, "A quantidade minima e 1.");
    } else if (qtd > 10) {
      mostrarErro(this, "A quantidade maxima e 10 por compra.");
    } else {
      mostrarSucesso(this);
    }
    atualizarBoxPreco(); // atualiza preço em tempo real
  });

  // Atualiza preço ao mudar o jogo selecionado
  document.getElementById("jogo").addEventListener("change", atualizarBoxPreco);

  // Inicializa o box de preço com os valores padrão
  atualizarBoxPreco();

  // Limpar estilos ao digitar
  // Pré-preenche dados do usuário logado e exibe aviso de autenticação
  (function inicializarFormularioCompra() {
    const user = getUsuarioLogado();
    const nomeEl  = document.getElementById("nome");
    const emailEl = document.getElementById("email");
    const notice  = document.getElementById("authNotice");
    if (!notice) return;

    if (user) {
      // Usuário logado: pré-preenche e mostra aviso verde
      if (nomeEl)  nomeEl.value  = user.nome;
      if (emailEl) emailEl.value = user.email;
      notice.innerHTML =
        '<div class="alert alert-success d-flex align-items-center gap-2 py-2 mb-0">' +
          '<i class="bi bi-person-check-fill fs-5 flex-shrink-0"></i>' +
          '<span>Comprando como <strong>' + user.nome + '</strong> (' + user.email + '). ' +
            '<a href="#" class="alert-link" onclick="fazerLogout();return false;">Sair</a>' +
          '</span>' +
        '</div>';
    } else {
      // Convidado: instrução de preencher e-mail válido ou fazer login
      notice.innerHTML =
        '<div class="alert alert-info py-2 mb-0">' +
          '<div class="d-flex align-items-start gap-2">' +
            '<i class="bi bi-info-circle-fill fs-5 flex-shrink-0 mt-1"></i>' +
            '<div>' +
              '<div class="mb-2">Para concluir o pedido, <strong>entre na sua conta</strong> ou continue como convidado informando nome e e-mail válidos.</div>' +
              '<div class="d-flex gap-2 flex-wrap">' +
                '<a href="login.html?next=compra.html" class="btn btn-sm btn-primary">Entrar e continuar</a>' +
                '<button type="button" class="btn btn-sm btn-outline-primary" onclick="document.getElementById(\'nome\').focus()">Continuar como convidado</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
  })();

  document
    .querySelectorAll("#nome, #email, #cartao, #validade, #cvv")
    .forEach(function (campo) {
      campo.addEventListener("input", function () {
        limparValidacao(this);
      });
    });

  // =============================================
  // BOTAO REVISAR PEDIDO - abre modal SOMENTE se tudo valido
  // =============================================
  document.getElementById("btnRevisar").addEventListener("click", function () {
    if (validarTudo()) {
      atualizarResumo();
      const modal = new bootstrap.Modal(
        document.getElementById("modalConfirmacao"),
      );
      modal.show();
    }
  });

  // =============================================
  // BOTAO CONFIRMAR COMPRA - redireciona SOMENTE se tudo valido
  // =============================================
  document
    .getElementById("btnConfirmar")
    .addEventListener("click", function () {
      if (validarTudo()) {
        window.location.href = "obrigado.html";
      }
    });
});
