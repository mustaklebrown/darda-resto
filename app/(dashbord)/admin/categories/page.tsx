// import CategoryForm from '@/app/_components/category-form'
// import prisma from '@/lib/prisma'


// export default async function CategoriesPage() {
//     const categories = await prisma.category.findMany({
//         orderBy: { createdAt: 'asc' },
//     })

//     return (
//         <div>
//             <h1 className="text-3xl font-semibold mb-8">
//                 Catégories
//             </h1>

//             <CategoryForm />

//             <div className="mt-10 space-y-4">
//                 {categories.map(cat => (
//                     <div
//                         key={cat.id}
//                         className="
//               flex items-center justify-between
//               rounded-2xl border border-border/40
//               bg-background/70 dark:bg-card/60
//               backdrop-blur-xl p-6
//             "
//                     >
//                         <span>{cat.name}</span>
//                         <span className="text-muted-foreground text-sm">
//                             {cat.slug}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

import prisma from '@/lib/prisma'
import { CategoryTile } from './category-tile'
import { CategoryForm } from './category-form'

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
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

