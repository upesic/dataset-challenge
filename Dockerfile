FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

EXPOSE 5173

COPY . .

ENTRYPOINT ["npm", "run", "dev", "--", "--host"]