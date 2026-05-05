import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"

const config: NextAuthConfig = {
    debug: true,
    providers: [
        {
            id: "casdoor",
            name: "Casdoor",
            type: "oidc", // 核心 1：指定为标准的 oidc 类型
            clientId: process.env.CASDOOR_CLIENT_ID!,
            clientSecret: process.env.CASDOOR_CLIENT_SECRET!,
            issuer: process.env.CASDOOR_ISSUER!,

            checks: ["pkce", "state"],

            // 核心 3：对 Casdoor 返回的用户信息做兼容解析，防止报 502
            profile(profile) {
                return {
                    // 优先取 sub，如果没有则取 id，绝对不能返回 undefined
                    id: profile.sub || profile.id,
                    name: profile.name || profile.preferred_username || profile.displayName,
                    email: profile.email,
                    image: profile.picture || profile.avatar,
                }
            },
        },
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // account 只在首次登录回调时存在
            if (account) {
                token.accessToken = account.access_token
                token.expiresAt = account.expires_at
            }
            // 兼容 sub 字段获取
            if (profile) {
                token.sub = profile.sub || profile.id || token.sub
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            session.user.id = token.sub as string
            return session
        },
    },
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)