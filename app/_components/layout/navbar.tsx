'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'
import { Menu, X, ArrowRight, Heart, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useWishlistStore } from '@/lib/store/wishlist'
import { WishlistSheet } from './wishlist-sheet'
import { CartSheet } from './cart-sheet'
import { useCartStore } from '@/lib/store/cart'

const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Les Plats', href: '/les-plats' },
    { label: 'À Propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [wishlistOpen, setWishlistOpen] = useState(false)
    const items = useWishlistStore((state) => state.items)
    const cartItems = useCartStore((state) => state.items)
    const cartItemsLength = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            <motion.header
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2"
            >
                <nav className="glass rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-lg dark:shadow-black/40 border border-white/10">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="text-lg md:text-xl font-bold tracking-tight group">
                            <span className="text-primary group-hover:text-primary/80 transition-colors">Maison</span>{' '}
                            <span className="text-foreground">Comores</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group/link"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Cart Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => useCartStore.getState().setIsOpen(true)}
                                className="relative rounded-xl hover:bg-primary/10 hover:text-primary"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {mounted && cartItemsLength > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                                        {cartItemsLength}
                                    </span>
                                )}
                            </Button>

                            {/* Wishlist Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setWishlistOpen(true)}
                                className="relative rounded-xl hover:bg-primary/10 hover:text-primary"
                            >
                                <Heart className="h-5 w-5" />
                                {mounted && items.length > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                                        {items.length}
                                    </span>
                                )}
                            </Button>

                            <ThemeToggle />

                            {/* Desktop Reserve Button */}
                            <Link href="/reservation">
                                <Button
                                    className="hidden md:flex rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                                >
                                    Réserver
                                </Button>
                            </Link>

                            {/* Mobile Menu Trigger */}
                            <div className="md:hidden">
                                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                    <SheetTrigger
                                        render={
                                            <Button id="mobile-menu-trigger" variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary">
                                                <Menu className="h-6 w-6" />
                                            </Button>
                                        }
                                    />
                                    <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 border-none bg-background/95 backdrop-blur-xl">
                                        <SheetHeader className="p-6 border-b border-border/40">
                                            <SheetTitle className="flex items-center gap-2">
                                                <span className="text-primary font-bold">Maison</span>
                                                <span className="font-bold">Comores</span>
                                            </SheetTitle>
                                        </SheetHeader>

                                        <div className="flex flex-col p-6 gap-6">
                                            <div className="flex flex-col gap-4">
                                                {navItems.map((item, index) => (
                                                    <motion.div
                                                        key={item.href}
                                                        initial={{ x: 20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <Link
                                                            href={item.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className="text-2xl font-semibold hover:text-primary transition-colors flex items-center justify-between group"
                                                        >
                                                            {item.label}
                                                            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="mt-8 pt-8 border-t border-border/40 flex flex-col gap-4">
                                                <Link href="/reservation" onClick={() => setIsOpen(false)}>
                                                    <Button className="w-full py-6 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                                        Réserver une table
                                                        <ArrowRight className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <p className="text-center text-sm text-muted-foreground mt-4">
                                                    Découvrez les saveurs des Comores
                                                </p>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </nav>
            </motion.header>

            <WishlistSheet open={wishlistOpen} onOpenChange={setWishlistOpen} />
            <CartSheet />
        </>
    )
}

