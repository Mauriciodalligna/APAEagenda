# Estrutura e sequenciamento de tarefas

## Agrupamento por domínio

Agrupar tarefas por área, por exemplo:

- **Back-end / API** — Rotas `src/app/api/**`, controllers, middlewares, modelos Sequelize, migrations
- **Front-end** — Páginas e layouts `src/app/**`, componentes React/MUI
- **Integração** — APIs externas, env, variáveis em `.env`
- **Dados** — Migrations, seeders, ajustes de schema
- **Testes** — Subtarefas ou tarefa dedicada quando o projeto tiver suíte configurada

## Ordenação

- Tarefas **dependentes** depois das que liberam a dependência (ex.: migration/modelo antes de endpoint que persiste; endpoint antes da tela que consome).
- Indicar tarefas **paralelizáveis** quando fizer sentido.

## Numeração

- **X.0** — Tarefa principal
- **X.1, X.2, …** — Subtarefas

## Independência

Cada tarefa principal deve ser **completável** com escopo e critérios de sucesso claros, assumindo dependências anteriores concluídas.

## Funcionalidades grandes

Com muitas tarefas, sugerir **fases** (ex.: dados e API → UI → hardening/testes).
