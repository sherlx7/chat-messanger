import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUSer=async()=>{
    try{
        const session = await getSession();
        if (!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where:{
                email:session.user.email as string
            }
        })

        if (!currentUser){
            return null;
        }

        return currentUser;
    } catch(erorr:any){
        return null;
    }
}

export default getCurrentUSer;