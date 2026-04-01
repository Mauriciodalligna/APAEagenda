# Fluxo Git e escopo da análise

## Regra crítica

**Analise apenas arquivos modificados na branch atual.** Em arquivos já existentes, focar no diff.

## Passos obrigatórios

### 1. Identificar branch atual

```bash
git branch --show-current
```

### 2. Listar arquivos modificados

```bash
git diff --name-status main...HEAD
```

(Ajuste a branch base se o time usar `develop` ou outra.)

### 3. Para cada arquivo, obter só as mudanças

```bash
git diff main...HEAD -- caminho/arquivo.js
```

### 4. O que analisar

- Linhas com **`+`** (adicionadas)
- Blocos modificados (linhas com `-` e `+`)
- Arquivos **novos** (status `A`) — analisar o arquivo inteiro

### 5. O que ignorar

- Código fora do diff em arquivos grandes só modificados em parte

### 6. Status dos arquivos

| Status | Significado | Ação |
|--------|-------------|------|
| `A` | Adicionado (novo) | Analisar arquivo completo |
| `M` | Modificado | Analisar mudanças no diff |
| `D` | Deletado | Verificar impacto |

## Arquivos típicos neste repositório

- **API:** `src/app/api/**/route.js`, `src/controllers/**`
- **Front:** `src/app/**`, `src/components/**`
- **Dados:** `src/server/db/**` (models, migrations)
- **Auth:** `src/middlewares/**`, `src/utils/token.js`

## Relacionados a checar (se impactados)

- Rotas que chamam controllers alterados
- Modelos Sequelize e migrations ligadas à mudança
- Testes do código modificado (quando existirem)

## Comandos de referência

```bash
git branch --show-current
git diff --name-status main...HEAD
git diff main...HEAD -- src/app/api/exemplo/route.js
```
