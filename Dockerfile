# 第一阶段：编译 (Build Stage)
FROM node:20-alpine AS builder

# [优化项] 安装必要的系统底层库，防止 Next.js 的 SWC 编译器崩溃
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# [优化项] 关闭 Vercel 遥测，加快构建速度
ENV NEXT_TELEMETRY_DISABLED=1
# 注入前端构建期需要的公开环境变量
ENV NEXT_PUBLIC_API_URL="https://api.fyzj.online"
ENV NEXT_PUBLIC_CASDOOR_URL="https://auth.fyzj.online"

RUN pnpm build

# 第二阶段：运行 (Runner Stage)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0

# 注意：以下环境变量必须在运行时通过 docker-compose env_file 或 -e 参数注入：
# - NEXTAUTH_SECRET (必需)
# - NEXTAUTH_URL (必需)
# - NEXTAUTH_TRUST_HOST=true (必需，用于 HTTPS)
# - CASDOOR_CLIENT_ID
# - CASDOOR_CLIENT_SECRET
# - CASDOOR_ISSUER

# 只从编译阶段拷贝必要的文件，减小体积
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# 启动 Standalone 模式下的精简服务
CMD ["node", "server.js"]