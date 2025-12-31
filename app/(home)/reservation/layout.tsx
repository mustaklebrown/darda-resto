import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Réservation",
    description: "Réservez votre table chez Darda Resto à Moroni. Réservation en ligne facile et rapide. Garantissez votre place pour une expérience culinaire comorienne authentique.",
    keywords: ["réservation restaurant Moroni", "réserver table Darda Resto", "booking restaurant Comores", "réservation en ligne Moroni"],
    openGraph: {
        title: "Réservation - Darda Resto | Réserver une Table",
        description: "Réservez votre table en ligne chez Darda Resto, restaurant comorien à Moroni.",
    },
};

export default function ReservationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}
