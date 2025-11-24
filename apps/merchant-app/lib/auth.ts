import GoogleProvider from "next-auth/providers/google";
import { prisma as db } from "@repo/db/client";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
      async signIn({ user, account }) {
        console.log("hi signin")
        if (!user || !user.email) {
          return false;
        }

        if (!account || (account.provider !== "google" && account.provider !== "github")) {
          return false;
        }

        await db.merchant.upsert({
          select: {
            id: true
          },
          where: {
            email: user.email
          },
          create: {
            email: user.email,
            name: user.name || null,
            auth_type: account.provider === "google" ? "Google" : "Github"
          },
          update: {
            name: user.name || null,
            auth_type: account.provider === "google" ? "Google" : "Github"
          }
        });

        return true;
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
  }