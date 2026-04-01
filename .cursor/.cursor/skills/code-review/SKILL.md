---
name: code-review
description: Code review contra padrões do APAE Agenda (Next.js, Sequelize, React/MUI). Foco no código modificado na branch.
disable-model-invocation: true
metadata:
  domain: quality
  triggers: code review, revisar código, PR, pull request, Next.js, Sequelize, React, MUI, API
  role: specialist
  scope: review
  output-format: markdown
  related-skills: criar-techspec, executar-task
---

# Code Review — APAE Agenda

Especialista em code review: garantir que as mudanças sigam os padrões deste repositório (API Next.js, controllers, Sequelize, front React/MUI).

## Definição do papel

Avaliar código **apenas modificado na branch atual**, com feedback construtivo e exemplos. Aplicar o Princípio do Escoteiro em trechos legados tocados.

## Quando usar

- Revisar PR ou branch antes do merge
- Validar rotas API, auth, controllers e UI
- Checar segurança básica nas alterações

## Referências (carregar conforme contexto)

| Tópico | Referência | Carregar quando |
|--------|------------|------------------|
| Fluxo Git e escopo | `references/git-workflow.md` | Branch, diff |
| Checklist back-end | `references/backend-checklist.md` | API, controllers, Sequelize, middleware |
| Checklist front-end | `references/frontend-checklist.md` | Páginas e componentes React/MUI |
| Severidade e relatório | `references/severity-and-report.md` | Relatório final |

**Arquivos do projeto:**

- `@README.md` — setup e scripts
- `@.cursor/.cursor/rules/next-api-standards.mdc`
- `@.cursor/.cursor/rules/react-next-standards.mdc`
- `@.cursor/.cursor/rules/security-backend.mdc`

## Fluxo (resumo)

1. **Escopo** — Branch atual, `git diff` dos arquivos alterados.
2. **Análise** — Checklists só no que foi modificado.
3. **Relatório** — Severidade e recomendações (`references/severity-and-report.md`).

## Restrições

### DEVE

- Analisar **apenas** arquivos e linhas relevantes no diff.
- Sugerir correções concretas quando possível.
- Usar `git branch` / `git diff` se o escopo não estiver claro.

### NÃO DEVE

- Exigir refatoração de arquivos inteiros não tocados.
- Ser dogmático onde o projeto já usa um padrão legado consistente (melhorar incrementalmente).

## Template de saída

Seguir `references/severity-and-report.md`.

<critical>
- Usar git diff para o escopo.
- Citar arquivo e trecho problemático; sugerir correção quando couber.
</critical>
