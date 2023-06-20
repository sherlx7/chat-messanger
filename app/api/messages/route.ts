import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


export async function POST(
    request:Request
) {
    try{
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            message,
            image,
            conversationId
          } = body;

          if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
          }

          //create a new message
          const newMessage = await prisma.message.create({
            include: {
              seen: true,
              sender: true
            },
            data: {
              body: message,
              image: image,
              conversation: {
                connect: { id: conversationId }
              },
              sender: {
                connect: { id: currentUser.id }
              },
              seen: {
                connect: {
                  id: currentUser.id
                }
              },
            }
          });

          //update the conversation with the new message
          const updatedConversation = await prisma.conversation.update({
            where: {
              id: conversationId
            },
            data: {
              lastMessageAt: new Date(),
              messages: {
                connect: {
                  id: newMessage.id
                }
              }
            },
            include: {
              users: true,
              messages: {
                include: {
                  seen: true
                }
              }
            }
          });
        
          return NextResponse.json(newMessage)

    } catch(error:any){
        console.log(error,'ERROR MESSAGE');
        return new NextResponse('Internal Error',{status:500})
    }
}