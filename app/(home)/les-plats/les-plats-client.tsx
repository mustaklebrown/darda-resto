'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { Utensils, BookOpen, ArrowRight, Heart, ShoppingCart, ShoppingBag } from 'lucide-react';
import PlatesGrid from '@/app/_components/menu/plates-grid';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart'; // Import Cart Store

export default function LesPlatsClient({ initialMenus, initialPlates, plateCategories, menuCategories }: any) {
    const [view, setView] = useState<'plates' | 'menus'>('plates');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedMenu, setSelectedMenu] = useState<any | null>(null);
    const { addItem: addToCart } = useCartStore()

    const filteredPlates = selectedCategory === 'all'
        ? initialPlates
        : initialPlates.filter((p: any) => p.categoryId === selectedCategory);

    const filteredMenus = selectedCategory === 'all'
        ? initialMenus
        : initialMenus.filter((m: any) => m.categoryMenuId === selectedCategory);

    const categories = view === 'plates' ? plateCategories : menuCategories;

    return (
        <div className="space-y-8">
            {/* View Toggle & Filters */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center sticky top-24 z-30 bg-background/80 backdrop-blur-lg p-4 rounded-3xl border shadow-sm transition-all">

                {/* Toggle */}
                <div className="bg-muted p-1 rounded-2xl flex relative w-full md:w-auto">
                    <motion.div
                        className="absolute inset-y-1 bg-background rounded-xl shadow-sm"
                        initial={false}
                        animate={{
                            x: view === 'plates' ? 0 : '100%',
                            left: '4px',
                            width: 'calc(50% - 4px)'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />

                    <button
                        onClick={() => { setView('plates'); setSelectedCategory('all'); }}
                        className={`relative z-10 flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-semibold transition-colors flex justify-center items-center gap-2 ${view === 'plates' ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                        <Utensils className="w-4 h-4" />
                        <span>À la Carte</span>
                    </button>
                    <button
                        onClick={() => { setView('menus'); setSelectedCategory('all'); }}
                        className={`relative z-10 flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-semibold transition-colors flex justify-center items-center gap-2 ${view === 'menus' ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>Nos Menus</span>
                    </button>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
                    <Button
                        variant={selectedCategory === 'all' ? "default" : "outline"}
                        onClick={() => setSelectedCategory('all')}
                        className="rounded-full transition-all"
                        size="sm"
                    >
                        Tout
                    </Button>
                    {categories.map((cat: any) => (
                        <Button
                            key={cat.id}
                            variant={selectedCategory === cat.id ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat.id)}
                            className="rounded-full transition-all"
                            size="sm"
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <AnimatePresence mode="popLayout" initial={false}>
                {view === 'plates' ? (
                    <motion.div
                        key="plates"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        {/* Using the shared PlatesGrid component which includes the Modal logic */}
                        <PlatesGrid plates={filteredPlates} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="menus"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        {filteredMenus.map((menu: any) => (
                            <MenuCard key={menu.id} menu={menu} onClick={() => setSelectedMenu(menu)} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <Dialog open={!!selectedMenu} onOpenChange={(open) => !open && setSelectedMenu(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-3xl border-none outline-none">
                    {/* Hero Image Section */}
                    <div className="relative h-64 md:h-80 w-full bg-muted">
                        {selectedMenu?.image ? (
                            <Image
                                src={selectedMenu.image}
                                alt={selectedMenu.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                <BookOpen className="w-16 h-16 text-primary/20" />
                            </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                        {/* Content over Image */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                            <div className="flex items-start justify-between gap-4">
                                <DialogTitle className="text-3xl md:text-4xl font-bold text-white shadow-sm">
                                    {selectedMenu?.name}
                                </DialogTitle>
                                {selectedMenu?.isFeatured && (
                                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-lg">
                                        Populaire
                                    </Badge>
                                )}
                            </div>
                            {selectedMenu?.description && (
                                <p className="mt-2 text-white/90 text-lg md:text-xl font-light line-clamp-2 max-w-2xl">
                                    {selectedMenu.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-8 bg-background">
                        {/* Description if long or not shown in hero */}
                        <DialogDescription className="text-muted-foreground hidden">
                            {selectedMenu?.description}
                        </DialogDescription>

                        <div className="space-y-6">
                            <h3 className="font-bold text-xl flex items-center gap-2 text-primary border-b pb-4">
                                <Utensils className="w-5 h-5" />
                                Composition du Menu
                            </h3>
                            {selectedMenu?.plates && selectedMenu.plates.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {selectedMenu.plates.map((plate: any) => (
                                        <div key={plate.id} className="group bg-muted/40 hover:bg-muted/60 transition-colors p-4 rounded-2xl flex items-start gap-4 border border-border/50">
                                            <div className="h-20 w-20 relative rounded-xl overflow-hidden shrink-0 bg-muted shadow-sm group-hover:scale-105 transition-transform duration-300">
                                                {plate.image ? (
                                                    <Image src={plate.image} alt={plate.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                                        <Utensils className="w-6 h-6 text-primary/20" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 py-1">
                                                <h4 className="font-bold text-base mb-1 truncate">{plate.name}</h4>
                                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{plate.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center bg-muted/20 rounded-3xl border border-dashed text-muted-foreground flex flex-col items-center gap-3">
                                    <Utensils className="w-8 h-8 text-muted-foreground/50" />
                                    <p>Aucun plat listé pour ce menu.</p>
                                </div>
                            )}
                        </div>

                        {/* Order Button in Modal */}
                        <div className="pt-4 border-t">
                            <Button
                                className="w-full h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 gap-2 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                                onClick={() => {
                                    addToCart('menu', selectedMenu)
                                    setSelectedMenu(null)
                                    useCartStore.getState().setIsOpen(true)
                                }}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Commander ce Menu ({selectedMenu?.plates?.length || 0} plats)
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function MenuCard({ menu, onClick }: any) {
    const { toggleItem, hasItem } = useWishlistStore()
    const { addItem: addToCart } = useCartStore()
    const isLiked = hasItem(menu.id, 'menu')

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={onClick}
            className="group cursor-pointer h-full"
        >
            <Card className="h-80 relative overflow-hidden border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-3xl">
                {/* Background Image */}
                <div className="absolute inset-0 bg-muted">
                    {menu.image ? (
                        <Image
                            src={menu.image}
                            alt={menu.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                            <BookOpen className="w-16 h-16 text-primary/20" />
                        </div>
                    )}
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                        <Button
                            size="icon"
                            variant="secondary"
                            className={`rounded-full shadow-lg backdrop-blur-md bg-white/20 border-white/20 hover:bg-white/40 h-10 w-10 ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-white'}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleItem('menu', menu)
                            }}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full shadow-lg backdrop-blur-md bg-white/20 border-white/20 hover:bg-primary hover:text-white h-10 w-10 text-white"
                            onClick={(e) => {
                                e.stopPropagation()
                                addToCart('menu', menu)
                                useCartStore.getState().setIsOpen(true)
                            }}
                        >
                            <ShoppingBag className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {/* Badges/Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {menu.isFeatured && (
                                <Badge className="bg-amber-500/90 hover:bg-amber-500 text-white border-0 backdrop-blur-sm shadow-sm">
                                    Populaire
                                </Badge>
                            )}
                            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                                {menu.plates?.length || 0} plats
                            </Badge>
                        </div>

                        {/* Text Content */}
                        <h3 className="font-bold text-2xl mb-2 text-white leading-tight">
                            {menu.name}
                        </h3>
                        <p className="text-white/80 line-clamp-2 text-sm font-light mb-4">
                            {menu.description}
                        </p>

                        {/* Action Hint */}
                        <div className="flex items-center text-white/90 font-medium text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                            Voir le détail
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}
