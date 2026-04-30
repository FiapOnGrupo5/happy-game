# CHANGELOG — Happy Games Store

Histórico completo de alterações do projeto, organizado por fase e data.  
Autores: FiapOnGrupo5 · Branch: `main`

---

## Fase 3 — Funcionalidades avançadas · 29 abr 2026

### `1a7a7aa` · revert · 29/04/2026
**Revert "fix(style): corrige cor do botao carrinho nos cards do catalogo"**

- Desfeito o commit `94a83a8` que alterava o seletor CSS do botão "Carrinho" nos cards.
- O estilo anterior (`.game-card .btn-cart` com `background: #f0eeff`) foi restaurado por ser visualmente mais adequado ao design original.
- **Arquivo:** `CSS/style.css`

---

### `94a83a8` · fix · 29/04/2026
**fix(style): corrige cor do botao carrinho nos cards do catalogo**

- Tentativa de aumentar a especificidade do seletor para `.game-card .btn.btn-cart` a fim de sobrescrever o Bootstrap.
- Botão ficaria com fundo transparente e texto roxo no estado normal, e fundo roxo sólido no hover.
- Revertido no commit seguinte.
- **Arquivo:** `CSS/style.css`

---

### `a185298` · feat · 29/04/2026
**feat(login): confirmar email, força da senha e validação aprimorada**

Melhorias na página de cadastro de usuário:

- **Campo "Confirmar e-mail"** adicionado ao formulário de cadastro. A validação verifica se os dois e-mails são idênticos (comparação case-insensitive).
- **Botão mostrar/ocultar** também adicionado ao campo de confirmação de senha.
- **Barra de força da senha** em tempo real, exibida logo abaixo do campo de senha enquanto o usuário digita:
  - Verifica: comprimento ≥ 8, maiúsculas, minúsculas, números e símbolos especiais.
  - Exibe 3 níveis: **Fraca** (vermelho), **Média** (laranja), **Forte** (verde).
- **Mínimo de caracteres** elevado de 6 para **8** na senha.
- Senhas classificadas como "Fraca" bloqueiam o envio do formulário mesmo com 8+ caracteres.
- **Arquivo:** `HTML/login.html`

---

### `5cb283b` · fix · 29/04/2026
**fix(carrinho.html): exibe desconto por total de itens e remove desconto individual**

- Cada item da lista do carrinho passou a exibir o **subtotal simples** (preço × quantidade), sem percentual de desconto individual.
- O resumo lateral passou a usar `calcularResumoCarrinho()` que aplica o desconto sobre o total de itens do carrinho inteiro.
- O modal de confirmação de compra também foi atualizado: exibe subtotal por item, linha de desconto global (com percentual) e total final.
- **Arquivo:** `HTML/carrinho.html`

---

### `ef0c62b` · fix · 29/04/2026
**fix(carrinho): desconto calculado sobre total de itens do carrinho**

- **Problema anterior:** o desconto era calculado individualmente por produto (`calcularPedido(preco, qtd)` chamado para cada item), ignorando itens de outros produtos.
- **Correção:** nova função `calcularResumoCarrinho()` em `carrinho.js` que:
  1. Soma o subtotal bruto de todos os produtos.
  2. Conta o total de itens do carrinho (todas as quantidades somadas).
  3. Aplica `calcularTaxaDesconto(totalItens)` sobre o subtotal bruto inteiro.
  4. Retorna `{ subtotalBruto, taxa, desconto, total }`.
- `totalCarrinho()` passou a usar `calcularResumoCarrinho().total`.
- **Arquivo:** `JavaScript/carrinho.js`

---

### `00f4163` · feat · 29/04/2026
**feat(navbar): adiciona carrinho e área de login em todas as páginas**

- Em **todas as 5 páginas** (`index.html`, `catalogo.html`, `compra.html`, `sobre.html`, `obrigado.html`):
  - Adicionado link "Carrinho" na navbar com ícone `bi-cart3` e badge dinâmico (`#cartBadge`) que exibe a quantidade de itens.
  - Removido o link direto "Comprar" (`compra.html`) da navbar.
  - Adicionado elemento `<ul id="navbarAuth">` que é preenchido dinamicamente por `auth.js` com o botão "Entrar" ou dropdown com nome do usuário logado.
  - Adicionadas as tags `<script>` de `dados.js`, `auth.js` e `carrinho.js` antes do script específico de cada página.
- **Arquivos:** `HTML/catalogo.html`, `HTML/index.html`, `HTML/obrigado.html`, `HTML/sobre.html`

---

### `4b75db2` · refactor · 29/04/2026
**refactor(catalogo.js): botão adicionar ao carrinho nos cards**

