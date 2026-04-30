# Reflexão sobre Inteligência Artificial — Projeto Happy Games

## Parte 4 — IA aplicada a uma loja de jogos digitais

### Contexto

O projeto Happy Games é um e-commerce estático de jogos digitais voltado ao aprendizado acadêmico. Contudo, ao pensarmos em uma versão comercial real dessa plataforma, a Inteligência Artificial seria um diferencial estratégico em diversas camadas.

---

## 4.1 IA usada no desenvolvimento (Fase Atual)

Durante o desenvolvimento das Fases 2 e 3, a IA Generativa (GitHub Copilot / ChatGPT) foi utilizada como ferramenta de apoio para:

| Uso | Descrição |
|-----|-----------|
| Revisão de código | Sugestão de refatorações e identificação de duplicações no CSS |
| Escrita de funções | Geração de `calcularTaxaDesconto`, `buildCardHTML`, `atualizarBoxPreco` |
| Depuração | Análise de erros de escopo e referências DOM |
| Documentação | Apoio na estruturação de docs como este arquivo |
| Design Thinking | Geração de personas, cenários e insights de usuário |

> **Limitação observada**: a IA Generativa não conhece o estado atual do arquivo sem leitura explícita — ela gera código com base em padrões, mas pode sugerir soluções inconsistentes com a estrutura real do projeto. A supervisão humana foi essencial.

---

## 4.2 IA recomendada para o produto comercial

### Sistema de Recomendação Personalizada

Em uma loja real, um modelo de **filtragem colaborativa** (collaborative filtering) analisaria:
- Histórico de jogos comprados por usuário
- Ratings implícitos (tempo de permanência na página do produto)
- Padrão de consumo por gênero e plataforma

**Exemplo de lógica:**
```
Se usuário comprou: The Last Of Us (sobrevivência, PS5)
E usuário B (perfil similar) comprou: God of War Ragnarök
→ Sugerir God of War ao usuário
```

Ferramentas: **Amazon Personalize**, **TensorFlow Recommenders**, ou modelo simples com **cosine similarity** em Python/Node.

---

### 4.3 Busca Semântica no Catálogo

A barra de busca atual do catálogo filtra apenas por correspondência exata de texto. Uma IA de NLP (Natural Language Processing) permitiria buscas como:

- "jogo de luta mitológico" → retorna *God of War Ragnarök*
- "multiplayer online grátis" → retorna *Fortnite*

**Tecnologia**: embeddings de texto com **OpenAI API** ou modelo local como **sentence-transformers**.

---

### 4.4 Precificação Dinâmica com ML

Modelos de Machine Learning podem ajustar preços dinamicamente com base em:
- Sazonalidade (Black Friday, promoções de plataforma)
- Demanda histórica por jogo/gênero
- Preços praticados por concorrentes (web scraping + regressão)

A função `calcularTaxaDesconto()` implementada neste projeto é uma versão simplificada e estática desse conceito — um modelo de ML poderia torná-la adaptativa.

---

### 4.5 Detecção de Fraudes no Pagamento

O formulário de pagamento em `compra.html` aplica validação básica (formato cartão, CVV, validade). Em produção, modelos de classificação supervisionada detectariam padrões suspeitos:

- Compras em horários atípicos
- Múltiplos pedidos com cartões diferentes em curto período
- IP diferente do histórico do usuário

**Ferramentas**: Stripe Radar (já inclui ML), AWS Fraud Detector, ou modelo próprio com **scikit-learn** (Random Forest / XGBoost).

---

## 4.6 Responsabilidade no uso de IA

Ao adotar IA em uma loja digital, é necessário observar:

- **Viés algorítmico**: sistemas de recomendação podem superexpor jogos de grandes publishers e invisibilizar jogos independentes.
- **Privacidade**: coleta de dados de comportamento exige conformidade com a **LGPD** (Lei Geral de Proteção de Dados) e opção de opt-out.
- **Transparência**: o usuário deve saber quando está recebendo uma recomendação personalizada e por quê.
- **Dependência de modelos externos**: APIs de IA de terceiros geram dependência e custo variável — priorizar soluções com fallback graceful.

---

## Conclusão

A IA não substitui a lógica de negócios bem estruturada, mas potencializa a experiência do usuário e a eficiência operacional. O projeto Happy Games demonstra, em escala acadêmica, as bases de pensamento que sustentam essas aplicações: arrays bem estruturados (`JOGOS`), funções puras de cálculo (`calcularPedido`), e separação clara de responsabilidades entre dados, lógica e interface — princípios que também são a fundação de qualquer sistema de IA robusto.
