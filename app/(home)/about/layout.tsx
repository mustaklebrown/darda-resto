import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "À Propos",
    description: "Découvrez l'histoire de Darda Resto, notre passion pour la cuisine comorienne authentique et notre engagement envers la qualité. Une tradition familiale au service de la gastronomie des Comores à Moroni.",
    keywords: ["à propos Darda Resto", "histoire restaurant Moroni", "cuisine traditionnelle Comores", "restaurant familial Moroni"],
    openGraph: {
        title: "À Propos - Darda Resto | Notre Histoire",
        description: "Découvrez l'histoire et les valeurs de Darda Resto, restaurant comorien traditionnel à Moroni.",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}
