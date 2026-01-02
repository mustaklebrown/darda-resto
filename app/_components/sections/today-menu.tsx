'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    UtensilsCrossed,
    Clock,
    Sparkles,
    ArrowRight,
    ChefHat,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type TodayMenuProps = {
    menu: {
        id: string
        name: string
        description: string | null
        type: string
        plates: {
            id: string
            name: string
            price: number
            description: string
            image: string | null
            categoryPlate: {
                id: string
                name: string
            } | null
        }[]
        categoryPlates: {
            id: string
            name: string
        }[]
    } | null
}

export default function TodayMenuSection({ menu }: TodayMenuProps) {
    if (!menu) {
        return null
    }

    return (
        <section className="py-20 md:py-28 bg-linear-to-b from-background to-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <Badge className="mb-4 gap-1.5 px-4 py-1.5 bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        Menu du Jour
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        {menu.name}
                    </h2>
                    {menu.description && (
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {menu.description}
                        </p>
                    )}
                </motion.div>

                {/* Categories Tabs */}
                {menu.categoryPlates.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-3 mb-10"
                    >
                        {menu.categoryPlates.map((cat) => (
                            <Badge
                                key={cat.id}
                                variant="secondary"
                                className="px-4 py-2 text-sm font-medium"
                            >
                                {cat.name}
                            </Badge>
                        ))}
                    </motion.div>
                )}

                {/* Plates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {menu.plates.slice(0, 6).map((plate, index) => (
                        <motion.div
                            key={plate.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card h-full">
                                <CardContent className="p-0">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {plate.image ? (
                                            <Image
                                                src={plate.image}
                                                alt={plate.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-muted">
                                                <UtensilsCrossed className="h-12 w-12 text-muted-foreground/30" />
                                            </div>
                                        )}
                                        {/* Price Tag */}
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-primary text-primary-foreground font-bold text-base px-3 py-1 shadow-lg">
                                                {plate.price.toFixed(2)}€
                                            </Badge>
                                        </div>
                                        {/* Category */}
                                        {plate.categoryPlate && (
                                            <div className="absolute bottom-4 left-4">
                                                <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
                                                    {plate.categoryPlate.name}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                            {plate.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {plate.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link href="/menu">
                        <Button size="lg" className="gap-2 group">
                            Voir le Menu Complet
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
