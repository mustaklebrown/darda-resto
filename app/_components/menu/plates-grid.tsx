'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Heart,
    UtensilsCrossed,
    Clock,
    Flame,
    Leaf,
    Star,
    ArrowRight,
    X,
    Sparkles,
    ShoppingCart
} from 'lucide-react';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';

interface Plate {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    categorySlug?: string;
    categoryId: string;
    category?: {
        name: string;
    };
}

export default function PlatesGrid({ plates }: { plates: Plate[] }) {
    const [selectedPlate, setSelectedPlate] = useState<Plate | null>(null);
    const { toggleItem: toggleWishlist, hasItem: isWishlisted } = useWishlistStore()
    const { addItem: addToCart } = useCartStore()

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plates.map((plate, index) => {
                    const isLiked = isWishlisted(plate.id, 'plate')
                    return (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ y: -8 }}
                            key={plate.id}
                            onClick={() => setSelectedPlate(plate)}
                            className="group cursor-pointer rounded-2xl overflow-hidden border border-border/30 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                {plate.image ? (
                                    <Image
                                        src={plate.image}
                                        alt={plate.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                                        <UtensilsCrossed className="w-12 h-12 text-muted-foreground/20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Price Tag */}
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1.5 shadow-lg">
                                        {plate.price.toFixed(2)} €
                                    </Badge>
                                </div>

                                {/* Actions Container */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                                    {/* Favorite Button */}
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className={`rounded-full shadow-lg backdrop-blur-md bg-white/20 border-white/20 hover:bg-white/40 h-10 w-10 ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-white'}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleWishlist('plate', plate)
                                        }}
                                    >
                                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                    </Button>

                                    {/* Add to Cart Button */}
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="rounded-full shadow-lg backdrop-blur-md bg-white/20 border-white/20 hover:bg-primary hover:text-white h-10 w-10 text-white"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            addToCart('plate', plate)
                                            useCartStore.getState().setIsOpen(true)
                                        }}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                                        {plate.name}
                                    </h3>
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                                    {plate.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-medium">4.8</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 font-medium gap-1 group/btn">
                                        Détails
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* ═══════════════════ Modern Plate Detail Modal ═══════════════════ */}
            <Dialog open={!!selectedPlate} onOpenChange={(open) => !open && setSelectedPlate(null)}>
                <DialogContent className="w-[95vw] max-w-4xl p-0 overflow-hidden rounded-3xl border-0 shadow-2xl bg-background">
                    <AnimatePresence mode="wait">
                        {selectedPlate && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedPlate(null)}
                                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex flex-col lg:flex-row">
                                    {/* Image Section */}
                                    <div className="relative w-full lg:w-1/2 h-[280px] lg:h-[500px]">
                                        {selectedPlate.image ? (
                                            <Image
                                                src={selectedPlate.image}
                                                alt={selectedPlate.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-muted flex items-center justify-center">
                                                <UtensilsCrossed className="w-24 h-24 text-muted-foreground/20" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-background via-transparent to-transparent" />

                                        {/* Floating badges on image */}
                                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 gap-1">
                                                <Flame className="w-3 h-3 text-orange-400" />
                                                Populaire
                                            </Badge>
                                            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 gap-1">
                                                <Clock className="w-3 h-3" />
                                                15-20 min
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col">
                                        {/* Header */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-medium">
                                                    {selectedPlate.category?.name || selectedPlate.categorySlug || 'Menu'}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="text-sm font-medium">4.8</span>
                                                </div>
                                            </div>

                                            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
                                                {selectedPlate.name}
                                            </h2>

                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-primary">
                                                    {selectedPlate.price.toFixed(2)} €
                                                </span>
                                            </div>
                                        </div>

                                        <Separator className="mb-6" />

                                        {/* Description */}
                                        <div className="flex-1 mb-6">
                                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                                                Description
                                            </h3>
                                            <p className="text-foreground/80 leading-relaxed">
                                                {selectedPlate.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                <Badge variant="outline" className="gap-1 py-1.5">
                                                    <Leaf className="w-3 h-3 text-green-500" />
                                                    Frais
                                                </Badge>
                                                <Badge variant="outline" className="gap-1 py-1.5">
                                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                                    Fait Maison
                                                </Badge>
                                                <Badge variant="outline" className="gap-1 py-1.5">
                                                    <UtensilsCrossed className="w-3 h-3 text-primary" />
                                                    Traditionnel
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-3">
                                            {/* Favorite toggle */}
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                                                <div className="flex items-center gap-3">
                                                    <Heart className={`w-5 h-5 ${isWishlisted(selectedPlate.id, 'plate') ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                                                    <span className="font-medium">Ajouter aux favoris</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleWishlist('plate', selectedPlate)}
                                                    className={isWishlisted(selectedPlate.id, 'plate') ? 'text-red-500 hover:text-red-600' : ''}
                                                >
                                                    {isWishlisted(selectedPlate.id, 'plate') ? 'Ajouté ♥' : 'Ajouter'}
                                                </Button>
                                            </div>

                                            {/* Order Button */}
                                            <Button
                                                onClick={() => {
                                                    addToCart('plate', selectedPlate)
                                                    setSelectedPlate(null)
                                                    useCartStore.getState().setIsOpen(true)
                                                }}
                                                className="w-full h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 gap-2 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                Commander Maintenant
                                            </Button>

                                            <Button
                                                variant="outline"
                                                onClick={() => setSelectedPlate(null)}
                                                className="w-full h-12 rounded-xl"
                                            >
                                                Retour au Menu
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </>
    );
}
