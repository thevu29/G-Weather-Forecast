# backend/Dockerfile
FROM php:8.0-apache

# Copy source code to /var/www/html
COPY . /var/www/html

# Set working directory
WORKDIR /var/www/html

# Install Composer
RUN apt-get update && \
    apt-get install -y libzip-dev unzip && \
    docker-php-ext-install zip && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP dependencies
RUN composer install

# Expose port 80 for the web server
EXPOSE 80