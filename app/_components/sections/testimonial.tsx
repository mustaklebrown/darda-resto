'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
    {
        name: 'Amina S.',
        role: 'Guide Locale',
        text: 'Les saveurs m\'ont rappelé la maison. Tout était frais et authentique. La sauce au coco est exactement comme celle que faisait ma grand-mère.',
        avatar: '/images/avatars/avatar-1.jpg',
        rating: 5,
    },
    {
        name: 'Youssouf M.',
        role: 'Blogueur Culinaire',
        text: 'Atmosphère chaleureuse, belle présentation et nourriture faite maison exceptionnelle. La meilleure cuisine comorienne que j\'aie mangée en ville.',
        avatar: '/images/avatars/avatar-2.jpg',
        rating: 5,
    },
    {
        name: 'Claire D.',
        role: 'Cliente Régulière',
        text: 'Une perle rare. Élégant mais simple, exactement comme la cuisine traditionnelle devrait l\'être. Je recommande vivement le poisson grillé !',
        avatar: '/images/avatars/avatar-3.jpg',
        rating: 4,
    },
]

export default function Testimonial() {
    return (
        <section className="py-24 relative overflow-hidden bg-secondary/20 dark:bg-secondary/5">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/4 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl opacity-50" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-semibold tracking-wider text-sm uppercase">Avis de nos clients</span>
                        <h2 className="mt-2 text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-br from-foreground to-foreground/70">
                            Ce que disent nos clients
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Des expériences authentiques partagées par notre communauté
                        </p>
                    </motion.div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            className="flex flex-col h-full"
                        >
                            <div className="
                                relative h-full
                                flex flex-col justify-between
                                rounded-[2rem]
                                bg-background/60
                                backdrop-blur-md
                                border border-white/10
                                p-8
                                shadow-lg
                                dark:shadow-none
                                hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20
                                transition-all duration-300
                            ">
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-8 text-primary/10">
                                    <Quote className="h-12 w-12 fill-current" />
                                </div>

                                <div>
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                            <Star
                                                key={starIndex}
                                                className={`h-4 w-4 ${starIndex < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <p className="text-foreground/90 leading-relaxed text-lg font-medium">
                                        &quot;{review.text}&quot;
                                    </p>
                                </div>

                                {/* User Info */}
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold">
                                            {review.name.charAt(0)}
                                        </div>
                                        {/* Uncomment if you have avatars */}
                                        {/* <Image 
                                            src={review.avatar} 
                                            alt={review.name} 
                                            fill 
                                            className="object-cover"
                                        /> */}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">
                                            {review.name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {review.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
