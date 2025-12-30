import prisma, { Reservation } from '@/lib/prisma'
import StatusSelect from './status-select'
import { Calendar, Users, Mail, Phone, Clock, MessageSquare } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'

export default async function AdminReservationsPage() {
    const reservations: Reservation[] = await prisma.reservation.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Réservations
                </h1>
                <p className="text-muted-foreground mt-1">
                    Gérez vos demandes de réservation et leur statut.
                </p>
            </div>

            <div className="grid gap-6">
                {reservations.length === 0 ? (
                    <div className="text-center py-20 rounded-[2rem] border border-dashed border-border/40 bg-muted/5">
                        <p className="text-muted-foreground">Aucune réservation pour le moment.</p>
                    </div>
                ) : (
                    reservations.map((r: Reservation) => (
                        <div
                            key={r.id}
                            className="
                                group relative overflow-hidden
                                rounded-[2rem] border border-border/40
                                bg-background/70 dark:bg-card/60
                                backdrop-blur-xl p-6 md:p-8
                                hover:border-primary/30 transition-all duration-300
                            "
                        >
                            {/* Status accent bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${r.status === 'CONFIRMED' ? 'bg-green-500' :
                                r.status === 'CANCELLED' ? 'bg-red-500' : 'bg-amber-500'
                                }`} />

                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-start justify-between lg:justify-start lg:gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                                {r.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5" /> {r.email}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5" /> {r.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-muted/30">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                <Calendar className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Date</span>
                                                <span className="text-sm font-medium">
                                                    {format(new Date(r.date), 'dd MMMM yyyy', { locale: fr })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                <Clock className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Heure</span>
                                                <span className="text-sm font-medium">
                                                    {format(new Date(r.date), 'HH:mm')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Invités</span>
                                                <span className="text-sm font-medium">{r.guests} Personnes</span>
                                            </div>
                                        </div>
                                    </div>

                                    {r.message && (
                                        <div className="flex gap-3 text-sm italic text-muted-foreground bg-secondary/20 p-3 rounded-xl border border-border/20">
                                            <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                                            <p>{r.message}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-end gap-3 min-w-[180px]">
                                    <div className="text-[10px] uppercase font-bold text-muted-foreground/60 mb-1 lg:text-right w-full px-1">
                                        Statut de la réservation
                                    </div>
                                    <StatusSelect id={r.id} status={r.status} />
                                    <div className="text-[10px] text-muted-foreground/50 mt-1">
                                        Créé le {format(new Date(r.createdAt), 'dd/MM/yy HH:mm')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
