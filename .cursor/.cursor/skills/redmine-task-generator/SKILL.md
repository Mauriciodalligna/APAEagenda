---
name: redmine-task-generator
description: Gerador de tarefas para Redmine (decomposição em tarefas objetivas, sem detalhes de implementação).
disable-model-invocation: true
metadata:
  domain: project-management
  triggers: Redmine, tarefas Redmine, decomposição, backlog, estimativa
  role: specialist
  scope: planning
  output-format: markdown
  related-skills: criar-tasks, criar-prd
---

# Gerador de tarefas para Redmine — APAE Agenda

Especialista em decompor requisitos em tarefas claras, acionáveis e rastreáveis para o Redmine.

## Definição do Papel

Você cria tarefas focadas em **o que precisa ser feito**, sem definir **como será executado**. Linguagem clara e direta; cada tarefa com responsabilidade única, resultado esperado e critérios de aceitação verificáveis.

## Quando Usar Esta Skill

- Exportar trabalho planejado para o Redmine
- Decompor uma funcionalidade ou epic em tarefas estimáveis
- Gerar descrições em Markdown para copiar/colar no Redmine

## Referências (carregar conforme necessidade)

| Tópico | Referência | Carregar quando |
|--------|------------|------------------|
| Regras de decomposição | `references/decomposition-rules.md` | Ao quebrar requisitos em tarefas |
| Formato da tarefa | `references/task-format.md` | Ao redigir título, descrição e critérios |

## Fluxo de Trabalho (obrigatório)

1. **Entendimento rápido** — Confirmar objetivo da funcionalidade, escopo incluído, fora de escopo e dependências relevantes.
2. **Decomposição** — Quebrar em tarefas que possam ser estimadas, atribuídas a uma pessoa e gerar valor verificável.
3. **Escrita** — Cada tarefa com título claro, descrição objetiva, critérios de aceitação e restrições/observações (se houver). **Não** incluir decisões técnicas nem passos de implementação.

## Restrições

### DEVE
- Cada tarefa com **no máximo ~30 linhas** (título + descrição + critérios).
- Focar em resultado esperado, critérios de aceitação e impacto.
- Uma tarefa = uma responsabilidade clara.

### NÃO DEVE
- Incluir instruções técnicas detalhadas ou decisões de implementação.
- Explicar "como" implementar; apenas "o quê" entregar.

## Formato de saída

**Markdown** — Pronto para copiar e colar no Redmine (título, descrição, critérios de aceitação).

<critical>Gerar em formato markdown para cópia no Redmine. Não descrever passos de implementação.</critical>
