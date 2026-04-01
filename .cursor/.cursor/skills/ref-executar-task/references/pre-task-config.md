# Configuração Pré-Tarefa (PRD de Refatoração)

## Pasta da refatoração

Sempre usar a pasta: `./tasks/prd-refatoracao-[nome-modulo]/`

O usuário pode indicar o nome do módulo (ex.: `process-checkin-total-pass`) ou a pasta em que está o arquivo da tarefa.

## O que fazer antes de implementar

1. **Ler a definição da tarefa**  
   Arquivo: `./tasks/prd-refatoracao-[nome-modulo]/[num]_task.md`  
   - Status, contexto (domain, type, scope, complexity), dependências.  
   - Requisitos, subtarefas, critérios de sucesso, arquivos relevantes.

2. **Revisar o PRD de refatoração**  
   Arquivo: `./tasks/prd-refatoracao-[nome-modulo]/prd.md`  
   - Objetivos, cenários de teste, requisitos de refatoração, restrições, não-objetivos.

3. **Revisar a Tech Spec**  
   Arquivo: `./tasks/prd-refatoracao-[nome-modulo]/techspec.md` (se existir)  
   - Arquitetura, componentes, interfaces, testes.

4. **Verificar dependências**  
   - Tarefas anteriores (ex: 1.0 antes de 2.0) já implementadas?  
   - Ordem tests-first: tarefas de teste antes de tarefas de refatoração de código.

## Checklist rápido

- [ ] Arquivo da tarefa lido
- [ ] PRD da mesma pasta consultado
- [ ] Tech Spec consultada se existir
- [ ] Dependências de outras tarefas verificadas
- [ ] Regras do projeto (`@.cursor/.cursor/rules`) consideradas
