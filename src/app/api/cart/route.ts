// Import necessary packages
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/components/resources/lib/prisma';

export async function POST(request : NextRequest){
    try {
      const { testId, userId } = await request.json();

      // Create a new test in the database
      const cart = await prisma.cart.create({
            data: {
                userId: String(userId), // Assuming user is logged in and has an id
                testId: String(testId),
              },
      });

      return NextResponse.json({
        cart,
      }, {status:201})
    } catch (error) {
      console.error('Error adding to cart:', error);
      return NextResponse.json({ error: 'Unable to create test' }, { status: 500 });
    }
}
