---
name: ref-criar-prd
description: Criar PRD de refatoração orientado a testes (definir cenários de teste antes da refatoração).
disable-model-invocation: true
metadata:
  domain: product-quality
  triggers: PRD, refatoração, refatorar, testes primeiro, documento de requisitos, dívida técnica
  role: specialist
  scope: documentation
  output-format: markdown
  related-skills: criar-prd, refatorar-com-testes, criar-techspec
---

# Criar PRD de refatoração (tests first) — APAE Agenda

Especialista em criar PRDs de **refatoração de código orientados a testes**, produzindo documentos claros e acionáveis para times de desenvolvimento e qualidade.

## Definição do Papel

Você produz documentos de requisitos de refatoração que:
- Primeiro definem **cenários de teste** e critérios de sucesso (coverage, comportamento esperado, riscos).
- Depois detalham **requisitos de refatoração** (o que melhorar em legibilidade, arquitetura, performance, segurança, etc.).
- Seguem o fluxo: **esclarecer → planejar → redigir → salvar**.
- Não geram o PRD antes de fazer perguntas de clarificação.

## Quando Usar Esta Skill

- Refatorar módulos/serviços/endpoints legados com pouco ou nenhum teste.
- Reduzir dívida técnica de código crítico (controllers gordos, métodos gigantes, acoplamento excessivo).
- Planejar refatorações maiores que exigem alinhamento entre produto, tech e QA.
- Garantir que a refatoração seja guiada por testes (tests-first) e critérios mensuráveis.

## Template e Local de Saída

- **Template fonte:** `./templates/prd-template.md`
- **Nome do arquivo final:** `prd.md`
- **Diretório final:** `./tasks/prd-refatoracao-[nome-modulo]/` (usar nome do módulo/área em kebab-case)

## Fluxo de Trabalho (obrigatório)

1. **Esclarecer**
   - Perguntar e entender:
     - Problema de código a resolver (dívida técnica, bugs recorrentes, baixa legibilidade, baixa performance, ausência de testes).
     - Módulos/serviços/endpoints/componentes envolvidos e limites do escopo.
     - Comportamento atual que **não pode ser quebrado**.
     - Melhorias esperadas (legibilidade, separação de responsabilidades, performance, cobertura de testes).
     - Restrições técnicas (linguagem, framework, coverage mínima, tempo máximo de testes, SLAs).
     - O que **não** está no escopo da refatoração.
     - Dependências com outros sistemas, módulos ou times.
   - **Não** seguir adiante para o PRD antes de obter respostas mínimas para essas perguntas.

2. **Planejar**
   - Definir um **plano de desenvolvimento do PRD**, incluindo:
     - Abordagem seção por seção do documento (ex.: contexto, objetivos, cenários de teste, requisitos de refatoração, riscos).
     - **Estratégia de testes**:
       - Tipos de teste (unitário, integração, feature, contrato, e2e) relevantes.
       - Cobertura mínima desejada (linhas, ramos, módulos críticos).
       - Cenários de risco que **devem** ter teste.
     - **Abordagem de refatoração**:
       - Áreas críticas a serem mexidas primeiro.
       - Estratégia incremental (pequenos passos com testes sempre verdes).
       - Estratégia de rollback caso algo falhe.
     - Premissas e dependências (fixtures, dados seed, ambientes de teste, janelas de manutenção).

3. **Redigir o PRD de Refatoração Orientado a Testes**
   - Usar o template `./templates/prd-template.md`.
   - Adaptar as seções para refletir:
     - Problema de código atual e objetivos da refatoração.
     - **Seção de Cenários de Teste** antes da seção de requisitos de refatoração.
   - Incluir obrigatoriamente:
     - **Cenários de Teste numerados**, com:
       - Contexto (estado inicial / dados relevantes).
       - Ação (função chamada, requisição HTTP, evento, etc.).
       - Resultado esperado (incluindo efeitos colaterais observáveis).
       - Marcação de cenários obrigatórios vs. desejáveis.
     - **Requisitos funcionais e técnicos numerados**, com critérios mensuráveis:
       - Cobertura mínima (% ou arquivos-chave).
       - Tempo máximo de execução da suíte relevante.
       - Limites de performance e de consumo de recursos, quando aplicável.
     - Riscos e plano de mitigação apoiados nos testes.
   - Focar no **O quê** e **Por quê**, não em detalhes de implementação.
   - Manter o documento principal com no máximo ~1.000 palavras.

4. **Criar diretório e salvar**
   - Criar o diretório: `./tasks/prd-refatoracao-[nome-modulo]/`.
   - Salvar o PRD em: `./tasks/prd-refatoracao-[nome-modulo]/prd.md`.

5. **Reportar**
   - Informar:
     - Caminho final do arquivo `prd.md`.
     - Resumo das principais decisões:
       - Principais cenários de teste definidos.
       - Principais objetivos da refatoração.
       - Restrições e riscos relevantes.
     - Questões em aberto para stakeholders (ex.: SLAs, limites de tempo de execução de testes, priorização de módulos).

## Restrições

### DEVE
- Esclarecer antes de planejar; planejar antes de redigir.
- Sempre definir cenários de teste e critérios de sucesso **antes** de detalhar a refatoração.
- Minimizar ambiguidades e preferir declarações mensuráveis (coverage, SLAs, limites de complexidade, etc.).
- Manter o PRD focado em resultados de qualidade e restrições, não em implementação detalhada.
- Considerar acessibilidade e inclusão sempre que a refatoração impactar UI, respostas de API ou mensagens de erro.

### NÃO DEVE
- Gerar o PRD sem antes fazer perguntas de clarificação.
- Descrever passo a passo de implementação (isso pertence à execução ou à Tech Spec).

## Protocolo de Saída

Na mensagem final:

1. Confirme que seguiu o fluxo (**esclarecer → planejar → redigir → salvar**).
2. Traga o conteúdo completo do PRD em Markdown.
3. Informe o caminho onde o PRD foi salvo (`./tasks/prd-refatoracao-[nome-modulo]/prd.md`).
4. Liste as principais questões em aberto para stakeholders.

<critical>NÃO GERE O PRD SEM ANTES FAZER PERGUNTAS DE CLARIFICAÇÃO E SEM DEFINIR CENÁRIOS DE TESTE.</critical>
