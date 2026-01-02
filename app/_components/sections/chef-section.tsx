'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ChefSection() {
    return (
        <section className="py-24 backdrop-blur-xl  bg-amber-200/20 dark:bg-amber-800/10">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-10 md:grid-cols-2">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[420px] overflow-hidden rounded-3xl shadow-xl dark:shadow-black/50"
                    >
                        <Image
                            src="/images/chef.jpg"
                            alt="Our chef preparing homemade dishes"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Text Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="
              rounded-3xl
              p-10
              backdrop-blur-xl
              backdrop-saturate-150
              bg-background/70
              dark:bg-card/60
              border
              border-border/40
              shadow-sm
              shadow-amber-200/50
            "
                    >
                        <span className="text-sm font-medium text-primary">
                            100% Fait Maison
                        </span>

                        <h3 className="mt-3 text-3xl font-semibold text-foreground">
                            Cuisiné avec Passion et Tradition
                        </h3>

                        <p className="mt-4 text-foreground/70">
                            Chaque plat est préparé sur place en utilisant des ingrédients locaux frais,
                            en suivant les recettes familiales comoriennes traditionnelles transmises
                            de génération en génération.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
