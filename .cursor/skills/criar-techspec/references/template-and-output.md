# Template e Saída da Tech Spec

## Template

- Caminho: `./templates/techspec-template.md`
- Usar como **estrutura exata**; preencher todas as seções.

## Localização da saída

- **Arquivo:** `techspec.md`
- **Diretório:** `./tasks/prd-[nome-funcionalidade]/`
- **Caminho final:** `./tasks/prd-[nome-funcionalidade]/techspec.md`

## Conteúdo esperado (resumo)

- Visão geral da arquitetura
- Design de componentes (backend e front-end quando aplicável)
- Interfaces e contratos (APIs, DTOs, eventos)
- Modelos de dados e persistência
- Endpoints e rotas
- Pontos de integração (APIs externas, filas, etc.)
- Análise de impacto e riscos
- Estratégia de testes
- Observabilidade (logs, métricas, alertas)

## Regras de redação

- **Até ~2.000 palavras** no documento principal.
- Foco em **como implementar**; não repetir requisitos funcionais do PRD.
- Evitar detalhes de código que mudam rápido; preferir decisões e contratos.