- Adicionada função `addToCart(jogoId)` que chama `adicionarAoCarrinho()` de `carrinho.js` e exibe toast de confirmação.
- O rodapé de cada card passou de 1 botão ("Comprar este jogo") para **2 botões lado a lado**:
  - **Carrinho** — chama `addToCart(id)`, classe `btn-cart`.
  - **Comprar** — link direto para `compra.html`, classe `btn-comprar`.
- **Arquivo:** `JavaScript/catalogo.js`

---

### `61274e8` · refactor · 29/04/2026
**refactor(compra.js): valida pagamento por método e exibe rPagamento**

- Adicionada função `getMetodoPagamento()` que lê o radio selecionado (`cartao`, `pix` ou `boleto`).
- `validarEtapa3()` e `validarTudo()` agora ignoram a validação dos campos de cartão quando o método selecionado é PIX ou boleto.
- `atualizarResumo()` preenche o campo `#rPagamento` no modal de confirmação com o texto do método escolhido.
- Adicionados listeners de evento nos radios de pagamento para alternar visibilidade entre `#secCartao`, `#secPix` e `#secBoleto`.
- **Arquivo:** `JavaScript/compra.js`

---

### `0900e82` · feat · 29/04/2026
**feat(compra): adiciona métodos de pagamento PIX e boleto**

- **`HTML/compra.html`** — Etapa 3 do formulário de compra reformulada:
  - Seletor de método via `btn-check` (radio estilizado Bootstrap): Cartão de crédito, PIX, Boleto bancário.
  - `#secCartao`: campos de número do cartão, validade e CVV (visível por padrão).
  - `#secPix`: ícone, chave PIX e instruções de pagamento (oculto por padrão).
  - `#secBoleto`: ícone, linha digitável e instruções (oculto por padrão).
  - Modal de confirmação recebeu linha `rPagamento` para exibir o método escolhido.
- **`CSS/style.css`** — Adicionados estilos globais:
  - `.cart-badge`, `.btn-cart`, `.game-card .btn-cart` para o carrinho na navbar e cards.
  - `.payment-btn`, `.pix-icon`, `.boleto-icon`, `.boleto-code` para as seções de pagamento.
- **Arquivos:** `HTML/compra.html`, `CSS/style.css`

---

### `b5eae75` · style · 29/04/2026
**style(carrinho): estilos da página do carrinho**

- Criado `CSS/carrinho.css` com todos os estilos exclusivos da página do carrinho:
  - `.cart-item`, `.cart-item-img`, `.cart-item-info`, `.cart-item-controls`
  - `.btn-qty`, `.qty-display`, `.cart-item-total`, `.btn-remove`
  - `.cart-summary`, `.pix-icon`, `.boleto-icon`, `.boleto-code`
  - `.payment-btn`, `.cart-badge`
- **Arquivo:** `CSS/carrinho.css` *(novo)*

---

### `a029532` · feat · 29/04/2026
**feat(carrinho.html): página do carrinho com checkout completo**

- Criada página completa do carrinho de compras com duas seções principais:
  - **Lista do carrinho** (`#carrinhoVazio` / `#carrinhoComItens`): exibe os itens, permite alterar quantidade e remover produtos. Resumo lateral com subtotal, desconto e total.
  - **Checkout** (`#checkoutArea`): formulário em 2 etapas — dados pessoais (nome, e-mail) e pagamento (cartão/PIX/boleto). Modal de confirmação e redirecionamento para `obrigado.html` após confirmar.
- Toda a lógica é feita com JavaScript inline usando funções de `carrinho.js`, `dados.js` e `auth.js`.
- **Arquivo:** `HTML/carrinho.html` *(novo)*

---

### `1d42688` · style · 29/04/2026
**style(login): estilos da página de login**

- Criado `CSS/login.css` com estilos exclusivos da tela de autenticação:
  - `.login-wrapper`: card centralizado com sombra e borda arredondada.
  - `.login-icon`: ícone de controle grande no topo.
  - `.login-header`: título e subtítulo da tela.
  - `.login-tabs`: estilização das abas Bootstrap (Entrar / Criar conta).
  - `.btn-login`: botão de submit com gradiente roxo.
- **Arquivo:** `CSS/login.css` *(novo)*

---

### `89830e3` · feat · 29/04/2026
**feat(login): página de login e cadastro de usuário**

