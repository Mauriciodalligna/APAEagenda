# Checklist back-end (Node / Next.js / Sequelize)

Aplicar **apenas ao código modificado**.

## Estilo e estrutura

- [ ] Funções e variáveis em `camelCase`; módulos organizados como no restante do projeto
- [ ] Funções curtas; early return em validações de auth e entrada
- [ ] `async`/`await` com tratamento de erro (`try/catch` nas rotas quando aplicável)

## Rotas API (`src/app/api/**/route.js`)

- [ ] Métodos HTTP exportados de forma clara (`GET`, `POST`, etc.)
- [ ] Respostas JSON com status HTTP adequados; erros sem vazar detalhes internos em produção
- [ ] Autenticação/autorização aplicada antes da lógica sensível

## Controllers

- [ ] Entrada validada antes de persistir ou chamar serviços externos
- [ ] Sem lógica duplicada desnecessária entre rota e controller (equilíbrio com o padrão existente)

## Sequelize e SQL

- [ ] Queries parametrizadas; sem concatenação de input do usuário em SQL
- [ ] Transações quando múltiplas escritas devem ser atômicas

## Auth e dados sensíveis

- [ ] JWT/roles verificados no servidor conforme perfis do projeto
- [ ] Senhas nunca em texto puro; segredos só via env

## Princípio do Escoteiro

- [ ] Código legado tocado ficou um pouco melhor (validação, nomes, extração) sem mudar comportamento indevidamente

## Segurança

- [ ] Sem exposição de stack ou mensagens de DB ao cliente em produção
- [ ] Logs sem senhas/tokens completos
