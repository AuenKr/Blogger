FROM node:20-alpine

WORKDIR /backend

COPY ./package.json .
RUN npm install

COPY ./prisma ./prisma
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev:docker"]
