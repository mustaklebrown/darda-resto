'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { format, isWithinInterval } from 'date-fns'
import {
    Pencil,
    Trash2,
    MoreVertical,
    Loader2,
    Clock,
    Sparkles,
    UtensilsCrossed,
    FolderOpen,
    Eye,
    Calendar,
    Power,
    CalendarCheck,
    Repeat,
    Sun,
    Leaf,
} from 'lucide-react'
import { toast } from 'sonner'

import { deleteMenuAction, toggleFeaturedMenu, toggleActiveMenu } from '@/app/actions/menu'
import { Prisma, MenuType } from '@/lib/prisma'
import { menuWithRelations } from './page'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'


type MenuWithRelations = Prisma.MenuGetPayload<{ include: typeof menuWithRelations }>

type Props = {
    menu: MenuWithRelations
}

// Helper to get menu type info
const getMenuTypeInfo = (type: MenuType) => {
    switch (type) {
        case 'DAILY':
            return { label: "Menu du Jour", icon: Sun, color: 'text-orange-500 bg-orange-500/10 border-orange-200' }
        case 'TIME_BASED':
            return { label: "Horaire", icon: Clock, color: 'text-blue-500 bg-blue-500/10 border-blue-200' }
        case 'SEASONAL':
            return { label: "Saisonnier", icon: Leaf, color: 'text-green-500 bg-green-500/10 border-green-200' }
        case 'REGULAR':
        default:
            return { label: "Standard", icon: Repeat, color: 'text-gray-500 bg-gray-500/10 border-gray-200' }
    }
}

