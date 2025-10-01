# Requisitos para produção do projeto:
- `PHP >= 8.2`
- `Composer`
- `Node.js e NPM`

## Configurar o projeto:
Após clonaro projeto, Entre na pasta do projeto com:
```bash
cd fithub-project
```
### Instale as dependências:
``` bash
composer install
```

### Atualizndo as dependências do frontend:
```
npm install
```

### Crie suas variáveis de ambiente:
```bash
cp .env.example .env
```

### Gere a chave de aplicação:
```bash
php artisan key:generate
```

### Crie a pasta a pasta do DB para o SQLite:
```bash
touch database/database.sqlite
```


## Por fim para rodar o projeto, é preciso de 2 terminais rodando, primeiro inicie o servidor backend com:
```bash
php artisan serve
```

## No segundo terminal inicie com:
```bash
npm run dev
```