FROM node:20-alpine AS build

WORKDIR /app

ARG FE_DOMAIN
ARG AUDIENCE
ARG CLIENT_ID
ARG AUTH0_DOMAIN
ARG API_URL

ENV VITE_AUTH0_DOMAIN=${AUTH0_DOMAIN:-dev-1mjbz4bksk6s33g6.us.auth0.com}
ENV VITE_AUTH0_CLIENT_ID=${CLIENT_ID:-Vt3DrYkfhFVSneuIZX3l7Cl6ZkQCw9V8}
ENV VITE_AUTH0_CALLBACK_URL=${FE_DOMAIN:-https://wowtogo.com}/callback
ENV VITE_AUTH0_AUDIENCE=${AUDIENCE:-https://wowtogo.org}
ENV VITE_API_URL=${API_URL:-https://api-wowtogo.com}

COPY package*.json ./
RUN npm i npm-run-all --save-dev
RUN npm i --package-lock-only

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]