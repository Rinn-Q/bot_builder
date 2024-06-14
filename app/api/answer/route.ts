import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const answers = await prisma.answer.findMany();
        return Response.json({
            data: {
                answers
            }
        });
    } catch (error: any) {
        console.error("Хариултуудыг авахад алдаа гарлаа:", error);
        return Response.json({
            status: 500,
            error: error.message
        })
    }
}

export async function POST(req: Request) {

    const { answer_content, choice_id } = await req.json();

    if (!answer_content || !choice_id) {
        return Response.json({ message: "Invalid request" })
    }
    try {
        const answer = await prisma.answer.create({
            data: {
                answer_content: answer_content,
                choice_id: choice_id
            }
        });
        return Response.json(
            {
                data: {
                    answer
                }
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error(`Хариулт үүсгэхэд алдаа гарлаа ${error}`);
        return Response.json({
            status: 500,
            error: error.message
        }), {
            headers: { 'Content-Type': 'application/json' }
        };
    }
}