- Criada página `HTML/login.html` com sistema de autenticação via abas Bootstrap:
  - **Aba "Entrar"**: campos de e-mail e senha com botão mostrar/ocultar. Validação de formato de e-mail e campo não-vazio. Mensagem de erro inline quando credenciais são incorretas.
  - **Aba "Criar conta"**: campos de nome, e-mail e senha. Validações de nome (mín. 3 caracteres), e-mail (regex) e senha (mín. 6 caracteres). Confirmação de senha com verificação de igualdade.
  - Suporte ao parâmetro `?next=URL` para redirecionar após login.
  - Usuário já autenticado é redirecionado automaticamente ao acessar a página.
- **Arquivo:** `HTML/login.html` *(novo)*

---

### `86f8305` · feat · 29/04/2026
**feat(carrinho): lógica do carrinho de compras com localStorage**

- Criado `JavaScript/carrinho.js` com todas as funções de gerenciamento do carrinho:
  - `getCarrinho()` / `salvarCarrinho()`: leitura e escrita no `localStorage` (chave `happygames_cart`).
  - `adicionarAoCarrinho(jogoId, quantidade)`: adiciona ou incrementa item, limite de 10 unidades por produto.
  - `removerDoCarrinho(jogoId)`: remove um produto pelo id.
  - `atualizarQuantidadeCarrinho(jogoId, novaQtd)`: atualiza quantidade ou remove se for 0.
  - `limparCarrinho()`: esvazia o carrinho inteiro.
  - `contarItensCarrinho()`: retorna soma de todas as quantidades.
  - `totalCarrinho()`: retorna valor total com desconto.
  - `atualizarBadgeCarrinho()`: atualiza o badge `#cartBadge` na navbar.
- **Arquivo:** `JavaScript/carrinho.js` *(novo)*

---

### `d942abd` · feat · 29/04/2026
**feat(auth): sistema de login e cadastro com localStorage**

- Criado `JavaScript/auth.js` com o sistema completo de autenticação:
  - Usuários armazenados em `localStorage` (chave `happygames_users`, array de `{nome, email, senha}`).
  - Sessão armazenada em `sessionStorage` (chave `happygames_session`, objeto `{nome, email}`).
  - `fazerLogin(email, senha)`: valida credenciais e abre sessão. Retorna `{ok, usuario}` ou `{ok: false, erro}`.
  - `cadastrarUsuario(nome, email, senha)`: verifica duplicidade de e-mail e salva novo usuário. Retorna `{ok}` ou `{ok: false, erro}`.
  - `fazerLogout()`: encerra sessão e redireciona para `index.html`.
  - `getUsuarioLogado()`: retorna dados do usuário da sessão ativa ou `null`.
  - `atualizarNavbarAuth()`: preenche `#navbarAuth` com link "Entrar" (quando deslogado) ou dropdown com nome do usuário e opção de logout (quando logado).
- **Arquivo:** `JavaScript/auth.js` *(novo)*

---

### `797f45f` · feat · 29/04/2026
**feat(dados): adiciona getJogoPorId e funções matemáticas centralizadas**

- Adicionada função `getJogoPorId(id)` para busca de jogo pelo `id` numérico (necessária para `carrinho.js`).
- Movidas de `compra.js` para `dados.js` as funções matemáticas reutilizáveis:
  - `calcularSubtotal(preco, quantidade)` — função linear (1º grau): `f(q) = preco × q`.
  - `calcularTaxaDesconto(quantidade)` — função quadrática (2º grau): `f(q) = 0,005 × (q−1)²`, limitada a 20%.
  - `calcularPedido(preco, quantidade)` — combina as duas e retorna `{subtotal, taxa, desconto, total}`.
  - `formatarReais(valor)` — formata número para moeda `pt-BR` (R$).
- **Arquivo:** `JavaScript/dados.js`

---

### `50feec5` · docs · 29/04/2026
**docs(esg): reflexão ESG aplicada a software factory no contexto do happy games**

- Criado `docs/ESG.md` com reflexão acadêmica sobre os pilares ESG (Environmental, Social, Governance) aplicados ao desenvolvimento de software.
- Aborda práticas sustentáveis em TI, inclusão digital, acessibilidade e governança em projetos de software.
- **Arquivo:** `docs/ESG.md` *(novo)*

---

### `617c4ea` · docs · 29/04/2026
**docs(ia): reflexão sobre uso de IA generativa e aplicações em loja de jogos**

- Criado `docs/REFLEXAO_IA.md` com análise crítica sobre o uso de Inteligência Artificial generativa no desenvolvimento do projeto e no contexto de lojas de jogos digitais.
- **Arquivo:** `docs/REFLEXAO_IA.md` *(novo)*

---

### `2c334f9` · docs · 29/04/2026
**docs(fase3): documenta melhorias UX, conceitos JS e funções matemáticas**

