# Metodologia Ágil – Happy Games

## Escolha da Metodologia: Scrum

Para o desenvolvimento do Happy Games, a equipe optou pelo **Scrum** como
metodologia ágil de trabalho. Essa decisão foi baseada em características
concretas do projeto e da equipe — não foi uma escolha aleatória.

---

## Por que Scrum e não Kanban?

### O que é Kanban?

Kanban é um sistema de **fluxo contínuo**, sem sprints definidas. Trabalha com
uma fila de tarefas que avança por colunas (ex.: A fazer → Em andamento →
Feito). É ideal para:

- Equipes de suporte, manutenção ou operações com demanda imprevisível.
- Trabalho com tarefas independentes que chegam de forma assíncrona.
- Contextos onde não há papéis fixos nem cerimônias formais.
- Projetos de longo prazo sem escopo fechado.

**Limitação do Kanban para este projeto:** não oferece mecanismo nativo de
revisão periódica, sprint review nem backlog priorizado. Com um prazo curto e
escopo definido, o Kanban geraria pouca visibilidade sobre progresso e risco de
entrega.

### O que é Scrum?

Scrum organiza o trabalho em **sprints** — ciclos curtos e fixos (1 a 4
semanas). Cada sprint termina com uma entrega potencialmente utilizável. Define
papéis (Product Owner, Scrum Master, Developers) e cerimônias formais
(Planning, Daily, Review, Retrospectiva).

---

## Justificativa para escolha do Scrum no Happy Games

| Critério | Análise | Decisão |
|---|---|---|
| Tamanho da equipe | 4 pessoas | Dentro da faixa ideal do Scrum (3–9 membros) |
| Duração do projeto | Curto prazo (4 semanas) | Sprints de 1 semana permitem ajustes rápidos |
| Clareza do escopo | Escopo definido (loja de jogos com 5 páginas) | Backlog priorizado facilita o planejamento |
| Necessidade de feedback | Alta — feedback do avaliador ao fim de cada ciclo | Sprint Review se encaixa perfeitamente |
| Complexidade técnica | Média (HTML, CSS, JS, Bootstrap) | Scrum ajuda a priorizar funcionalidades por valor |
| Ritmo da equipe | Estudantes com agendas paralelas | Daily assíncrona mantém o alinhamento sem reuniões longas |

### Por que Kanban seria inadequado aqui?

1. **Escopo fechado**: sabemos exatamente o que entregar (5 páginas com
   funcionalidades específicas). O Kanban é mais adequado quando a demanda é
   contínua e não tem fim definido.

2. **Equipe de 4 pessoas com papéis definidos**: o Scrum deu estrutura clara a
   quem coordenava (Scrum Master), quem priorizava (Product Owner) e quem
   executava (Developers).

3. **Necessidade de sincronização**: sem sprints, cada membro poderia trabalhar
   em diferentes frentes sem saber o que os outros entregaram. As reuniões de
   sprint mantiveram o alinhamento.

4. **Prazo apertado**: com 4 semanas, cada sprint de 1 semana gerou uma entrega
   revisável. O Kanban não teria essa cadência natural de inspeção e adaptação.

---

## Sprints do Projeto

| Sprint | Duração | Foco | Entrega |
|---|---|---|---|
| Sprint 1 | 1 semana | Estrutura base | 5 páginas HTML com navbar, footer e estrutura Bootstrap |
| Sprint 2 | 1 semana | Visual e responsividade | CSS customizado, variáveis, responsividade mobile/tablet/desktop |
| Sprint 3 | 1 semana | Interatividade | JavaScript: filtros, busca, stepper, modal, toast, validações |
| Sprint 4 | 1 semana | Qualidade e entrega | Ajustes de UX, testes manuais, documentação e entrega final |

---

## Artefatos do Scrum Utilizados

| Artefato | Como foi aplicado |
|---|---|
| **Product Backlog** | Lista de funcionalidades priorizadas: carousel, cards, filtros, formulário de compra, toast, modal |
| **Sprint Backlog** | Tarefas distribuídas por sprint conforme tabela acima |
| **Incremento** | Entrega ao fim de cada sprint: HTML → CSS → JS → Refinamento |
| **Daily Standup** | Alinhamento rápido via chat da equipe (assíncrono, adaptado para estudantes) |
| **Sprint Review** | Revisão das entregas com o grupo antes de cada nova fase |
| **Retrospectiva** | Avaliação do que funcionou e o que melhorar — ex.: CSS duplicado identificado e planejado para correção |

---

## Conclusão

O Scrum foi a escolha certa para o Happy Games porque ofereceu **estrutura
sem burocracia excessiva**. Com 4 pessoas, escopo definido, prazo curto e
necessidade de feedback constante, os pilares do Scrum — transparência,
inspeção e adaptação — foram fundamentais para entregar um produto coeso dentro
do prazo.
