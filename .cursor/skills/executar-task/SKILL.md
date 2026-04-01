---
name: executar-task
description: Identificar próxima tarefa, configurar contexto e implementar conforme PRD e Tech Spec (APAE Agenda).
disable-model-invocation: true
metadata:
  domain: implementation
  triggers: executar tarefa, implementar, próxima task, desenvolver, npm, next
  role: specialist
  scope: implementation
  output-format: code
  related-skills: criar-tasks, code-review, criar-techspec
---

# Executar Task — APAE Agenda

Assistente que identifica a próxima tarefa disponível, prepara o contexto (PRD, Tech Spec, dependências) e implementa seguindo os padrões do repositório.

## Definição do papel

Ler a definição da tarefa, cruzar com PRD e Tech Spec, produzir resumo e plano de abordagem e **iniciar a implementação**. Usar **npm** e scripts do `package.json` (`npm run dev`, `npm run lint`, `npm run db:migrate`, etc.).

## Quando usar

- Implementar tarefa listada em `tasks.md` / `[num]_task.md`
- Continuar uma funcionalidade já planejada
- Garantir alinhamento com PRD, Tech Spec e regras em `.cursor/.cursor/rules` quando aplicável

## Localização dos arquivos

- **PRD:** `./tasks/prd-[nome-funcionalidade]/prd.md`
- **Tech Spec:** `./tasks/prd-[nome-funcionalidade]/techspec.md`
- **Tasks:** `./tasks/prd-[nome-funcionalidade]/tasks.md`
- **Tarefa:** `./tasks/prd-[nome-funcionalidade]/[num]_task.md`
- **Regras:** `@.cursor/.cursor/rules`

## Referências

| Tópico | Referência | Quando |
|--------|------------|--------|
| Configuração pré-tarefa | `references/pre-task-config.md` | Antes de começar |
| Análise | `references/task-analysis.md` | Resumo e riscos |
| Implementação | `references/implementation-protocol.md` | Durante o trabalho |

## Fluxo (obrigatório)

1. **Configuração pré-tarefa** — Ler tarefa, PRD e Tech Spec; checar dependências de tarefas anteriores.
2. **Análise** — Objetivos, alinhamento com regras, abordagens, riscos.
3. **Resumo** — ID, nome, contexto, requisitos, dependências, critérios de sucesso.
4. **Plano** — Passos numerados.
5. **Implementação** — Executar passos; usar `npm` e padrões do projeto; atender critérios de sucesso.

## Restrições

### DEVE

- Verificar PRD, Tech Spec e arquivo da tarefa.
- Seguir padrões descritos em `next-api-standards.mdc` e `react-next-standards.mdc` quando tocar API ou UI.

### NÃO DEVE

- Pular leitura do PRD (e Tech Spec se existir) da pasta da funcionalidade.
- Introduzir padrões de outra stack (PHP/Laravel, Vue) como obrigatórios para este repo.

## Protocolo de saída

- Resumo e plano em texto claro.
- Em seguida, **implementar** (código, migrations se necessário, `npm run lint` quando fizer sentido).

<critical>Comandos do projeto via npm e ferramentas do ecossistema Node/Next, conforme README e package.json.</critical>
