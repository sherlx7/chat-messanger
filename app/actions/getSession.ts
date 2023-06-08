import {getServerSession} from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/route";

export default async function getSession(){
    //returns a session
    return await getServerSession(authOptions)
}