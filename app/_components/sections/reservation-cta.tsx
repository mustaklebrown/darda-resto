'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CalendarDays, Phone } from 'lucide-react'
import Link from 'next/link'

export default function ReservationCTA() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Background Image with Parallax-like effect */}
            <div
                className="absolute inset-0 bg-[url('/images/reservation.jpg')] bg-cover bg-center bg-fixed"
            />

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />

            {/* Content Container */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

                    {/* Left Side: Compelling Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/2 text-center md:text-left"
                    >
                        <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-md border border-primary/20 mb-6">
                            Réservez Votre Place
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Un goût des Comores vous attend.
                        </h2>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
                            Rejoignez-nous pour une expérience culinaire inoubliable. Idéal pour les réunions de famille,
                            les dîners romantiques ou un voyage au cœur de saveurs authentiques.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/reservation">
                                <Button
                                    size="lg"
                                    className="h-14 px-8 cursor-pointer rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                                >
                                    <CalendarDays className="mr-2 h-5 w-5" />
                                    Réserver une Table
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 cursor-pointer rounded-full text-lg font-semibold hover:text-primary transition-colors border-white/30 text-white hover:bg-white/10 hover:border-white bg-transparent backdrop-blur-sm"
                            >
                                <Phone className="mr-2 transition-colors h-5 w-5" />
                                +33 1 23 45 67 89
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Side: Glass Card / Quick Info */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full md:w-5/12 lg:w-1/3"
                    >
                        <div className="rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 shadow-2xl text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">Horaires d'Ouverture</h3>
                            <div className="space-y-4 text-white/90">
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span>Lun - Ven</span>
                                    <span className="font-semibold">12:00 - 22:30</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span>Samedi</span>
                                    <span className="font-semibold">12:00 - 23:00</span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <span>Dimanche</span>
                                    <span className="font-semibold text-primary">Fermé</span>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-white/60 text-center">
                                * Événements privés disponibles sur demande
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
