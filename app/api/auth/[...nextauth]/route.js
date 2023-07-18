import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';
import User from '@/app/models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: "https://discover-prompts.vercel.app/api/auth/callback/google"
        })
    ],
    callbacks: {

        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id=sessionUser._id.toString();
    
            return session;
    
        }, 
        // async signIn({ profile }) {
        //     try {
        //         await connectToDB();
        // //Check if a user already exists in the database
        // const userExists = await User.findOne({ email: profile.email });
    
        // //If not create a new user in the database
        // if(!userExists){
        //     await User.create({
        //         email: profile.email,
        //         username: profile.name.replace(" ", "").toLowerCase(),
        //         image: profile.picture,
        //     });
        // }
    
        // return true;
        //     } catch(error) {
        //         console.log(error);
        //         return false;
        //     }
        // }

    }
    
})  


export {handler as GET, handler as POST}