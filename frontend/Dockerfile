FROM node:16.13-bullseye-slim
WORKDIR /frontend
CMD ["npm", "start"]

COPY package.json package-lock.json ./

RUN npm ci

COPY . .
