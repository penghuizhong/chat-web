# 第一阶段：编译 (Build Stage)
FROM node:20-alpine AS builder

# [填坑2] 安装必要的系统底层库，防止 Next.js 编译器崩溃
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# 关闭 Vercel 遥测，加快构建速度
ENV NEXT_TELEMETRY_DISABLED=1

# [填坑1] 接收构建参数，并作为环境变量传递给 build 进程
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm build

# 第二阶段：运行 (Runner Stage)
FROM node:20-alpine AS runner
WORKDIR /app

# [填坑2] 运行阶段也极其需要 libc6-compat，防止 sharp 处理图片时引发 502 崩溃
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV CASDOOR_INTERNAL_URL=http://casdoor:8000
ENV HOSTNAME=0.0.0.0
# [填坑3] 显式声明端口，确保 server.js 准确绑定
ENV PORT=3000

# 只从编译阶段拷贝必要的文件，减小体积
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# 启动 Standalone 模式下的精简服务
CMD ["node", "server.js"]