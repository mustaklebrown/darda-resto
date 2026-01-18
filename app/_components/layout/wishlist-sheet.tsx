'use client'

import { useWishlistStore } from '@/lib/store/wishlist'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Heart, Trash2, Utensils, BookOpen, ExternalLink, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface WishlistSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function WishlistSheet({ open, onOpenChange }: WishlistSheetProps) {
    const { items, removeItem, clear } = useWishlistStore()

    const plates = items.filter((i) => i.type === 'plate')
    const menus = items.filter((i) => i.type === 'menu')

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-[540px] flex flex-col p-0 gap-0 border-l border-border/40 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="p-6 border-b border-border/40 sticky top-0 bg-background/50 backdrop-blur-md z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-xl">
                                <Heart className="w-5 h-5 text-primary fill-primary" />
                            </div>
                            <div className="text-left">
                                <SheetTitle className="text-xl font-bold">Mes Favoris</SheetTitle>
                                <SheetDescription className="text-xs">
                                    {items.length} éléments sauvegardés
                                </SheetDescription>
                            </div>
                        </div>
                        {items.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clear}
                                className="text-muted-foreground hover:text-destructive gap-2 text-xs"
                            >
                                <Trash2 className="w-3 h-3" />
                                Tout effacer
                            </Button>
                        )}
                    </div>
                </SheetHeader>

                <Tabs defaultValue="all" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 pt-4">
                        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted/50 p-1">
                            <TabsTrigger value="all" className="rounded-lg">Tout ({items.length})</TabsTrigger>
                            <TabsTrigger value="plates" className="rounded-lg">Plats ({plates.length})</TabsTrigger>
                            <TabsTrigger value="menus" className="rounded-lg">Menus ({menus.length})</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="flex-1 overflow-hidden mt-0">
                        <WishlistList items={items} removeItem={removeItem} />
                    </TabsContent>
                    <TabsContent value="plates" className="flex-1 overflow-hidden mt-0">
                        <WishlistList items={plates} removeItem={removeItem} />
                    </TabsContent>
                    <TabsContent value="menus" className="flex-1 overflow-hidden mt-0">
                        <WishlistList items={menus} removeItem={removeItem} />
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    )
}

function WishlistList({ items, removeItem }: { items: any[], removeItem: any }) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground gap-4">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <Heart className="w-10 h-10 opacity-20" />
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-lg text-foreground">Votre liste est vide</p>
                    <p className="text-sm">Ajoutez des plats ou des menus pour les retrouver ici.</p>
                </div>
                <Link href="/les-plats">
                    <Button variant="outline" className="mt-4 rounded-xl gap-2">
                        Explorer la carte
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <ScrollArea className="h-full">
            <div className="p-6 space-y-4">
                {items.map(({ id, type, item }) => (
                    <div
                        key={`${type}-${id}`}
                        className="group relative flex gap-4 p-3 rounded-2xl border border-border/40 bg-card hover:bg-muted/30 transition-all hover:shadow-md hover:border-primary/20"
                    >
                        {/* Image */}
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                            {item.image ? (
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                                    {type === 'plate' ? <Utensils /> : <BookOpen />}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                            <div>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-medium bg-primary/5 text-primary border-primary/10">
                                            {type === 'plate' ? 'Plat' : 'Menu'}
                                        </Badge>
                                        {item.price && (
                                            <span className="text-xs font-bold text-foreground">
                                                {item.price.toFixed(2)}€
                                            </span>
                                        )}
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 -mr-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                                        onClick={() => removeItem(id, type)}
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
                                </div>
                                <h4 className="font-bold text-base truncate pr-6">{item.name}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Link href="/les-plats">
                                    <Button size="sm" variant="secondary" className="h-7 text-xs rounded-lg gap-1 font-medium bg-secondary/50 hover:bg-primary hover:text-white transition-colors">
                                        Voir détails
                                        <ArrowRight className="w-3 h-3" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
