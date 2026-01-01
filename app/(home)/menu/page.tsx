
import prisma from '@/lib/prisma';
import MenuPageClient from './menu-page-client';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Notre Menu",
    description: "Découvrez notre carte complète de plats comoriens authentiques. Entrées, plats principaux, desserts et boissons traditionnelles. Menu mis à jour quotidiennement avec des produits frais locaux.",
    keywords: ["menu restaurant Moroni", "carte restaurant comorien", "plats comoriens", "menu Darda Resto", "spécialités Comores"],
    openGraph: {
        title: "Menu - Darda Resto | Cuisine Comorienne à Moroni",
        description: "Explorez notre menu de cuisine comorienne authentique avec des plats traditionnels préparés avec des produits frais.",
    },
};

import { cacheLife, cacheTag } from 'next/cache';

// Cached function to fetch menu data with cache tag for revalidation
async function getMenuData() {
    "use cache"
    cacheTag("menu-data", "plates", "categories")
    cacheLife("minutes")

    try {
        return await prisma?.category.findMany({
            include: {
                plates: {
                    orderBy: { createdAt: 'desc' }
                }
            },
            orderBy: { createdAt: 'asc' },
        }) || [];
    } catch (error) {
        console.error("Error fetching menu data:", error)
        return []
    }
}

export default async function MenuPage() {
    // Fetch categories with plates using cache
    const categories = await getMenuData()

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
