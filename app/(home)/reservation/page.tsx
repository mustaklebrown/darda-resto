// 'use client'

// import { useReservationStore } from '@/store/reservation-store'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { motion, AnimatePresence } from 'framer-motion'
// import { CalendarDays, Users, Phone, Mail, User, MessageSquare, CheckCircle2 } from 'lucide-react'

// export default function ReservationPage() {
//     const { submit, loading, success, error } = useReservationStore()

//     function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault()
//         const formData = new FormData(e.currentTarget)
//         const form = Object.fromEntries(formData)
//         submit(form)
//     }

//     return (
//         <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
//             {/* Background elements */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
//             <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] -z-10" />

//             <div className="max-w-4xl mx-auto px-6">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-center mb-12"
//                 >
//                     <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
//                         Réserver une <span className="text-primary">Table</span>
//                     </h1>
//                     <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                         Réservez votre table à l'avance pour garantir une expérience gastronomique comorienne inoubliable.
//                     </p>
//                 </motion.div>

//                 <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 max-w-2xl mx-auto">
//                     <AnimatePresence mode="wait">
//                         {success ? (
//                             <motion.div
//                                 key="success"
//                                 initial={{ opacity: 0, scale: 0.95 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 className="flex flex-col items-center justify-center p-12 text-center rounded-[2.5rem] border border-primary/20 bg-primary/5 backdrop-blur-xl"
//                             >
//                                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
//                                     <CheckCircle2 className="w-10 h-10 text-primary" />
//                                 </div>
//                                 <h2 className="text-2xl font-bold mb-2">Demande Envoyée !</h2>
//                                 <p className="text-muted-foreground mb-8">
//                                     Votre demande de réservation a été reçue. Nous vous contacterons très prochainement pour confirmer.
//                                 </p>
//                                 <Button
//                                     onClick={() => window.location.reload()}
//                                     variant="outline"
//                                     className="rounded-xl"
//                                 >
//                                     Faire une autre réservation
//                                 </Button>
//                             </motion.div>
//                         ) : (
//                             <motion.div
//                                 key="form"
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 className="rounded-[2.5rem] border border-border/40 bg-card/40 backdrop-blur-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
//                             >
//                                 {/* Form decorative icon */}
//                                 <div className="absolute top-0 right-0 p-8 opacity-5">
//                                     <CalendarDays className="w-32 h-32" />
//                                 </div>

//                                 <form onSubmit={onSubmit} className="space-y-6 relative z-10">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                         <div className="space-y-2">
//                                             <label className="text-sm font-semibold ml-1 flex items-center gap-2">
//                                                 <User className="w-4 h-4 text-primary" /> Nom Complet
//                                             </label>
//                                             <Input
//                                                 name="name"
//                                                 placeholder="Jean Dupont"
//                                                 required
//                                                 className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary px-4"
//                                             />
//                                         </div>
//                                         <div className="space-y-2">
//                                             <label className="text-sm font-semibold ml-1 flex items-center gap-2">
//                                                 <Mail className="w-4 h-4 text-primary" /> Email
//                                             </label>
//                                             <Input
//                                                 name="email"
//                                                 type="email"
//                                                 placeholder="jean@example.com"
//                                                 required
//                                                 className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary px-4"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                         <div className="space-y-2">
//                                             <label className="text-sm font-semibold ml-1 flex items-center gap-2">
//                                                 <Phone className="w-4 h-4 text-primary" /> Téléphone
//                                             </label>
//                                             <Input
//                                                 name="phone"
//                                                 placeholder="+33 6 12 34 56 78"
//                                                 required
//                                                 className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary px-4"
//                                             />
//                                         </div>
//                                         <div className="space-y-2">
//                                             <label className="text-sm font-semibold ml-1 flex items-center gap-2">
//                                                 <Users className="w-4 h-4 text-primary" /> Nombre de Personnes
//                                             </label>
//                                             <Input
//                                                 name="guests"
//                                                 type="number"
//                                                 min="1"
//                                                 placeholder="2"
//                                                 required
//                                                 className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary px-4"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="space-y-2">
//                                         <label className="text-sm font-semibold ml-1 flex items-center gap-2">
//                                             <CalendarDays className="w-4 h-4 text-primary" /> Date et Heure
//                                         </label>
//                                         <Input
//                                             name="date"
//                                             type="datetime-local"
//                                             required
//                                             className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary px-4"
//                                         />
//                                     </div>

