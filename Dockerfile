FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent
RUN npm install react-scripts -g

COPY . ./

RUN npm run build

FROM node:18-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/build /app/.
RUN npm install -g serve

EXPOSE 3000

CMD [ "serve" ]