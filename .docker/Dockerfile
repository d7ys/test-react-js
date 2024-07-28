FROM node:20.4.0-alpine as build

WORKDIR /srv/frontend/

RUN npm i -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm i

COPY . .

RUN pnpm build-only

FROM nginx:alpine

COPY --from=build /srv/frontend/dist /var/www/html

COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN chown nginx:nginx /var/www/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
