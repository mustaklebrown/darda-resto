import prisma from "@/lib/prisma"
import MenuForm from "./menu-form"
import { Suspense } from "react"

async function getMenuData(id: string) {
    const [menu, plates, categories] = await Promise.all([
        prisma.menu.findUnique({
            where: { id },
            include: {
                plates: true,
                categories: true,
            },
        }),
        prisma.plate.findMany({
            orderBy: { name: "asc" },
        }),
        prisma.category.findMany({
            orderBy: { name: "asc" },
        })
    ])

    return { menu, plates, categories }
}

// Separate async component that handles BOTH params AND data fetching
async function EditMenuContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { menu, plates, categories } = await getMenuData(id)

    if (!menu) throw new Error("Menu not found")

    return (
        <MenuForm
            menu={menu}
            plates={plates}
            categories={categories}
        />
    )
}

export default function EditMenuPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8">Chargement...</div>}>
            <EditMenuContent params={params} />
        </Suspense>
    )
}
