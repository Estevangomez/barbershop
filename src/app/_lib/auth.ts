
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { Adapter } from "next-auth/adapters"
import { db } from "./prisma"


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) { 
                session.user = {
                    ...session.user,
                    id: user.id,
                }
            }            
            return session
        }
    }
}
