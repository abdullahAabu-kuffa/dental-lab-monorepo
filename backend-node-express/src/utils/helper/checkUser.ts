import { prisma } from "../../lib/prisma"

export const  checkUser = async(userId :number) => {
    const user = await prisma.user.findUnique({where:{id:userId}})
    if(!user) {throw new Error('user Not Exist')}
    if (!user.isActive) {
        throw new Error("User Is Not Active");
    }
    return user;
}

export const  parseId = (id: any) => {
    const num = parseInt(id);
    if (isNaN(num)) throw new Error("Invalid ID");
    return num;
}