export function MenuTile({ menu }: Props) {
    const [isPending, startTransition] = useTransition()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [isFeatured, setIsFeatured] = useState(menu.isFeatured)
    const [isActive, setIsActive] = useState(menu.isActive)

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteMenuAction(menu.id)
                toast.success('Menu supprimé', {
                    description: `"${menu.name}" a été supprimé.`,
                })
                setDeleteOpen(false)
            } catch {
                toast.error('Échec de la suppression', {
                    description: 'Veuillez réessayer plus tard.',
                })
            }
        })
    }

    const handleToggleFeatured = (value: boolean) => {
        setIsFeatured(value)
        startTransition(async () => {
            try {
                await toggleFeaturedMenu(menu.id, value)
                toast.success(value ? 'Menu mis en avant !' : 'Menu retiré de la une', {
                    description: `"${menu.name}" ${value ? 'est maintenant mis en avant' : "n'est plus mis en avant"}.`,
                })
            } catch {
                setIsFeatured(!value)
                toast.error('Échec de la mise à jour', {
                    description: 'Veuillez réessayer plus tard.',
                })
            }
        })
    }

    const handleToggleActive = (value: boolean) => {
        setIsActive(value)
        startTransition(async () => {
            try {
                await toggleActiveMenu(menu.id, value)
                toast.success(value ? 'Menu activé !' : 'Menu désactivé', {
                    description: `"${menu.name}" ${value ? 'est maintenant actif' : 'a été désactivé'}.`,
                })
            } catch {
                setIsActive(!value)
                toast.error('Échec de la mise à jour', {
                    description: 'Veuillez réessayer plus tard.',
                })
            }
        })
    }

    const hasSchedule = !!(menu.startTime && menu.endTime)
    const typeInfo = getMenuTypeInfo(menu.type)
    const TypeIcon = typeInfo.icon

    // Check if this is "Today's Menu" - active and currently within time range
    const isTodayMenu = menu.type === 'DAILY' || (
        hasSchedule &&
        isWithinInterval(new Date(), {
            start: new Date(menu.startTime!),
            end: new Date(menu.endTime!)
        })
    )

    return (
        <>
            <Card className={`group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-linear-to-br from-background to-muted/30 ${!isActive ? 'opacity-60' : ''}`}>
                <CardContent className="p-0">
                    <div className="p-5">
                        {/* Status indicators row */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {/* Menu Type Badge */}
                            <Badge variant="outline" className={`gap-1.5 px-2.5 py-0.5 ${typeInfo.color}`}>
                                <TypeIcon className="h-3 w-3" />
                                {typeInfo.label}
                            </Badge>

                            {/* Today's Menu indicator */}
                            {isTodayMenu && isActive && (
                                <Badge className="gap-1.5 px-2.5 py-0.5 bg-linear-to-r from-green-500 to-emerald-500 text-white border-0">
                                    <CalendarCheck className="h-3 w-3" />
                                    Menu du Jour
                                </Badge>
                            )}

                            {/* Active/Inactive indicator */}
                            {!isActive && (
                                <Badge variant="secondary" className="gap-1.5 px-2.5 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                    <Power className="h-3 w-3" />
                                    Inactif
                                </Badge>
                            )}
                        </div>

                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className={`p-2.5 rounded-xl shrink-0 ${isActive ? 'bg-primary/10' : 'bg-muted'}`}>
                                    <UtensilsCrossed className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                                        {menu.name}
                                    </h3>
                                    {menu.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {menu.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost" size="icon" className="h-9 w-9">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem onClick={() => setPreviewOpen(true)}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            Aperçu
                                        </DropdownMenuItem>
                                        <Link href={`/admin/menus/${menu.id}/edit`}>
                                            <DropdownMenuItem>
                                                <Pencil className="h-4 w-4 mr-2" />
                                                Modifier
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-destructive"
                                            onClick={() => setDeleteOpen(true)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Supprimer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                                <UtensilsCrossed className="h-3 w-3" />
                                {menu.plates.length} plats
                            </Badge>
                            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                                <FolderOpen className="h-3 w-3" />
                                {menu.categories.length} catégories
                            </Badge>
                            {hasSchedule && (
                                <Badge variant="outline" className="gap-1.5 px-3 py-1 text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
                                    <Calendar className="h-3 w-3" />
                                    Programmé
                                </Badge>
                            )}
                        </div>

                        {/* Schedule Info */}
                        {hasSchedule && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 p-2.5 rounded-lg bg-muted/50">
                                <Clock className="h-3.5 w-3.5" />
                                <span>
                                    {format(menu.startTime!, 'dd MMM yyyy, HH:mm')} → {format(menu.endTime!, 'dd MMM yyyy, HH:mm')}
                                </span>
                            </div>
                        )}

                        {/* Toggle switches */}
                        <div className="space-y-3">
                            {/* Active Toggle */}
                            <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${isActive
                                ? 'bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20'
                                : 'bg-muted/50'
                                }`}>
                                <div className="flex items-center gap-2">
                                    <Power className={`h-4 w-4 ${isActive ? 'text-green-500' : 'text-muted-foreground'}`} />
                                    <Label className={`text-sm font-medium ${isActive ? 'text-green-700 dark:text-green-400' : 'text-muted-foreground'}`}>
                                        Menu Actif
                                    </Label>
                                </div>
                                <Switch
                                    checked={isActive}
                                    onCheckedChange={handleToggleActive}
                                    disabled={isPending}
                                />
                            </div>

                            {/* Featured Toggle */}
                            <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${isFeatured
                                ? 'bg-linear-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30'
                                : 'bg-muted/50'
                                }`}>
                                <div className="flex items-center gap-2">
                                    <Sparkles className={`h-4 w-4 ${isFeatured ? 'text-amber-500' : 'text-muted-foreground'}`} />
                                    <Label className={`text-sm font-medium ${isFeatured ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}`}>
                                        Menu Vedette
                                    </Label>
                                </div>
                                <Switch
                                    checked={isFeatured}
                                    onCheckedChange={handleToggleFeatured}
                                    disabled={isPending}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Decorative gradient line */}
                    <div className="h-1 w-full bg-linear-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
            </Card>

            {/* ═══════════════════ Preview Dialog ═══════════════════ */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-primary" />
                            Aperçu du Menu
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Status badges */}
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className={typeInfo.color}>
                                <TypeIcon className="h-3 w-3 mr-1" />
                                {typeInfo.label}
                            </Badge>
                            {isTodayMenu && isActive && (
                                <Badge className="bg-linear-to-r from-green-500 to-emerald-500 text-white">
                                    <CalendarCheck className="h-3 w-3 mr-1" />
                                    Menu du Jour
                                </Badge>
                            )}
                            {isFeatured && (
                                <Badge className="bg-linear-to-r from-amber-500 to-orange-500 text-white gap-1">
                                    <Sparkles className="h-3 w-3" />
                                    Vedette
                                </Badge>
                            )}
                            {!isActive && (
                                <Badge variant="secondary">
                                    <Power className="h-3 w-3 mr-1" />
                                    Inactif
                                </Badge>
                            )}
                        </div>

                        {/* Name */}
                        <h2 className="text-2xl font-bold">{menu.name}</h2>

                        {/* Description */}
                        {menu.description && (
                            <p className="text-muted-foreground leading-relaxed">
                                {menu.description}
                            </p>
                        )}

                        {/* Schedule */}
                        {hasSchedule && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                    {format(menu.startTime!, 'PPp')} → {format(menu.endTime!, 'PPp')}
                                </span>
                            </div>
                        )}

                        <Separator />

                        {/* Categories */}
                        {menu.categories.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                    Catégories ({menu.categories.length})
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {menu.categories.map((c) => (
                                        <Badge key={c.id} variant="outline">
                                            {c.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Plates */}
                        {menu.plates.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                    Plats ({menu.plates.length})
                                </h4>
                                <div className="space-y-2">
                                    {menu.plates.map((p) => (
                                        <div
                                            key={p.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                        >
                                            <div>
                                                <span className="font-medium">{p.name}</span>
                                                {p.category && (
                                                    <span className="text-xs text-muted-foreground ml-2">
                                                        ({p.category.name})
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-primary font-semibold">
                                                {p.price?.toFixed(2) ?? '0.00'}€
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {menu.plates.length === 0 && menu.categories.length === 0 && (
                            <p className="text-center text-muted-foreground py-4">
                                Aucune catégorie ou plat ajouté.
                            </p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* ═══════════════════ Delete Confirmation ═══════════════════ */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-destructive/10">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </div>
                            Supprimer le menu ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer <strong>"{menu.name}"</strong> ?
                            Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-destructive hover:bg-destructive/90 gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Suppression...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

