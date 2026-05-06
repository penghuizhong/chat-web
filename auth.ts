// /src/auth.ts
import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"

const baseUrl = (process.env.CASDOOR_INTERNAL_URL || "").replace(/\/$/, "")

const config: NextAuthConfig = {
    debug: process.env.NODE_ENV === "development",

    providers: [
        {
            id: "casdoor",
            name: "Casdoor",
            type: "oidc",
            clientId: process.env.CASDOOR_CLIENT_ID!,
            clientSecret: process.env.CASDOOR_CLIENT_SECRET!,
            issuer: process.env.CASDOOR_ISSUER!,

            // // ✅ 内网加速：服务端请求全走内网
            // wellKnown: `${baseUrl}/.well-known/openid-configuration`,
            // token: `${baseUrl}/api/login/oauth/access_token`,
            // userinfo: `${baseUrl}/api/userinfo`,

            checks: ["pkce", "state"],

            // ✅ 来自这份代码的亮点：兼容 Casdoor 非标准字段
            profile(profile) {
                return {
                    id: profile.sub ?? profile.id,
                    name: profile.name ?? profile.preferred_username ?? profile.displayName,
                    email: profile.email,
                    image: profile.picture ?? profile.avatar,
                }
            },
        },
    ],

    callbacks: {
        jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
                // ✅ expiresAt 保留但后续要用，否则删掉
                token.expiresAt = account.expires_at
            }
            return token
        },
        session({ session, token }) {
            // ✅ 类型安全来自 next-auth.d.ts，无需断言
            if (token.accessToken) session.accessToken = token.accessToken
            if (token.sub) session.user.id = token.sub
            return session
        },
    },

    pages: { signIn: "/" },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)