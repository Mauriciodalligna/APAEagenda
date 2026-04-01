---
name: ref-criar-tasks
description: Criar lista de tarefas a partir de PRD de refatoração (tests-first; templates tasks.md e [num]_task.md).
disable-model-invocation: true
metadata:
  domain: project-management
  triggers: tarefas refatoração, tasks refatoração, decomposição refatoração, PRD refatoração, tests first
  role: specialist
  scope: planning
  output-format: markdown
  related-skills: ref-criar-prd, criar-tasks, executar-task, refatorar-com-testes
---

# Criar tasks para PRD de refatoração — APAE Agenda

Assistente especializado em gerar lista detalhada de tarefas a partir de um **PRD de refatoração** (orientado a testes), com ordem **tests-first**: primeiro tarefas de cenários de teste/cobertura, depois tarefas de refatoração.

## Definição do Papel

Você analisa o PRD de refatoração (e Tech Spec se existir), extrai **cenários de teste** e **requisitos de refatoração**, e produz uma estrutura de tarefas ordenada. A ordem obrigatória reflete o fluxo tests-first: **testes antes, refatoração depois**. Separa dependências sequenciais de tarefas que podem ser paralelas. O plano é voltado para desenvolvedores (incluindo júnior).

## Quando Usar Esta Skill

- Após um PRD de refatoração aprovado (`tasks/prd-refatoracao-[nome-modulo]/prd.md`)
- Para decompor a refatoração em tarefas implementáveis (cenários de teste → refatoração)
- Para gerar `tasks.md` e arquivos `[num]_task.md` no padrão do projeto, dentro da pasta do PRD de refatoração

## Pré-requisitos

- **PRD de refatoração:** `./tasks/prd-refatoracao-[nome-modulo]/prd.md`
- **Tech Spec (opcional):** `./tasks/prd-refatoracao-[nome-modulo]/techspec.md` — se não existir, basear-se apenas no PRD (cenários de teste e requisitos de refatoração).

## Referências (carregar conforme necessidade)

| Tópico | Referência | Carregar quando |
|--------|------------|------------------|
| Ordem tests-first e domínios | `references/refatoracao-task-order.md` | Definir sequência e agrupamento |
| Templates e localização | `references/templates-location-refatoracao.md` | Onde salvar e qual template usar |
| Estrutura geral | `../criar-tasks/references/task-structure.md` | Domínios, paralelismo, numeração |

## Fluxo de Trabalho (obrigatório)

1. **Analisar PRD (e Tech Spec se existir)** — Extrair cenários de teste numerados e requisitos de refatoração; identificar componentes principais (job, use case, serviços).
2. **Mostrar lista high-level** — **Antes de gerar qualquer arquivo**, exibir a lista de tarefas principais para aprovação do usuário. A ordem deve refletir tests-first (testes, depois refatoração).
3. **Gerar estrutura** — Ordenar e marcar dependências/paralelismo.
4. **Gerar arquivos** — `tasks.md` (template `tasks-template.md`) e um arquivo `[num]_task.md` por tarefa principal (template `task-template.md`), na pasta `./tasks/prd-refatoracao-[nome-modulo]/`.
5. **Apresentar e confirmar** — Resultados ao usuário; aguardar confirmação antes de implementação.

## Restrições

### DEVE
- Seguir estritamente os templates `./templates/tasks-template.md` e `./templates/task-template.md`.
- Ordenar tarefas na lógica **tests-first**: primeiro tarefas que implementam/garantem cenários de teste; depois tarefas de refatoração de código.
- Agrupar por domínio (ex.: testes, refatoração use case, refatoração job); ordenar com dependências antes de dependentes.
- Incluir testes como subtarefas nas tarefas principais quando fizer sentido.
- Assumir leitor desenvolvedor júnior; escopo e entregáveis claros por tarefa.

### NÃO DEVE
- Gerar arquivos sem antes mostrar e ter aprovação da lista high-level.
- Colocar refatoração antes de tarefas que garantem cobertura de testes dos cenários do PRD.

## Protocolo de Saída

- Lista high-level aprovada
- `tasks/prd-refatoracao-[nome-modulo]/tasks.md` preenchido
- `tasks/prd-refatoracao-[nome-modulo]/[num]_task.md` para cada tarefa principal
- Para refatorações grandes (>10 tarefas), sugerir divisão em fases

<critical>ANTES DE GERAR QUALQUER ARQUIVO, MOSTRE A LISTA DAS TASKS HIGH LEVEL PARA APROVAÇÃO.</critical>
