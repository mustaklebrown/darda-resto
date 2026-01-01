import Link from 'next/link'
import { isWithinInterval } from 'date-fns'
import { cacheLife } from 'next/cache'
import {
    Plus,
    UtensilsCrossed,
    Sparkles,
    LayoutGrid,
    Power,
    CalendarCheck,
} from 'lucide-react'

// import { getMenus } from '@/app/actions/menu' // Removed
import { MenuTile } from './menu-tile'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import prisma, { Prisma } from '@/lib/prisma' // Adjusted import

export const menuWithRelations = {
    plates: { include: { category: true } },
    categories: true,
} satisfies Prisma.MenuInclude

export type MenuWithRelations =
    Prisma.MenuGetPayload<{ include: typeof menuWithRelations }>

async function getMenusData() {
    "use cache"
    cacheLife("minutes")
    const menus = await prisma.menu.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            plates: {
                include: {
                    category: true,
                },
            },
            categories: true,
        },
    });

    // Calculate stats inside the cached function
    const totalMenus = menus.length
    const activeMenus = menus.filter(m => m.isActive).length
    const featuredMenus = menus.filter(m => m.isFeatured).length

    const now = new Date()
    const todayMenus = menus.filter(m => {
        if (!m.isActive) return false
        if (m.type === 'DAILY') return true
        if (m.startTime && m.endTime) {
            try {
                return isWithinInterval(now, {
                    start: new Date(m.startTime),
                    end: new Date(m.endTime)
                })
            } catch {
                return false
            }
        }
        return false
    }).length

    return { menus, stats: { totalMenus, activeMenus, featuredMenus, todayMenus } }
}


export default async function AdminMenusPage() {

    const { menus, stats } = await getMenusData()
    const { totalMenus, activeMenus, featuredMenus, todayMenus } = stats

    return (
        <div className="space-y-8">

            {/* ═══════════════════ Header ═══════════════════ */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Menus</h1>
                    <p className="text-muted-foreground mt-1">
                        Gérer vos menus et leurs plats associés
                    </p>
                </div>
                <Link href="/admin/menus/new">
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                        <Plus className="h-5 w-5" />
                        Créer un menu
                    </Button>
                </Link>
            </div>

            {/* ═══════════════════ Stats Overview ═══════════════════ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-md bg-linear-to-br from-background to-muted/30">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <LayoutGrid className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Menus</p>
                                <p className="text-2xl font-bold">{totalMenus}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-linear-to-br from-background to-muted/30">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/10">
                                <Power className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Actifs</p>
                                <p className="text-2xl font-bold">{activeMenus}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-linear-to-br from-background to-muted/30">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-emerald-500/10">
                                <CalendarCheck className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Menu du Jour</p>
                                <p className="text-2xl font-bold">{todayMenus}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-linear-to-br from-background to-muted/30">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-amber-500/10">
                                <Sparkles className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Vedettes</p>
                                <p className="text-2xl font-bold">{featuredMenus}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ═══════════════════ Menus Grid ═══════════════════ */}
            {menus.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {menus.map(menu => (
                        <MenuTile key={menu.id} menu={menu} />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <Card className="border-2 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <div className="p-4 rounded-full bg-muted mb-4">
                            <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Aucun menu</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Créez votre premier menu pour organiser vos plats et les présenter à vos clients.
                        </p>
                        <Link href="/admin/menus/new">
                            <Button size="lg" className="gap-2">
                                <Plus className="h-5 w-5" />
                                Créer votre premier menu
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

