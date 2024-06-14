import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    try {
        const choices = await prisma.choice.findMany({
            where: {
                parent_id: id
            }
        });

        const choicesWithChildren = await Promise.all(choices.map(async (parentChoice) => {
            const childChoices = await prisma.choice.findMany({
                where: {
                    parent_id: parentChoice.id
                }
            });
            return {
                ...parentChoice,
                children: childChoices
            };
        }));


        return Response.json({
            choicesWithChildren
        });

    } catch (error: any) {
        return Response.json({
            status: 500,
            error: error.message
        });
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const { new_choice_content } = await request.json();

    if (!new_choice_content) {
        return Response.json({
            message: "Invalid request",
        },
            {
                status: 400
            });
    }

    try {
        const updatedChoice = await prisma.choice.update({
            where: {
                id
            },
            data: {
                choice_content: new_choice_content
            }
        });

        return Response.json({ data: updatedChoice }, { status: 200 })
    }
    catch (error: any) {
        return Response.json({
            status: 500,
            error: error.message
        });
    }

}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    try {
        const deletedChoice = await prisma.choice.delete({
            where: {
                id: Number(id)
            }
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