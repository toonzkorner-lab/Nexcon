# N3xUs Konc3pt'z rebuild — Coolify / Docker deploy.
# Coolify builds this with its Dockerfile build pack. The nitro preset is
# switched to "node-server" so the output is a standalone Node server
# (the repo default "vercel" preset only runs on Vercel).
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
# Build-time flags (process.env wins over .grok/app-env.json):
ENV NITRO_PRESET=node-server
ENV VITE_AUTH_ENABLED=true
# `npm run build` = vite build + db:migrate. The migrator skips itself when
# DATABASE_URL is unset, so the build works with no database attached.
RUN npm run build

FROM node:22-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

# Nitro's node-server output is self-contained (bundled server).
COPY --from=build /app/.output ./.output

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