- Criado `docs/FASE3_ATUALIZACOES.md` documentando todas as entregas da Fase 3:
  - Melhorias de UX implementadas.
  - Conceitos de JavaScript aplicados (arrays, laços, estruturas de controle).
  - Explicação das funções matemáticas de 1º e 2º grau utilizadas no cálculo de preços.
  - Comparativo entre JavaScript e Java.
- **Arquivo:** `docs/FASE3_ATUALIZACOES.md` *(novo)*

---

### `8a7c208` · style · 29/04/2026
**style(global): adiciona estilos preco-tag e price-summary para exibição de valores**

- Adicionados ao `CSS/style.css` os estilos de exibição de preços e resumos de pedido:
  - `.preco-tag`: badge de preço nos cards do catálogo.
  - `.price-summary`: caixa de resumo de preço no formulário de compra.
  - `.resumo-item`: linha de item dentro do resumo (nome + valor).
  - `.total-row`: linha do total com destaque em negrito.
- **Arquivo:** `CSS/style.css`

---

### `9eb469d` · feat · 29/04/2026
**feat(compra.html): adiciona boxPreco para resumo dinâmico de preço e inclui dados.js**

- Adicionado elemento `#boxPreco` no formulário de compra (etapa 2) para exibição do resumo de preço em tempo real.
- Incluída tag `<script src="../JavaScript/dados.js">` antes de `compra.js`.
- **Arquivo:** `HTML/compra.html`

---

### `dbfeaf4` · refactor · 29/04/2026
**refactor(catalogo.html): remove cards hardcoded e inclui dados.js para renderização dinâmica**

- Removidos todos os cards de jogos escritos manualmente no HTML (215 linhas deletadas).
- Adicionada `<div id="jogosGrid">` vazia, preenchida dinamicamente pelo `catalogo.js` a partir do array `JOGOS` de `dados.js`.
- Incluída tag `<script src="../JavaScript/dados.js">`.
- **Arquivo:** `HTML/catalogo.html`

---

### `39bbd37` · feat · 29/04/2026
**feat(compra): adiciona cálculos 1º e 2º grau, resumo de preço em tempo real e total no modal**

- Adicionadas funções matemáticas em `compra.js`:
  - Cálculo linear (1º grau) para subtotal: `f(q) = preco × q`.
  - Cálculo quadrático (2º grau) para desconto por volume: `f(q) = 0,005 × (q−1)²`.
- Resumo de preço atualizado em tempo real conforme o usuário altera a quantidade.
- Modal de confirmação exibe subtotal, desconto (quando aplicável) e total final formatado em R$.
- **Arquivo:** `JavaScript/compra.js`

---

### `5ae9a0f` · refactor · 29/04/2026
**refactor(catalogo): renderização dinâmica de cards via array JOGOS com for e forEach**

- `catalogo.js` reescrito para gerar os cards dinamicamente:
  - Usa laço `for` para gerar badges de plataforma de cada jogo.
  - Usa `forEach` para iterar o array `JOGOS` e construir o HTML de cada card.
  - Filtros de gênero, plataforma e busca por texto implementados com estruturas de controle (`if/else`, `continue`).
- **Arquivo:** `JavaScript/catalogo.js`

---

### `7eed3a9` · feat · 29/04/2026
**feat(dados): adiciona array JOGOS centralizado com função getPrecoByNome**

- Criado `JavaScript/dados.js` como fonte central de dados:
  - Array de objetos `JOGOS` com 6 jogos: The Last Of Us, GTA 6, Fortnite, EA Sports FC 26, Minecraft, God of War Ragnarök.
  - Cada objeto contém: `id`, `nome`, `genero`, `plataformas`, `preco`, `imagem`, `descricao`, `badgeClasse`, `badgeTexto`, `destaque`.
  - Função `getPrecoByNome(nome)` para busca linear por nome.
- **Arquivo:** `JavaScript/dados.js` *(novo)*

---

## Fase 2 — Documentação e estrutura · 29 abr 2026

### `5104158` · docs · 29/04/2026
**docs: adicionar guia de wireframes com estrutura de cada tela**

- Criado `docs/wireframes/GUIA_WIREFRAMES.md` descrevendo o layout e os componentes de cada tela do projeto (Home, Catálogo, Compra, Sobre, Obrigado).
- **Arquivo:** `docs/wireframes/GUIA_WIREFRAMES.md` *(novo)*

---

### `b0b570b` · docs · 29/04/2026
**docs: adicionar sitemap do projeto em formato SVG**

- Criado `docs/sitemap.svg` com o mapa visual de navegação entre as páginas do site.
- **Arquivo:** `docs/sitemap.svg` *(novo)*

