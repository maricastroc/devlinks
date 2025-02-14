#!/bin/sh
# Instala as dependências do Laravel
composer install --no-dev --optimize-autoloader
npm install && npm run build
# Gera o cache de configuração e migra o banco de dados
php artisan config:cache
php artisan migrate --force