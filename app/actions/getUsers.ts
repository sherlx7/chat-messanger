import prisma from "@/app/libs/prismadb";
import { getSupportedBrowsers } from "next/dist/build/utils";
import getSession from "./getSession";

const getUsers = async()=> {
    const session = await getSession();
    if (!session?.user?.email) {
        return[]
    }

    try{
        //users is an array of user.find every user that is not their own user
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt:'desc'
            },
            where:{
                NOT:{
                    email:session.user.email
                }
            }
        })
        return users;
    }catch(error:any){
        return [];
    }
}

export default getUsers;
