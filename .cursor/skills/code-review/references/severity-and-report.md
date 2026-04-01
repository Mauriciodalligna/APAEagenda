# Severidade e relatório de code review

## Classificação de severidade

### Crítica

Violação que compromete segurança, integridade de dados ou contrato da API.

- SQL injetável (string concatenada com input); ausência de autorização em rota que altera dados sensíveis
- Segredo ou senha no código ou em resposta ao cliente
- React: `dangerouslySetInnerHTML` com conteúdo não confiável controlado pelo usuário

### Alta

Violação forte de padrão do projeto ou risco elevado.

- Validação de entrada ausente em operação de escrita; erro de DB exposto ao cliente em produção
- Lógica de autorização só no front-end
- Tratamento de erro inexistente em fluxo crítico (pagamento, agendamento, dados pessoais)

### Média

Boas práticas ou legibilidade.

- Função/rota muito longa sem necessidade; duplicação que dificulta manutenção
- Falta de loading/erro na UI em nova chamada à API; `console.log` em código de produção

### Baixa

Sugestão de melhoria.

- Nome pouro descritivo; pequena extração de função; comentário útil faltando

---

## Template do relatório (obrigatório)

```markdown
# Code Review — [data]

## Arquivos revisados (modificados na branch)
- `caminho/arquivo.js` (resumo das mudanças)
**Nota:** Apenas alterações na branch atual foram consideradas.

## Pontos positivos
- ...

## Problemas identificados

### [Categoria] — [Severidade]
**Arquivo:** `...`
**Linhas:** X–Y
**Trecho:** ...
**Problema:** ...
**Sugestão:** ...

## Resumo
- Arquivos revisados: N
- Problemas: N (Crítica / Alta / Média / Baixa)

## Recomendações prioritárias
1. ...

## Checklist de conformidade
| Categoria | Status | Observações |
|-----------|--------|-------------|
| API / controllers / Sequelize | | |
| Auth e segredos | | |
| React / MUI | | |
| Segurança | | |

## Observações adicionais
- ...
```

## Protocolo de saída

Incluir relatório em Markdown, lista de arquivos, contagem por severidade, recomendações e checklist.

## Princípios

- Feedback construtivo; exemplos quando útil
- Específico: arquivo, trecho, sugestão
- Reconhecer melhorias (Princípio do Escoteiro)
