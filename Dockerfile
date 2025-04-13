FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build


CMD ["sh", "-c", "npm i &&npx prisma generate && npm run dockerseed && node dist/src/main.js"]