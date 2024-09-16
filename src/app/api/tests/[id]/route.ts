import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/components/resources/lib/prisma";

export async function GET(request: NextRequest) {

    const url = new URL(request.url);

    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Test ID is required' }, { status: 400 });
    }

    const test = await prisma.test.findUnique({
        where: {
            id: String(id),
        },
    });

    if (!test) {
        return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json({ test }, { status: 200 });

}