# Padrões ao refatorar (APAE Agenda)

Checklist para a etapa **Refatorar**. Adaptar ao que existir no arquivo.

## Estilo JavaScript

- [ ] `camelCase` para funções e variáveis; funções curtas; early return
- [ ] Evitar `else` desnecessário; reduzir aninhamento

## Rotas e controllers (`src/app/api/**`, `src/controllers/**`)

- [ ] Autenticação/autorização aplicadas antes de regras de negócio
- [ ] Validação de entrada antes de persistir
- [ ] Respostas JSON e status HTTP consistentes com o restante do app
- [ ] Lógica pesada preferencialmente em funções ou controllers testáveis, não espalhada sem critério

## Sequelize

- [ ] Queries parametrizadas; sem concatenação insegura de SQL
- [ ] Transações quando múltiplas escritas devem ser atômicas

## React / MUI

- [ ] Componentes focados; estado e efeitos claros
- [ ] Sem `dangerouslySetInnerHTML` com conteúdo não confiável

## Princípio do Escoteiro

- [ ] Melhorias incrementais; não misturar refatoração grande com feature nova no mesmo passo
- [ ] Comportamento observável preservado (confirmado por testes ou checklist explícito)

## Segurança

- [ ] Consultar `@.cursor/.cursor/rules/security-backend.mdc`
- [ ] Não introduzir segredos no código; não vazar erros internos em produção

## Após

- [ ] Rodar `npm run lint` quando tocar JS/JSX
- [ ] Se houver `npm test`, rodar a suíte relevante
