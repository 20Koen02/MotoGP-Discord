# install deps
FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN apk add g++ make python3 py3-pip
COPY package*.json ./
RUN npm install
COPY . .

# build
FROM base as builder
WORKDIR /usr/src/app
RUN npm run build


# production
FROM node:20-alpine
WORKDIR /usr/src/app
RUN apk add g++ make python3 py3-pip
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
ENTRYPOINT ["npm","run", "start"]