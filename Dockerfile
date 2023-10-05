FROM node:18
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT ["node", "/app/index.js"]