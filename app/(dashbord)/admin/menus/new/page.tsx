import CreateMenuForm from '@/app/_components/admin/create-menu-form'
import prisma from '@/lib/prisma'
import { Suspense } from 'react'
import { cacheLife } from 'next/cache'

async function getMenuOptions() {
    "use cache"
    cacheLife("minutes")

    return await Promise.all([
        prisma.plate.findMany({
            orderBy: { name: 'asc' },
        }),
        prisma.category.findMany({
            orderBy: { name: 'asc' },
        })
    ])
}

async function CreateMenuContent() {
    const [plates, categories] = await getMenuOptions()

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

export default function CreateMenuPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8">Chargement...</div>}>
            <CreateMenuContent />
        </Suspense>
    )
}
