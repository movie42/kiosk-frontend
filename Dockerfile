FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY src ./src

RUN npm ci
RUN npm run build

CMD ["npm", "run" ,"start:prod"]