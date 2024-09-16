import { prisma } from "@/components/resources/lib/prisma";
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const limit = url.searchParams.get('limit');
  
  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const tests = await prisma.test.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: limit ? parseInt(limit) : undefined,
  });

  return NextResponse.json({ tests }, { status: 200 });
}
