import getConversations from "../actions/getConversation"
import Sidebar from "../components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    //conversations is of type FullConversationType[],so the child that gets 
    //the prop conversations needs to be declared of that new type
    const conversations=await getConversations();

    return (
        //@ts-ignore
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    // users={users}
                    // title="Messages"
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}