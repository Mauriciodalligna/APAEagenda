---
name: refatorar-com-testes
description: Refatoração segura — testes que preservam comportamento; depois refatorar alinhado ao APAE Agenda (Next.js, Sequelize, React).
disable-model-invocation: true
metadata:
  domain: quality
  triggers: refatorar, refatoração, testes primeiro, preservar comportamento, legacy, Princípio do Escoteiro
  role: specialist
  scope: implementation
  output-format: code
  related-skills: code-review, executar-task
---

# Refatorar com testes — APAE Agenda

Refatoração **segura**: primeiro garantir testes (ou caracterização mínima) do comportamento atual; só então refatorar mantendo o comportamento e alinhando ao padrão do repositório.

## Definição do papel

Fluxo recomendado: (1) analisar comportamento observável, (2) escrever/estender testes que passem com o código atual, (3) rodar a suíte até verde, (4) refatorar em passos pequenos, (5) rodar de novo. **Não** mudar comportamento sem acordo explícito.

**Nota:** O `package.json` atual pode não definir `npm test`. Quando não houver suíte, combinar com o time a introdução de Vitest/Jest ou testes manuais documentados; a skill ainda vale para o **desenho** do que deveria ser testado.

## Quando usar

- Legado difícil de mudar com segurança
- Extrair lógica de rotas/controllers para módulos testáveis
- Aplicar Princípio do Escoteiro com rede de proteção

## Referências

| Tópico | Referência |
|--------|------------|
| Fluxo | `references/workflow.md` |
| Estratégia de testes | `references/test-strategy.md` |
| Padrões ao refatorar | `references/refactor-standards.md` |

**Consultar:**

- `@README.md`
- `@.cursor/.cursor/rules/next-api-standards.mdc`
- `@.cursor/.cursor/rules/react-next-standards.mdc`
- `@.cursor/.cursor/rules/security-backend.mdc`

## Fluxo (obrigatório quando houver testes automatizados)

1. **Analisar** — Entradas, saídas, efeitos (DB, APIs externas).
2. **Escrever testes** — Comportamento atual capturado; testes passando antes da refatoração.
3. **Rodar** — `npm test` ou script definido no projeto.
4. **Refatorar** — Controllers finos, validação clara, Sequelize sem SQL inseguro, React/MUI organizado.
5. **Rodar de novo** — Tudo verde.

## Restrições

### DEVE

- Refatorar só com rede de segurança (testes ou checklist explícito acordado).
- Não degradar segurança (`security-backend.mdc`).

### NÃO DEVE

- Mudar contrato público (respostas API, regras de negócio) sem pedido explícito.
- Importar padrões Laravel/Vue como obrigatórios.

<critical>Com testes automatizados disponíveis, não refatorar antes de estarem passando. Comandos via npm conforme README.</critical>
