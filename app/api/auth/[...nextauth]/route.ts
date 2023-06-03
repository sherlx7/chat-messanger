import bcrypt from "bcrypt";
import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb"

export const authOptions:AuthOptions={
    //adapter:establishes connection between app and database
    //'prisma' variable is an instance of PrismaClient,is passed to PrismaAdapter as arg
    //'PrismaAdapter' uses the prisma instance to handle database queries
    //'adapter' property is being set with an instance of the PrismaAdapter class
    adapter:PrismaAdapter(prisma),

    //configure authentication providers
    providers:[
        GitHubProvider({
            //clientId:unique identifier assigned to your application 
            //when you register it with the authentication provider
            //sensitive info is stored in env variables,not hard coded into source code
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        
        //CredentialsProvider is like other providers,except need to define a handler
        //for authorize() that accepts credentials submitted via HTTP POST
        //and returns either a user or throw an error
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name:'credentials',

            //`credentials` is used to generate a form on the sign in page.
            credentials:{
                email:{label:'email', type:'text'},
                password:{label:'password',type:'password'},
            },

            async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied


            //syntax:?.:is optional chaining operator.when 'credentials' obj is null
            //or undefined,it returns undefined instead of throwing a TypeError 
            //when trying to access the email or password properties.
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials');
                //NOTE:Throwing an error in this case will trigger NextAuth.js to handle 
                //the error and provide appropriate feedback to the user
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                });

                //user.hashedPassword comes from the retrieved user above
                if (!user || !user?.hashedPassword) {
                    throw  new Error('Invalid Credentials')
                }

                //bcrypt.compare takes in 2 args,the plaintext password and hashed password
                //it uses bcrypt algo and checks if plaintext password matches hased password
                //it returns a promise.But putting await resolves it to a boolean (await the promise)
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials')
                }
                return user
            }
        })
    ],
    //debug option is true when in development,which enables debug logs
    debug: process.env.NODE_ENV === 'development',
    session:{
        //configures session management strategy for NextAuth to use jwt,
        //which meansit will encode and sign session information as JSON Web Tokens
        //allows for stateless and secure session handling.
        strategy:"jwt",
    },
    //this sets the secret used for signing and encrypting session cookies and tokens
    //secret should be a long random string and kept confidential 
    //(a strong secret ensures security of session cookies and tokens)
    secret:process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};