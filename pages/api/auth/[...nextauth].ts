import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

export const authOptions: NextAuthOptions = {
  theme: "light",
  debug: true,
  session: {},
  jwt: {},
  providers: [
    Providers.Credentials({
      name: "LK3",

      credentials: {
        password: { label: "Nunca pares de...", type: "password" }
      },

      async authorize(credentials) {
        const req = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/LK3`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })

        const user = await req.json()
        if (req.ok && user) {
          return user
        }
        return null
      }
    })
  ]
}

export default NextAuth(authOptions);