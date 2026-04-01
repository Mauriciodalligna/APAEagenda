# Protocolo de implementação (executar task)

## Comandos do projeto

- Usar **npm** e scripts definidos em `package.json`.
- Exemplos típicos: `npm run dev`, `npm run build`, `npm run lint`, `npm run db:migrate`, `npm run db:seed`.
- Não assumir Docker/Sail; este repositório é Next.js + Node local ou CI.

```bash
npm install
npm run dev
npm run lint
npm run db:migrate
```

## Durante a implementação

- Seguir o plano em ordem.
- Alinhar código a PRD, Tech Spec e regras em `@.cursor/.cursor/rules` (API Next.js, Sequelize, React/MUI).
- Atender critérios de sucesso da tarefa.
- Incluir testes apenas se a tarefa/Tech Spec pedir e o projeto já tiver suíte configurada.

## Padrões

- **API:** `src/app/api/**/route.js`, controllers em `src/controllers/`, auth em `src/middlewares/`.
- **Dados:** modelos Sequelize em `src/server/db`; migrations via sequelize-cli.
- **Front:** `src/app/`, MUI conforme o restante do app.

## Após a implementação

- Confirmar critérios de sucesso; atualizar checklist da tarefa se existir.
