FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV JWT_SECRET hello
EXPOSE 3000
CMD ["npm", "run", "dev"]
