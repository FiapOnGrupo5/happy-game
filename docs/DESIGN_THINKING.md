# Design Thinking – Happy Games

O processo de Design Thinking foi aplicado nas etapas iniciais do projeto para
garantir que o produto fosse centrado no usuário. As três fases percorridas
foram: **Imersão**, **Análise e Interpretação** e **Ideação**.

---

## Fase 1 – Imersão

> *"Entender o problema antes de partir para a solução."*

### Contexto investigado

A equipe partiu da seguinte pergunta central:
**Como criar uma loja de jogos digitais que seja intuitiva, responsiva e
agradável para diferentes perfis de usuário?**

### Pesquisa de mercado

Foram analisadas lojas de jogos existentes como referência:

| Plataforma | O que foi observado |
|---|---|
| **Steam** | Destaque visual para jogos, filtros por gênero/preço/plataforma, reviews, sistema de wishlist |
| **Nuuvem** | Checkout simplificado, preços com desconto em destaque, interface menos poluída |
| **GOG** | Foco em jogos sem DRM, cartas do produto com screenshots e informações técnicas |

### Problemas identificados em e-commerces de jogos

- Menus com muitos níveis → usuário se perde antes de chegar ao produto.
- Formulário de compra com campos desnecessários → abandono antes de finalizar.
- Falta de feedback visual → usuário não sabe se a ação foi registrada.
- Imagens de baixa qualidade → produto não valorizado.

### Perfis de usuário (Personas)

| Persona | Perfil | Comportamento | Necessidade principal |
|---|---|---|---|
| **Gamer casual** | 18–35 anos, compra por impulso | Navega rapidamente, decide em segundos | Processo de compra rápido, destaque visual |
| **Gamer experiente** | Pesquisa antes de comprar | Usa filtros por gênero e plataforma | Busca eficiente, informações detalhadas |
| **Compra de presente** | Compra esporádica, pouca familiaridade | Precisa de orientação clara | Interface simples, confirmação explícita |

---

## Fase 2 – Análise e Interpretação

> *"Transformar o que foi observado em oportunidades de design."*

### Insights gerados

| Observação (Imersão) | Interpretação | Decisão de design |
|---|---|---|
| Usuários abandonam carrinho com formulário longo | O processo de compra precisa parecer curto | Stepper de 3 passos na página de compra |
| Usuários querem encontrar jogos rapidamente | Busca e filtragem são essenciais | Campo de busca + painel de filtros por gênero e plataforma |
| Usuários confiam mais com confirmação visual | O feedback deve ser imediato e claro | Toast ao adicionar ao carrinho + modal de revisão + página de agradecimento |
| Menus extensos afastam usuários mobile | Navegação precisa ser compacta em telas pequenas | Navbar responsiva com botão toggler no mobile |
| Jogos em destaque geram mais cliques | Home deve ter área de destaque rotativo | Carousel com imagem, badge de gênero, título e CTA |

### Mapa de jornada do usuário (simplificado)

```
[Usuário entra]
      │
      ▼
  HOME (index.html)
  Carousel de destaques + Cards de jogos
      │
      ├──► CATÁLOGO (catalogo.html)
      │    Busca + filtros por gênero/plataforma
      │         │
      │         ▼
      │    COMPRA (compra.html)
      │    Stepper: Dados → Pagamento → Revisão
      │         │
      │         ▼
      │    OBRIGADO (obrigado.html)
      │    Confirmação do pedido
      │
      └──► SOBRE (sobre.html)
           Informações da empresa + formulário de comunidade
```

---

## Fase 3 – Ideação

> *"Gerar soluções criativas a partir dos insights."*

### Soluções criadas

| Solução | Onde | Motivação |
|---|---|---|
| **Carousel** na Home | index.html | Destaque rotativo para os principais jogos |
| **Cards com badge de gênero** | index.html, catalogo.html | Identificação visual rápida do tipo de jogo |
| **Filtro Offcanvas** | catalogo.html | Painel lateral que não ocupa espaço permanente |
| **Toast de confirmação** | catalogo.html | Feedback imediato ao clicar em "Comprar" |
| **Stepper de compra** | compra.html | Divide o formulário em 3 passos para parecer menor |
| **Modal de revisão** | compra.html | Permite revisar o pedido antes de confirmar |
| **Página de agradecimento** | obrigado.html | Confirmação visual clara do pedido finalizado |
| **Formulário de comunidade** | sobre.html | Engajamento com validação em tempo real |
| **Responsividade total** | Todas as páginas | Layout adaptado para mobile, tablet e desktop |

### Decisões de identidade visual

- **Paleta de cores**: gradiente roxo/lilás (`#667eea` → `#764ba2`) — remete a
  tecnologia, criatividade e confiança.
- **Tipografia**: Segoe UI / Tahoma — fontes do sistema, leitura fluida sem
  carregamento externo.
- **Bordas arredondadas**: `border-radius: 12px` em cards e botões — visual
  moderno e amigável.

---

## Limites do Projeto (Escopo Definido)

Esta seção declara explicitamente o que **não foi implementado**, para
contextualizar as decisões de desenvolvimento e evitar ambiguidades na
avaliação.

### O que está fora do escopo

| Funcionalidade | Status | Justificativa |
|---|---|---|
| Cadastro / login de usuário | ❌ Não implementado | Requer back-end e banco de dados — fora do escopo front-end |
| Autenticação e sessão | ❌ Não implementado | Sem servidor, sem tokens, sem cookies de sessão |
| Integração com pagamento real | ❌ Não implementado | Requer gateway (Stripe, PagSeguro etc.) — sem back-end |
| Carrinho persistente entre sessões | ❌ Não implementado | Sem banco de dados ou localStorage persistente multi-sessão |
| Banco de dados de jogos | ❌ Não implementado | Dados mockados em arrays JavaScript no front-end |
| API de terceiros (jogos, preços) | ❌ Não implementado | Projeto puramente estático |
| Sistema de avaliações / reviews | ❌ Não implementado | Fora do escopo inicial |
| Painel administrativo | ❌ Não implementado | Sem back-end |
| SEO avançado | ❌ Não implementado | Sem servidor, sem sitemap.xml, sem meta tags dinâmicas |

### O que foi entregue (dentro do escopo)

| Funcionalidade | Status |
|---|---|
| 5 páginas HTML funcionais (index, catálogo, compra, sobre, obrigado) | ✅ Entregue |
| Responsividade: mobile, tablet e desktop | ✅ Entregue |
| Filtro por gênero e plataforma no catálogo | ✅ Entregue |
| Busca por nome de jogo em tempo real | ✅ Entregue |
| Stepper de compra em 3 etapas com validação | ✅ Entregue |
| Modal de confirmação de pedido | ✅ Entregue |
| Toast de feedback ao adicionar produto | ✅ Entregue |
| Formulário de comunidade com validação | ✅ Entregue |
| Identidade visual consistente com Bootstrap + CSS customizado | ✅ Entregue |
| Documentação técnica (Bootstrap, metodologia, Design Thinking) | ✅ Entregue |

---

## Referências

- BROWN, Tim. *Design Thinking*. Harvard Business Review, 2008.
- IDEO. *Design Thinking for Educators*. 2012.
- VIANNA, Maurício et al. *Design Thinking: Inovação em Negócios*. MJV Press,
  2012.
