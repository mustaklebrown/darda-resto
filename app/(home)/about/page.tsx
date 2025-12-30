'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Heart, Users } from 'lucide-react'

export default function AboutPage() {
    return (
        <main className="overflow-hidden">
            {/* 1. Hero / Header Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 bg-secondary/10 dark:bg-black/20 -z-10" />

                {/* Decorative blob */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

                <div className="mx-auto max-w-4xl px-6 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-4 block">Notre Histoire</span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                            Un Voyage Culinaire <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-amber-600">
                                Vers les Comores
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                            Où les traditions faites maison rencontrent l'élégance moderne. <br />
                            Des saveurs authentiques préparées avec amour, patience et héritage.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Brand Story Split Section */}
            <section className="py-24 md:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-16 lg:grid-cols-2 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                Né de la Tradition <br /> Familiale
                            </h2>
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    Maison Comores n'a pas été construit dans une salle de réunion. Tout a commencé dans une humble cuisine, remplie de l'arôme des clous de girofle torréfiés, de la cardamome et du lait de coco frémissant.
                                </p>
                                <p>
                                    Fondée par une famille profondément enracinée dans la culture comorienne, notre mission est simple : partager le goût authentique et réconfortant de notre foyer avec le vôtre. Chaque assiette raconte l'histoire des générations passées, réimaginée pour le palais moderne sans perdre son âme.
                                </p>
                            </div>
                            <div className="mt-8">
                                <span className="inline-block h-1 w-20 bg-primary rounded-full" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="/images/hero.jpg"
                                alt="Our Kitchen"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Core Values Grid */}
            <section className="py-24 bg-secondary/20 dark:bg-white/5 relative">
                <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-[0.03]" />

                <div className="mx-auto max-w-7xl px-6 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Valeurs Fondamentales</h2>
                        <p className="text-muted-foreground">Les principes qui guident chaque coupe, chaque mélange et chaque service dans notre cuisine.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <ValueCard
                            icon={<Heart className="w-8 h-8 text-primary" />}
                            title="Authenticité"
                            description="Nous restons fidèles aux recettes originales. Pas de raccourcis, juste de vraies saveurs comoriennes honnêtes."
                        />
                        <ValueCard
                            icon={<Leaf className="w-8 h-8 text-green-600" />}
                            title="Fraîcheur"
                            description="Ingrédients locaux, achetés quotidiennement. Si ce n'est pas frais, cela n'arrive pas dans votre assiette."
                        />
                        <ValueCard
                            icon={<Users className="w-8 h-8 text-blue-500" />}
                            title="Communauté"
                            description="La nourriture consiste à rassembler les gens. Notre restaurant est un foyer pour tous."
                        />
                    </div>
                </div>
            </section>

            {/* 4. Kitchen Philosophy */}
            <section className="py-32">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <div className="relative p-8 md:p-14 rounded-[3rem] bg-black/90 text-white overflow-hidden shadow-2xl">
                        {/* Background subtle image */}
                        <div className="absolute inset-0 opacity-20">
                            <Image src="/images/hero.jpg" alt="bg" fill className="object-cover grayscale" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Notre Philosophie de Cuisine</h2>
                            <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-light">
                                "Nous croyons que la bonne cuisine prend du temps. Dans un monde de fast-food, nous choisissons le chemin lent.
                                Patience dans la marinade, soin dans la cuisson et passion dans le service."
                            </p>
                            <div className="mt-10">
                                <p className="font-handwriting text-3xl text-primary transform -rotate-2">
                                    Le Chef
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Closing CTA */}
            <section className="pb-32 pt-10">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Prêt à Goûter la Différence ?</h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Rejoignez-nous à Maison Comores pour une expérience culinaire inoubliable.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-xl shadow-primary/20">
                            Réserver une Table
                        </Button>
                        <Button size="lg" variant="ghost" className="rounded-full h-14 px-10 text-lg gap-2 group">
                            Explorer le Menu <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-[2rem] bg-background border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
        >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/50">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </motion.div>
    )
}
