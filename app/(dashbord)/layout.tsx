'use client'

import { useState, Suspense, useEffect } from 'react'
import Link from 'next/link'
// import { usePathname } from 'next/navigation' 
import {
    LayoutDashboard,
    Tag,
    Utensils,
    Settings,
    Book,
    CookingPot,
    Menu,
    X,
    ChefHat,
} from 'lucide-react'

import Navbar from '../_components/Navbar'
import { LogoutButton } from '../_components/logout-button'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const sidebarItems = [
    { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
    { label: 'Catégories', href: '/admin/categories', icon: Tag },
    { label: 'Plats', href: '/admin/plates', icon: Utensils },
    { label: 'Réservations', href: '/admin/reservations', icon: Book },
    { label: 'Menus', href: '/admin/menus', icon: CookingPot },
]

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
    // Avoid usePathname() during prerender to prevent "Uncached data" build errors in Next.js 16.1
    const [pathname, setPathname] = useState("")

    useEffect(() => {
        setPathname(window.location.pathname)
    }, [])

    return (
        <>
            {/* Header */}
            <div className="mb-8 px-4 py-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                    Gestion
                </h2>
            </div>

            {/* Navigation */}
            <nav className="space-y-1.5 flex-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(item.href))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onLinkClick}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                    : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
                            )}
                        >
                            <item.icon className={cn(
                                'w-5 h-5 transition-transform',
                                !isActive && 'group-hover:scale-110'
                            )} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom section */}
            <div className="pt-6 mt-6 border-t border-border/40 space-y-1.5">
                <Link
                    href="/admin/settings"
                    onClick={onLinkClick}
                    className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors',
                        pathname === '/admin/settings'
                            ? 'bg-muted text-foreground'
                            : 'text-foreground/60 hover:bg-muted'
                    )}
                >
                    <Settings className="w-5 h-5" />
                    Paramètres
                </Link>
                <LogoutButton />
            </div>
        </>
    )
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
            <Navbar />

            {/* Mobile Header Bar */}
            <div className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/40 px-4 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <ChefHat className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-semibold">Admin Panel</span>
                    </div>

                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger
                            render={
                                <Button variant="ghost" size="icon" className="h-10 w-10" />
                            }
                        >
                            <Menu className="h-6 w-6" />
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] p-0">
                            <SheetHeader className="p-6 pb-0">
                                <SheetTitle className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <ChefHat className="h-5 w-5 text-primary" />
                                    </div>
                                    Darda Resto
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col h-[calc(100%-80px)] p-5">
                                <Suspense>
                                    <SidebarContent onLinkClick={() => setMobileOpen(false)} />
                                </Suspense>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Main Layout */}
            <div className="pt-28 lg:pt-28 mx-auto max-w-7xl px-4 sm:px-6 pb-10">
                {/* Add extra padding on mobile for the mobile header */}
                <div className="lg:hidden h-14" />

                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
                    {/* Desktop Sidebar */}
                    <aside
                        className="
                            hidden lg:flex
                            sticky top-28
                            rounded-[2.5rem]
                            border border-border/40
                            bg-background/80
                            dark:bg-card/40
                            backdrop-blur-xl
                            p-5
                            h-[calc(100vh-140px)]
                            flex-col
                            shadow-xl shadow-black/5
                        "
                    >
                        <Suspense>
                            <SidebarContent />
                        </Suspense>
                    </aside>

                    {/* Content */}
                    <section className="min-h-[calc(100vh-200px)] lg:min-h-[calc(100vh-140px)]">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    )
}
