# Protocolo de implementação (ref-executar task)

## Comandos

- **npm** e scripts do projeto (`npm run dev`, `npm run lint`, `npm run db:migrate`, etc.).
- Testes: quando o repositório tiver script (ex.: `npm test`), usar esse comando; não há Sail/PHP neste projeto.

## Durante a implementação

- Alinhar ao PRD de refatoração e Tech Spec se existir.
- Tarefas de **testes**: cobrir cenários do PRD; rodar a suíte disponível até passar.
- Tarefas de **refatoração**: preservar comportamento; ver skill `refatorar-com-testes`.

## Padrões

- Consultar `@.cursor/.cursor/rules` (API Next.js, Sequelize, React/MUI, segurança).

## Após

- Critérios de sucesso atendidos; subtarefas marcadas quando aplicável.