//                                     <div className="space-y-2">
//                                         <label className="text-sm font-semibold ml-1 flex items-center gap-2">
//                                             <MessageSquare className="w-4 h-4 text-primary" /> Message (Optionnel)
//                                         </label>
//                                         <Textarea
//                                             name="message"
//                                             placeholder="Demandes particulières, allergies..."
//                                             rows={4}
//                                             className="rounded-2xl bg-background/50 border-border/50 focus:border-primary p-4"
//                                         />
//                                     </div>

//                                     {error && (
//                                         <p className="text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">
//                                             {error === 'Failed to submit reservation' ? 'Erreur lors de l\'envoie de la réservation.' : error}
//                                         </p>
//                                     )}

//                                     <Button
//                                         disabled={loading}
//                                         className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.01]"
//                                     >
//                                         {loading ? (
//                                             <span className="flex items-center gap-2">
//                                                 <motion.span
//                                                     animate={{ rotate: 360 }}
//                                                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//                                                     className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
//                                                 />
//                                                 Envoi en cours...
//                                             </span>
//                                         ) : 'Réserver Maintenant'}
//                                     </Button>
//                                 </form>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>
//         </main>
//     )
// }

'use client'

import { useForm } from 'react-hook-form'
import { useReservationStore } from '@/store/reservation-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CalendarDays,
    Users,
    Phone,
    Mail,
    User,
    MessageSquare,
    CheckCircle2,
} from 'lucide-react'

type ReservationFormValues = {
    name: string
    email: string
    phone: string
    guests: number
    date: string
    message?: string
}

export default function ReservationPage() {
    const { submit, loading, success, error } = useReservationStore()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReservationFormValues>({
        defaultValues: {
            guests: 2,
        },
    })

    async function onSubmit(values: ReservationFormValues) {
        await submit({
            ...values,
            guests: Number(values.guests),
            date: new Date(values.date),
        })

        console.log(values)

        reset()
    }

    return (
        <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] -z-10" />

            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Réserver une <span className="text-primary">Table</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Réservez votre table à l'avance pour garantir une expérience gastronomique inoubliable.
                    </p>
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-12 text-center rounded-[2.5rem] border bg-primary/5"
                            >
                                <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-primary" />
                                <h2 className="text-2xl font-bold mb-2">
                                    Demande envoyée
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    Nous vous contacterons rapidement pour confirmer.
                                </p>
                                <Button onClick={() => window.location.reload()} variant="outline">
                                    Nouvelle réservation
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="rounded-[2.5rem] border border-amber-200/50 bg-white/20 dark:bg-card/40 backdrop-blur-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
                            >
                                {/* Decorative elements for the form */}
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <CalendarDays className="w-32 h-32" />
                                </div>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-6 relative z-10"
                                >
                                    {/* Name / Email */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                                <User className="w-4 h-4 text-primary" /> Nom complet
                                            </label>
                                            <Input
                                                placeholder="Jean Dupont"
                                                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all px-4"
                                                {...register('name', { required: true })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-primary" /> Email
                                            </label>
                                            <Input
                                                type="email"
                                                placeholder="jean@example.com"
                                                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all px-4"
                                                {...register('email', { required: true })}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone / Guests */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-primary" /> Téléphone
                                            </label>
                                            <Input
                                                placeholder="+269 123 456"
                                                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all px-4"
                                                {...register('phone', { required: true })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                                <Users className="w-4 h-4 text-primary" /> Personnes
                                            </label>
                                            <Input
                                                type="number"
                                                min={1}
                                                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all px-4"
                                                {...register('guests', { required: true, valueAsNumber: true })}
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                            <CalendarDays className="w-4 h-4 text-primary" /> Date et Heure
                                        </label>
                                        <Input
                                            type="datetime-local"
                                            className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all px-4"
                                            {...register('date', { required: true })}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold ml-1 flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-primary" /> Message (optionnel)
                                        </label>
                                        <Textarea
                                            rows={4}
                                            placeholder="Demandes particulières, allergies..."
                                            className="rounded-2xl bg-background/50 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all p-4 min-h-[120px]"
                                            {...register('message')}
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                                Envoi en cours...
                                            </span>
                                        ) : 'Réserver maintenant'}
                                    </Button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}

