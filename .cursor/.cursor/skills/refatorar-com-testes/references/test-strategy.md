# Estratégia de testes (refatoração)

Objetivo: capturar o **comportamento atual** para a refatoração não alterá-lo sem intenção.

## O que testar

- **API:** método HTTP, path, body/query, status e JSON de resposta; autenticação quando a rota for protegida.
- **Controllers e funções:** entradas, retornos e erros lançados.
- **Sequelize:** interações com o banco podem usar banco de teste ou mocks (conforme o que o projeto adotar quando houver suíte).

## Stack sugerida (quando for introduzir testes)

- **Vitest** ou **Jest** para unit/integration
- **node-mocks-http** ou testes de rota via `fetch`/`supertest` em rotas Next, conforme setup do time
- **React Testing Library** para componentes

## Mocks

- HTTP externo: `nock`, `msw` ou mock de `fetch` global.
- Evitar testes frágeis acoplados a implementação interna; preferir contrato público.

## Sem suíte ainda

- Documentar cenários manuais ou checklist de regressão até haver `npm test`.
- Ao adicionar testes, espelhar pastas de código (`src/controllers/__tests__` ou convenção do time).

## Cobertura mínima

- Cobrir **caminhos que serão alterados** na refatoração. Não é obrigatório 100% do arquivo; é obrigatório cobrir o que deve permanecer igual.
