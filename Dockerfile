FROM idock.daumkakao.io/rotterdam/dockers:nodejs16 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
ARG STAGE
COPY . .
RUN mv ./.env.${STAGE} ./.env.production
RUN npm run build

FROM idock.daumkakao.io/rotterdam/dockers:nodejs16
WORKDIR /app
COPY --from=builder /app ./
USER node
CMD ["npm", "run", "start"]
