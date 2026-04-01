# Ordem das Tarefas em PRD de Refatoração (Tests-First)

## Princípio

Em refatoração orientada a testes, a ordem é: **primeiro garantir cenários de teste; depois refatorar o código**. As tarefas geradas devem refletir essa sequência.

## Sequência sugerida

1. **Fase Testes (obrigatório primeiro)**
   - Tarefas que implementam ou complementam testes cobrindo os **Cenários de Teste** do PRD.
   - Ex.: "Garantir testes para cenário 1 (sucesso)", "Garantir testes para cenário 2 (falha com logId)", "Teste de integração com fila (cenário 4)".
   - Cada cenário numerado no PRD pode virar subtarefa ou tarefa principal, conforme tamanho.

2. **Fase Refatoração (após testes verdes)**
   - Tarefas que alteram o código (use case, job, serviços) mantendo o comportamento validado pelos testes.
   - Ex.: "Extrair validação da rota para helper", "Reduzir acoplamento no controller X", "Alinhar módulo Y ao padrão de API do projeto".
   - Dependência explícita: "Tarefa X depende de todas as tarefas da Fase Testes".

## Agrupamento por domínio

- **Testes** — Unit/Feature para job, use case, cenários de sucesso e falha.
- **Refatoração** — Use case, job, serviços; separar por componente quando fizer sentido (ex.: 2.0 Use case, 3.0 Job).

## Tech Spec opcional

Em PRDs de refatoração, a Tech Spec pode não existir. Nesse caso:
- Usar apenas o PRD para extrair requisitos.
- Cenários de Teste do PRD = base para as tarefas da Fase Testes.
- Requisitos de Refatoração / Requisitos funcionais e técnicos do PRD = base para as tarefas da Fase Refatoração.

## Paralelismo

- Dentro da Fase Testes, tarefas que cobrem cenários independentes podem ser marcadas como "podem ser feitas em paralelo".
- Dentro da Fase Refatoração, só paralelizar se os arquivos forem distintos e sem dependência entre si.
