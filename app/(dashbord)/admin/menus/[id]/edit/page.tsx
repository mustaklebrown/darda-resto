import prisma from "@/lib/prisma"
import MenuForm from "./menu-form"

export default async function EditMenuPage({ params }: { params: Promise<{ id: string }> }) {
    const menu = await prisma.menu.findUnique({
        where: { id: (await params).id },
        include: {
            plates: true,
            categories: true,
        },
    })

    const plates = await prisma.plate.findMany({
        orderBy: { name: "asc" },
    })

    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    })

    if (!menu) throw new Error("Menu not found")

    return (
        <MenuForm
            menu={menu}
            plates={plates}
            categories={categories}
        />
    )
}
