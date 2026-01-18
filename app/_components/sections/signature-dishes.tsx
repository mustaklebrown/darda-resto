'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'


interface SignatureDishesProps {
    dishes?: any[]
}

export default function SignatureDishes({ dishes }: SignatureDishesProps) {


    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl opacity-50" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <span className="text-primary font-semibold tracking-wider text-sm uppercase">Goûtez à la Tradition</span>
                        <h2 className="mt-2 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                            Plats Signature
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                            Découvrez nos assiettes les plus appréciées, où les saveurs traditionnelles comoriennes rencontrent l'art culinaire moderne.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link href="/les-plats">
                            <Button variant="outline" className="hidden lg:flex gap-2 rounded-full border-primary/20 hover:bg-primary/5 cursor-pointer">
                                Voir le Menu Complet <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>

                    </motion.div>
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dishes?.map((dish, index) => (
                        <motion.div
                            key={dish.id || dish.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative flex flex-col h-full"
                        >
                            <div className="relative h-full overflow-hidden rounded-[2rem] border border-border/50 bg-background/40 backdrop-blur-md shadow-lg dark:shadow-none dark:bg-card/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">

                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/10">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            {dish.rating}
                                        </div>
                                    </div>
                                    <Image
                                        src={dish.image || '/images/placeholder-dish.jpg'}
                                        alt={dish.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col grow p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                                            {dish.name}
                                        </h3>
                                        <span className="shrink-0 ml-3 rounded-full bg-primary/10 px-3 py-1 text-lg font-bold text-primary">
                                            {dish.price}
                                        </span>
                                    </div>

                                    <p className="mb-6 text-sm text-muted-foreground leading-relaxed line-clamp-3 grow">
                                        {dish.description}
                                    </p>

                                    <Button className="w-full rounded-xl bg-secondary/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold group-hover:shadow-lg group-hover:shadow-primary/25">
                                        Commander
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>


                {/* Mobile CTA */}
                <div className="mt-12 flex justify-center lg:hidden">
                    <Link href="/les-plats">
                        <Button
                            size="lg"
                            className="rounded-full w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        >
                            Explorer le Menu
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    )
}
