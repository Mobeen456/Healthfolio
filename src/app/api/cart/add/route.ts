import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/components/resources/lib/prisma";

export default async function POST(request: NextRequest) {
    try {
        const { testId, userId } = await request.json();
        const cartItem = await prisma.cart.create({
            data: {
                userId: String(userId),
                testId: String(testId),
                quantity: 1, 
            },
        });
        return NextResponse.json({
            cartItem,
        }, { status: 201 });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json({ error: 'Unable to create test' }, { status: 500 });
    }

}