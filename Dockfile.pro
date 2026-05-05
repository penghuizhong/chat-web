# 第一阶段：编译 (Build Stage)
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ENV 放在 COPY 源码之前，充分利用缓存
ENV NEXT_TELEMETRY_DISABLED=1
# ✅ NEXT_PUBLIC_ 变量仍需在此声明（build 时内联）
# ✅ 但建议通过 ARG 从外部传入，避免硬编码
ARG NEXT_PUBLIC_API_URL="https://api.fyzj.online"
ARG NEXT_PUBLIC_CASDOOR_URL="https://auth.fyzj.online"
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_CASDOOR_URL=$NEXT_PUBLIC_CASDOOR_URL

COPY . .
RUN pnpm build

# 第二阶段：运行 (Runner Stage)
FROM node:20-alpine AS runner

# ✅ runner 阶段也需要 libc6-compat
RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# ✅ 创建非 root 用户运行，提升安全性
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]