FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npm run build

ENV PORT=1337

EXPOSE ${PORT}
CMD ["npm", "start"]