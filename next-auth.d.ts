import NextAuth from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      githubId?: string
      username?: string
      avatarUrl?: string
      accessToken?: string
    } & DefaultSession["user"]
    accessToken?: string
  }

  interface User {
    githubId?: string
    username?: string
    avatarUrl?: string
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    githubId?: string
    username?: string
    avatarUrl?: string
    accessToken?: string
  }
}

declare module "next-auth/core/types" {
  interface Profile {
    id: string
    login: string
    avatar_url: string
    email?: string | null
  }
}
