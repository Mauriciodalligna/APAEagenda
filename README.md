# APAE Agenda

Sistema de agenda para APAE — aplicação Next.js com React, Material UI, PostgreSQL e Sequelize.

## Requisitos (Ubuntu / Linux)

- **Node.js** 18.x ou superior (recomendado LTS)
- **PostgreSQL** 12 ou superior
- **npm** (vem com o Node.js)

**CI (GitHub):** em repositórios no GitHub, o workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa `npm ci`, `npm run lint` e `npm run build` em push/PRs para `main` ou `master`. Para exigir verde antes do merge, ative *branch protection* nas configurações do repositório.

---

## 1. Instalar Node.js (Ubuntu)

Se ainda não tiver o Node.js instalado:

```bash
# Opção A: via NodeSource (recomendado para versão LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Opção B: via nvm (gerenciador de versões)
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# source ~/.bashrc   # ou source ~/.zshrc
# nvm install 20
# nvm use 20
```

Confirme a instalação:

```bash
node -v   # deve mostrar v18.x ou v20.x
npm -v
```

---

## 2. Instalar PostgreSQL (Ubuntu)

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Criar usuário e banco para o projeto:

```bash
sudo -u postgres psql -c "CREATE USER seu_usuario WITH PASSWORD 'sua_senha';"
sudo -u postgres psql -c "CREATE DATABASE apaeagenda OWNER seu_usuario;"
```

*(Substitua `seu_usuario` e `sua_senha` pelos valores que quiser usar.)*

### Interface gráfica para o PostgreSQL (recomendado)

Para rodar SQL, ver tabelas, dados e fazer manutenção no banco, é indicado usar uma UI. No Ubuntu você pode instalar:

| Ferramenta | Instalação | Observação |
|------------|------------|------------|
| **DBeaver** | `sudo snap install dbeaver-ce` ou [dbeaver.io](https://dbeaver.io/) | Gratuito, várias bases de dados, editor SQL e ER. |
| **pgAdmin** | `sudo apt install pgadmin4` ou [pgadmin.org](https://www.pgadmin.org/) | Oficial da comunidade PostgreSQL, focado em PostgreSQL. |
| **Beekeeper Studio** | `sudo snap install beekeeper-studio` ou [beekeeperstudio.io](https://www.beekeeperstudio.io/) | Leve, open source, bom para consultas rápidas. |

Depois de instalar, conecte com os mesmos dados do `.env.local`: host `localhost`, porta `5432`, usuário e senha do banco, database `apaeagenda`.

---

## 3. Clonar / acessar o projeto

```bash
cd /home/mauricio/Documentos/APAEagenda
```

*(Ou clone o repositório no diretório desejado.)*

---

## 4. Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto (ou `.env`):

```bash
cp .env.example .env.local
```

Se não existir `.env.example`, crie `.env.local` com o conteúdo abaixo e ajuste os valores:

```env
# Banco de dados (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=apaeagenda

# Ou use uma única URL (sobrescreve as variáveis acima):
# DATABASE_URL=postgresql://usuario:senha@localhost:5432/apaeagenda

# JWT (obrigatório em produção)
JWT_SECRET=uma-chave-secreta-forte-aqui

# URL da aplicação (para links de e-mail e redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# HSTS (opcional, produção com HTTPS em todo o tráfego)
# ENABLE_HSTS=true
```

Cabeçalhos de segurança HTTP (ex.: `X-Frame-Options`, `X-Content-Type-Options`) são definidos no `next.config.mjs`. O HSTS (`Strict-Transport-Security`) só é adicionado se `ENABLE_HSTS=true` no ambiente de build/ runtime — veja comentários no `.env.example`.

**E-mail (opcional — para recuperação de senha):**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
SMTP_FROM=seu-email@gmail.com
```

*Sem configurar SMTP, a recuperação de senha pode não enviar e-mails; em desenvolvimento o sistema pode exibir o link no console.*

---

## 5. Instalar dependências

```bash
npm install
```

---

## 6. Rodar migrações e seeds (banco de dados)

```bash
# Criar tabelas
npm run db:migrate

# (Opcional) Popular dados iniciais
npm run db:seed
```

---

## 7. Rodar o projeto

**Desenvolvimento (com hot reload):**

```bash
npm run dev
```

Acesse: **http://localhost:3000**

**Produção (build + servidor):**

```bash
npm run build
npm start
```

---

## Comandos úteis

| Comando           | Descrição                    |
|-------------------|------------------------------|
| `npm run dev`     | Servidor de desenvolvimento  |
| `npm run build`   | Build para produção          |
| `npm start`       | Iniciar em modo produção     |
| `npm run lint`    | Rodar ESLint                 |
| `npm run db:migrate`   | Executar migrações     |
| `npm run db:undo`     | Desfazer última migração |
| `npm run db:seed`     | Executar seeds          |

---

## Solução de problemas (Ubuntu)

### Erro ao instalar dependências (bcrypt / node-gyp)

Instale as ferramentas de build:

```bash
sudo apt install -y build-essential python3
npm install
```

### PostgreSQL: "connection refused"

- Verifique se o serviço está rodando: `sudo systemctl status postgresql`
- Confirme host/porta/usuário/senha no `.env.local`

### Porta 3000 em uso

Use outra porta:

```bash
PORT=3001 npm run dev
```

### Permissão negada ao criar arquivos

Se aparecer erro de permissão em pastas do projeto, ajuste o dono (substitua `seu_usuario` pelo seu usuário Linux):

```bash
sudo chown -R seu_usuario:seu_usuario /home/mauricio/Documentos/APAEagenda
```

---

## Licença

ISC
