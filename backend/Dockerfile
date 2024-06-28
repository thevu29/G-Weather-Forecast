FROM php:8.0-apache

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo pdo_pgsql \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && rm -rf /var/lib/apt/lists/*

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

COPY . /var/www/html/
RUN composer dump-autoload --optimize

RUN a2enmod rewrite

EXPOSE 80