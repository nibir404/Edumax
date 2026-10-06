# ==============================================================================
# EDUMAX SAAS — ENTERPRISE 1M SCALE DOCKERFILE
# Multi-stage production build with non-root security, Node 22 LTS, and minimal image size.
# ==============================================================================

# --- Stage 1: Build & Bundle ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for Vite compilation)
RUN npm ci

# Copy full application source
COPY . .

# Compile optimized frontend production assets
RUN npm run build

# --- Stage 2: Production Runtime ---
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5001
ENV CLUSTER_WORKERS=auto

# Install dumb-init to properly handle PID 1 signals and avoid zombie processes
RUN apk add --no-cache dumb-init

# Copy dependency manifests and install production-only dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled frontend assets and backend server source
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/public ./public
COPY --from=builder /app/index.html ./index.html

# Create non-root user for enterprise container security compliance
RUN addgroup -S edumax && adduser -S -G edumax edumax && \
    chown -R edumax:edumax /app

USER edumax

# Expose API & Cluster Port
EXPOSE 5001

# Healthcheck probe pointing to native Kubernetes readiness endpoint
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/health/live || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server/cluster.js"]
