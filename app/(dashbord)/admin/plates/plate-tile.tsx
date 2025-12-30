'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Pencil,
    Trash2,
    MoreVertical,
    Loader2,
    UtensilsCrossed,
    Eye,
    Tag,
    DollarSign,
} from 'lucide-react'
import { toast } from 'sonner'

import { deletePlate } from './actions'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

import { Prisma } from '@prisma/client'

type PlateWithCategory = Prisma.PlateGetPayload<{
    include: { category: true }
}>

type Props = {
    plate: PlateWithCategory
}

export function PlateTile({ plate }: Props) {
    const [isPending, startTransition] = useTransition()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deletePlate(plate.id)
                toast.success('Plat supprimé', {
                    description: `"${plate.name}" a été supprimé.`,
                })
                setDeleteOpen(false)
            } catch {
                toast.error('Échec de la suppression', {
                    description: 'Veuillez réessayer plus tard.',
                })
            }
        })
    }

    return (
        <>
            <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-linear-to-br from-background to-muted/30">
                <CardContent className="p-0">
                    {/* Image section */}
                    <div className="relative h-40 overflow-hidden bg-muted">
                        {plate.image ? (
                            <Image
                                src={plate.image}
                                alt={plate.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-muted to-muted/50">
                                <UtensilsCrossed className="h-12 w-12 text-muted-foreground/30" />
                            </div>
                        )}

                        {/* Price badge */}
                        <div className="absolute top-3 right-3">
                            <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1 shadow-lg">
                                {plate.price?.toFixed(2)}€
                            </Badge>
                        </div>

                        {/* Category badge */}
                        {plate.category && (
                            <div className="absolute bottom-3 left-3">
                                <Badge variant="secondary" className="gap-1 backdrop-blur-sm bg-background/80">
                                    <Tag className="h-3 w-3" />
                                    {plate.category.name}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                                {plate.name}
                            </h3>

                            {/* Actions dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44">
                                    <DropdownMenuItem onClick={() => setPreviewOpen(true)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Aperçu
                                    </DropdownMenuItem>
                                    <Link href={`/admin/plates/edit/${plate.id}`}>
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

                        {plate.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {plate.description}
                            </p>
                        )}
                    </div>

                    {/* Decorative gradient line */}
                    <div className="h-1 w-full bg-linear-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
            </Card>

            {/* ═══════════════════ Preview Dialog ═══════════════════ */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-primary" />
                            Aperçu du plat
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Image */}
                        {plate.image && (
                            <div className="relative h-48 rounded-xl overflow-hidden">
                                <Image
                                    src={plate.image}
                                    alt={plate.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Name & Price */}
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-xl font-bold">{plate.name}</h2>
                            <span className="text-2xl font-bold text-primary">
                                {plate.price?.toFixed(2)}€
                            </span>
                        </div>

                        {/* Category */}
                        {plate.category && (
                            <Badge variant="secondary" className="gap-1">
                                <Tag className="h-3 w-3" />
                                {plate.category.name}
                            </Badge>
                        )}

                        <Separator />

                        {/* Description */}
                        {plate.description ? (
                            <p className="text-muted-foreground leading-relaxed">
                                {plate.description}
                            </p>
                        ) : (
                            <p className="text-muted-foreground italic">
                                Aucune description
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
                            Supprimer le plat ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer <strong>"{plate.name}"</strong> ?
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
