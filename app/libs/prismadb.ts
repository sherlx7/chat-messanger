import {PrismaClient} from "@prisma/client";

//makes "prisma" variable accessible from any part of the codebase
declare global{
    //variable can be PrismaClient or undefined
    var prisma: PrismaClient|undefined
}

//client:is a PrismaClient instance,allows other parts of app to import 'client'
//and interact with database
const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != 'production')  globalThis.prisma = client;

export default client;