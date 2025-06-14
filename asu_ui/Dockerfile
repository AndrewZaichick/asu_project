FROM nginx:stable

RUN rm /etc/nginx/conf.d/default.conf

COPY ./config/default.conf /etc/nginx/conf.d/

COPY . /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
