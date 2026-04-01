# Análise do projeto (para Tech Spec)

## Objetivo

Descobrir onde a funcionalidade se encaixa no código existente antes de redigir a Tech Spec.

## O que mapear

- **Arquivos e módulos** — Rotas `src/app/api/**`, páginas `src/app/**`, controllers `src/controllers/`, modelos Sequelize `src/server/db`, middlewares `src/middlewares/`.
- **Interfaces e contratos** — Formato JSON das APIs, uso de JWT, perfis (`gestor`, `secretaria`, `profissional`, etc.).
- **Pontos de integração** — Middleware de auth, inicialização Sequelize, variáveis de ambiente (`.env` / `.env.local`).
- **Dependências** — Chamadores e chamados; configs; persistência.
- **Tratamento de erros** — Padrões nas rotas (`NextResponse`, `Response.json`, mensagens `ok`/`error`).
- **Testes** — Se existir pasta ou script de testes no `package.json`, indicar onde e como rodar.

## Estratégias

- Reuso de componentes MUI, controllers e modelos existentes.
- Riscos (performance, concorrência em agendamentos, etc.).
- Impacto em código legado (Princípio do Escoteiro).

## Ferramentas

- Busca por símbolos e rotas no repositório.
- Leitura de `@.cursor/.cursor/rules`, `README.md` e `.env.example`.
