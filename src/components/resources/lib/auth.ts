import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import { ZodError } from "zod";
import { signInSchema } from "@/components/resources/lib/zod";
import bycrpt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const { handlers, auth, ...rest } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { },
        password: { },
      },
      authorize: async (credentials) => {
        try {

          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("User not found.");
          }

         
          const isValidPassword = await bycrpt.compare  (
            password,
            user.password || "" 
          )

          if (!isValidPassword) {
            throw new Error("Invalid password.");
          }

         
          return user as any;
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error("Invalid input.");
          } else {
            throw error;
          }
        }
      },
    }),
    Google,
    Facebook,
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',  
  },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
})

