FROM nginx:stable-alpine

WORKDIR /etc/nginx/conf.d

COPY nginx/nginx.conf .
run mv nginx.conf default.conf

WORKDIR /var/www/html

COPY src .
