'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Clock, UtensilsCrossed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Suspense } from 'react'




type TodayMenu = {
    id: string
    name: string
    description: string | null
    type: string
    plates: {
        id: string
        name: string
        price: number
    }[]
} | null

type HeroProps = {
    todayMenu?: TodayMenu
}

export default function HeroSection({ todayMenu }: HeroProps) {
    return (
        <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <Image
                src="/images/hero.jpg"
                alt="Authentic Comorian homemade cuisine"
                fill
                priority
                className="object-cover -z-10"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/75" />

            {/* Content Container */}
            <div className="relative z-10 w-full px-4 md:px-8 py-20 lg:py-0 mt-8 lg:mt-0">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">

                        {/* LEFT — Description + CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="bg-black/30 backdrop-blur-md rounded-3xl p-6 lg:p-10 border border-white/10 shadow-2xl text-center lg:text-left"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-4 drop-shadow-md">
                                <span className="block text-white">
                                    L'Authentique
                                </span>
                                <span className="block text-primary bg-clip-text">
                                    Cuisine Comorienne
                                </span>
                            </h1>

                            <p className="mb-8 text-base sm:text-lg text-white/90 lg:max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-sm">
                                Vivez la chaleur de la tradition avec nos repas frais et
                                faits maison, inspirés par le riche héritage culinaire
                                de l'archipel des Comores.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="/menu">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg text-base h-12 px-8"
                                    >
                                        Voir le Menu
                                    </Button>
                                </Link>

                                <Link href="/reservation">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full sm:w-auto rounded-xl border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm text-base h-12 px-8"
                                    >
                                        Réserver une Table
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* RIGHT — Today's Menu Card */}
                        <Suspense fallback={<div>Loading...</div>}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                                className="relative w-full max-w-md mx-auto lg:mx-0"
                            >
                                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
                                    {/* Ribbon */}
                                    <div className="absolute top-0 right-0">
                                        <div className="absolute right-[-34px] top-[32px] w-[170px] transform rotate-45 bg-primary py-1 text-center text-xs font-bold uppercase text-white shadow-sm">
                                            Frais du Jour
                                        </div>
                                    </div>

                                    <div className="mb-6 pr-8">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge className="bg-white/20 text-white border-0 gap-1">
                                                <Clock className="h-3 w-3" />
                                                Menu du Jour
                                            </Badge>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">
                                            {todayMenu?.name || "Spécialités du Jour"}
                                        </h2>
                                        <p className="text-white/70 text-sm mt-1">
                                            {todayMenu?.description || "La sélection du Chef"}
                                        </p>
                                    </div>

                                    {todayMenu && todayMenu.plates.length > 0 ? (
                                        <ul className="space-y-4">
                                            {todayMenu.plates.slice(0, 4).map((plate) => (
                                                <ListItem
                                                    key={plate.id}
                                                    name={plate.name}
                                                    price={`${plate.price.toFixed(2)}€`}
                                                />
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-center py-8">
                                            <UtensilsCrossed className="h-10 w-10 text-white/30 mx-auto mb-3" />
                                            <p className="text-white/60 text-sm">
                                                Découvrez nos plats du jour
                                            </p>
                                        </div>
                                    )}

                                    <Link href="/menu">
                                        <Button
                                            className="mt-8 w-full rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold border border-white/10 h-11"
                                        >
                                            Voir le Menu Complet
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </Suspense>

                    </div>
                </div>
            </div>
        </section>
    )
}

function ListItem({ name, price }: { name: string; price: string }) {
    return (
        <li className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
            <span className="text-white/90 font-medium">
                {name}
            </span>
            <span className="font-bold text-primary text-lg">
                {price}
            </span>
        </li>
    )
}


