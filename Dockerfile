# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

# --- Run stage ---
FROM node:20-alpine AS runner

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/build ./build
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/svelte.config.js ./svelte.config.js

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "build/index.js"]