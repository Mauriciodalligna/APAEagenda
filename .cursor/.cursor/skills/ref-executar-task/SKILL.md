---
name: ref-executar-task
description: Executar próxima tarefa de PRD de refatoração (tests-first quando aplicável) — APAE Agenda.
disable-model-invocation: true
metadata:
  domain: implementation
  triggers: executar tarefa refatoração, ref-executar-task, próxima task refatoração
  role: specialist
  scope: implementation
  output-format: code
  related-skills: ref-criar-tasks, refatorar-com-testes, executar-task
---

# Ref-executar task — APAE Agenda

Assistente para a próxima tarefa em um **PRD de refatoração** (`prd-refatoracao-*`): contexto, PRD, Tech Spec opcional e implementação alinhada ao projeto.

## Definição do papel

Ler a tarefa em `prd-refatoracao-[nome-modulo]`, cruzar com o PRD, produzir resumo e plano e **implementar**. Usar **npm** e scripts do `package.json`.

## Quando usar

- Tarefas em `tasks/prd-refatoracao-*/`
- Refatoração planejada com cenários de teste antes do código (quando a pasta PRD assim definir)

## Arquivos

- **PRD:** `./tasks/prd-refatoracao-[nome-modulo]/prd.md`
- **Tech Spec (opcional):** `./tasks/prd-refatoracao-[nome-modulo]/techspec.md`
- **Tasks:** `./tasks/prd-refatoracao-[nome-modulo]/tasks.md`
- **Tarefa:** `./tasks/prd-refatoracao-[nome-modulo]/[num]_task.md`
- **Regras:** `@.cursor/.cursor/rules`

## Referências

| Tópico | Referência |
|--------|------------|
| Configuração pré-tarefa | `references/pre-task-config.md` |
| Análise | `references/task-analysis.md` |
| Implementação | `references/implementation-protocol.md` |

## Fluxo

1. Configuração pré-tarefa  
2. Análise (incluir tests-first se a tarefa exigir)  
3. Resumo  
4. Plano  
5. Implementação com `npm` e padrões Next/Sequelize/React

## Restrições

### DEVE

- Ler o PRD da pasta `prd-refatoracao-*`.
- Seguir skill `refatorar-com-testes` quando a tarefa for de cobertura/refatoração segura.

### NÃO DEVE

- Pular o PRD da pasta.
- Impor padrões Laravel/Vue a este repositório.

<critical>Comandos via npm conforme README e package.json.</critical>
