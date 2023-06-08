import { useParams } from "next/navigation";
import {useMemo} from "react";
import { parseArgs } from "util";

const useConversation=()=>{
    const params = useParams();
    //usememo takes in a function and a dependency array
    //memoized value is only recalculated when one or more dependencies 
    //in the dependency array change
    const conversationId = useMemo(()=>{
        if (!params?.conversationId){
            return '';
        }
        return params.conversationId as string;
    },[params?.conversationId])

    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return useMemo(()=>({
        isOpen,conversationId
    }),[isOpen,conversationId])
}

export default useConversation;