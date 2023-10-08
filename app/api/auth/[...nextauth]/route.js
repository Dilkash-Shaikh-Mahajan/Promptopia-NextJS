import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectionDB } from '@utils/database';
import User from '@models/user';
console.log(
	`process.env.GOOGLE_CLIENT_SECRET ${process.env.GOOGLE_CLIENT_SECRET}`,
);
const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: `${process.env.GOOGLE_CLIENT_ID}`,
			clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
		}),
	],
	secret: 'IamVeryHandsome',
	callbacks: {
		async session({ session }) {
			try {
				const sessionUser = await User.findOne({
					email: session.user.email,
				});
				session.user.id = sessionUser._id.toString();
				return session;
			} catch (error) {}
		},
		async signIn({ profile }) {
			try {
				await connectionDB();

				const userExist = await User.findOne({
					email: profile.email,
				});
				console.log(userExist);
				if (!userExist) {
					await User.create({
						email: profile.email,
						username: profile.name
							.replace(' ', '')
							.toLowerCase(),
						image: profile.picture,
					});
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
