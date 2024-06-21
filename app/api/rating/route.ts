import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const rating = await prisma.rating.aggregate({
            _avg: {
                rating: true,
            },
        });

        console.log("aaaaa");
        console.log(rating);

        return new Response(JSON.stringify(rating._avg), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch rating' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}
