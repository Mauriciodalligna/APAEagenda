# Skills do projeto APAE Agenda

Este diretório contém **skills** (habilidades) reutilizáveis para o Cursor e agentes. Cada skill segue uma estrutura com `SKILL.md` e, quando necessário, pasta `references/`.

## Estrutura de uma skill

```
nome-da-skill/
├── SKILL.md              # Ponto de entrada: papel, quando usar, fluxo, referências
└── references/           # Detalhes carregáveis sob demanda
    ├── tema-1.md
    └── tema-2.md
```

- **SKILL.md** — Frontmatter (name, description), papel, quando usar, tabela de referências, fluxo, restrições.
- **references/** — Checklists, templates, protocolos por tópico.

## Stack de referência

- **Front:** Next.js 14, React 18, Material UI v5.
- **Back:** API Routes (`src/app/api`), controllers, Sequelize, PostgreSQL, JWT, bcrypt.

## Documentação do projeto (`.cursor/docs`)

| Arquivo | Uso |
|---------|-----|
| [`../docs/melhorias-e-boas-praticas.md`](../docs/melhorias-e-boas-praticas.md) | Histórico de melhorias de segurança/config, backlog recomendado, variáveis de ambiente e pontos de entrada no código |

## Skills disponíveis

| Skill | Descrição | Uso principal |
|-------|-----------|----------------|
| **code-review** | Revisão de código contra padrões do repositório | PRs; API Next.js, controllers, React/MUI |
| **criar-prd** | PRD com fluxo esclarecer → planejar → redigir → salvar | Nova funcionalidade |
| **criar-techspec** | Tech Spec a partir do PRD e do código | Após PRD; antes de tasks |
| **criar-tasks** | Lista de tarefas a partir de PRD e Tech Spec | Planejamento de implementação |
| **ref-criar-tasks** | Tasks para PRD de refatoração (tests-first) | Decompor refatoração |
| **ref-criar-prd** | PRD de refatoração orientado a testes | Refatoração planejada |
| **executar-task** | Executar próxima tarefa de PRD de produto | Implementação guiada; atalho `/executar-task` (ver `.cursor/commands/`) |
| **ref-executar-task** | Executar próxima tarefa de PRD de refatoração | Atalho `/ref-executar-task` em `.cursor/commands/` |
| **redmine-task-generator** | Decompor requisitos em tarefas para Redmine | Backlog externo |
| **refatorar-com-testes** | Testes primeiro, depois refatorar com segurança | Legado sem testes (quando houver suíte) |
| **modelagem-sequelize** | Migrations, modelos e PostgreSQL no APAE Agenda | Novas tabelas ou alteração de schema |

## Como usar

1. **Atalhos `/`:** comandos do projeto em `.cursor/commands/*.md` (ex.: `/criar-prd`) injetam o prompt; a skill em `.cursor/skills/<nome>/SKILL.md` é a fonte do fluxo completo.
2. Anexar contexto: `@.cursor/skills/<nome>/SKILL.md` ou `@.cursor/skills/<nome>/references/...`.
3. Seguir o fluxo descrito em cada `SKILL.md`.

## Metadados (opcional)

Em `SKILL.md`: `metadata.triggers`, `metadata.related-skills`, `metadata.scope` — ajudam a escolher a skill certa.
