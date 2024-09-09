import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/components/resources/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const tests = await prisma.test.findMany();
        console.log(tests);
        return NextResponse.json({ tests }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Unable to fetch tests' }, { status: 500 });
    }
}
