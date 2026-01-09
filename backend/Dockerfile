FROM node:25-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production 

COPY src ./src

EXPOSE 8008

CMD ["node", "src/server.js"]
