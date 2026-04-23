FROM node:20-alpine AS builder
WORKDIR /app

ARG NUXT_PUBLIC_API_BASE_PATH=/api
ENV NUXT_PUBLIC_API_BASE_PATH=$NUXT_PUBLIC_API_BASE_PATH
ENV NUXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json tsconfig.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm ci

COPY apps/web apps/web
COPY packages/shared packages/shared

RUN npm run build --workspace @pso/shared \
  && npm run generate --workspace @pso/web

FROM nginx:1.27-alpine
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/.output/public /usr/share/nginx/html
