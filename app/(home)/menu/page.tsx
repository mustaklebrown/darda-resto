
import prisma from '@/lib/prisma';
import MenuPageClient from './menu-page-client';
import { Suspense } from 'react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function MenuPage() {
    // Fetch categories with plates
    const categories = await prisma?.category.findMany({
        include: {
            plates: {
                orderBy: { createdAt: 'desc' }
            }
        },
        orderBy: { createdAt: 'asc' },
    }) || [];

    // Flatten plates for "All" view if needed, or pass structured data
    const allPlates = categories.flatMap(cat => cat.plates.map(plate => ({ ...plate, categorySlug: cat.slug })));

    return (
        <Suspense fallback={<MenuLoading />}>
            <MenuPageClient categories={categories} allPlates={allPlates} />
        </Suspense>
    );
}

function MenuLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-muted-foreground text-lg">
                Chargement du menu…
            </p>
        </div>
    )
}
