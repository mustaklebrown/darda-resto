'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'

export default function OpenHours() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background Map Effect */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid gap-10 lg:grid-cols-2 items-stretch">

                    {/* Left Column: Contact & Hours */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Nous Rendre Visite</span>
                            <h2 className="mt-2 text-3xl md:text-5xl font-bold">
                                Contact & Horaires
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-md">
                                Passez pour un repas, ou contactez-nous pour réserver une table pour votre occasion spéciale.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Key Info Cards */}
                            <ContactCard
                                icon={<Clock className="w-6 h-6 text-primary" />}
                                title="Horaires d'Ouverture"
                            >
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between">
                                        <span className="text-muted-foreground">Lun – Ven</span>
                                        <span className="font-medium">11:30 – 22:00</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-muted-foreground">Samedi</span>
                                        <span className="font-medium">12:00 – 23:00</span>
                                    </li>
                                    <li className="flex justify-between text-muted-foreground">
                                        <span>Dimanche</span>
                                        <span className="text-primary font-medium">Fermé</span>
                                    </li>
                                </ul>
                            </ContactCard>

                            <ContactCard
                                icon={<MapPin className="w-6 h-6 text-primary" />}
                                title="Localisation"
                            >
                                <p className="text-muted-foreground leading-relaxed">
                                    Rue du Port, Moroni<br />
                                    Union des Comores
                                </p>
                                <a href="#" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                                    Itinéraire &rarr;
                                </a>
                            </ContactCard>

                            <ContactCard
                                icon={<Phone className="w-6 h-6 text-primary" />}
                                title="Contact"
                            >
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <span className="text-muted-foreground text-sm">+269 123 45 67</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-muted-foreground text-sm">hello@darda-resto.com</span>
                                    </li>
                                </ul>
                            </ContactCard>

                            <ContactCard
                                icon={<Facebook className="w-6 h-6 text-primary" />}
                                title="Suivez-nous"
                            >
                                <div className="flex gap-4">
                                    <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
                                    <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
                                </div>
                                <p className="mt-4 text-xs text-muted-foreground">
                                    Suivez-nous pour les spécialités quotidiennes !
                                </p>
                            </ContactCard>
                        </div>
                    </div>

                    {/* Right Column: Large Interactive Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[500px] lg:h-auto overflow-hidden rounded-[2.5rem] bg-gray-100 dark:bg-gray-800 border border-border/40 shadow-2xl"
                    >
                        <iframe
                            title="Restaurant location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15918.307567786438!2d43.2505567!3d-11.7061111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x189892c556391499%3A0x868427f715875704!2sMoroni%2C%20Comoros!5e0!3m2!1sen!2s!4v1709400000000!5m2!1sen!2s"
                            className="absolute inset-0 h-full w-full border-0 grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                            loading="lazy"
                        />

                        {/* Floating location card on map (Optional visual flair) */}
                        <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-lg border border-black/5 max-w-xs">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Trouvez-nous ici</p>
                            <p className="text-sm font-medium">Cœur de Moroni</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

function ContactCard({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
    return (
        <div className="
            group
            p-6 rounded-3xl 
            bg-background/60 dark:bg-card/30 
            backdrop-blur-xl
            border border-border/50 
            hover:border-primary/20 
            transition-all duration-300
            hover:shadow-lg hover:shadow-primary/5
        ">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                {icon}
            </div>
            <h3 className="mb-3 text-lg font-bold">{title}</h3>
            {children}
        </div>
    )
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
            {icon}
        </a>
    )
}