---

### `1b636f2` · docs · 29/04/2026
**docs: adicionar fases de Design Thinking e limites do escopo do projeto**

- Criado `docs/DESIGN_THINKING.md` documentando as 5 fases do Design Thinking aplicadas ao projeto (Empatia, Definição, Ideação, Prototipagem, Teste) e os limites de escopo definidos para o MVP.
- **Arquivo:** `docs/DESIGN_THINKING.md` *(novo)*

---

### `e9c6c98` · docs · 29/04/2026
**docs: adicionar reflexão sobre metodologia ágil Scrum vs Kanban**

- Criado `docs/METODOLOGIA_AGIL.md` com comparativo entre Scrum e Kanban, justificando a metodologia escolhida para o desenvolvimento do projeto.
- **Arquivo:** `docs/METODOLOGIA_AGIL.md` *(novo)*

---

### `d8a05ae` · docs · 29/04/2026
**docs: adicionar referências de componentes Bootstrap utilizados**

- Criado `DOCUMENTACAO_BOOTSTRAP.txt` listando todos os componentes do Bootstrap 5 utilizados no projeto com descrição e página de referência.
- **Arquivo:** `DOCUMENTACAO_BOOTSTRAP.txt` *(novo)*

---

### `1c1c9f5` · feat · 29/04/2026
**feat: adicionar scripts JavaScript na pasta JavaScript/**

- Adicionados os scripts iniciais do projeto:
  - `catalogo.js`: filtros simples de busca (versão inicial).
  - `compra.js`: formulário de 3 etapas com máscara de cartão, validações e modal de confirmação.
  - `obrigado.js`: arquivo vazio (placeholder).
  - `script.js`: script da página inicial.
  - `sobre.js`: animações e lógica da página Sobre.
- **Arquivos:** `JavaScript/catalogo.js`, `JavaScript/compra.js`, `JavaScript/obrigado.js`, `JavaScript/script.js`, `JavaScript/sobre.js`

---

### `c43fecd` · refactor · 29/04/2026
**refactor: mover imagens para a pasta Imagens/**

- Imagens dos jogos movidas da raiz do projeto para `Imagens/`:
  - `FC26.jpg`, `FORT.jpg`, `GOW.jpg`, `GTA.jpg`, `MINE.jpg`, `TLOU.jpg`
- **Arquivos movidos:** raiz → `Imagens/`

---

### `3b14617` · style · 29/04/2026
**style: centralizar CSS global e remover regras duplicadas de navbar**

- Criada a pasta `CSS/` com arquivos CSS separados por escopo:
  - `CSS/style.css`: estilos globais (navbar, footer, variáveis, botões, cards).
  - `CSS/catalogo.css`: estilos específicos do catálogo e filtros.
  - `CSS/compra.css`: estilos do formulário de compra.
  - `CSS/desktop.css`: media queries para telas largas (≥1024px).
  - `CSS/obrigado.css`: estilos da página de confirmação.
  - `CSS/sobre.css`: estilos da página Sobre.
- Removidos `style.css` e `desktop.css` da raiz (arquivos antigos com regras duplicadas).
- **Arquivos:** criados em `CSS/`, removidos da raiz.

---

### `f70ce32` · refactor · 29/04/2026
**refactor: mover páginas HTML para a pasta HTML/**

- Todas as páginas movidas da raiz para `HTML/`:
  - `catalogo.html`, `compra.html`, `index.html`, `obrigado.html`, `sobre.html`
- Referências a CSS e JS atualizadas para caminhos relativos `../CSS/` e `../JavaScript/`.
- **Arquivos movidos:** raiz → `HTML/`

---

## Fase 1 — Entrega inicial · 01 abr 2026

### `ddf2e6f` · feat · 01/04/2026
**Fase 1**

- Criação inicial do projeto com todas as páginas e estilos na raiz:
  - **Páginas:** `index.html`, `catalogo.html`, `compra.html`, `sobre.html`, `obrigado.html`.
  - **Estilos:** `style.css` (global), `desktop.css` (responsivo para desktop).
  - **Imagens:** `FC26.jpg`, `FORT.jpg`, `GOW.jpg`, `GTA.jpg`, `MINE.jpg`, `TLOU.jpg`.
- Cards de jogos escritos manualmente no HTML do catálogo.
- Formulário de compra com 3 etapas (dados, pedido, pagamento) sem lógica de cálculo.
- Navbar com links para todas as páginas e design responsivo com Bootstrap 5.

---

*Gerado em 29/04/2026 · Happy Games Store — FiapOnGrupo5*
