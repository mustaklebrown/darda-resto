import { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { headers } from 'next/headers'

import prisma from '@/lib/prisma'
import { CategoryForm } from './category-form'
import { CategoryTile } from './category-tile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Utensils, LayoutGrid, Loader2 } from 'lucide-react'

// Separate component for fetching and displaying categories
async function CategoriesContent() {
    // Access headers to establish dynamic rendering before Prisma uses new Date()
    await headers()
    noStore()

    const plateCategories = await prisma.categoryPlate.findMany({
        orderBy: { name: 'asc' },
    })

    const menuCategories = await prisma.categoryMenu.findMany({
        orderBy: { name: 'asc' },
    })

    return (
        <Tabs defaultValue="plates" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8 h-12 p-1 bg-muted/50 rounded-xl">
                <TabsTrigger value="plates" className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Utensils className="h-4 w-4" />
                    Plats
                </TabsTrigger>
                <TabsTrigger value="menus" className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <LayoutGrid className="h-4 w-4" />
                    Menus
                </TabsTrigger>
            </TabsList>

            {/* ═══════════════════ Plate Categories ═══════════════════ */}
            <TabsContent value="plates" className="space-y-8 animate-in fade-in-50 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-lg bg-linear-to-br from-background to-muted/30">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Plus className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Nouvelle Catégorie (Plats)</CardTitle>
                                        <CardDescription>Ajoutez des catégories comme &apos;Entrées&apos;, &apos;Desserts&apos;, etc.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CategoryForm type="PLATE" />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {plateCategories.length > 0 ? (
                                plateCategories.map((cat) => (
                                    <CategoryTile key={cat.id} category={cat} type="PLATE" />
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center border-2 border-dashed rounded-3xl">
                                    <p className="text-muted-foreground">Aucune catégorie de plat trouvée.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </TabsContent>

            {/* ═══════════════════ Menu Categories ═══════════════════ */}
            <TabsContent value="menus" className="space-y-8 animate-in fade-in-50 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-lg bg-linear-to-br from-background to-muted/30">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Plus className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Nouvelle Catégorie (Menus)</CardTitle>
                                        <CardDescription>Ajoutez des catégories comme &apos;Petit-Déjeuner&apos;, &apos;Brunch&apos;, etc.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CategoryForm type="MENU" />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {menuCategories.length > 0 ? (
                                menuCategories.map((cat) => (
                                    <CategoryTile key={cat.id} category={cat} type="MENU" />
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center border-2 border-dashed rounded-3xl">
                                    <p className="text-muted-foreground">Aucune catégorie de menu trouvée.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}

function LoadingState() {
    return (
        <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-dashed text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Chargement des catégories...</p>
            </div>
        </div>
    )
}

export default async function CategoriesPage() {
    // We don't need await headers() if we are wrapping the dynamic part in Suspense
    // But sticking to the pattern of handling headers if needed. 
    // However, for "Data blocking navigation", accessing headers might be blocking if used synchronously?
    // Actually, simply using Suspense around the async component solves the blocking navigation.
    // We can keep `await headers()` if we want the SHELL to be dynamic, but `await headers()` itself blocks.
    // The previous error was specifically about `new Date()` needing dynamic context.
    // If we use Suspense, we stream. `new Date()` inside the suspended component is fine.

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Catégories</h1>
                    <p className="text-muted-foreground mt-1">
                        Gérez les catégories de vos plats et de vos menus.
                    </p>
                </div>
            </div>

            <Suspense fallback={<LoadingState />}>
                <CategoriesContent />
            </Suspense>
        </div>
    )
}


