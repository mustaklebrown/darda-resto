

import prisma, { Category } from '@/lib/prisma'
import { CategoryTile } from './category-tile'
import { CategoryForm } from './category-form'

export default async function CategoriesPage() {
    const categories: Category[] = await prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Categories</h1>

            {/* Create */}
            <CategoryForm />

            {/* Grid */}
            <div className="flex flex-col gap-6">
                {categories.map((category) => (
                    <CategoryTile
                        key={category.id}
                        category={category}

                    />
                ))}
            </div>
        </div>
    )
}

