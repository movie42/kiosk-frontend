FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm ci
RUN npm run build

FROM nginx:1.18
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]