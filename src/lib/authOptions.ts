import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { IdentityProvider } from "@prisma/client";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

const mapIDP = (idp: string): IdentityProvider => {
  switch (idp) {
    case "google":
      return IdentityProvider.GOOGLE;
    default:
      return IdentityProvider.YAY;
  }
};

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      type: "email",
      server: "",
      from: "onboarding@resend.dev",
    }),
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.email) {
        return false;
      }

      let findUserTodo = await prisma.todo.findMany({
        where: {
          userId: user.id,
        },
      });

      if (findUserTodo && findUserTodo.length < 1) {
        let newTodo = await prisma.todo.create({
          data: {
            name: "today",
            userId: user.id,
          },
        });
        if (!newTodo) return false;
      }

      //check the user provider
      //works without credentials
      if (account?.provider) {
        let savedUser = await prisma.user.findFirst({
          include: {
            accounts: {
              where: {
                provider: account.provider,
              },
            },
          },
          where: {
            identityProvider: mapIDP(account.provider),
          },
        });

        if (savedUser) {
          await prisma.user.update({
            where: {
              id: savedUser?.id,
            },
            data: {
              identityProvider: mapIDP(account.provider),
            },
          });
        }
        return true;
      }

      return false;
    },
    jwt: async ({ user, token, account }) => {
      // login with credentials
      if (account?.type === "credentials") {
        return {
          ...token,
          id: user?.id,
          email: user.email,
        };
      }

      if (user) {
        token.uid = user.id;
      }
      return token;
    },

    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export default authOptions;
