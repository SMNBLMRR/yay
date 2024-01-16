import { prisma } from "@/lib/prisma";
export async function getUserInfo(userId:string){
  return await prisma.user.findFirst({
    where:{
      id:userId
    },
    select:{
      todo:{
        orderBy:{
          createdAt:"desc"
        }
      },
      password:false,
      email:false,
      emailVerified:false,
      id:false,
    }
  })
}