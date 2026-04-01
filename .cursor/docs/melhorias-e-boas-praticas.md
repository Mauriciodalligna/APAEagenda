# Melhorias e boas práticas — APAE Agenda

Documentação de referência para humanos e agentes. Complementa as regras em `.cursor/rules/` (especialmente `security-backend.mdc` e `next-api-standards.mdc`).

## Índice

1. [Melhorias já incorporadas ao código](#1-melhorias-já-incorporadas-ao-código)
2. [Backlog recomendado (próximos passos)](#2-backlog-recomendado-próximos-passos)
3. [Variáveis de ambiente relacionadas](#3-variáveis-de-ambiente-relacionadas)
4. [Arquivos-chave](#4-arquivos-chave)
5. [Como usar esta doc no Cursor](#5-como-usar-esta-doc-no-cursor)

---

## 1. Melhorias já incorporadas ao código

Resumo do que foi consolidado no repositório (segurança, configuração e limpeza).

### Banco de dados

| Item | Descrição |
|------|-----------|
| Configuração única | `src/server/db/db-connection.cjs` centraliza lógica usada pelo runtime (`sequelize.js`) e pelo CLI (`config.js`). |
| Sem senha padrão no código | Em `production`, sem `DATABASE_URL`, é obrigatório `DB_PASSWORD` não vazio. |
| TLS opcional por variáveis | `DB_SSL=true` aplica TLS ao usar host/porta/user separados; alinhado ao uso com `DATABASE_URL`. |
| Certificado TLS | `DB_SSL_REJECT_UNAUTHORIZED` (padrão falso quando SSL ativo), documentado em `.env.example`. |
| Build Next.js | Validação pesada é ignorada quando `NEXT_PHASE === phase-production-build`, evitando falha de `next build` sem credenciais no ambiente de build. |

### JWT

| Item | Descrição |
|------|-----------|
| Segredo em produção | `src/server/utils/jwtSecret.js`: em `production`, `JWT_SECRET` obrigatório com **≥ 32 caracteres**; caso contrário retorno **503** (login e middlewares). |
| Uso centralizado | `authController` (login) e `middlewares/auth.js` consomem `getJwtSecret()`. |

### Rotas sensíveis (produção)

| Rota | Comportamento padrão em produção | Habilitar |
|------|-----------------------------------|-----------|
| `GET /api/auth/test-email` | Resposta **404** | `ALLOW_TEST_EMAIL_ROUTE=true` |
| `GET /api/db-check` | **404** | `ENABLE_DB_CHECK=true` |
| `POST /api/auth/register` | **403** (cadastro público desligado) | `ALLOW_PUBLIC_REGISTER=true` |

### Limpeza e consistência

- Removido script morto `init-mural.js` (schema coberto por migrations).
- Removidos exports não usados (`verifyToken` duplicado no middleware, `hasValidToken` / `apiFetch` não referenciados em `token.js` após revisão).
- `getStoredToken` unificado a partir de `@/utils/token` nas listagens (usuários, profissionais, alunos); token ausente retorna string vazia para evitar `Bearer null`.

---

## 2. Backlog recomendado (próximos passos)

Itens de boas práticas ainda **não** tratados como implementação única no código; priorizar conforme risco e esforço.

### Qualidade e arquitetura

- **Testes automatizados:** cobrir helpers críticos (auth, validação) e depois fluxos E2E principais.
- **TypeScript gradual:** `allowJs` + tipagem em API e modelos.
- **Página de agendamentos:** arquivo muito grande; extrair hooks e subcomponentes.
- **Padronizar API:** reduzir `mockReq`/`mockRes` nos controllers; contratos explícitos nas rotas.

### Segurança e operações

- **Cabeçalhos HTTP** (`next.config.mjs`): `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`; `Strict-Transport-Security` onde HTTPS for garantido.
- **Limites de listagem:** validar e limitar `limit`/`offset` (evitar abuso e carga).
- **Rate limiting:** IP (ou provedor) em `/api/auth/login` e `/api/auth/forgot` além da lógica já existente no forgot.
- **Logs:** logger estruturado em produção; evitar PII em logs.

### Dados e Sequelize

- Pool/timeouts explícitos quando necessário.
- **Transações** em operações multi-tabela.
- **Índices** alinhados a filtros e joins frequentes.

### Front-end

- `error.js` / `global-error.js` no App Router.
- `loading.js` onde listas forem pesadas.
- Revisão de acessibilidade (modais, formulários).

### DX

- CI mínimo: `lint` + `build` em PR.
- Manter `.env.example` e README alinhados às flags e requisitos de produção.

---

## 3. Variáveis de ambiente relacionadas

Detalhes e placeholders estão em **`.env.example`** na raiz do repositório. Resumo:

| Variável | Função |
|----------|--------|
| `DATABASE_URL` | Conexão completa (ex.: provedores com TLS). |
| `DB_*` / `DB_SSL` / `DB_SSL_REJECT_UNAUTHORIZED` | Conexão por partes e política TLS. |
| `JWT_SECRET` | Obrigatório e forte em produção (≥ 32 caracteres). |
| `ALLOW_TEST_EMAIL_ROUTE` | Habilita rota de teste de e-mail em produção. |
| `ENABLE_DB_CHECK` | Habilita health check do banco em produção. |
| `ALLOW_PUBLIC_REGISTER` | Habilita `POST /api/auth/register` em produção. |

---

## 4. Arquivos-chave

| Área | Caminhos |
|------|----------|
| Conexão DB | `src/server/db/db-connection.cjs`, `sequelize.js`, `config.js` |
| JWT | `src/server/utils/jwtSecret.js`, `src/middlewares/auth.js`, `src/controllers/authController.js` |
| Rotas protegidas | `src/app/api/auth/test-email/route.js`, `db-check/route.js`, `auth/register/route.js` |
| Cliente token | `src/utils/token.js` |
| Regras Cursor | `.cursor/rules/security-backend.mdc`, `next-api-standards.mdc` |

---

## 5. Como usar esta doc no Cursor

- Referenciar no chat: `@.cursor/docs/melhorias-e-boas-praticas.md`
- Ao planejar refatorações grandes, combinar com `.cursor/skills/ref-criar-tasks/SKILL.md` ou `criar-tasks` para gerar `tasks/` sob demanda.
- Revisões de código: alinhar com `.cursor/skills/code-review/SKILL.md` e checklists em `code-review/references/`.

---

## Manutenção deste documento

- Após mudanças relevantes em segurança ou env, atualizar as seções **1**, **3** e **4**.
- Itens concluídos do backlog podem ser movidos da seção **2** para a **1** com data curta no histórico do commit.
