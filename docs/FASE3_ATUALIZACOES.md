# Fase 3 — Atualizações do Projeto Happy Games

## Parte 1 — Melhorias de UX e Estética

### O que mudou em relação às fases anteriores?

| Área | Fase 2 | Fase 3 |
|---|---|---|
| Cards de jogos | HTML estático (hardcoded) | Renderização dinâmica via JS |
| Preço em cards | Ausente | `.preco-tag` estilizado com valor em BRL |
| Cálculo de compra | Campo simples (`data-preco`) | Resumo com subtotal, desconto e total em tempo real |
| CSS duplicado | Navbar/footer repetidos em 5 arquivos | Centralizado em `style.css`, removidos os duplicados |
| Filtros do catálogo | Aplicados sobre HTML estático | Aplicados sobre DOM gerado por JS |
| Feedback de preço | Estático no modal | Calculado dinamicamente com `calcularPedido()` |

### Decisões de usabilidade
- O `#boxPreco` é atualizado em tempo real quando o usuário muda o jogo ou a quantidade (eventos `change` e `input`).
- Um desconto progressivo de 2° grau é aplicado a partir de 2 unidades, tornando a compra de quantidade maior vantajosa — o usuário vê o desconto em verde.
- O `#noResults` no catálogo fica oculto por padrão (`display:none`) e só aparece quando nenhum filtro produz resultado.

---

## Parte 2 — Conceitos de Programação JavaScript (com comparação Java)

### 2.1 Arrays

**JavaScript:**
```javascript
const JOGOS = [
  { id: 1, nome: "The Last Of Us", preco: 199.90, plataformas: ["PS5"] },
  { id: 2, nome: "GTA 6", preco: 349.90, plataformas: ["PS5", "Xbox"] },
  // ...
];
```

**Java equivalente:**
```java
// Java usa listas tipadas (sem array de objetos literais como JS)
List<Jogo> jogos = new ArrayList<>();
jogos.add(new Jogo(1, "The Last Of Us", 199.90, List.of("PS5")));
jogos.add(new Jogo(2, "GTA 6", 349.90, List.of("PS5", "Xbox")));
```

> Em JS, arrays são dinâmicos e tipagem é fraca — qualquer tipo pode ser misturado.  
> Em Java, o tipo é declarado (`List<Jogo>`) e obrigatoriamente consistente.

---

### 2.2 Laço `for` (tradicional)

**JavaScript — em `catalogo.js`:**
```javascript
for (let i = 0; i < JOGOS.length; i++) {
  html += buildCardHTML(JOGOS[i]);
}
```

**JavaScript — em `dados.js`:**
```javascript
function getPrecoByNome(nome) {
  for (let i = 0; i < JOGOS.length; i++) {
    if (JOGOS[i].nome === nome) return JOGOS[i].preco;
  }
  return 0;
}
```

**Java equivalente:**
```java
for (int i = 0; i < jogos.size(); i++) {
  html += buildCardHTML(jogos.get(i));
}
```

> A sintaxe de `for` é idêntica. A diferença está em `JOGOS.length` (JS) vs `jogos.size()` (Java).

---

### 2.3 `forEach` (iteração funcional)

**JavaScript — em `catalogo.js`:**
```javascript
document.querySelectorAll(".game-item").forEach(function(card) {
  card.style.display = visible ? "" : "none";
});
```

**Java equivalente (Stream API):**
```java
cards.forEach(card -> card.setVisible(visible));
```

> JS usa closures anônimas (`function`), Java usa lambdas (`->`). Ambos iteram sem índice explícito.

---

### 2.4 Estrutura `while`

Em `compra.js`, o laço `while` é implicitamente útil para validar campos repetidamente até todos estarem corretos — um padrão utilizado em formulários multi-etapas:

```javascript
// Padrão de re-validação (não avança sem validação)
while (!validarEtapa1()) {
  // usuário precisa corrigir antes de seguir — 
  // na prática implementado por event listeners
}
```

**Java equivalente:**
```java
while (!validarEtapa1()) {
  // aguarda interação do usuário (em aplicação gráfica)
}
```

---

### 2.5 Estrutura `switch`

Usada para mapear plataformas a classes Bootstrap em `catalogo.js`:

```javascript
function getClassePlataforma(plat) {
  switch (plat.toLowerCase()) {
    case "ps5":   return "bg-secondary";
    case "xbox":  return "bg-success";
    case "pc":    return "bg-primary";
    default:      return "bg-dark";
  }
}
```

**Java equivalente:**
```java
String getClassePlataforma(String plat) {
  return switch (plat.toLowerCase()) {
    case "ps5"  -> "bg-secondary";
    case "xbox" -> "bg-success";
    case "pc"   -> "bg-primary";
    default     -> "bg-dark";
  };
}
```

> Java (a partir do 14) suporta `switch expressions` com `->`. JS usa `switch` tradicional com `break` ou retorno direto.

---

## Parte 3 — Funções Matemáticas (1° e 2° grau)

### 3.1 Função de 1° grau — `calcularSubtotal`

```javascript
function calcularSubtotal(preco, quantidade) {
  return preco * quantidade; // f(q) = preco × q
}
```

Esta é uma função linear: para cada unidade adicionada, o subtotal cresce proporcionalmente pelo coeficiente `preco`.  
Exemplo: `calcularSubtotal(199.90, 3)` → **R$ 599,70**

### 3.2 Função de 2° grau — `calcularTaxaDesconto`

```javascript
function calcularTaxaDesconto(quantidade) {
  const taxa = 0.005 * Math.pow(quantidade - 1, 2); // f(q) = 0,005 × (q-1)²
  return Math.min(taxa, 0.20); // teto de 20%
}
```

Esta é uma função quadrática com vértice em `q = 1` (sem desconto na quantidade mínima).  
O desconto cresce de forma acelerada:

| Quantidade | Desconto aplicado |
|-----------|------------------|
| 1         | 0%               |
| 2         | 0,5%             |
| 3         | 2%               |
| 5         | 8%               |
| 7         | 18%              |
| 8+        | ≥ 20% (limitado) |

O uso de `Math.pow()` demonstra cálculo de potenciação nativa do JavaScript, equivalente a `Math.pow(x, 2)` em Java.

### 3.3 Composição — `calcularPedido`

```javascript
function calcularPedido(preco, quantidade) {
  const subtotal = calcularSubtotal(preco, quantidade); // 1° grau
  const taxa     = calcularTaxaDesconto(quantidade);    // 2° grau
  const desconto = subtotal * taxa;
  const total    = subtotal - desconto;
  return { subtotal, taxa, desconto, total };
}
```

A função integra as duas fórmulas e retorna um objeto com todos os valores necessários para exibição no `#boxPreco` e no modal de confirmação.
