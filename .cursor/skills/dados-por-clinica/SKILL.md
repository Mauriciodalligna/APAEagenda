---
name: modelagem-sequelize
description: Orientar modelagem de dados com Sequelize e migrations no APAE Agenda (PostgreSQL).
disable-model-invocation: true
metadata:
  domain: data
  triggers: migration, sequelize, modelo, tabela, schema, PostgreSQL
  related-skills: criar-techspec, executar-task
---

# Modelagem Sequelize — APAE Agenda

Esta skill substitui o conteúdo legado voltado a outro domínio (“dados por clínica”). No **APAE Agenda**, persistência é **PostgreSQL** via **Sequelize** e **sequelize-cli**.

## Objetivos

1. Definir entidades, relacionamentos e índices alinhados ao domínio (agenda, usuários, alunos, profissionais, etc.).
2. Criar ou alterar schema com **migrations** versionadas (`npm run db:migrate`).
3. Manter modelos em `src/server/db` conforme a organização do repositório.

## Boas práticas

- Uma migration por mudança coerente; revisar rollback (`db:undo`) quando possível.
- FKs e índices para consultas frequentes; nomes de colunas explícitos.
- Não expor detalhes de erro SQL ao cliente nas APIs.

## Referências

- `@README.md` — conexão e variáveis de ambiente
- `@.cursor/.cursor/rules/next-api-standards.mdc`
- `@.cursor/.cursor/rules/security-backend.mdc`

## Checklist de saída

- [ ] Tabelas/colunas e relacionamentos descritos
- [ ] Passos de migration e impacto em dados existentes
- [ ] Pontos no código (models/controllers) que passam a usar o novo schema
