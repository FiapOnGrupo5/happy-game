# GUIA DE WIREFRAMES - HAPPY GAMES

## Como usar este arquivo

Este guia descreve exatamente o que deve aparecer em cada tela do wireframe,
baseado no projeto ja construido. Abra o Pencil, Marvel ou Figma, crie um
quadro por pagina e reproduza os blocos na ordem indicada.

Regra: o desenho precisa ser de voces. Use este guia como referencia de blocos
e hierarquia — nao use IA para gerar o layout automaticamente.

Ferramenta recomendada gratuita: https://pencil.evolus.vn/
Alternativa online: https://marvelapp.com/

---

## TELA 1 — Home (index.html)

Tamanho do quadro sugerido: 1280 x 900 px (desktop) / 390 x 844 px (mobile)

Blocos do topo para o rodape:

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                      │
│  [Logo: Happy Games]   [Home][Catálogo]      │
│                        [Comprar][Sobre]       │
├─────────────────────────────────────────────┤
│  CAROUSEL (destaque rotativo)                │
│  ┌───────────────────────────────────────┐  │
│  │  [Imagem do jogo em destaque]         │  │
│  │  Badge: Gênero                        │  │
│  │  Título do jogo                       │  │
│  │  Descrição curta                      │  │
│  │  [ Comprar agora ]                    │  │
│  └───────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│  SEÇÃO: Jogos em destaque                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ [Imagem] │  │ [Imagem] │  │ [Imagem] │  │
│  │ Badge    │  │ Badge    │  │ Badge    │  │
│  │ Título   │  │ Título   │  │ Título   │  │
│  │ Descrição│  │ Descrição│  │ Descrição│  │
│  │[Comprar] │  │[Comprar] │  │[Comprar] │  │
│  └──────────┘  └──────────┘  └──────────┘  │
├─────────────────────────────────────────────┤
│  ASIDE: Novidades                            │
│  "Confira o catálogo completo"               │
│  [ Ver catálogo completo ]                   │
├─────────────────────────────────────────────┤
│  FOOTER                                      │
│  Email: contato@happygames.com               │
│  © 2026 Happy Games                         │
└─────────────────────────────────────────────┘
```

Elementos obrigatorios no wireframe:

- Navbar com logo e 4 links
- Carousel com imagem, badge de genero, titulo e botao
- 3 cards com imagem, badge, titulo, descricao e botao
- Aside de novidades com CTA
- Footer

---

## TELA 2 — Catálogo (catalogo.html)

```
┌─────────────────────────────────────────────┐
│  NAVBAR (igual a Home)                       │
├─────────────────────────────────────────────┤
│  BARRA DE AÇÕES                              │
│  Título: "Todos os jogos"                    │
│  [ Buscar jogo... 🔍 ]   [ Filtros ≡ ]      │
├─────────────────────────────────────────────┤
│  GRID DE JOGOS (3 colunas)                   │
│  ┌────────┐  ┌────────┐  ┌────────┐         │
│  │Imagem  │  │Imagem  │  │Imagem  │         │
│  │Badge   │  │Badge   │  │Badge   │         │
│  │Plat.   │  │Plat.   │  │Plat.   │         │
│  │Título  │  │Título  │  │Título  │         │
│  │Descriç.│  │Descriç.│  │Descriç.│         │
│  │[Comprar│  │[Comprar│  │[Comprar│         │
│  └────────┘  └────────┘  └────────┘         │
│  (repetir para 6 jogos)                      │
├─────────────────────────────────────────────┤
│  FOOTER                                      │
└─────────────────────────────────────────────┘

PAINEL LATERAL (Offcanvas — aparece ao clicar em Filtros):
┌──────────────────────┐
│  Filtrar jogos    X  │
│  ──────────────────  │
│  Gênero              │
│  ☐ Ação              │
│  ☐ Sobrevivência     │
│  ☐ Mundo Aberto      │
│  ──────────────────  │
│  Plataforma          │
│  ☐ PS5               │
│  ☐ Xbox              │
│  ☐ PC                │
│  [ Limpar filtros ]  │
└──────────────────────┘
```

Elementos obrigatorios no wireframe:

- Navbar
- Campo de busca + botao de filtros
- Grid 3 colunas com 6 cards
- Painel lateral de filtros (pode ser um segundo quadro/estado)

---

## TELA 3 — Compra (compra.html) — 3 estados

### Estado 1: Dados pessoais

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                      │
├─────────────────────────────────────────────┤
│  Título: "Finalizar compra"                  │
│                                              │
│  ████████░░░░░░░░░░░░░░  (progress bar 33%) │
│  [Dados pessoais]  [Pedido]  [Pagamento]     │
│                                              │
│  ┌─────────────────────────────────────┐    │
│  │  Seus dados                         │    │
│  │  Nome completo: [____________]      │    │
│  │  E-mail:        [____________]      │    │
│  │                    [ Próximo → ]    │    │
│  └─────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│  FOOTER                                      │
└─────────────────────────────────────────────┘
```

### Estado 2: Pedido

```
│  ████████████████░░░░░░  (progress bar 66%) │
│  ┌─────────────────────────────────────┐    │
│  │  Seu pedido                         │    │
│  │  Escolha o jogo: [▼ dropdown]       │    │
│  │  Quantidade:     [1    ]            │    │
│  │  [ ← Voltar ]         [ Próximo → ] │    │
│  └─────────────────────────────────────┘    │
```

### Estado 3: Pagamento + Modal de revisão

```
│  ████████████████████████  (progress 100%) │
│  ┌─────────────────────────────────────┐   │
│  │  Pagamento                          │   │
│  │  Número do cartão: [0000 0000...]   │   │
│  │  Validade: [MM/AA]   CVV: [123]     │   │
│  │  [ ← Voltar ]   [ Revisar pedido ] │   │
│  └─────────────────────────────────────┘   │

MODAL (sobreposto):
┌──────────────────────────────┐
│  Confirmar pedido        X   │
│  ─────────────────────────  │
│  Nome:       João Silva      │
│  E-mail:     joao@...        │
│  Jogo:       GTA 6           │
│  Quantidade: 1               │
│  Preço:      R$ 349,90       │
│  ─────────────────────────  │
│  [ Editar ]  [Confirmar ✓]  │
└──────────────────────────────┘
```

Elementos obrigatorios no wireframe:

- Navbar
- Progress bar com 3 labels de etapa
- Card de formulario com campos de cada etapa
- Botoes Voltar / Proximo em cada etapa
- Modal de revisao (pode ser um quadro separado)

---

## TELA 4 — Sobre (sobre.html)

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                      │
├─────────────────────────────────────────────┤
│  Título: "Sobre a Happy Games"               │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │  🚀  Sobre o Projeto                 │   │
│  │  Texto descritivo...                 │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  🎯  Nossa Missão                    │   │
│  │  Texto descritivo...                 │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  💼  O Que Fazemos                   │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  🛡  Nossos Valores                  │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  📰  Novidades da Comunidade         │   │
│  │  "Texto rotativo aqui."              │   │
│  │  [ Ver próxima novidade ↺ ]          │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  🏆  Ranking da Semana               │   │
│  │  Ana ──────────────── 1200 pts       │   │
│  │  Bruno ─────────────── 980 pts       │   │
│  │  Carlos ────────────── 870 pts       │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  👤  Entre para a Comunidade         │   │
│  │  Seu nome:       [____________]      │   │
│  │  Jogo favorito:  [____________]      │   │
│  │  [ Cadastrar na comunidade ✓ ]       │   │
│  └──────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  FOOTER                                      │
└─────────────────────────────────────────────┘
```

Elementos obrigatorios no wireframe:

- Navbar
- 4 blocos institucionais com icone e texto
- Bloco de novidades com botao de troca
- Ranking com lista de jogadores
- Formulario de cadastro com campos e botao de submit

---

## TELA 5 — Obrigado (obrigado.html)

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                      │
├─────────────────────────────────────────────┤
│                                              │
│         ✅  (icone grande de check)          │
│         Pedido confirmado! 🎉               │
│                                              │
│  Seu pedido foi processado com sucesso.     │
│  Em breve voce recebera um e-mail.          │
│                                              │
│   [ 🏠 Voltar para a home ]                 │
│   [ 🎮 Ver produtos ]                       │
│                                              │
├─────────────────────────────────────────────┤
│  FOOTER                                      │
└─────────────────────────────────────────────┘
```

Elementos obrigatorios no wireframe:

- Navbar
- Icone de confirmacao centralizado
- Mensagem de sucesso
- 2 botoes de retorno

---

## Checklist de producao dos wireframes

- [ ] Tela 1 — Home desenhada
- [ ] Tela 2 — Catalogo desenhada (+ estado offcanvas)
- [ ] Tela 3 — Compra desenhada (3 estados + modal)
- [ ] Tela 4 — Sobre desenhada
- [ ] Tela 5 — Obrigado desenhada
- [ ] Wireframes exportados ou fotografados
- [ ] Arquivos salvos em docs/wireframes/
- [ ] Incluidos no PDF final
