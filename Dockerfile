FROM node:22 as builder
WORKDIR /app
COPY package.*json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:22 as runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4002
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4002
CMD ["node", "build"]