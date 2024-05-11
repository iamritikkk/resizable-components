FROM node:20-alpine as node

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest as prod

COPY --from=node /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]