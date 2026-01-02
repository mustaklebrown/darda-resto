import prisma from '@/lib/prisma'
import Link from 'next/link'
import ReservationCharts from '@/app/_components/admin/reservation-charts'
import { format, subDays, startOfDay } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import { Utensils, Tag, Book, TrendingUp, LucideIcon, Loader2 } from 'lucide-react'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

// Cached stats counts
async function getStatsCount() {
    "use cache"
    cacheLife("minutes")
    try {
        return await Promise.all([
            prisma.categoryPlate.count(),
            prisma.plate.count(),
            prisma.reservation.count(),
        ])
    } catch (error) {
        console.error("Error fetching stats:", error)
        return [0, 0, 0]
    }
}

// Cached daily reservations
async function getDailyReservations() {
    "use cache"
    cacheLife("minutes")

    try {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), i)
            return startOfDay(date)
        }).reverse()

        return await Promise.all(
            last7Days.map(async (day) => {
                const nextDay = new Date(day)
                nextDay.setDate(day.getDate() + 1)

                const count = await prisma.reservation.count({
                    where: {
                        createdAt: {
                            gte: day,
                            lt: nextDay,
                        },
                    },
                })
                return {
                    date: format(day, 'EEE dd', { locale: fr }),
                    count,
                }
            })
        )
    } catch (error) {
        console.error("Error fetching daily reservations:", error)
        return []
    }
}

// Cached status distribution
async function getStatusDistribution() {
    "use cache"
    cacheLife("minutes")

    try {
        const statusCounts = await prisma.reservation.groupBy({
            by: ['status'],
            _count: {
                status: true,
            },
        })

        const statusMap: Record<string, { label: string, color: string }> = {
            PENDING: { label: 'En attente', color: '#f59e0b' },
            CONFIRMED: { label: 'Confirmée', color: '#10b981' },
            CANCELLED: { label: 'Annulée', color: '#ef4444' },
        }

        return statusCounts.map((item: { status: string, _count: { status: number } }) => ({
            name: statusMap[item.status]?.label || item.status,
            value: item._count.status,
            color: statusMap[item.status]?.color || '#888888',
        }))
    } catch (error) {
        console.error("Error fetching status distribution:", error)
        return []
    }
}

async function DashboardContent() {
    // Basic counts
    const [categoriesCount, platesCount, reservationsCount] = await getStatsCount()

    // Fetch reservations for the last 7 days for the chart
    const dailyReservations = await getDailyReservations()

    // Fetch status distribution
    const statusData = await getStatusDistribution()

    return (
        <div className="space-y-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="Catégories"
                    value={categoriesCount}
                    description="Sections actives"
                    icon={Tag}
                    color="text-blue-500"
                    bgColor="bg-blue-500/10"
                />
                <DashboardCard
                    title="Plats"
                    value={platesCount}
                    description="Items au menu"
                    icon={Utensils}
                    color="text-orange-500"
                    bgColor="bg-orange-500/10"
                />
                <DashboardCard
                    title="Réservations"
                    value={reservationsCount}
                    description="Demandes totales"
                    icon={Book}
                    color="text-primary"
                    bgColor="bg-primary/10"
                />
            </div>

            {/* Analytics Section */}
            <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    Analyse des Réservations
                </h2>
                <ReservationCharts data={dailyReservations} statusData={statusData} />
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-bold mb-6">Actions Rapides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ActionCard
                        title="Gérer les Catégories"
                        href="/admin/categories"
                        description="Ajouter ou modifier des sections"
                        icon={Tag}
                    />
                    <ActionCard
                        title="Gérer les Plats"
                        href="/admin/plates"
                        description="Mettre à jour vos plats"
                        icon={Utensils}
                    />
                    <ActionCard
                        title="Voir les Réservations"
                        href="/admin/reservations"
                        description="Gérer le planning"
                        icon={Book}
                    />
                </div>
            </div>
        </div>
    )
}

function LoadingState() {
    return (
        <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-dashed text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Chargement du tableau de bord...</p>
            </div>
        </div>
    )
}

export default function AdminPage() {
    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Tableau de Bord Admin
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Gérer le menu, les catégories et analyser les réservations.
                    </p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    Vue d&apos;ensemble
                </div>
            </div>

            <Suspense fallback={<LoadingState />}>
                <DashboardContent />
            </Suspense>
        </div>
    )
}


function DashboardCard({
    title,
    value,
    description,
    icon: Icon,
    color,
    bgColor,
}: {
    title: string
    value: number
    description: string
    icon: LucideIcon,
    color: string,
    bgColor: string
}) {
    return (
        <div
            className="
                relative overflow-hidden
                rounded-[2.5rem] border border-border/40
                bg-background/70 dark:bg-card/60
                backdrop-blur-xl p-8
                shadow-sm
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {title}
                    </h3>
                    <p className="text-4xl font-bold mt-2 tracking-tight">
                        {value}
                    </p>
                </div>
                <div className={`p-4 rounded-2xl ${bgColor} ${color}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-primary" />
                {description}
            </p>
        </div>
    )
}


function ActionCard({
    title,
    href,
    description,
    icon: Icon,
}: {
    title: string
    href: string
    description: string
    icon: LucideIcon
}) {
    return (
        <Link
            href={href}
            className="
                group relative overflow-hidden
                rounded-[2.5rem] border border-border/40
                bg-background/70 dark:bg-card/60
                backdrop-blur-xl p-8
                hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5
                transition-all duration-300
            "
        >
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                    {description}
                </p>
            </div>
            {/* Decorative element */}
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                <Icon className="w-24 h-24 -mr-10 -mt-10" />
            </div>
        </Link>
    )
}
