import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
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

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*', // Use '*' for testing, replace with specific domain in production
            'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, ngrok-skip-browser-warning',
        }
    });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const { new_answer_content } = await request.json();
    console.log(id, " shuu de ho");
    // if (!new_answer_content) {
    //     return Response.json({
    //         message: "Invalid request",
    //     },
    //         {
    //             status: 400
    //         });
    // }

    try {
        const updatedAnswer = await prisma.answer.update({
            where: {
                id: id
            },
            data: { answer_content: new_answer_content }
        });

        return Response.json(updatedAnswer)
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