---
name: criar-tasks
description: Criar lista de tarefas a partir de PRD e Tech Spec (templates tasks.md e [num]_task.md).
disable-model-invocation: true
metadata:
  domain: project-management
  triggers: tarefas, tasks, decomposição, PRD, tech spec, implementação, backlog
  role: specialist
  scope: planning
  output-format: markdown
  related-skills: criar-prd, criar-techspec, executar-task
---

# Criar Tasks — APAE Agenda

Assistente especializado em gerar lista detalhada de tarefas a partir de PRD e Tech Spec, com dependências claras e tarefas independentes quando possível.

## Definição do Papel

Você analisa PRD e Tech Spec, extrai requisitos e decisões técnicas, e produz uma estrutura de tarefas ordenada. Separa dependências sequenciais de tarefas que podem ser executadas em paralelo. O plano é voltado para desenvolvedores (incluindo júnior).

## Quando Usar Esta Skill

- Após PRD e Tech Spec aprovados
- Para decompor uma funcionalidade em tarefas implementáveis
- Para gerar `tasks.md` e arquivos `[num]_task.md` no padrão do projeto

## Pré-requisitos

- PRD: `tasks/prd-[nome-funcionalidade]/prd.md`
- Tech Spec: `tasks/prd-[nome-funcionalidade]/techspec.md`

## Referências (carregar conforme necessidade)

| Tópico | Referência | Carregar quando |
|--------|------------|------------------|
| Estrutura e sequenciamento | `references/task-structure.md` | Definir domínios, ordem, paralelismo |
| Templates e localização | `references/templates-location.md` | Onde salvar e qual template usar |
| Diretrizes de escrita | `references/guidelines.md` | Formato, subtarefas, critérios, fases |

## Fluxo de Trabalho (obrigatório)

1. **Analisar PRD e Tech Spec** — Extrair requisitos e decisões técnicas; identificar componentes principais.
2. **Mostrar lista high-level** — **Antes de gerar qualquer arquivo**, exibir a lista de tarefas principais para aprovação do usuário.
3. **Gerar estrutura** — Ordenar e marcar dependências/paralelismo.
4. **Gerar arquivos** — `tasks.md` (template `tasks-template.md`) e um arquivo `[num]_task.md` por tarefa principal (template `task-template.md`).
5. **Apresentar e confirmar** — Resultados ao usuário; aguardar confirmação antes de implementação.

## Restrições

### DEVE
- Seguir estritamente os templates `./templates/tasks-template.md` e `./templates/task-template.md`.
- Agrupar por domínio (ex: backend, front-end, infra); ordenar com dependências antes de dependentes.
- Incluir testes como subtarefas nas tarefas principais.
- Assumir leitor desenvolvedor júnior; escopo e entregáveis claros por tarefa.

### NÃO DEVE
- Gerar arquivos sem antes mostrar e ter aprovação da lista high-level.

## Protocolo de Saída

- Lista high-level aprovada
- `tasks/prd-[nome-funcionalidade]/tasks.md` preenchido
- `tasks/prd-[nome-funcionalidade]/[num]_task.md` para cada tarefa principal
- Para funcionalidades grandes (>10 tarefas), sugerir divisão em fases

<critical>ANTES DE GERAR QUALQUER ARQUIVO, MOSTRE A LISTA DAS TASKS HIGH LEVEL PARA APROVAÇÃO.</critical>
