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

        const choicesWithChildren = await Promise.all(choices.map(async (parentChoice: any) => {
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