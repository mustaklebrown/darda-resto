import { isWithinInterval } from 'date-fns'
import { cacheLife, cacheTag } from 'next/cache'

import Hero from "../_components/sections/hero";
import MenuCategories from "../_components/sections/menu-categories";
import SignatureDishes from "../_components/sections/signature-dishes";
import ChefSection from "../_components/sections/chef-section";
import ReservationCTA from "../_components/sections/reservation-cta";
import Testimonal from "../_components/sections/testimonial";
import OpenHours from "../_components/sections/open-hours";
import TodayMenuSection from "../_components/sections/today-menu";
import prisma from "@/lib/prisma";
import type { Metadata } from 'next';
import { headers } from 'next/headers'

export const metadata: Metadata = {
    title: "Accueil",
    description: "Bienvenue chez Darda Resto, votre restaurant comorien authentique à Moroni. Découvrez notre menu du jour, nos plats signatures et réservez votre table pour une expérience culinaire inoubliable.",
    openGraph: {
        title: "Darda Resto | Restaurant Comorien à Moroni - Accueil",
        description: "Restaurant traditionnel comorien à Moroni. Menu du jour, plats signatures et réservations en ligne.",
        images: ['/images/hero.jpg'],
    },
};
// Structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Restaurant",
            "@id": "https://darda-resto-3eiv.vercel.app/#restaurant",
            "name": "Darda Resto",
            "image": "https://darda-resto-3eiv.vercel.app/images/hero.jpg",
            "description": "Restaurant traditionnel comorien à Moroni, Union des Comores. Cuisine authentique avec produits frais locaux.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Moroni",
                "addressLocality": "Moroni",
                "addressRegion": "Grande Comore",
                "addressCountry": "KM"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": -11.7172,
                "longitude": 43.2551
            },
            "url": "https://darda-resto-3eiv.vercel.app",
            "telephone": "+269-123-456",
            "servesCuisine": ["Comorienne", "Africaine", "Traditionnelle"],
            "priceRange": "$$",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "22:00"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Saturday", "Sunday"],
                    "opens": "09:00",
                    "closes": "23:00"
                }
            ],
            "acceptsReservations": "True"
        },
        {
            "@type": "LocalBusiness",
            "@id": "https://darda-resto-3eiv.vercel.app/#localbusiness",
            "name": "Darda Resto",
            "image": "https://darda-resto-3eiv.vercel.app/images/hero.jpg",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Moroni",
                "addressCountry": "Comoros"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": -11.7172,
                "longitude": 43.2551
            }
        }
    ]
};

// Cached function to fetch categories
async function getCategories() {
    "use cache"
    cacheTag("categories", "home-data")
    cacheLife("hours")

    try {
        return await prisma.categoryPlate.findMany({
            include: {
                _count: {
                    select: { plates: true }
                }
            }
        })
    } catch (error) {
        console.error("Error fetching categories:", error)
        return []
    }
}

// Cached function to fetch active menus
async function getActiveMenus() {
    "use cache"
    cacheTag("menus", "home-data")
    cacheLife("hours")

    try {
        return await prisma.menu.findMany({
            where: {
                isActive: true,
            },
            include: {
                plates: {
                    include: {
                        categoryPlate: true
                    }
                },
                categoryPlates: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (error) {
        console.error("Error fetching menus:", error)
        return []
    }
}

// Cached function to fetch display data (today's menu, featured)
async function getDisplayMenus() {
    "use cache"
    cacheTag("menus", "home-data")
    cacheLife("minutes")

    const menus = await getActiveMenus()
    const now = new Date()

    // Find today's menu: DAILY type or within schedule
    const todayMenu = menus.find(menu => {
        if (menu.type === 'DAILY') return true
        if (menu.startTime && menu.endTime) {
            try {
                return isWithinInterval(now, {
                    start: new Date(menu.startTime),
                    end: new Date(menu.endTime)
                })
            } catch {
                return false
            }
        }
        return false
    }) || null

    // Find featured menu for signature dishes
    const featuredMenu = menus.find(m => m.isFeatured)

    return { todayMenu, featuredMenu }
}



export default async function Page() {
    // Access headers to opt-into dynamic rendering since we use new Date() in getDisplayMenus
    await headers()

    // Fetch categories with plate count using cache
    const categories = await getCategories()

    // Fetch display menus (today/featured) using cache which handles date logic safely
    const { todayMenu, featuredMenu } = await getDisplayMenus()

    // Get signature dishes from featured menu, limited to 3
    const signatureDishes = featuredMenu?.plates.slice(0, 3) || []


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Hero todayMenu={todayMenu || featuredMenu} />
            {todayMenu && <TodayMenuSection menu={todayMenu} />}
            <SignatureDishes dishes={signatureDishes} />
            <MenuCategories categories={categories} />
            <ChefSection />
            <ReservationCTA />
            <Testimonal />
            <OpenHours />
        </>
    );
}