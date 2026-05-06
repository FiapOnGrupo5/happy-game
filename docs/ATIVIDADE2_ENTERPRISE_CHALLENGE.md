# Atividade 2 - Enterprise Challenge (Palo Alto Networks)

## Identificacao do Projeto
- Projeto: Happy Games Store
- Curso: FIAP ON
- Challenge: Enterprise Challenge - Palo Alto Networks
- Grupo: [PREENCHER]
- Integrantes: [PREENCHER]
- Data: [PREENCHER]

Observacao: os campos acima devem ser preenchidos antes da exportacao final em PDF.

---

## 1. Contextualizacao do Projeto

A Happy Games Store e uma plataforma web de venda de jogos digitais, desenvolvida com foco em experiencia do usuario, organizacao visual e evolucao para seguranca robusta. O MVP atual foi construido com HTML, CSS, JavaScript e Bootstrap, com arquitetura modular por responsabilidade (autenticacao, catalogo, carrinho, compra e dados centralizados).

Funcionalidades ja implementadas no estado atual:
- Cadastro e login de usuario.
- Catalogo de jogos com busca e filtros por genero/plataforma.
- Carrinho de compras com atualizacao de quantidades e totalizacao.
- Fluxo de checkout com validacoes de formulario.
- Documentacao tecnica e de processo (UX, ESG, metodologia agil e reflexao sobre IA).

Problema de negocio atacado pelo projeto:
- Experiencias de compra genericas e pouco personalizadas.
- Baixa percepcao de confianca em ambientes digitais.
- Dificuldade de encontrar jogos relevantes com rapidez.

Oportunidade identificada:
- Unir experiencia simples de compra com trilha de seguranca e personalizacao orientada por dados.
- Evoluir de MVP frontend para arquitetura com backend seguro e mecanismos de IA aplicados a recomendacao e defesa cibernetica.

---

## 2. Defesa Cibernetica e IA

### 2.1 Atualizacoes de Ciberseguranca

Implementado no MVP:
- Validacao de entradas em formularios (e-mail, senha, cartao, CVV, validade).
- Regra de senha forte no cadastro (criterios de complexidade).
- Controle de fluxo basico de sessao no navegador para experiencia autenticada.

Planejado para proxima fase (recomendacao da mentoria: "comecar a codar"):
- Migracao da autenticacao para backend com hash de senha (bcrypt/Argon2).
- Tokens de acesso com expiracao e controle de renovacao de sessao.
- Controle de acesso por rotas e perfis de usuario.
- Rate limiting e bloqueio progressivo contra tentativas de forca bruta.
- Logs de seguranca e trilha de auditoria para eventos criticos.
- Hardening de API com validacao server-side e cabecalhos de seguranca.

### 2.2 Atualizacoes de IA

Implementado no MVP:
- Estrutura de dados e instrumentacao funcional para evoluir recomendacao (catalogo estruturado, filtros e historico de interacoes no frontend).
- Documentacao de casos de uso de IA para recomendacao, suporte e deteccao de anomalias.

Planejado para proxima fase:
- Recomendador inicial baseado em regras (genero, plataforma, historico de navegacao e carrinho).
- Evolucao para modelo de filtragem colaborativa com feedback implicito.
- Score de risco de transacao para apoio a deteccao de comportamento suspeito.
- Suporte assistido por IA para FAQ e triagem inicial de atendimento.

### 2.3 Integracao Ciberseguranca + IA

A integracao sera realizada em duas camadas:
- Camada de protecao: autenticacao segura, controles de acesso, logging e monitoramento.
- Camada de inteligencia: recomendacao personalizada e analise de padroes anormais.

Fluxo resumido:
1. Usuario autentica em backend seguro.
2. Evento de navegacao/compra e registrado com minimizacao de dados.
3. Motor de IA calcula sugestoes personalizadas e/ou sinal de risco.
4. Regras de seguranca aplicam acao automatica (alerta, desafio adicional ou bloqueio temporario).

### 2.4 Abordagem a Lei Felca

Conforme orientacao da atividade, o projeto incorpora uma abordagem preventiva e responsavel, com foco em:
- Protecao de usuarios vulneraveis e mitigacao de riscos em interacoes digitais.
- Monitoramento de comportamentos suspeitos e mecanismos de denuncia.
- Rastreabilidade de eventos criticos para resposta rapida e governanca.
- Integracao com diretrizes de privacidade, transparencia e conformidade legal.

