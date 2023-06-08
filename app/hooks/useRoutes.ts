import { usePathname } from "next/navigation";
import {useMemo} from "react";
import {HiChat} from "react-icons/hi";
import {HiArrowLeftOnRectangle,HiUsers} from "react-icons/hi2";
import {signOut} from "next-auth/react";
import useConversation from "./useConversation";

//purpose of code:provided a memoized array of route objects 
//based on the current pathname and conversationId
const useRoutes=()=>{
    const pathname = usePathname();
    const {conversationId} = useConversation();

    //routes array consists of routes objects
    //each object represents a specific route with properties
    const routes = useMemo(()=>[
        {
            label:'Chat',
            href:'/conversations',
            icon:HiChat,
            //if true,active property is set to true,indicating the route is active
            active:pathname==='/conversations || !! conversationId'
        },
        {
            label:'Users',
            href:'/users',
            icon:HiUsers,
            active:pathname==='/users'
        },
        {
            label:'logout',
            href:'#',
            onClick:()=>signOut(),
            icon:HiArrowLeftOnRectangle
        }
    ],[pathname,conversationId])

    return routes;
}

export default useRoutes;