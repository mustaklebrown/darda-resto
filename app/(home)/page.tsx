import { isWithinInterval } from 'date-fns'
import Hero from "../_components/Hero";
import MenuCategories from "../_components/menu-categories";
import SignatureDishes from "../_components/signature-dishes";
import ChefSection from "../_components/chef-section";
import ReservationCTA from "../_components/reservation-cta";
import Testimonal from "../_components/Testimonal";
import OpenHours from "../_components/OpenHours";
import TodayMenuSection from "../_components/today-menu";
import prisma from "@/lib/prisma";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Accueil",
    description: "Bienvenue chez Darda Resto, votre restaurant comorien authentique à Moroni. Découvrez notre menu du jour, nos plats signatures et réservez votre table pour une expérience culinaire inoubliable.",
    openGraph: {
        title: "Darda Resto | Restaurant Comorien à Moroni - Accueil",
        description: "Restaurant traditionnel comorien à Moroni. Menu du jour, plats signatures et réservations en ligne.",
        images: ['/images/hero.jpg'],
    },
};



export default async function Page() {
    // Fetch categories with plate count
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { plates: true }
            }
        }
    })

    // Fetch all active menus to find today's menu and featured menu
    const menus = await prisma.menu.findMany({
        where: {
            isActive: true,
        },
        include: {
            plates: {
                include: {
                    category: true
                }
            },
            categories: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    // Find today's menu: DAILY type or within schedule
    const now = new Date()
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

    // Get signature dishes from featured menu, limited to 3
    const signatureDishes = featuredMenu?.plates.slice(0, 3) || []

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