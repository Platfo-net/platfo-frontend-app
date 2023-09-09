# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /app
COPY package-*.json ./
COPY . .
RUN npm install

# build stage
#FROM develop-stage as build-stage
#RUN npm run install
#RUN npm run build

# production stage
FROM develop-stage as production-stage
CMD ["npm", "run", "dev"]
EXPOSE 5050
