# ESG aplicado ao Projeto Happy Games
## Parte 5 — Environmental, Social & Governance em uma Software Factory

### Contexto

ESG (Environmental, Social, Governance) é um conjunto de critérios que avaliam o impacto de uma organização além dos resultados financeiros. Aplicado a uma **software factory** (fábrica de software) como o contexto do projeto Happy Games, ESG orienta decisões técnicas e culturais desde o início do ciclo de desenvolvimento.

---

## E — Environmental (Ambiental)

### 5.1 Pegada de carbono do software

Software não é "imaterial" do ponto de vista ambiental: servidores, redes e dispositivos dos usuários consomem energia elétrica para cada requisição, cada renderização de página, cada byte transferido.

| Prática adotada no Happy Games | Impacto ambiental positivo |
|-------------------------------|---------------------------|
| Site estático (sem backend/banco) | Zero custo de processamento servidor por requisição |
| Bootstrap via CDN (jsdelivr) | Reutiliza cache compartilhado — menos downloads |
| Imagens comprimidas no diretório `Imagens/` | Reduz transferência de dados por acesso |
| CSS modularizado (sem duplicatas) | Arquivos menores → menos bytes trafegados |
| JavaScript minimalista (sem frameworks pesados) | Menor tempo de parse e execução no dispositivo do usuário |

### 5.2 Hospedagem verde

Em um produto comercial, a escolha do provedor de hospedagem deve considerar:
- Uso de **energia renovável** (AWS, Google Cloud e Azure têm compromissos de zero carbono até 2030)
- **Eficiência energética** do datacenter (PUE — Power Usage Effectiveness)
- Hospedagem estática em CDN (ex: **GitHub Pages**, **Netlify**, **Vercel**) elimina servidores dedicados subutilizados

> O próprio repositório GitHub (`FiapOnGrupo5/happy-game`) viabiliza deploy estático gratuito via **GitHub Pages**, que roda em infraestrutura de baixo desperdício.

---

## S — Social

### 5.3 Acessibilidade digital (WCAG 2.1)

O acesso à cultura digital — incluindo o mercado de jogos — deve ser inclusivo.

| Critério WCAG | Implementação no Happy Games |
|--------------|------------------------------|
| Contraste de cores | Gradiente roxo (`#667eea`) com texto branco — ≥ 4.5:1 |
| `alt` em imagens | Todas as `<img>` possuem atributo `alt` descritivo |
| Labels em formulários | `<label for="campo">` em todos os inputs do compra.html |
| Responsividade | Bootstrap grid responsivo (mobile-first) |
| Feedback de erro | Mensagens de validação visíveis (`.invalid-feedback`) |
| Navegação por teclado | Bootstrap garante foco visível em botões e links |

**Melhorias futuras** para acessibilidade plena:
- Adicionar `aria-label` e `role` nos cards do catálogo
- Garantir que o modal de confirmação é anunciado por leitores de tela (`aria-live`)
- Suportar tema de alto contraste

### 5.4 Inclusão digital e precificação

A faixa de preços dos jogos (R$ 99,90 a R$ 349,90) e o **sistema de desconto progressivo** implementado (`calcularTaxaDesconto`) são escolhas socialmente conscientes:
- Minecraft (R$ 99,90) como opção acessível
- Desconto de até 20% para compras em quantidade incentiva famílias ou grupos

### 5.5 Diversidade de plataformas

Ao suportar PC, PS5 e Xbox no catálogo, o Happy Games não restringe o público a um único ecossistema de hardware — democratizando o acesso para diferentes faixas de renda (PC genérico vs. console dedicado).

---

## G — Governance (Governança)

### 5.6 Ética no desenvolvimento

| Princípio | Prática no projeto |
|----------|-------------------|
| Código aberto e auditável | Repositório público no GitHub (`FiapOnGrupo5/happy-game`) |
| Histórico transparente | Git com commits semânticos e mensagens em português |
| Sem dark patterns | Formulário de compra sem cobranças ocultas, itens adicionados automaticamente ou countdown falso |
| Sem rastreamento invasivo | Nenhum cookie de terceiros, sem Google Analytics, sem pixel de remarketing |

### 5.7 Privacidade de dados (LGPD)

O formulário de compra coleta: nome, e-mail, número do cartão, validade e CVV.

**Práticas de conformidade com a LGPD**:
- Dados não são persistidos (sem backend/banco nesta fase acadêmica)
- Em produção: coletar apenas o mínimo necessário (minimização de dados)
- Campo de cartão não deve ser logado em nenhum servidor — usar tokenização via gateway (ex: Stripe)
- Política de Privacidade e Termos de Uso são obrigatórios antes da coleta de PII (Personally Identifiable Information)

### 5.8 Governança de processo (Metodologia Ágil)

O uso de **Scrum** com sprints documentadas (ver `docs/METODOLOGIA_AGIL.md`) garante:
- Rastreabilidade das decisões de produto
- Entrega incremental e revisável pelo cliente/professor
- Retrospectivas que identificam melhorias de processo (Ex: CSS desduplicado na Fase 3 a partir de feedback da Fase 2)

---

## Resumo ESG

| Dimensão | Nota de aderência | Destaque |
|---------|------------------|---------|
| **Ambiental** | ★★★★☆ | Site estático leve, CDN, sem servidor ocioso |
| **Social** | ★★★★☆ | Acessibilidade básica WCAG, multi-plataforma, desconto inclusivo |
| **Governança** | ★★★★★ | Commits rastreáveis, sem dark patterns, sem rastreamento invasivo |

> O projeto Happy Games demonstra que **boas práticas técnicas e responsabilidade socioambiental não são antagônicas** — ao contrário, um código bem estruturado, leve e acessível é simultaneamente melhor para o usuário, para o meio ambiente e para a sociedade.
