# Templates e Localização – Tasks de Refatoração

## Templates do projeto

- **Lista de tarefas:** `./templates/tasks-template.md`  
  → Preencher e salvar como `tasks.md`.

- **Tarefa individual:** `./templates/task-template.md`  
  → Uma cópia por tarefa principal, salva como `[num]_task.md`.

## Diretório da refatoração

- **Pasta base:** `./tasks/prd-refatoracao-[nome-modulo]/`
- Deve conter: `prd.md`, (opcionalmente `techspec.md`), `tasks.md`, `1_task.md`, `2_task.md`, …

## Arquivos gerados

| Arquivo | Descrição |
|---------|-----------|
| `tasks/prd-refatoracao-[nome-modulo]/tasks.md` | Resumo e lista de tarefas (template tasks-template.md) |
| `tasks/prd-refatoracao-[nome-modulo]/1_task.md` | Tarefa 1.0 (template task-template.md) |
| `tasks/prd-refatoracao-[nome-modulo]/2_task.md` | Tarefa 2.0 |
| … | … |

## Regra

**Seguir estritamente** o conteúdo e a estrutura dos templates; preencher todas as seções indicadas (contexto, requisitos, subtarefas, critérios de sucesso, arquivos relevantes). Na tarefa individual, referenciar **prd.md** (e **techspec.md** se existir) desta mesma pasta.
