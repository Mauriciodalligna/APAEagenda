# Configuração Pré-Tarefa

## O que fazer antes de implementar

1. **Ler a definição da tarefa**  
   Arquivo: `./tasks/prd-[nome-funcionalidade]/[num]_task.md`  
   - Status, contexto (domain, type, scope, complexity), dependências.  
   - Requisitos, subtarefas, critérios de sucesso, arquivos relevantes.

2. **Revisar o PRD**  
   Arquivo: `./tasks/prd-[nome-funcionalidade]/prd.md`  
   - Objetivos, requisitos funcionais, restrições, não-objetivos.

3. **Revisar a Tech Spec**  
   Arquivo: `./tasks/prd-[nome-funcionalidade]/techspec.md`  
   - Arquitetura, componentes, interfaces, endpoints, testes.

4. **Verificar dependências**  
   - Tarefas anteriores (ex: 1.0 antes de 2.0) já implementadas?  
   - Migrations, models, rotas ou serviços que esta tarefa assume existentes?

## Checklist rápido

- [ ] Arquivo da tarefa lido
- [ ] PRD e Tech Spec da mesma pasta consultados
- [ ] Dependências de outras tarefas verificadas
- [ ] Regras do projeto (`@.cursor/.cursor/rules`) consideradas
