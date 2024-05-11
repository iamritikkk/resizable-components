FROM node:20-alpine as node

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest as prod

COPY --from=node /app/dist /usr/share/nginx/html
COPY --from=node /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]