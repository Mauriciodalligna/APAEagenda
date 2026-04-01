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
| `criar-prd-command.mdc` | Comando `/criar-prd` — PRD de produto | `tasks/**`, `templates/**` (PRD) |
| `criar-techspec-command.mdc` | Comando `/criar-techspec` — Tech Spec | `tasks/**`, `templates/techspec-template.md` |
| `criar-tasks-command.mdc` | Comando `/criar-tasks` — tasks.md e `[num]_task.md` | `tasks/**`, templates de task |
| `code-review-command.mdc` | Comando `/code-review` — revisão na branch | `src/**`, `tasks/**` |
| `executar-task-command.mdc` | Comando `/executar-task` — PRD de produto | `tasks/**/*.md` |
| `ref-executar-task-command.mdc` | Comando `/ref-executar-task` — PRD de refatoração | `tasks/prd-refatoracao-*/**` |

## Comandos slash (`/` no chat)

**Regras `.mdc` não registram `/nome` no Cursor.** Os arquivos `*-command.mdc` só orientam o agente quando os `globs` batem; quem aparece ao digitar `/` são os comandos do projeto em **`.cursor/commands/*.md`** (um arquivo por comando, nome = atalho).

| Atalho | Arquivo | Skill de referência |
|--------|---------|---------------------|
| `/criar-prd` | `.cursor/commands/criar-prd.md` | `.cursor/skills/criar-prd/SKILL.md` |
| `/criar-techspec` | `.cursor/commands/criar-techspec.md` | `.cursor/skills/criar-techspec/SKILL.md` |
| `/criar-tasks` | `.cursor/commands/criar-tasks.md` | `.cursor/skills/criar-tasks/SKILL.md` |
| `/code-review` | `.cursor/commands/code-review.md` | `.cursor/skills/code-review/SKILL.md` |
| `/executar-task` | `.cursor/commands/executar-task.md` | `.cursor/skills/executar-task/SKILL.md` |
| `/ref-executar-task` | `.cursor/commands/ref-executar-task.md` | `.cursor/skills/ref-executar-task/SKILL.md` |

**Como acionar:** no chat do **Agent**, digite `/` e escolha o comando (ex.: `criar-prd`) ou o nome do ficheiro sem `.md`. Se não aparecer, use o comando integrado **`/commands`** para criar/editar comandos do projeto, **reabra a janela** ou reinicie o Cursor após clonar. Alternativa: anexar `@.cursor/skills/criar-prd/SKILL.md` (ou a skill correspondente) na mensagem.

As **skills** em `.cursor/skills/<nome>/` também podem aparecer como `/nome` quando o Cursor indexa skills (o `name` no frontmatter deve coincidir com a pasta).

Fluxo típico: **criar-prd** → **criar-techspec** → **criar-tasks** → **executar-task**. Refatoração: `tasks/prd-refatoracao-*/` com **ref-executar-task**.

## Documentação complementar

| Documento | Conteúdo |
|-----------|----------|
| [`../docs/melhorias-e-boas-praticas.md`](../docs/melhorias-e-boas-praticas.md) | Melhorias incorporadas, backlog sugerido, env e arquivos-chave (segurança e práticas) |

## Manutenção

- Novas regras: preferir `.mdc` com `description` e `globs`.
- Detalhes longos podem ir para `.cursor/docs/`, `docs/` na raiz do repositório ou para skills em `.cursor/skills/`.

## Referências externas (segurança)

A regra `security-backend.mdc` reutiliza princípios de:

- **[matank001/cursor-security-rules](https://github.com/matank001/cursor-security-rules)** — boas práticas por tema (injeção, paths, fluxos perigosos).
- **[wiz-sec-public/secure-rules-files](https://github.com/wiz-sec-public/secure-rules-files)** — baseline para código gerado por IA.

Para fluxos sensíveis (dados do usuário até query/arquivo/execução), revisar também `dangerous-flows` no repositório matank001 quando aplicável.
