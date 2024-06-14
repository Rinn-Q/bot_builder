import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const choices = await prisma.choice.findMany();

        return Response.json({
            data: {
                choices
            }
        });
    } catch (error: any) {
        return Response.json({
            status: 500,
            error: error.message
        }), {
            headers: { 'Content-Type': 'application/json' }
        };
    }
}

export async function POST(req: Request) {
    const { choice_content, parent_id } = await req.json();

    if (!choice_content || !parent_id) {
        return Response.json({ message: "Invalid request" })
    }
    try {
        const choice = await prisma.choice.create({
            data: {
                choice_content,
                parent_id
            }
        });

        return Response.json(
            {
                data: {
                    choice
                }
            },
            { status: 201 }
        );
    } catch (error: any) {
        return Response.json({
            status: 500,
            error: error.message
        }), {
            headers: { 'Content-Type': 'application/json' }
        };
    }
}