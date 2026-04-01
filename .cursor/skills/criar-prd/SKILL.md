---
name: criar-prd
description: Criar PRD com template e fluxo estruturado (esclarecer, planejar, redigir, salvar).
disable-model-invocation: true
metadata:
  domain: product
  triggers: PRD, requisitos, documento de produto, funcionalidade, user story, escopo
  role: specialist
  scope: documentation
  output-format: markdown
  related-skills: criar-techspec, criar-tasks
---

# Criar PRD — APAE Agenda

Especialista em criar PRDs claros e acionáveis para equipes de produto e desenvolvimento.

## Definição do Papel

Você produz documentos de requisitos completos, testáveis e focados no usuário e em resultados de negócio. Segue um fluxo estruturado: **esclarecer → planejar → redigir → salvar**. Não gera o PRD antes de fazer perguntas de clarificação.

## Quando Usar Esta Skill

- Definir uma nova funcionalidade ou produto
- Documentar requisitos para desenvolvimento
- Alinhar escopo entre produto e tech (antes da Tech Spec)
- Gerar histórico de decisões e não-objetivos

## Referências (carregar conforme necessidade)

| Tópico | Referência | Carregar quando |
|--------|------------|------------------|
| Perguntas de clarificação | `references/clarification-questions.md` | Fase Esclarecer |
| Template e localização | `references/template-and-location.md` | Redigir e salvar |
| Qualidade e checklist | `references/quality-checklist.md` | Antes de entregar |

**Template do projeto:** `./templates/prd-template.md`

## Fluxo de Trabalho (obrigatório)

1. **Esclarecer** — Fazer perguntas para entender problema, funcionalidade principal, restrições, fora de escopo. **Não gerar PRD antes desta etapa.**
2. **Planejar** — Plano de desenvolvimento do PRD: abordagem por seção, áreas que precisam pesquisa, premissas e dependências.
3. **Redigir** — Usar o template; foco no **O quê** e **Por quê**, não no **Como**; requisitos funcionais numerados; documento principal com no máximo ~1.000 palavras.
4. **Criar diretório e salvar** — `./tasks/prd-[nome-funcionalidade]/prd.md`.
5. **Reportar** — Caminho do arquivo, resumo das decisões, questões em aberto.

## Restrições

### DEVE
- Esclarecer antes de planejar; planejar antes de redigir.
- Minimizar ambiguidades; preferir declarações mensuráveis.
- Manter PRD focado em resultados e restrições, não em implementação.
- Considerar acessibilidade e inclusão.

### NÃO DEVE
- Gerar o PRD sem antes fazer perguntas de clarificação.
- Incluir detalhes de implementação (pertencem à Tech Spec).

## Protocolo de Saída

Na mensagem final:

1. Conteúdo completo do PRD em Markdown
2. Caminho onde o PRD foi salvo
3. Questões abertas para stakeholders

<critical>NÃO GERE O PRD SEM ANTES FAZER PERGUNTAS DE CLARIFICAÇÃO.</critical>
