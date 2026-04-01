# Regras de Decomposição (Redmine)

## Objetivo

Quebrar a funcionalidade em tarefas que:

- Possam ser **estimadas** (tamanho razoável, escopo claro).
- Possam ser **atribuídas** a uma pessoa.
- Gerem **valor verificável** (entregável e critérios de aceitação).

## Tamanho

- Cada tarefa deve ter **no máximo ~30 linhas** (título + descrição + critérios).
- Se um bloco ficar maior, dividir em mais de uma tarefa.

## Responsabilidade

- **Uma tarefa = uma responsabilidade clara.**  
  Evitar tarefas que misturam front + back + testes em um único item; pode ser uma tarefa “Implementar X de ponta a ponta” se for pequena, ou várias “Backend …”, “Front …”, “Testes …”.

## Linguagem

- Clara, direta, sem ambiguidade.
- Foco em **o que** será entregue, não em **como** (sem detalhes de código, libs ou arquitetura interna).

## O que não incluir

- Instruções técnicas detalhadas.
- Decisões de implementação (ex: “usar repository X”).
- Passos de desenvolvimento (ex: “criar migration depois model”).

## Dependências

- Mencionar dependências relevantes entre tarefas ou com outros sistemas/time quando fizerem diferença para planejamento no Redmine.
