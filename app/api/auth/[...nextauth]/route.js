import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      authorize: async (credentials) => {
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const passwordMatch = user.password === credentials.password;

            if (passwordMatch && user.role === credentials.role) {
              return {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile_img: user.profile_img,
              };
            }
          }

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      try {
        await connectDB();

        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          session.user = {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            profile_img: dbUser.profile_img,
          };
        }
        return session;
      } catch (err) {
        console.error(err);
      }
    },

    async jwt({ user, token }) {
      if (user) {
        // Note that this if condition is needed
        token.user = { ...user };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
