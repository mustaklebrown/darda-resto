import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact",
    description: "Contactez Darda Resto à Moroni, Comores. Téléphone: +269 123 456. Horaires: Lun-Ven 8h-22h, Sam-Dim 9h-23h. Envoyez-nous un message ou visitez-nous pour toute question.",
    keywords: ["contact Darda Resto", "téléphone restaurant Moroni", "adresse restaurant Comores", "horaires Darda Resto"],
    openGraph: {
        title: "Contact - Darda Resto | Nous Contacter",
        description: "Contactez-nous pour réserver une table ou pour toute question. Nous sommes à Moroni, Union des Comores.",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}
