# Regras do projeto (Cursor Rules)

Regras usadas como contexto ao editar código. Formato [recomendado pelo Cursor](https://docs.cursor.com/context/rules-for-ai).

## Formato

- **Arquivos `.mdc`** — Markdown com frontmatter YAML: `description` (uma linha) e `globs` (padrões de arquivo para aplicar a regra só quando relevante).
- **Conteúdo:** instruções curtas e acionáveis. Evitar blocos longos de prosa.

## Regras atuais (APAE Agenda)

| Arquivo | Descrição | Globs |
|---------|-----------|--------|
| `next-api-standards.mdc` | Rotas API Next.js, controllers, Sequelize, JWT | `src/app/api/**`, `src/controllers/**`, `src/middlewares/**`, `src/server/**` |
| `react-next-standards.mdc` | React 18, App Router, Material UI | `src/app/**`, `src/components/**` |
| `code-standards.mdc` | npm, lint, migrations Sequelize | `package.json` |
| `security-backend.mdc` | Entrada, SQL, segredos, auth, logs (Node/Next) | API, controllers, server, utils, `.env.example` |
| `executar-task-command.mdc` | Comando `/executar-task` — PRD de produto | `tasks/**/*.md` |
| `ref-executar-task-command.mdc` | Comando `/ref-executar-task` — PRD de refatoração | `tasks/prd-refatoracao-*/**` |

## Manutenção

- Novas regras: preferir `.mdc` com `description` e `globs`.
- Detalhes longos podem ir para `docs/` na raiz do repositório ou para skills em `.cursor/.cursor/skills/`.

## Referências externas (segurança)

A regra `security-backend.mdc` reutiliza princípios de:

- **[matank001/cursor-security-rules](https://github.com/matank001/cursor-security-rules)** — boas práticas por tema (injeção, paths, fluxos perigosos).
- **[wiz-sec-public/secure-rules-files](https://github.com/wiz-sec-public/secure-rules-files)** — baseline para código gerado por IA.

Para fluxos sensíveis (dados do usuário até query/arquivo/execução), revisar também `dangerous-flows` no repositório matank001 quando aplicável.
