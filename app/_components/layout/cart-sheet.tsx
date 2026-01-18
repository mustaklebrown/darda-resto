'use client'

import { useCartStore } from '@/lib/store/cart'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Minus, Trash2, ShoppingCart, MapPin, Phone, User, Mail, CreditCard, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { createOrderAction } from '@/app/actions/order'
import { Separator } from '@/components/ui/separator'

export function CartSheet() {
    const { items, removeItem, updateQuantity, clearCart, totalPrice, isOpen, setIsOpen } = useCartStore()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    // const { toast } = useToast()

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const orderItems = items.map(i => ({
            id: i.item.id,
            type: i.type,
            quantity: i.quantity,
            price: i.item.price || 0,
            name: i.item.name
        }))

        const result = await createOrderAction({
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            address: formData.address,
            items: orderItems
        })

        setIsSubmitting(false)

        if (result.success) {
            setIsSuccess(true)
            clearCart()
            // toast({
            //     title: "Commande réussie !",
            //     description: "Votre commande a été enregistrée avec succès.",
            // })
        } else {
            // toast({
            //     variant: "destructive",
            //     title: "Erreur",
            //     description: result.error || "Une erreur est survenue.",
            // })
            alert(result.error) // Fallback if toast not available yet
        }
    }

    const resetFlow = () => {
        setIsOpen(false)
        setIsCheckingOut(false)
        setIsSuccess(false)
        setFormData({ name: '', email: '', phone: '', address: '' })
    }

    return (
        <Sheet open={isOpen} onOpenChange={(open) => {
            if (!open) {
                // If closing, wait 300ms then reset internal state to avoid visual jank
                setTimeout(() => {
                    setIsCheckingOut(false)
                    setIsSuccess(false)
                }, 300)
            }
            setIsOpen(open)
        }}>
            <SheetContent className="w-full sm:w-[540px] flex flex-col p-0 gap-0 border-l border-border/40 bg-background/95 backdrop-blur-xl">

                {/* Header */}
                <SheetHeader className="p-6 border-b border-border/40 bg-background/50 backdrop-blur-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-xl">
                            <ShoppingCart className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                            <SheetTitle className="text-xl font-bold">
                                {isSuccess ? 'Commande Confirmée' : isCheckingOut ? 'Finaliser la commande' : 'Mon Panier'}
                            </SheetTitle>
                            <SheetDescription>
                                {isSuccess
                                    ? 'Merci pour votre confiance'
                                    : isCheckingOut
                                        ? 'Entrez vos coordonnées de livraison'
                                        : `${items.length} articles`
                                }
                            </SheetDescription>
                        </div>
                    </div>
                </SheetHeader>

                {/* Content */}
                <div className="flex-1 overflow-hidden relative">
                    {items.length === 0 && !isSuccess ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                            <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-2">
                                <ShoppingCart className="w-12 h-12 text-muted-foreground/30" />
                            </div>
                            <h3 className="text-lg font-semibold">Votre panier est vide</h3>
                            <p className="text-muted-foreground max-w-xs text-sm">
                                Explorez notre carte et ajoutez de délicieux plats pour commencer.
                            </p>
                            <Button onClick={() => setIsOpen(false)} variant="outline" className="mt-4 rounded-xl">
                                Retourner au menu
                            </Button>
                        </div>
                    ) : isSuccess ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                            <div className="w-24 h-24 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-2 ring-8 ring-green-500/5">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Commande Validée !</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto">
                                    Votre commande a bien été reçue. Nous allons la préparer avec soin.
                                </p>
                            </div>
                            <Button onClick={resetFlow} className="w-full max-w-xs rounded-xl h-12 text-lg">
                                Continuer
                            </Button>
                        </div>
                    ) : isCheckingOut ? (
                        <ScrollArea className="h-full px-6 py-4">
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                                {/* Order Summary Mini */}
                                <div className="bg-muted/30 p-4 rounded-2xl border border-border/50 space-y-3">
                                    <h4 className="font-semibold text-sm flex items-center gap-2">
                                        <ShoppingCart className="w-4 h-4 text-primary" />
                                        Résumé de la commande
                                    </h4>
                                    <div className="space-y-2">
                                        {items.map(item => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    {item.quantity}x {item.item.name}
                                                </span>
                                                <span className="font-medium">
                                                    {((item.item.price || 0) * item.quantity).toFixed(2)}€
                                                </span>
                                            </div>
                                        ))}
                                        <Separator />
                                        <div className="flex justify-between font-bold text-base pt-1">
                                            <span>Total</span>
                                            <span className="text-primary">{totalPrice().toFixed(2)}€</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-base">Vos Coordonnées</h4>

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nom complet</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="name" name="name" placeholder="John Doe"
                                                className="pl-9 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors"
                                                required value={formData.name} onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email" name="email" type="email" placeholder="john@example.com"
                                                className="pl-9 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors"
                                                required value={formData.email} onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone" name="phone" type="tel" placeholder="06 12 34 56 78"
                                                className="pl-9 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors"
                                                required value={formData.phone} onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Adresse de livraison</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <textarea
                                                id="address" name="address" placeholder="123 Rue de la République..."
                                                className="w-full min-h-[80px] px-3 py-2 pl-9 rounded-xl border bg-muted/30 border-border/50 focus:bg-background transition-colors text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                required value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </ScrollArea>
                    ) : (
                        <ScrollArea className="h-full">
                            <div className="p-6 space-y-4">
                                {items.map(({ id, type, item, quantity }) => (
                                    <div
                                        key={`${type}-${id}`}
                                        className="flex gap-4 p-3 rounded-2xl border border-border/40 bg-card hover:bg-muted/30 transition-all group"
                                    >
                                        {/* Image */}
                                        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                                                    <ShoppingCart className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <h4 className="font-bold text-base truncate">{item.name}</h4>
                                                    <span className="font-bold text-primary shrink-0">
                                                        {(item.price || 0).toFixed(2)}€
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                                    {type === 'plate' ? 'Plat à la carte' : 'Menu complet'}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-1">
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-background shadow-none"
                                                        onClick={() => updateQuantity(id, type, quantity - 1)}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
                                                    <Button
                                                        variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-background shadow-none"
                                                        onClick={() => updateQuantity(id, type, quantity + 1)}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                                                    onClick={() => removeItem(id, type)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && !isSuccess && (
                    <div className="p-6 border-t border-border/40 bg-background/50 backdrop-blur-md">
                        {!isCheckingOut ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">{totalPrice().toFixed(2)}€</span>
                                </div>
                                <Button
                                    className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                                    onClick={() => setIsCheckingOut(true)}
                                >
                                    Commander
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 rounded-xl h-12"
                                    onClick={() => setIsCheckingOut(false)}
                                    disabled={isSubmitting}
                                >
                                    Retour
                                </Button>
                                <Button
                                    className="flex-[2] rounded-xl h-12 font-bold shadow-lg shadow-primary/20"
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Envoi...
                                        </>
                                    ) : (
                                        <>
                                            Confirmer la commande
                                            <CheckCircle2 className="ml-2 w-5 h-5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
