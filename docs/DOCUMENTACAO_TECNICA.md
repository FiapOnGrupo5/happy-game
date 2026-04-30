# Documentação Técnica — Happy Games Store

> Explica **o quê**, **por quê** e **como** cada parte do código foi escrita.  
> Destinada a quem quer entender cada decisão técnica do projeto.

---

## Sumário

1. [Arquitetura geral](#1-arquitetura-geral)
2. [dados.js — Fonte central de dados](#2-dadosjs--fonte-central-de-dados)
3. [auth.js — Autenticação de usuários](#3-authjs--autenticação-de-usuários)
4. [carrinho.js — Carrinho de compras](#4-carrinhjs--carrinho-de-compras)
5. [catalogo.js — Renderização dinâmica do catálogo](#5-catalogojs--renderização-dinâmica-do-catálogo)
6. [compra.js — Formulário de compra individual](#6-comprajs--formulário-de-compra-individual)
7. [login.html — Tela de login e cadastro](#7-loginhtml--tela-de-login-e-cadastro)
8. [carrinho.html — Tela do carrinho e checkout](#8-carrinhohtml--tela-do-carrinho-e-checkout)
9. [CSS — Organização e decisões de estilo](#9-css--organização-e-decisões-de-estilo)
10. [Ordem de carregamento dos scripts](#10-ordem-de-carregamento-dos-scripts)
11. [localStorage vs sessionStorage — quando usar cada um](#11-localstorage-vs-sessionstorage--quando-usar-cada-um)
12. [Matemática aplicada — funções de preço](#12-matemática-aplicada--funções-de-preço)

---

## 1. Arquitetura geral

O projeto é um **frontend estático** — não há servidor, banco de dados ou linguagem backend. Tudo roda no navegador.

```
HTML/          → páginas da loja
CSS/           → estilos por escopo
JavaScript/    → lógica dividida por responsabilidade
Imagens/       → assets dos jogos
docs/          → documentação acadêmica
```

### Por que dividir os arquivos assim?

**Problema anterior (Fase 1):** Todo CSS estava em dois arquivos (`style.css` e `desktop.css`) na raiz. Todo JS estava misturado nos próprios HTMLs. Isso causa:
- Duplicação de código (mesma regra CSS escrita em 3 arquivos)
- Dificuldade para encontrar e corrigir bugs
- Impossibilidade de reusar funções entre páginas

**Solução aplicada:** Separação por responsabilidade:

| Arquivo JS | Responsabilidade |
|---|---|
| `dados.js` | Única fonte de verdade dos dados (jogos, preços, funções matemáticas) |
| `auth.js` | Tudo sobre login, cadastro, sessão e navbar de usuário |
| `carrinho.js` | Tudo sobre o carrinho (adicionar, remover, calcular, badge) |
| `catalogo.js` | Renderização dos cards e filtros do catálogo |
| `compra.js` | Formulário de compra individual com 3 etapas |

---

## 2. dados.js — Fonte central de dados

### `"use strict";` — Linha 1

```javascript
"use strict";
```

**O que é:** Ativa o modo estrito do JavaScript.  
**Por que usar:** Proíbe comportamentos problemáticos:
- Variáveis não declaradas causam erro (evita bugs de typo como `nomee = "João"`)
- `this` não aponta para `window` globalmente
- Proíbe nomes reservados como nome de variável

---

### O array `JOGOS`

```javascript
const JOGOS = [
  {
    id: 1,
    nome: "The Last Of Us",
    genero: "sobrevivência",
    plataformas: ["PS5"],
    preco: 199.90,
    imagem: "../Imagens/TLOU.jpg",
    descricao: "...",
    badgeClasse: "bg-danger",
    badgeTexto: "Sobrevivência",
    destaque: true,
  },
  // ... mais 5 jogos
];
```

**O que é:** Um array (vetor) de objetos. Cada objeto representa um jogo com todas as suas informações.

**Por que `const`:** O array em si não será reatribuído. Mesmo com `const`, ainda podemos modificar os itens dentro do array — mas não podemos fazer `JOGOS = outra_coisa`.

**Por que um array de objetos e não variáveis separadas:**  
Se fossem variáveis separadas, teríamos `nomeJogo1`, `precoJogo1`, `nomeJogo2`, `precoJogo2`...  
Com array de objetos, conseguimos iterar com `for` ou `forEach`, filtrar com `.filter()`, buscar com `.find()` — tudo de forma genérica, sem repetir código para cada jogo.

**Por que `plataformas` é um array dentro do objeto:**  
Um jogo pode estar em múltiplas plataformas. Guardar como `"PS5, Xbox"` em uma string tornaria difícil filtrar. Com array `["PS5", "Xbox"]`, podemos fazer `jogo.plataformas.includes("PS5")` diretamente.

**O campo `id`:**  
Essencial para o carrinho. Quando o usuário adiciona um jogo ao carrinho, salvamos apenas o `id` (número inteiro leve). O `nome`, `preco` e `imagem` são buscados por `getJogoPorId(id)` quando necessário. Isso evita duplicação de dados no `localStorage`.

**Os campos `badgeClasse` e `badgeTexto`:**  
Permitem que `catalogo.js` aplique a classe CSS correta de cada badge sem precisar de um `if/else` por gênero. Exemplos: `bg-danger` (vermelho) para sobrevivência, `bg-success` (verde) para battle royale.

---

### `getPrecoByNome(nome)`

```javascript
function getPrecoByNome(nome) {
  for (let i = 0; i < JOGOS.length; i++) {
    if (JOGOS[i].nome === nome) return JOGOS[i].preco;
  }
  return 0;
}
```

**O que faz:** Percorre o array `JOGOS` com um laço `for` e retorna o preço do primeiro jogo cujo nome seja igual ao parâmetro.

**Por que laço `for` e não `.find()`:**  
Esta função foi escrita com `for` explícito propositalmente — é um requisito acadêmico (Fase 3) para demonstrar domínio de laços de repetição.

**Por que retornar `0` quando não encontra:**  
Evita que cálculos posteriores recebam `undefined` (que causaria `NaN` em operações matemáticas). Com `0`, o resultado é `R$ 0,00` — visível e debugável.

**Onde é usada:** Em `compra.js`, na função `atualizarBoxPreco()`, que lê o nome do jogo selecionado no `<select>`.

---

### `getJogoPorId(id)`

```javascript
function getJogoPorId(id) {
  for (let i = 0; i < JOGOS.length; i++) {
    if (JOGOS[i].id === id) return JOGOS[i];
  }
  return null;
}
```

**Por que esta função existe além de `getPrecoByNome`:**  
O carrinho armazena apenas o `id` dos jogos. Quando o usuário abre o carrinho, precisamos buscar o objeto completo do jogo (nome, imagem, preço) pelo `id` numérico. Buscar por `id` (número) é mais seguro e confiável do que por nome (string que pode ter acento, maiúscula, etc).

**Por que retornar `null` e não `0`:**  
Aqui retornamos o objeto inteiro ou `null`. Quem chama esta função deve verificar `if (jogo)` antes de usar — o `null` sinaliza claramente "não encontrado".

---

### `calcularSubtotal(preco, quantidade)` — Função linear (1º grau)

```javascript
function calcularSubtotal(preco, quantidade) {
  return preco * quantidade;
}
```

**Conceito matemático:** Função linear `f(q) = preço × q`  
O resultado cresce de forma proporcional (linear) com a quantidade. Se o preço for R$ 100 e a quantidade 3, o subtotal é R$ 300.

**Por que separar em função:** Mesmo sendo uma operação simples, isolá-la numa função:
1. Dá um nome claro ao conceito matemático
2. Permite reusar e testar isoladamente
3. Facilita entender `calcularPedido()` que a chama

---

### `calcularTaxaDesconto(quantidade)` — Função quadrática (2º grau)

```javascript
function calcularTaxaDesconto(quantidade) {
  const taxa = 0.005 * Math.pow(quantidade - 1, 2);
  return Math.min(taxa, 0.20);
}
```

**Conceito matemático:** Função quadrática `f(q) = 0,005 × (q − 1)²`

**Por que `(quantidade - 1)`:** Quando `q = 1` (1 item), o desconto deve ser 0. Subtraindo 1, garantimos que `f(1) = 0,005 × 0² = 0`. Com 1 item, não há desconto.

**Por que `Math.pow(x, 2)`:** Eleva `x` à potência 2 (quadrado). `Math.pow(3, 2)` = 9. Faz a curva crescer mais rápido do que uma função linear — quem compra mais, recebe desconto progressivamente maior.

**Por que `Math.min(taxa, 0.20)`:**  
Limita o desconto a no máximo 20%. Sem esse limite, com quantidades muito grandes a taxa chegaria a valores absurdos. `Math.min` retorna o menor entre os dois valores — se a taxa calculada for maior que 0,20, retorna 0,20.

**Tabela de exemplos:**

| Qtd | Cálculo | Taxa | Desconto |
|-----|---------|------|----------|
| 1 | 0,005 × 0² | 0% | sem desconto |
| 2 | 0,005 × 1² | 0,5% | pequeno |
| 5 | 0,005 × 4² | 8% | moderado |
| 7 | 0,005 × 6² | 18% | grande |
| 10 | 0,005 × 9² = 0,405 → cap | 20% | máximo |

---

### `calcularPedido(preco, quantidade)`

```javascript
function calcularPedido(preco, quantidade) {
  const subtotal = calcularSubtotal(preco, quantidade);
  const taxa = calcularTaxaDesconto(quantidade);
  const desconto = subtotal * taxa;
  const total = subtotal - desconto;
  return { subtotal, taxa, desconto, total };
}
```

**O que faz:** Orquestra as duas funções matemáticas e retorna um objeto com todos os valores calculados de uma vez.

**Por que retornar um objeto `{subtotal, taxa, desconto, total}` e não apenas o total:**  
Diferentes partes da interface precisam de valores diferentes. A tela de compra mostra subtotal, percentual de desconto e total separados. Se a função retornasse só o total, teríamos que recalcular os intermediários em cada tela.

**Shorthand de objeto:** `{ subtotal, taxa, desconto, total }` é equivalente a `{ subtotal: subtotal, taxa: taxa, ... }`. É uma forma abreviada do ES6 quando o nome da chave é igual ao nome da variável.

---

### `formatarReais(valor)`

```javascript
function formatarReais(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
```

**O que faz:** Converte um número como `199.9` para a string `"R$ 199,90"`.

**Por que `toLocaleString`:** É a API nativa do JavaScript para formatação localizada. O parâmetro `"pt-BR"` instrui o navegador a usar o padrão brasileiro: vírgula como separador decimal, ponto como separador de milhar, símbolo `R$`.

**Por que centralizar aqui:** A mesma lógica de formatação é usada em `compra.js`, `carrinho.js` e `catalogo.js`. Se ficasse duplicada em cada arquivo e precisássemos mudar (ex: adicionar centavos), teríamos que alterar em 3 lugares.

---

## 3. auth.js — Autenticação de usuários

### Constantes de chave

```javascript
const AUTH_USERS_KEY = "happygames_users";
const AUTH_SESSION_KEY = "happygames_session";
```

**Por que usar constantes em vez de strings literais:**  
Se escrevêssemos `"happygames_users"` diretamente em 5 lugares e precisássemos renomear, teríamos que encontrar e substituir todos. Com a constante, mudamos em um lugar só. Também evita erros de digitação — `AUTH_USERS_KEY` vai dar erro de variável inexistente se digitado errado; `"happyganes_users"` (typo) passaria silenciosamente.

---

### `getUsuarios()`

```javascript
function getUsuarios() {
  return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "[]");
}
```

**O que faz:** Lê a lista de usuários cadastrados do `localStorage`.

**Por que `|| "[]"`:**  
`localStorage.getItem()` retorna `null` se a chave não existir. `JSON.parse(null)` lança um erro. O operador `||` garante que se o resultado for `null` (falsy), usamos a string `"[]"` como fallback — que é um array vazio em JSON, resultando em `[]` após o parse.

**Por que `JSON.parse`:**  
`localStorage` só armazena strings. O array de usuários é um objeto JavaScript complexo. `JSON.stringify` converte o objeto para string ao salvar; `JSON.parse` converte de volta ao objeto ao ler.

---

### `getUsuarioLogado()`

```javascript
function getUsuarioLogado() {
  const dados = sessionStorage.getItem(AUTH_SESSION_KEY);
  return dados ? JSON.parse(dados) : null;
}
```

**Por que `sessionStorage` e não `localStorage`:**  
`localStorage` persiste para sempre (até limpar o browser). `sessionStorage` é apagado quando a aba/janela é fechada. Para sessão de login, o comportamento esperado é: ao fechar o navegador, o usuário é deslogado — exatamente o que `sessionStorage` oferece.

**O operador ternário `dados ? ... : null`:**  
É equivalente a `if (dados) { return JSON.parse(dados); } else { return null; }`, mas em uma linha. Usado aqui porque a lógica é simples o suficiente.

---

### `fazerLogin(email, senha)`

```javascript
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
```

**Por que `.find()`:**  
Percorre o array e retorna o primeiro elemento que satisfaz a condição. Retorna `undefined` se não encontrar, que é falsy — ideal para o `if (usuario)`.

**Por que `u.email === email && u.senha === senha`:**  
Ambas as condições precisam ser verdadeiras ao mesmo tempo. O operador `&&` (E lógico) garante isso.

**Por que salvar só `{nome, email}` na sessão e não o objeto completo com a senha:**  
A senha não precisa estar disponível após o login — seria expô-la desnecessariamente na memória do navegador. Armazenamos apenas o mínimo necessário para exibir o nome do usuário na navbar.

**Por que retornar `{ok: true/false}` e não `true/false`:**  
Retornar um objeto permite comunicar mais informações além do resultado. Em caso de sucesso, o código que chama pode acessar `resultado.usuario`. Em caso de falha, pode exibir `resultado.erro` ao usuário.

---

### `cadastrarUsuario(nome, email, senha)`

```javascript
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
```

**Por que verificar e-mail duplicado:**  
O e-mail é usado como identificador único de cada usuário. Dois usuários com o mesmo e-mail causariam ambiguidade no login (qual dos dois valida?).

**Por que `usuarios.push(...)` e não criar um novo array:**  
`push` adiciona um item ao final do array existente. Se criássemos um novo array, perderíamos todos os usuários já cadastrados.

**Por que fazer login automático após cadastro:**  
Experiência de usuário (UX): o usuário acabou de se identificar com nome, e-mail e senha. Obrigá-lo a digitar novamente na tela de login seria redundante e frustrante.

---

### `atualizarNavbarAuth()`

```javascript
function atualizarNavbarAuth() {
  const user = getUsuarioLogado();
  const navbarAuth = document.getElementById("navbarAuth");
  if (!navbarAuth) return;

  if (user) {
    const primeiroNome = user.nome.split(" ")[0];
    navbarAuth.innerHTML = `...dropdown com nome e logout...`;
  } else {
    navbarAuth.innerHTML = `...link "Entrar"...`;
  }
}

document.addEventListener("DOMContentLoaded", atualizarNavbarAuth);
```

**Por que `document.getElementById("navbarAuth")` e o `if (!navbarAuth) return`:**  
Todas as páginas carregam `auth.js`, mas se por algum motivo o elemento não existir na página, a função não deve lançar erro. O `return` antecipado (guard clause) previne o erro `Cannot set innerHTML of null`.

**Por que `user.nome.split(" ")[0]`:**  
Exibe apenas o primeiro nome na navbar. "João da Silva" → "João". `.split(" ")` divide a string em array de palavras pelo espaço. `[0]` pega a primeira palavra.

**Por que `document.addEventListener("DOMContentLoaded", ...)`:**  
Scripts carregados no `<head>` ou antes do final do `<body>` podem executar antes de o HTML existir. `DOMContentLoaded` dispara quando o HTML foi completamente carregado e parseado — garante que `document.getElementById("navbarAuth")` vai encontrar o elemento.

---

## 4. carrinho.js — Carrinho de compras

### `adicionarAoCarrinho(jogoId, quantidade)`

```javascript
function adicionarAoCarrinho(jogoId, quantidade) {
  const jogo = getJogoPorId(jogoId);
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
```

**Por que `findIndex` e não `find`:**  
Precisamos do índice (posição no array) para poder modificar o item em `carrinho[idx].quantidade`. `.find()` retorna o objeto; `.findIndex()` retorna a posição numérica.

**Por que `idx >= 0`:**  
`.findIndex()` retorna `-1` quando não encontra. Um índice válido é sempre `>= 0`. Este é o padrão idiomático para verificar se o item existe no array.

**Por que `Math.min(..., 10)`:**  
Limita a quantidade a 10 por produto. Sem esse limite, um usuário poderia digitar 999, o que não faz sentido para uma loja de jogos digitais. `Math.min` retorna o menor valor entre os dois argumentos.

**Por que copiar apenas `{id, nome, preco, imagem}` e não o objeto inteiro:**  
O objeto `jogo` do array `JOGOS` tem campos como `badgeClasse`, `badgeTexto`, `destaque`, `genero`, `plataformas` que não são necessários no carrinho. Armazenar menos dados no `localStorage` é mais eficiente.

---

### `calcularResumoCarrinho()`

```javascript
function calcularResumoCarrinho() {
  const carrinho = getCarrinho();
  const subtotalBruto = carrinho.reduce(function (a, it) {
    return a + it.preco * it.quantidade;
  }, 0);
  const totalQtd = contarItensCarrinho();
  const taxa = calcularTaxaDesconto(totalQtd);
  const desconto = subtotalBruto * taxa;
  const total = subtotalBruto - desconto;
  return { subtotalBruto, taxa, desconto, total };
}
```

**Por que `.reduce()`:**  
Percorre o array e acumula um valor. O `0` é o valor inicial do acumulador `a`. Para cada item, soma `a + preco × quantidade`. É equivalente a um `for` com uma variável somadora, mas mais expressivo para operações de agregação.

**Por que o desconto é calculado sobre o TOTAL de itens e não por produto:**  
Este foi um bug corrigido. O comportamento correto é: se o usuário compra 1 unidade de The Last Of Us (R$ 199,90) e 2 unidades de Minecraft (R$ 99,90), o total é 3 itens. O desconto é calculado com base em 3 itens sobre o subtotal total (R$ 399,70). Antes, o desconto era calculado individualmente para cada produto (1 unidade de TLOU = sem desconto; 2 unidades de Minecraft = desconto de 0,5%). O comportamento correto incentiva comprar mais itens diferentes, não só muitas unidades do mesmo jogo.

---

### `atualizarBadgeCarrinho()`

```javascript
function atualizarBadgeCarrinho() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = contarItensCarrinho();
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}
```

**Por que esconder o badge quando count é 0:**  
Um badge mostrando "0" é poluição visual. A ausência do badge comunica "carrinho vazio" sem precisar de texto.

**Por que `"inline-flex"` e não `"block"` ou `"inline"`:**  
O badge usa `display: inline-flex` no CSS para centralizar o número verticalmente com `align-items: center`. Usar `"block"` quebraria o layout do badge dentro do link da navbar.

---

## 5. catalogo.js — Renderização dinâmica do catálogo

### `buildCardHTML(jogo)`

```javascript
function buildCardHTML(jogo) {
  const plataformasData = jogo.plataformas
    .map((p) => p.toLowerCase())
    .join(" ");

  let badgesPlat = "";
  for (let i = 0; i < jogo.plataformas.length; i++) {
    badgesPlat += `<span class="badge bg-secondary...">${jogo.plataformas[i]}</span>`;
  }

  return `<div class="col game-item"
               data-nome="${jogo.nome.toLowerCase()}"
               data-genero="${jogo.genero}"
               data-plataforma="${plataformasData}">
    ...
  </div>`;
}
```

**Por que `data-nome`, `data-genero`, `data-plataforma` nos atributos HTML:**  
São atributos `data-*` (data attributes). Permitem guardar informações no elemento HTML para serem lidas pelo JavaScript sem poluir o código. A função `filtrarJogos()` lê esses atributos para aplicar filtros sem precisar reprocessar o array `JOGOS`.

**Por que `.toLowerCase()` nos dados:**  
Normaliza a comparação. "PS5" e "ps5" são iguais para fins de filtro. Guardamos tudo em minúsculo e também comparamos em minúsculo.

**Por que `.map().join(" ")`:**  
`jogo.plataformas` é `["PS5", "Xbox"]`. `.map(p => p.toLowerCase())` transforma para `["ps5", "xbox"]`. `.join(" ")` une com espaço: `"ps5 xbox"`. Isso permite ao filtro verificar se `"ps5"` está contido na string do atributo com `includes()`.

**Por que laço `for` para os badges de plataforma:**  
Novamente, requisito acadêmico de demonstrar laços. Poderia ser feito com `.map().join("")`, mas o `for` explícito evidencia o conceito de iteração.

**Por que template literals (crases `` ` ``):**  
Permitem strings multilinhas e interpolação de variáveis com `${...}`. Alternativa à concatenação com `+` que fica ilegível com HTML complexo.

---

### `filtrarJogos()`

```javascript
function filtrarJogos() {
  const busca = document.getElementById("searchInput").value.toLowerCase();
  const generosFiltro = [...document.querySelectorAll('[data-filter-type="genero"]:checked')]
    .map((c) => c.value);
  ...
  items.forEach((item) => {
    const nomeOk    = item.dataset.nome.includes(busca);
    const generoOk  = generosFiltro.length === 0 || generosFiltro.includes(item.dataset.genero);
    const platOk    = plataformasFiltro.length === 0 || plataformasFiltro.some(p => item.dataset.plataforma.includes(p));
    const visivel   = nomeOk && generoOk && platOk;
    item.style.display = visivel ? "" : "none";
    if (visivel) visiveis++;
  });
}
```

**Por que `[...querySelectorAll(...)]`:**  
`querySelectorAll` retorna uma `NodeList`, que não tem o método `.map()`. O operador spread `[...]` converte para um Array comum, que tem todos os métodos de array.

**Por que `generosFiltro.length === 0 || ...`:**  
Se nenhum filtro de gênero está marcado, o array `generosFiltro` está vazio. Nesse caso, todos os jogos devem aparecer. A condição `length === 0` representa "sem filtro = aceita tudo".

**Por que `.some()` para plataformas:**  
Um jogo pode ter múltiplas plataformas. `.some()` retorna `true` se pelo menos uma das plataformas filtradas constar no atributo `data-plataforma` do card. É diferente de `.every()` que exigiria todas.

**Por que `item.style.display = visivel ? "" : "none"`:**  
`""` (string vazia) remove o estilo inline, devolvendo ao CSS o controle do display. `"none"` oculta o elemento. Não usamos `"block"` porque o card pode ter outros valores de display definidos no CSS.

---

## 6. compra.js — Formulário de compra individual

### Sistema de etapas com `currentStep`

```javascript
let currentStep = 1;

function irPara(step) {
  if (step > currentStep) {
    if (currentStep === 1 && !validarEtapa1()) return;
    if (currentStep === 2 && !validarEtapa2()) return;
  }
  document.getElementById("step" + currentStep).classList.remove("active");
  currentStep = step;
  document.getElementById("step" + currentStep).classList.add("active");
  ...
}
```

**Por que `let` e não `const` para `currentStep`:**  
`currentStep` precisa ser reatribuído quando o usuário avança ou volta entre etapas. `const` proibiria isso.

**Por que `step > currentStep` antes de validar:**  
Validamos apenas quando o usuário tenta avançar. Voltar (step menor que o atual) não deve ter validação — o usuário tem o direito de corrigir dados anteriores.

**Por que `"step" + currentStep`:**  
Concatenação de string com número. `"step" + 1` = `"step1"`. Permite referenciar dinamicamente os elementos `#step1`, `#step2`, `#step3` sem um `switch/case`.

---

### `getMetodoPagamento()`

```javascript
function getMetodoPagamento() {
  const radio = document.querySelector('input[name="pagamento"]:checked');
  return radio ? radio.value : "cartao";
}
```

**Por que `:checked`:**  
Seletor CSS que corresponde a inputs do tipo radio ou checkbox que estão marcados. Retorna `null` se nenhum estiver marcado.

**Por que `"cartao"` como fallback:**  
Se por algum motivo nenhum radio estiver marcado (o que não deveria acontecer com o HTML correto), o sistema assume cartão — o método mais comum e o que exige validação extra. Isso evita que a validação de cartão seja ignorada por um bug de estado.

---

### `validarEtapa3()` — Validação condicional por método

```javascript
function validarEtapa3() {
  const metodo = getMetodoPagamento();
  if (metodo !== "cartao") return true;
  // ...valida campos do cartão...
}
```

**Por que retornar `true` imediatamente para PIX e boleto:**  
PIX e boleto não têm campos de formulário — o usuário apenas vê instruções. Não há o que validar. Tentar validar campos que não existem causaria erros ou `null` references.

**Validação do número do cartão:**
```javascript
const cartaoNumeros = cartao.value.replace(/\D/g, "");
if (cartaoNumeros.length < 16) { ... }
```
`/\D/g` é uma regex que corresponde a qualquer caractere **não-dígito** (`\D`), globalmente (`g`). O `.replace()` remove todos eles, deixando apenas os números. Isso permite que o usuário digite `1234 5678 9012 3456` (com espaços da máscara) e ainda assim o número seja validado corretamente.

**Validação da validade:**
```javascript
const validadeRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
```
- `^` — início da string
- `(0[1-9]|1[0-2])` — meses de 01 a 09, ou 10, 11, 12
- `\/` — barra literal (precisa de escape porque `/` tem significado em regex)
- `\d{2}` — exatamente 2 dígitos (o ano)
- `$` — fim da string

---

## 7. login.html — Tela de login e cadastro

### Sistema de abas Bootstrap

```html
<ul class="nav nav-tabs" id="loginTabs" role="tablist">
  <li><button data-bs-toggle="tab" data-bs-target="#painel-entrar">Entrar</button></li>
  <li><button data-bs-toggle="tab" data-bs-target="#painel-cadastro">Criar conta</button></li>
</ul>
<div class="tab-content">
  <div class="tab-pane fade show active" id="painel-entrar">...</div>
  <div class="tab-pane fade" id="painel-cadastro">...</div>
</div>
```

**Por que usar o sistema de abas do Bootstrap:**  
O Bootstrap já tem toda a lógica de mostrar/esconder painéis com animação, acessibilidade (ARIA) e estilos. Implementar isso manualmente exigiria mais JavaScript e CSS. `data-bs-toggle="tab"` e `data-bs-target` são os "gatilhos" que o Bootstrap lê para saber qual painel ativar.

**Por que `show active` no primeiro painel:**  
`active` = painel está visível. `show` = classe de transição do Bootstrap para a animação de fade. O primeiro painel precisa dessas classes para aparecer por padrão.

---

### Redirecionamento automático se já logado

```javascript
(function () {
  const user = getUsuarioLogado();
  if (user) {
    const next = new URLSearchParams(window.location.search).get("next") || "index.html";
    window.location.href = next;
  }
})();
```

**Por que IIFE (função imediatamente invocada):**  
`(function() { ... })()` cria e executa uma função imediatamente. Isso isola as variáveis locais (não "vaza" `user` e `next` para o escopo global).

**Por que `URLSearchParams`:**  
Lê parâmetros da URL. Se o usuário tentou acessar `carrinho.html` sem estar logado e foi redirecionado para `login.html?next=carrinho.html`, após o login ele é enviado de volta para `carrinho.html`. `URLSearchParams(window.location.search)` faz o parse da query string; `.get("next")` retorna o valor do parâmetro `next`.

---

### Barra de força da senha

```javascript
function avaliarForcaSenha(senha) {
  let pontos = 0;
  if (senha.length >= 8)            pontos++;
  if (/[A-Z]/.test(senha))          pontos++;
  if (/[a-z]/.test(senha))          pontos++;
  if (/[0-9]/.test(senha))          pontos++;
  if (/[^A-Za-z0-9]/.test(senha))   pontos++;
  if (pontos <= 2) return 0;  // Fraca
  if (pontos <= 3) return 1;  // Média
  return 2;                   // Forte
}
```

**Por que pontos ao invés de verificar diretamente nível:**  
Cada critério contribui com 1 ponto. O total de pontos determina o nível. Isso é mais justo do que regras rígidas — uma senha com 12 caracteres mas só letras minúsculas pode ser considerada média, não necessariamente fraca.

**As regexes de verificação:**
- `/[A-Z]/` — alguma letra maiúscula
- `/[a-z]/` — alguma letra minúscula  
- `/[0-9]/` — algum número
- `/[^A-Za-z0-9]/` — algum caractere que NÃO seja letra ou número (símbolos: `!@#$%...`)

O método `.test(senha)` retorna `true` ou `false`.

**Por que o listener `input` e não `change`:**  
`change` dispara quando o campo perde o foco. `input` dispara a cada tecla pressionada, permitindo que a barra atualize em tempo real enquanto o usuário digita.

---

### Validação de confirmação de e-mail

```javascript
} else if (emailConf.value.trim().toLowerCase() !== email.value.trim().toLowerCase()) {
  emailConf.classList.add("is-invalid");
  emailConf.nextElementSibling.textContent = "Os e-mails não coincidem.";
  valido = false;
}
```

**Por que `.toLowerCase()` na comparação:**  
E-mails são case-insensitive por padrão (RFC 5321). `Usuario@Email.com` e `usuario@email.com` são o mesmo e-mail. Comparar sem normalização poderia fazer o usuário receber erro mesmo com e-mails "iguais" mas em casos diferentes.

**Por que `nextElementSibling`:**  
O elemento `<div class="invalid-feedback">` está logo após o `<input>` no HTML. `nextElementSibling` retorna o próximo elemento irmão no DOM, sem precisar de um `id` específico.

---

## 8. carrinho.html — Tela do carrinho e checkout

### Estrutura de seções condicionais

```html
<div id="carrinhoVazio"  style="display:none;">...</div>
<div id="carrinhoComItens" style="display:none;">...</div>
<div id="checkoutArea"  style="display:none;">...</div>
```

**Por que `style="display:none;"` inline:**  
Garante que nenhuma seção apareça antes do JavaScript rodar e decidir qual mostrar. Se estivesse no CSS, o carregamento do CSS e do JS não é sincronizado — o usuário poderia ver um flash de conteúdo errado.

**Por que 3 seções separadas e não mostrar/esconder itens:**  
Cada estado (vazio / com itens / checkout) tem layout completamente diferente. Uma única div tentando representar os 3 estados seria complexa demais. Três divs separadas permitem que cada uma tenha seu próprio layout sem interferir nas outras.

---

### Renderização dinâmica dos itens

```javascript
function renderizarCarrinho() {
  const itens = getCarrinho();
  ...
  let html = "";
  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];
    const subtotalItem = item.preco * item.quantidade;
    html += '<div class="cart-item">' + ... + '</div>';
  }
  listaEl.innerHTML = html;
  ...
}
```

**Por que `innerHTML` e não `appendChild`:**  
Construímos a string HTML completa com um laço e depois atribuímos de uma vez. Isso é mais eficiente do que chamar `appendChild` para cada item (que causaria o navegador a re-renderizar o DOM a cada inserção).

**Por que recalcular a cada interação:**  
`renderizarCarrinho()` é chamada sempre que o usuário muda quantidade ou remove um item. Ela sempre lê o estado atual do `localStorage` e reconstrói tudo do zero. Isso garante que a tela sempre reflete o estado real do carrinho sem necessidade de controle de estado complexo.

---

## 9. CSS — Organização e decisões de estilo

### Variáveis CSS

```css
:root {
  --primary: #667eea;
  --primary-dark: #764ba2;
  --accent: #ff9f43;
  --radius: 12px;
  --shadow: 0 4px 15px rgba(0,0,0,0.1);
}
```

**Por que variáveis CSS:**  
Se precisarmos mudar a cor principal do site, alteramos `--primary` em um lugar e todas as referências são atualizadas automaticamente. Sem variáveis, precisaríamos buscar e substituir o hexadecimal em dezenas de lugares.

**Por que separar em múltiplos arquivos CSS:**

| Arquivo | Escopo |
|---------|--------|
| `style.css` | Estilos globais: navbar, footer, variáveis, botões |
| `catalogo.css` | Estilos exclusivos do catálogo e filtros |
| `compra.css` | Estilos do formulário de compra |
| `carrinho.css` | Estilos da página do carrinho |
| `login.css` | Estilos da tela de login |
| `desktop.css` | Media queries para telas grandes |

Cada página carrega apenas os arquivos que precisa. A página do catálogo não carrega `compra.css`. Isso reduz o tamanho total de CSS baixado pelo browser em cada página.

---

## 10. Ordem de carregamento dos scripts

Em todas as páginas, a ordem das tags `<script>` é:

```html
<script src="bootstrap.bundle.min.js"></script>  <!-- 1º -->
<script src="../JavaScript/dados.js"></script>     <!-- 2º -->
<script src="../JavaScript/auth.js"></script>      <!-- 3º -->
<script src="../JavaScript/carrinho.js"></script>  <!-- 4º -->
<script src="../JavaScript/[pagina].js"></script>  <!-- 5º -->
```

**Por que essa ordem:**

1. **Bootstrap primeiro** — `auth.js` usa `bootstrap.Modal` e `bootstrap.Toast`. Esses objetos só existem após o Bootstrap ser carregado.
2. **`dados.js` segundo** — Define `JOGOS`, `getJogoPorId()`, `calcularTaxaDesconto()`, `formatarReais()`. Tudo isso é usado por `carrinho.js` e pelos scripts de página.
3. **`auth.js` terceiro** — Depende do Bootstrap (dropdown) mas não depende do carrinho.
4. **`carrinho.js` quarto** — Depende de `dados.js` (`getJogoPorId`, `calcularTaxaDesconto`) e não depende de `auth.js`.
5. **Script da página por último** — Depende de todos os anteriores.

**Se a ordem fosse errada:**  
`carrinho.js` chamaria `getJogoPorId()` que ainda não foi definida → `Uncaught ReferenceError: getJogoPorId is not defined`.

---

## 11. localStorage vs sessionStorage — quando usar cada um

| Critério | `localStorage` | `sessionStorage` |
|---|---|---|
| Duração | Permanente (até o usuário limpar) | Enquanto a aba estiver aberta |
| Escopo | Todas as abas do mesmo domínio | Apenas a aba atual |
| Uso no projeto | Lista de usuários, carrinho | Sessão do usuário logado |

**Carrinho no `localStorage`:**  
O usuário espera que o carrinho persista mesmo fechando e reabrindo o navegador. Seria frustrante adicionar 5 jogos e perder tudo ao fechar a aba.

**Sessão no `sessionStorage`:**  
O comportamento esperado de "login" é que ao fechar o navegador, o usuário seja deslogado. `sessionStorage` implementa isso naturalmente sem nenhum código extra.

---

## 12. Matemática aplicada — funções de preço

### Por que usar funções matemáticas formais

O projeto usa explicitamente funções de 1º e 2º grau, conforme requisito acadêmico da Fase 3, aplicadas em **quatro situações reais** do fluxo de compra.

---

### Função 1 — Subtotal (1º grau) `calcularSubtotal`

$$f(q) = p \cdot q$$

Onde `p` = preço unitário, `q` = quantidade.

**Contexto:** Exibido no Step 2 de `compra.html` para cada produto selecionado.

Características:
- Cresce de forma **constante** (linha reta no gráfico)
- Para cada unidade a mais, o subtotal aumenta exatamente `p`

---

### Função 2 — Taxa de desconto por volume (2º grau) `calcularTaxaDesconto`

$$f(q) = 0{,}005 \cdot (q - 1)^2, \quad \text{cap: } 20\%$$

**Contexto:** Aplicada sobre o **total de itens do carrinho inteiro** em `calcularResumoCarrinho()`.

**Justificativa do 2º grau:** O desconto cresce aceleradamente com a quantidade — incentiva comprar mais títulos. O deslocamento `(q−1)` garante desconto zero para 1 item. O cap de 20% protege a margem da loja.

| Qtd | Taxa | Desconto sobre R$ 500 |
|-----|------|-----------------------|
| 1 | 0% | R$ 0 |
| 3 | 2% | R$ 10 |
| 5 | 8% | R$ 40 |
| 7 | 18% | R$ 90 |
| ≥10 | 20% (cap) | R$ 100 |

---

### Função 3 — Parcelamento (1º grau) `calcularParcelas`

Regra de negócio: até 3x sem juros; de 4x a 12x com juros simples de 1,99%/mês.

**Sem juros** (linear no número de parcelas `n`):

$$\text{parcela}(n) = \frac{\text{total}}{n}$$

**Com juros simples** (linear no total `C` para `n` fixo):

$$\text{parcela}(C, n) = \frac{C \cdot (1 + 0{,}0199 \cdot n)}{n}$$

**Contexto:** Exibido no seletor de parcelamento em `compra.html` Step 3 (cartão de crédito).

**Justificativa:** O parcelamento é uma das principais expectativas do consumidor brasileiro em e-commerce. A função linear `f(C) = C × k / n` mostra claramente a proporcionalidade entre o valor total e o valor de cada parcela — aumentar o total aumenta a parcela na mesma proporção.

Tabela de exemplo para R$ 300,00:

| Parcelas | Tipo | Parcela | Total final |
|----------|------|---------|-------------|
| 1x | sem juros | R$ 300,00 | R$ 300,00 |
| 3x | sem juros | R$ 100,00 | R$ 300,00 |
| 6x | 1,99%/mês | R$ 55,85 | R$ 335,10 |
| 12x | 1,99%/mês | R$ 34,93 | R$ 419,10 |

---

### Função 4 — Pontos de fidelidade (2º grau) `calcularPontosFidelidade`

$$\text{pontosBase}(V) = \left\lfloor \frac{V}{10} \right\rfloor \quad \text{(1º grau — linear)}$$

$$\text{bonus}(q) = \left\lfloor 0{,}5 \cdot (q - 1)^2 \right\rfloor \quad \text{(2º grau — quadrático)}$$

$$\text{total} = \text{pontosBase} + \text{bonus}$$

**Contexto:** Exibido no resumo do carrinho (`carrinho.html`), no box de preço do Step 2 (`compra.html`) e no modal de confirmação de ambas as páginas.

**Justificativa do 2º grau no bônus:**
A loja quer incentivar não apenas gastar mais dinheiro (o que a função linear de pontos base já cobre), mas também **diversificar** o carrinho com diferentes títulos. A curva quadrática faz com que o bônus cresça desproporcionalmente para quem compra muitos itens — mais do que seria possível com uma função linear.

Exemplos:

| Total (R$) | Qtd itens | Pts base | Bônus | Total pts |
|------------|-----------|----------|-------|-----------|
| R$ 200 | 1 | 20 | 0 | **20** |
| R$ 400 | 2 | 40 | 0 | **40** |
| R$ 600 | 3 | 60 | 2 | **62** |
| R$ 800 | 5 | 80 | 8 | **88** |
| R$ 1.000 | 10 | 100 | 40 | **140** |

Com 10 itens e R$ 1.000, o bônus quadrático representa +40% de pontos extras sobre o linear — clara vantagem competitiva para carrinho diversificado.

---

### Resumo das funções matemáticas no projeto

| Função | Grau | Onde aparece | Por que esse grau |
|--------|------|--------------|-------------------|
| `calcularSubtotal` | 1º | Step 2 compra | Proporcionalidade direta entre qtd e preço |
| `calcularTaxaDesconto` | 2º | Carrinho + compra | Desconto que acelera — incentiva volume |
| `calcularParcelas` | 1º | Step 3 compra (cartão) | Parcela proporcional ao total e ao nº de vezes |
| `calcularPontosFidelidade` | 2º (bônus) | Carrinho + compra | Bônus que acelera — incentiva diversificação |

---

*Documentação gerada em 29/04/2026 · Happy Games Store — FiapOnGrupo5*
