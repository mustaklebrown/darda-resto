'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const ContactPage = () => {
    const contactMethods = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: 'Nous Visiter',
            text: 'Moroni, Union des Comores',
            description: 'Visitez notre restaurant phare au cœur de la ville.',
            color: 'bg-blue-500/10 text-blue-500',
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: 'Nous Appeler',
            text: '+269 123 456',
            description: 'Lun-Ven de 8h à 22h.',
            color: 'bg-green-500/10 text-green-500',
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: 'Nous Contacter par Email',
            text: 'contact@maisoncomores.com',
            description: 'Notre équipe amicale est là pour vous aider.',
            color: 'bg-primary/10 text-primary',
        },
    ];

    return (
        <main className="min-h-screen pt-32 pb-24 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px] -z-10" />

            {/* Hero Section */}
            <section className="px-6 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <Badge variant="secondary" className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 font-bold rounded-lg leading-none">
                        CONTACTEZ-NOUS
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Nous Serions <span className="text-primary italic">Ravis</span> de vous Entendre
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Des questions sur notre menu, des besoins alimentaires particuliers ou des réservations d'événements privés ?
                        Notre équipe est toujours prête à vous aider.
                    </p>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Contact Info - Left Column */}
                <div className="lg:col-span-4 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold mb-8">Informations de Contact</h2>
                        <div className="space-y-4">
                            {contactMethods.map((method, index) => (
                                <Card key={index} className="border-border/40 bg-card/40 backdrop-blur-md hover:bg-card/60 transition-colors group">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className={`p-3 rounded-2xl ${method.color} transition-transform group-hover:scale-110`}>
                                            {method.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{method.title}</h3>
                                            <p className="font-medium text-foreground/90 mb-1">{method.text}</p>
                                            <p className="text-sm text-muted-foreground">{method.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Social / Hours Mini Card */}
                        <Card className="mt-8 border-primary/20 bg-primary/5 backdrop-blur-md overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Clock className="w-24 h-24" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-xl">Horaires d'Ouverture</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Lundi - Vendredi</span>
                                    <span className="font-bold">08:00 - 22:00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Samedi - Dimanche</span>
                                    <span className="font-bold">09:00 - 23:00</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Contact Form - Right Column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="lg:col-span-8"
                >
                    <Card className="border-none shadow-2xl bg-card/30 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="mb-10">
                                <div className="flex items-center gap-3 text-primary mb-2">
                                    <MessageSquare className="w-5 h-5" />
                                    <span className="font-bold tracking-widest text-xs uppercase">Envoyez-nous un Message</span>
                                </div>
                                <h2 className="text-3xl font-bold">Envoyer un Message</h2>
                                <p className="text-muted-foreground mt-2">Nous répondons généralement en moins de 2 heures.</p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold ml-1">Nom Complet</label>
                                        <Input
                                            placeholder="Jean Dupont"
                                            className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary transition-all px-6"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold ml-1">Adresse Email</label>
                                        <Input
                                            type="email"
                                            placeholder="jean@example.com"
                                            className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary transition-all px-6"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Sujet</label>
                                    <Input
                                        placeholder="Réservation de table / Demande spéciale"
                                        className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary transition-all px-6"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Message</label>
                                    <Textarea
                                        placeholder="Dites-nous ce que vous en pensez..."
                                        rows={6}
                                        className="rounded-[2rem] bg-background/50 border-border/50 focus:border-primary transition-all p-6 min-h-[150px]"
                                    />
                                </div>

                                <Button className="w-full h-16 rounded-[1.5rem] text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-3">
                                    Envoyer le Message
                                    <Send className="w-5 h-5" />
                                </Button>
                            </form>
                        </div>
                    </Card>
                </motion.div>
            </section>

            {/* Map Section */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative rounded-[3rem] overflow-hidden h-[500px] shadow-2xl border border-border/40 group"
                >
                    <iframe
                        title="Location"
                        src="https://www.google.com/maps?q=Moroni,Comoros&output=embed"
                        className="h-full w-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
                        loading="lazy"
                    />
                    <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96 p-8 glass rounded-3xl shadow-2xl transform transition-transform group-hover:translate-y-[-10px]">
                        <h3 className="text-xl font-bold mb-2">Trouvez-nous à Moroni</h3>
                        <p className="text-sm text-foreground/80 mb-4">
                            Nous sommes situés au cœur de la ville, parfaitement situés pour le déjeuner et le dîner.
                        </p>
                        <Button variant="link" className="p-0 text-primary h-auto flex items-center gap-2 group/btn">
                            Itinéraire
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default ContactPage;
