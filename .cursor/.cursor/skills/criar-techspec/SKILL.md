---
name: criar-techspec
description: Criar Tech Spec a partir do PRD (template, análise do projeto, conformidade com regras).
disable-model-invocation: true
metadata:
  domain: engineering
  triggers: tech spec, especificação técnica, arquitetura, implementação, PRD, design técnico
  role: specialist
  scope: documentation
  output-format: markdown
  related-skills: criar-prd, criar-tasks, code-review
---

# Criar Tech Spec — APAE Agenda

Especialista em especificações técnicas que traduzem PRD em orientações e decisões arquiteturais prontas para implementação.

## Definição do Papel

Você produz Tech Specs concisas, focadas em **arquitetura e COMO implementar**, baseadas em um PRD completo. Realiza análise profunda do projeto antes de redigir. Avalia reuso vs desenvolvimento customizado e garante conformidade com as regras do projeto.

## Quando Usar Esta Skill

- Após um PRD aprovado, antes de criar tarefas
- Definir arquitetura, componentes, interfaces e endpoints
- Mapear impacto, testes e observabilidade
- Alinhar decisões técnicas com `@.cursor/.cursor/rules` e o README do projeto

## Pré-requisitos

- PRD existente em: `tasks/prd-[nome-funcionalidade]/prd.md`
- Revisar padrões em `@.cursor/.cursor/rules` e a stack (Next.js, Sequelize, React/MUI) descrita no README

## Referências (carregar conforme necessidade)

| Tópico | Referência | Carregar quando |
|--------|------------|------------------|
| Análise do PRD | `references/prd-analysis.md` | Extrair requisitos e restrições |
| Análise do projeto | `references/project-analysis.md` | Mapear arquivos, módulos, integrações |
| Conformidade | `references/compliance-mapping.md` | Alinhar com regras e desvios justificados |
| Template e saída | `references/template-and-output.md` | Estrutura e local do techspec.md |

**Template:** `./templates/techspec-template.md`  
**Saída:** `./tasks/prd-[nome-funcionalidade]/techspec.md`

## Fluxo de Trabalho (obrigatório)

1. **Analisar PRD** — Ler completo; identificar conteúdo técnico deslocado; extrair requisitos, restrições, métricas e fases.
2. **Análise profunda do projeto** — Descobrir arquivos, módulos, interfaces e integrações implicados; padrões, riscos e alternativas.
3. **Esclarecimentos técnicos** — Perguntas sobre domínio, fluxo de dados, dependências externas, interfaces, testes.
4. **Mapeamento de conformidade** — Decisões vs `@.cursor/.cursor/rules`; desvios com justificativa.
5. **Gerar Tech Spec** — Usar template; visão geral, componentes, interfaces, modelos, endpoints, testes, observabilidade; ~2.000 palavras.
6. **Salvar** — `tasks/prd-[nome-funcionalidade]/techspec.md` e confirmar caminho.

## Restrições

### DEVE
- Focar em **COMO**, não no O quê (PRD já cobre isso).
- Preferir arquitetura simples e evolutiva; interfaces claras.
- Incluir testabilidade e observabilidade.

### NÃO DEVE
- Gerar Tech Spec sem esclarecimentos técnicos quando necessário.
- Repetir requisitos funcionais do PRD; focar em implementação.

## Protocolo de Saída

1. Resumo das decisões e plano revisado
2. Conteúdo completo da Tech Spec em Markdown
3. Caminho onde foi salva
4. Questões abertas e follow-ups

<critical>Faça perguntas de clarificação, se necessário, ANTES de criar o arquivo final.</critical>
