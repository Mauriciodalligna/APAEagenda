# Checklist front-end (React / Next.js / MUI)

Aplicar **apenas ao código modificado**. Base: `@.cursor/.cursor/rules/react-next-standards.mdc`.

## Localização

- [ ] Páginas e layouts em `src/app/`; componentes em `src/components/` quando existir

## React e Next.js

- [ ] Hooks usados de forma idiomática (`useState`, `useEffect`, etc.)
- [ ] Componentes não desnecessariamente grandes; extrair subcomponentes ou hooks quando couber
- [ ] Listas com `key` estável

## Material UI

- [ ] Componentes MUI alinhados ao tema e padrões já usados no projeto
- [ ] Layout responsivo considerado (`Stack`, `Box`, grid MUI, etc.)

## Dados e API

- [ ] Estados de loading/erro tratados nas chamadas à API
- [ ] Não armazenar segredos em `localStorage` sem o padrão já definido no app

## Boas práticas

- [ ] Sem `dangerouslySetInnerHTML` com HTML não confiável
- [ ] Sem `console.log`/`debugger` deixados para produção
- [ ] Imports organizados

## Exemplo de problema comum

- Props mutadas diretamente; falta de tratamento de erro em formulários; acessibilidade ausente em campos novos
