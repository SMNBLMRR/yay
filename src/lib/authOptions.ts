import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { IdentityProvider } from "@prisma/client";
import { AuthOptions } from "next-auth";
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
  providers: [
    EmailProvider({
      type: "email",
      server: "",
      from: "onboarding@resend.dev",
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "text",
    //       placeholder: "Enter your email address...",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "*********",
    //     },
    //   },
    //   //@ts-ignore
    //   async authorize(credentials, req) {
    //     if (!isValidCredentials(credentials as any))
    //       throw new Error("Invalid credentials");

    //     console.log(credentials?.email)
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         //@ts-ignore
    //         email: credentials?.email,
    //       },
    //     });

    //     console.log(user);

    //     if (!user) return null;

    //     const isCorrectPassword = await bcryptjs.compare(
    //       //@ts-ignore
    //       credentials?.password,
    //       //@ts-ignore
    //       user.password
    //     );

    //     if (!isCorrectPassword) return null;

    //     return {
    //       id: user?.id,
    //       email: user.email
    //     };
    //   },
    // }),
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.type === "credentials") {
        return true;
      }
      if (!user.email) {
        return false;
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
