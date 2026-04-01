# Fluxo da refatoração com testes

Ordem recomendada quando existir suíte de testes (ex.: Vitest/Jest configurado no projeto).

## 1. Analisar o arquivo

- Ler o arquivo e dependências (imports, chamadas a controllers, models Sequelize, hooks).
- Comportamento observável: parâmetros de API, body, respostas JSON, status HTTP, escritas no banco.
- Anotar o que está abaixo do padrão desejado (lógica espessa na rota, falta de validação, etc.) para corrigir na etapa 4.

## 2. Escrever testes

- **API:** testes de integração ou HTTP que chamam a rota (ou testam o handler com `Request` mock) e assertam status e corpo.
- **Funções puras / utilitários:** testes unitários diretos.
- **React:** componentes com Testing Library quando o projeto tiver essa stack.
- Objetivo: testes que **passam com o código atual** e documentam o comportamento.

## 3. Rodar testes até passarem

- `npm test` ou script definido no `package.json`.
- Ajustar só os testes para refletir o comportamento real **antes** de refatorar produção.

## 4. Refatorar

- Seguir `refactor-standards.md` e as regras em `.cursor/.cursor/rules`.
- Passos pequenos; rodar testes após cada passo relevante.
- **Não** alterar comportamento observável sem combinado.

## 5. Rodar testes novamente

- Mesma suíte deve permanecer verde. Se falhar, corrigir a refatoração, não enfraquecer os testes sem motivo.

## Critérios de conclusão

- Testes passando antes e depois.
- Código mais alinhado ao padrão do APAE Agenda sem mudança de comportamento indesejada.
