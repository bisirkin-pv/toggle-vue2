FROM node:14 as build-stage
# В эту переменную нужно передавать ulr backend'a
ARG VUE_APP_BACKEND_URL
ENV VUE_APP_BACKEND_URL ${VUE_APP_BACKEND_URL}

WORKDIR /src

COPY package*.json ./

# RUN npm install
# Если вы создаете сборку для продакшн
RUN npm ci --only=production

COPY . .

RUN npm run build

# production-stage
FROM nginxinc/nginx-unprivileged as production-stage
COPY --from=build-stage /src/dist /code
COPY --from=build-stage /src/docker/nginx/prod.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