Observacao: a implementacao juridico-operacional completa depende da politica institucional e do ambiente produtivo. No escopo academico, o foco esta na arquitetura tecnica preventiva, evidencias de boas praticas e plano de evolucao.

---

## 3. Materiais e Metodos para Ciberseguranca e IA

### 3.1 Tecnologias ja utilizadas
- Frontend: HTML5, CSS3, JavaScript.
- UI: Bootstrap 5 e Bootstrap Icons.
- Persistencia local de MVP: localStorage/sessionStorage (escopo academico e prototipagem).
- Versionamento: Git e GitHub.

### 3.2 Tecnologias planejadas para Ciberseguranca
- Backend/API: Node.js + Express (alternativa: Spring Boot).
- Criptografia de senha: bcrypt (ou Argon2).
- Banco de dados: PostgreSQL.
- Autenticacao/autorizacao: JWT com expiracao curta + refresh token.
- Protecoes de API: Helmet, CORS restritivo, validacao de payload (Joi/Zod), rate limiting.
- Seguranca de aplicacao:
  - SAST: SonarQube/CodeQL.
  - DAST: OWASP ZAP.
  - Dependencias: npm audit/Snyk.
- Observabilidade: logs estruturados e alertas de eventos de risco.

### 3.3 Tecnologias planejadas para IA
- Fase inicial: motor heuristico em JavaScript/Node para recomendacao por regras.
- Fase evolutiva: Python + scikit-learn para recomendacao e classificacao de risco.
- Dados de entrada: historico de navegacao, cliques, carrinho, compras finalizadas (com minimizacao/anonimizacao quando aplicavel).
- Metricas de acompanhamento:
  - Recomendacao: CTR de recomendacao, taxa de conversao, precisao.
  - Risco: taxa de falsos positivos, recall de eventos suspeitos, tempo medio de resposta.

### 3.4 Metodo de desenvolvimento
- Abordagem incremental quinzenal (sprints curtas).
- Priorizacao de seguranca por design (security by design).
- Entregas demonstraveis por sprint (codigo + teste + evidencia).
- Revisao continua de conformidade (LGPD, OWASP e diretrizes da atividade).

---

## 4. Cronograma com Destaque para Ciberseguranca e IA

| Periodo (quinzenal) | Status | Entrega principal | Destaque Ciberseguranca | Destaque IA |
|---|---|---|---|---|
| 01-15/04 | Concluido | MVP base (paginas e fluxo principal) | Validacoes iniciais de entrada | Definicao de casos de uso de IA |
| 16-30/04 | Concluido | Refatoracao e documentacao tecnica | Reforco de senha forte e revisao de riscos | Arquitetura inicial de recomendacao |
| 01-15/05 | Em planejamento tecnico | Definicao da camada backend | Especificacao de hash de senha e endpoint de autenticacao | Especificacao do recomendador por regras |
| 16-31/05 | Planejado | Integracao frontend-backend | Controle de acesso e rate limiting | Coleta estruturada de eventos de uso |
| 01-15/06 | Planejado | Hardening de API | Cabecalhos de seguranca, logs e auditoria | Score de risco transacional (heuristico) |
| 16-30/06 | Planejado | Conformidade e governanca | Politica de minimizacao/retencao de dados | Ajuste de relevancia das recomendacoes |
| 01-15/07 | Planejado | Evolucao funcional integrada | Fluxo de resposta a incidente e denuncia | Modelo supervisionado inicial |
| 16-31/07 | Planejado | Fechamento para avaliacao final | Relatorio de evidencias de seguranca | Relatorio de impacto de IA |

### Explicacao dos destaques
- Ciberseguranca foi priorizada nas etapas iniciais para reduzir risco estrutural e evitar retrabalho.
- IA foi planejada em camadas (regras -> modelo) para gerar valor rapido e evoluir com dados reais.
- Conformidade foi tratada como processo continuo, e nao apenas entrega final.

---

## Conclusao

A evolucao da Happy Games Store nesta fase demonstra a transicao de um MVP funcional para uma solucao com trilha concreta de seguranca e inteligencia aplicada. O projeto incorpora orientacoes da mentoria, com foco em codificacao incremental, evidencias tecnicas e integracao entre experiencia do usuario, defesa cibernetica e personalizacao com IA.
