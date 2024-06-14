import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    try {
        const answer = await prisma.answer.findFirst({
            where: {
                choice_id: Number(id)
            }
        });

        if (!answer) {
            return Response.json(
                {
                    message: "Not found",
                    data: null
                },
                {
                    status: 404
                })
        }
        return Response.json(answer)

    } catch (error: any) {
        console.error("Хариултыг авахад алдаа гарлаа:", error);
        return Response.json({
            status: 500,
            error: error.message
        })
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const { new_answer_content } = await request.json();

    if (!new_answer_content) {
        return Response.json({
            message: "Invalid request",
        },
            {
                status: 400
            });
    }

    try {
        const updatedAnswer = await prisma.answer.update({
            where: {
                id: id
            },
            data: { answer_content: new_answer_content }
        });

        return Response.json({ data: updatedAnswer }, { status: 200 })
    }
    catch (error: any) {
        console.error("Хариултыг засах алдаа гарлаа:", error);
        return Response.json({
            status: 500,
            error: error.message
        });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    try {
        const answer = await prisma.answer.delete({
            where: { id: id }
        });

        return Response.json({ data: null });
    }
    catch (error: any) {
        return Response.json({
            status: 500,
            error: error.message
        });
    }
}