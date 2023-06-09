import {Conversation,Message,User} from "@prisma/client";

//type is more flexible than interface,can handle type operatios (e.g union)
//FullMessageType has 2 additinal properties 
export type FullMessageType = Message & {
    sender:User,
    seen:User[]
}

export type FullConversationType = Conversation & {
    users:User[],
    messages:FullMessageType[]
}