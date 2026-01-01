'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import MenuFilters from '@/app/_components/menu-filters';
import PlatesGrid from '@/app/_components/plates-grid';

interface Plate {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    categorySlug?: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    plates: Plate[];
}

interface MenuPageClientProps {
    categories: Category[];
    allPlates: Plate[];
}

export default function MenuPageClient({ categories, allPlates }: MenuPageClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('all');

    // Sync state with URL search params
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setActiveCategory(categoryParam);
        } else {
            setActiveCategory('all');
        }
    }, [searchParams]);

    // Handle filter change
    const handleCategoryChange = (slug: string) => {
        setActiveCategory(slug);
        if (slug === 'all') {
            router.push('/menu', { scroll: false });

        } else {
            router.push(`/menu?category=${slug}`, { scroll: false });
        }
    };

    // Filter plates based on active category
    const filteredPlates = activeCategory === 'all'
        ? allPlates
        : allPlates.filter(plate => plate.categorySlug === activeCategory);

    return (
        <main className="min-h-screen ">
            {/* Header / Hero */}
            <section className="pt-32 pb-10 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        Explorez Notre <span className="text-primary">Menu</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Saveurs comoriennes authentiques, élaborées avec passion et tradition.
                    </p>
                </motion.div>
            </section>

            {/* Filters */}
            <section className="sticky top-20 z-40 bg-background/20 backdrop-blur-lg border-b border-border/40 mb-10">
                <div className="max-w-7xl mx-auto px-6">
                    <MenuFilters
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelectCategory={handleCategoryChange}
                    />
                </div>
            </section>

            {/* Plates Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {filteredPlates.length > 0 ? (
                            <PlatesGrid plates={filteredPlates} />
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-xl text-muted-foreground">Aucun plat trouvé dans cette catégorie pour le moment.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </section>
        </main>
    );
}
