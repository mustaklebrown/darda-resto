import CreateMenuForm from '@/app/_components/admin/create-menu-form'
import prisma from '@/lib/prisma'


export default async function CreateMenuPage() {
    const plates = await prisma.plate.findMany({
        orderBy: { name: 'asc' },
    })

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    })

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Create Menu</h1>

            <CreateMenuForm
                plates={plates}
                categories={categories}
            />
        </div>
    )
}
