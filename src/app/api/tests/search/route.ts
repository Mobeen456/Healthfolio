import { prisma } from "@/components/resources/lib/prisma";
import { NextResponse, NextRequest } from 'next/server';

export default async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query');

    const tests = await prisma.test.findMany({
      where: {
        name: {
          contains: query as string
        }
      }
    });
    return NextResponse.json({ tests }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch tests' }, { status: 500 });
  }
}
