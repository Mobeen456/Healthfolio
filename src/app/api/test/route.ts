// Import necessary packages
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the handler for the API route
export async function POST(request : NextRequest){
    try {
      const { name, description, price } = await request.json();

      // Create a new test in the database
      const test = await prisma.test.create({
        data: {
          name,
          description,
          price,
        },
      });

      return NextResponse.json({
        test,
      }, {status:201})
    } catch (error) {
      console.error('Error creating test:', error);
      return NextResponse.json({ error: 'Unable to create test' }, { status: 500 });
    }
}
