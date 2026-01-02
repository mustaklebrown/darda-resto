'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Utensils, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Category {
    id: string
    name: string
    slug: string
    image: string | null
    _count?: {
        plates: number
    }
}

interface MenuCategoriesProps {
    categories?: Category[]
}

export default function MenuCategories({ categories }: MenuCategoriesProps) {
    if (!categories || categories.length === 0) {
        return null
    }

    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <Badge className="mb-4 gap-1.5 px-4 py-1.5 bg-linear-to-r from-primary/80 to-primary text-primary-foreground">
                        <Utensils className="h-3.5 w-3.5" />
                        Notre Carte
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        Explorez Nos Catégories
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Découvrez notre sélection de plats authentiques, préparés avec passion et les meilleurs ingrédients
                    </p>
                </motion.div>

                {/* Categories Grid - Equal Height */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id || cat.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <Link
                                href={`/menu?category=${cat.slug}`}
                                className="group relative block h-[280px] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                            >
                                {/* Background Image */}
                                <Image
                                    src={cat.image || '/images/hero.jpg'}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-all duration-300" />

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-tr from-transparent via-white/10 to-transparent" />

                                {/* Popular badge for first category */}
                                {index === 0 && (
                                    <div className="absolute top-4 left-4">
                                        <Badge className="gap-1.5 bg-white/20 backdrop-blur-md text-white border-white/20">
                                            <Sparkles className="h-3 w-3" />
                                            Populaire
                                        </Badge>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <div className="flex items-end justify-between gap-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                                {cat.name}
                                            </h3>
                                            <p className="text-white/70 text-sm">
                                                {cat._count?.plates || 0} plats
                                            </p>
                                        </div>
                                        <div className="shrink-0 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
                                            <ArrowRight className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link href="/menu">
                        <Button size="lg" variant="outline" className="gap-2 cursor-pointer rounded-full group">
                            Voir Tout le Menu
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}


