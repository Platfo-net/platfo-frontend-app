# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /app
COPY package-*.json ./
COPY . .
RUN npm install

# build stage
FROM develop-stage as build-stage
RUN npm run install
RUN npm run build

# production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
