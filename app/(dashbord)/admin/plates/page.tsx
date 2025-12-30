import Link from 'next/link'
import prisma from '@/lib/prisma'
import {
    Plus,
    UtensilsCrossed,
    Tag,
    TrendingUp,
    DollarSign,
} from 'lucide-react'

import { PlateTile } from './plate-tile'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default async function PlatesPage() {
    const plates = await prisma.plate.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' },
    })

    // Calculate stats
    const totalPlates = plates.length
    const totalCategories = new Set(plates.filter(p => p.category).map(p => p.category!.id)).size
    const avgPrice = plates.length > 0
        ? plates.reduce((sum, p) => sum + (p.price || 0), 0) / plates.length
        : 0
    const highestPrice = plates.length > 0
        ? Math.max(...plates.map(p => p.price || 0))
        : 0

    return (
        <div className="space-y-8">

            {/* ═══════════════════ Header ═══════════════════ */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Plats</h1>
                    <p className="text-muted-foreground mt-1">
                        Gérer les plats affichés dans le menu
                    </p>
                </div>
                <Link href="/admin/plates/new">
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                        <Plus className="h-5 w-5" />
                        Ajouter un plat
                    </Button>
                </Link>
            </div>

            {/* ═══════════════════ Stats Overview ═══════════════════ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-md bg-linear-to-br from-background to-muted/30">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <UtensilsCrossed className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total plats</p>
                                <p className="text-2xl font-bold">{totalPlates}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-linear-to-br from-background to-muted/30">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-purple-500/10">
                                <Tag className="h-6 w-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Catégories</p>
                                <p className="text-2xl font-bold">{totalCategories}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-linear-to-br from-background to-muted/30">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/10">
                                <DollarSign className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Prix moyen</p>
                                <p className="text-2xl font-bold">{avgPrice.toFixed(2)}€</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-linear-to-br from-background to-muted/30">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-amber-500/10">
                                <TrendingUp className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Prix max</p>
                                <p className="text-2xl font-bold">{highestPrice.toFixed(2)}€</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ═══════════════════ Plates Grid ═══════════════════ */}
            {plates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {plates.map(plate => (
                        <PlateTile key={plate.id} plate={plate} />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <Card className="border-2 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <div className="p-4 rounded-full bg-muted mb-4">
                            <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Aucun plat</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Créez votre premier plat pour commencer à constituer votre menu.
                        </p>
                        <Link href="/admin/plates/new">
                            <Button size="lg" className="gap-2">
                                <Plus className="h-5 w-5" />
                                Ajouter votre premier plat
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

