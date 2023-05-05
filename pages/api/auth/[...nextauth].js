import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "715aebdcbfc6886408b7",
      clientSecret: "1b6a3b6dcc7c0fc0d7a9c6eab3c084a0c08cd6c0",
    }),
  ],
  secret: "qwer1234",
};
export default NextAuth(authOptions);
