import { prisma } from "../../lib/prisma"

export const  checkOrder = async(orderId :number) => {
    const order = await prisma.order.findUnique({where:{id:orderId}})
    if(!order) {throw new Error('user Not Exist')}
    
    return order;
}