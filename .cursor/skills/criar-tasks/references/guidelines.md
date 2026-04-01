# Diretrizes de Criação de Tarefas

## Público-alvo

Assumir que o leitor principal é um **desenvolvedor júnior**: linguagem clara, escopo bem delimitado, critérios de sucesso verificáveis.

## Conteúdo por tarefa principal

- **Título** — Específico e acionável (ex.: "Criar endpoint e controller de cadastro de agendamento").
- **Visão geral** — Breve descrição do que será feito.
- **Requisitos** — Lista obrigatória (extraída do PRD/techspec).
- **Subtarefas** — Passos concretos (incluir testes quando aplicável).
- **Detalhes de implementação** — Referência à techspec; não colar toda a implementação.
- **Critérios de sucesso** — Resultados mensuráveis e requisitos de qualidade.
- **Arquivos relevantes** — Caminhos de arquivos que serão criados ou alterados.

## Formato do task_context (task-template)

- **domain** — Ex: engine, infra, subdomínio.
- **type** — implementation | integration | testing | documentation.
- **scope** — core_feature | middleware | configuration | performance.
- **complexity** — low | medium | high.
- **dependencies** — external_apis | database | temporal | http_server (quando fizer sentido).

## Tamanho (S/M/L)

Indicar na lista `tasks.md` se cada tarefa é Small, Medium ou Large para apoio à estimativa.

## Dependências e paralelismo

- Indicar claramente "Tarefa X depende de Y".
- Marcar "Tarefas A e B podem ser feitas em paralelo após C".

## Lembrete nas tarefas individuais

Incluir no `task-template` o aviso: **Ler prd.md e techspec.md desta pasta; sem isso a tarefa será invalidada.**
