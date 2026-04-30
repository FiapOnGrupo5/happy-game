"use strict";

// =============================================
// CHAVES DE ARMAZENAMENTO
// =============================================
const AUTH_USERS_KEY = "happygames_users";
const AUTH_SESSION_KEY = "happygames_session";

// =============================================
// FUNÇÕES DE DADOS DE USUÁRIO
// =============================================

function getUsuarios() {
  return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "[]");
}

function salvarUsuarios(usuarios) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(usuarios));
}

function getUsuarioLogado() {
  const dados = sessionStorage.getItem(AUTH_SESSION_KEY);
  return dados ? JSON.parse(dados) : null;
}

// =============================================
// OPERAÇÕES DE AUTENTICAÇÃO
// =============================================

function fazerLogin(email, senha) {
  const usuarios = getUsuarios();
  const usuario = usuarios.find(function (u) {
    return u.email === email && u.senha === senha;
  });
  if (usuario) {
    sessionStorage.setItem(
      AUTH_SESSION_KEY,
      JSON.stringify({ nome: usuario.nome, email: usuario.email })
    );
    return { ok: true, usuario: usuario };
  }
  return { ok: false, erro: "E-mail ou senha incorretos." };
}

function cadastrarUsuario(nome, email, senha) {
  const usuarios = getUsuarios();
  if (usuarios.find(function (u) { return u.email === email; })) {
    return { ok: false, erro: "Já existe uma conta com este e-mail." };
  }
  usuarios.push({ nome: nome, email: email, senha: senha });
  salvarUsuarios(usuarios);
  sessionStorage.setItem(
    AUTH_SESSION_KEY,
    JSON.stringify({ nome: nome, email: email })
  );
  return { ok: true };
}

function fazerLogout() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  window.location.href = "index.html";
}

// =============================================
// ATUALIZAÇÃO DA NAVBAR (chamado em todas as páginas)
// =============================================

function atualizarNavbarAuth() {
  const user = getUsuarioLogado();
  const navbarAuth = document.getElementById("navbarAuth");
  if (!navbarAuth) return;

  if (user) {
    const primeiroNome = user.nome.split(" ")[0];
    navbarAuth.innerHTML =
      '<li class="nav-item dropdown">' +
        '<a class="nav-link dropdown-toggle d-flex align-items-center gap-1" href="#" ' +
           'id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
          '<i class="bi bi-person-circle"></i>' + primeiroNome +
        '</a>' +
        '<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">' +
          '<li><span class="dropdown-item-text text-muted small">' + user.email + '</span></li>' +
          '<li><hr class="dropdown-divider"></li>' +
          '<li><a class="dropdown-item" href="#" onclick="fazerLogout()">' +
            '<i class="bi bi-box-arrow-right me-2"></i>Sair' +
          '</a></li>' +
        '</ul>' +
      '</li>';
  } else {
    navbarAuth.innerHTML =
      '<li class="nav-item">' +
        '<a class="nav-link" href="login.html">' +
          '<i class="bi bi-person me-1"></i>Entrar' +
        '</a>' +
      '</li>';
  }
}

// Executa automaticamente quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", atualizarNavbarAuth);
