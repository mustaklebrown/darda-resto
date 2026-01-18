'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import { motion } from 'framer-motion'
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
import { useSession, signOut } from '@/lib/auth-client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User as UserIcon, Shield } from "lucide-react"

const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Les Plats', href: '/les-plats' },
    { label: 'À Propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const { data: session } = useSession()
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
                        <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-bold tracking-tight group ">
                            <Image src="/favicon.ico" alt="Logo" width={32} height={32} className="w-8 h-8 rounded-full" />
                            <span>
                                <span className="text-primary group-hover:text-primary/80 transition-colors">Maison</span>{' '}
                                <span className="text-foreground">Comores</span>
                            </span>
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

                            {/* Auth Buttons */}
                            <div className="hidden md:flex items-center gap-2">
                                {session ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", className: "relative h-10 w-10 rounded-full" })}>
                                            <Avatar className="h-10 w-10 border border-border/50">
                                                <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                                                <AvatarFallback>{session.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end">
                                            <DropdownMenuGroup>
                                                <DropdownMenuLabel className="font-normal">
                                                    <div className="flex flex-col space-y-1">
                                                        <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                                                        <p className="text-xs leading-none text-muted-foreground">
                                                            {session.user?.email}
                                                        </p>
                                                    </div>
                                                </DropdownMenuLabel>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            {/* @ts-ignore */}
                                            {session.user?.role === 'admin' && (
                                                <>
                                                    <DropdownMenuItem className="">
                                                        <Link href="/admin" className="cursor-pointer flex items-center gap-2">
                                                            <Shield className="mr-2 h-4 w-4" />
                                                            <span>Administration</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Link href="/admin/settings" className="cursor-pointer flex items-center gap-2">
                                                            <Settings className="mr-2 h-4 w-4" />
                                                            <span>Paramètres</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive focus:text-destructive">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Déconnexion</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="ghost" className="rounded-xl hover:bg-primary/10 hover:text-primary">
                                                Connexion
                                            </Button>
                                        </Link>
                                        <Link href="/signup">
                                            <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                                                S'inscrire
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Desktop Reserve Button */}
                            <Link href="/reservation">
                                <Button
                                    className="hidden lg:flex rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
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
                                                <Image src="/favicon.ico" alt="Logo" width={32} height={32} className="w-8 h-8" />
                                                <div className="flex items-center gap-1">
                                                    <span className="text-primary font-bold">Maison</span>
                                                    <span className="font-bold">Comores</span>
                                                </div>
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

                                                {/* Mobile Auth Links */}
                                                <div className="h-px bg-border/40 my-2" />

                                                {session ? (
                                                    <>
                                                        <div className="flex items-center gap-4 py-2">
                                                            <Avatar className="h-10 w-10 border border-border/50">
                                                                <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                                                                <AvatarFallback>{session.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">{session.user?.name}</span>
                                                                <span className="text-xs text-muted-foreground">{session.user?.email}</span>
                                                            </div>
                                                        </div>

                                                        {/* @ts-ignore */}
                                                        {session.user?.role === 'admin' && (
                                                            <>
                                                                <Link
                                                                    href="/admin"
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                                                                >
                                                                    <Shield className="h-5 w-5" />
                                                                    Administration
                                                                </Link>
                                                                <Link
                                                                    href="/admin/settings"
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                                                                >
                                                                    <Settings className="h-5 w-5" />
                                                                    Paramètres
                                                                </Link>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                signOut()
                                                                setIsOpen(false)
                                                            }}
                                                            className="text-lg font-medium text-left hover:text-destructive transition-colors flex items-center gap-2"
                                                        >
                                                            <LogOut className="h-5 w-5" />
                                                            Déconnexion
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col gap-4">
                                                        <Link
                                                            href="/login"
                                                            onClick={() => setIsOpen(false)}
                                                            className="text-lg font-medium hover:text-primary transition-colors"
                                                        >
                                                            Se connecter
                                                        </Link>
                                                        <Link
                                                            href="/signup"
                                                            onClick={() => setIsOpen(false)}
                                                            className="text-lg font-medium hover:text-primary transition-colors"
                                                        >
                                                            S'inscrire
                                                        </Link>
                                                    </div>
                                                )}
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

