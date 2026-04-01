# Formato da Tarefa (Redmine)

Cada tarefa gerada deve conter os campos abaixo, em **Markdown**, para copiar no Redmine.

## Título

- Claro e específico (ex: "Cadastro de cartão de crédito – backend", "Tela de listagem de planos").
- Evitar títulos genéricos ("Implementar feature X" sem especificar o quê).

## Descrição

- Objetiva: **o que** deve ser entregue.
- Sem passos de implementação; sem escolhas técnicas (como, com qual lib, qual padrão de código).

## Critérios de aceitação

- Lista verificável (ex: "Usuário consegue salvar cartão e ver últimos 4 dígitos").
- Permite que QA ou dev confirme que a tarefa foi cumprida.

## Restrições ou observações (opcional)

- Só se houver algo relevante para o planejamento (ex: "Depende da API do gateway estar em homologação", "Requer aprovação de UX").

---

## Exemplo (estilo)

**Título:** Permitir cadastro de cartão de crédito pelo link do cliente

**Descrição:** O cliente acessa o link enviado por e-mail e preenche os dados do cartão (número, validade, CVV, titular e endereço). O sistema deve tokenizar o cartão no gateway e armazenar o token associado ao cliente, sem guardar número completo.

**Critérios de aceitação:**
- Formulário valida todos os campos obrigatórios conforme regras de negócio.
- Cartão é tokenizado no gateway e apenas o token e últimos 4 dígitos são persistidos.
- Mensagem de sucesso ou erro é exibida ao usuário.
- Link inválido ou expirado retorna mensagem adequada.

**Observações:** Depende do ambiente de homologação do gateway estar disponível.

---

Nunca explicar decisões técnicas. Nunca descrever passos de implementação.
