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

    return (
        <>
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