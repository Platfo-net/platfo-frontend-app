# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /application
COPY package-*.json ./
COPY . .
RUN npm install

# build stage
FROM develop-stage as build-stage
RUN npm run build

# production stage
FROM steebchen/nginx-spa:stable as production-stage
COPY --from=build-stage /application/dist/spa /app
CMD ["nginx"]
EXPOSE 80
