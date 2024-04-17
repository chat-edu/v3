import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
        session({ session, token }) {
            if(session.user) {
                session.user.id = token.sub || "";
            }
            return session;
        }
    }
})

export { handler as GET, handler as POST }