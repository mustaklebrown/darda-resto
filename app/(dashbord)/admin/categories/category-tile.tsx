'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import {
    Pencil,
    Trash2,
    FolderOpen,
    MoreVertical,
    ImageIcon,
    Loader2,
    Check,
    X,
} from 'lucide-react'
import { toast } from 'sonner'

import { deleteCategory, updateCategory, deleteMenuCategory, updateMenuCategory } from './action/actions'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
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
import { UploadButton } from '@/lib/uploadthing'

type Props = {
    type: 'PLATE' | 'MENU'
    category: {
        id: string
        name: string
        image: string | null
        slug: string
    }
}

export function CategoryTile({ category, type }: Props) {
    const [isPending, startTransition] = useTransition()
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    // Edit form state
    const [editName, setEditName] = useState(category.name)
    const [editImage, setEditImage] = useState(category.image ?? '')

    const handleDelete = () => {
        startTransition(async () => {
            try {
                if (type === 'PLATE') {
                    await deleteCategory(category.id)
                } else {
                    await deleteMenuCategory(category.id)
                }
                toast.success('Catégorie supprimée', {
                    description: `"${category.name}" a été retirée.`,
                })
                setDeleteOpen(false)
            } catch {
                toast.error('Échec de la suppression', {
                    description: 'Veuillez réessayer plus tard.',
                })
            }
        })
    }

    const handleUpdate = () => {
        if (!editName.trim()) {
            toast.error('Le nom est requis')
            return
        }

        startTransition(async () => {
            try {
                if (type === 'PLATE') {
                    await updateCategory(category.id, {
                        name: editName,
                        image: editImage || undefined,
                    })
                } else {
                    await updateMenuCategory(category.id, {
                        name: editName,
                        image: editImage || undefined,
                    })
                }
                toast.success('Catégorie mise à jour', {
                    description: `"${editName}" a été enregistrée.`,
                })
                setEditOpen(false)
            } catch {
                toast.error('Échec de la mise à jour', {
                    description: 'Veuillez réessayer plus tard.',
                })
            }
        })
    }

    return (
        <>
            <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-linear-to-br from-background to-muted/30">
                <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                        {/* Image */}
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                            {category.image ? (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-linear-to-br from-primary/10 to-primary/5">
                                    <FolderOpen className="h-6 w-6 text-primary/50" />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                                    {category.name}
                                </h3>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs font-mono">
                                    /{category.slug}
                                </Badge>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Quick Edit Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => setEditOpen(true)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted hover:text-foreground transition-colors">
                                    <MoreVertical className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit Category
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:text-destructive"
                                        onClick={() => setDeleteOpen(true)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Category
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Decorative gradient line */}
                    <div className="h-1 w-full bg-linear-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
            </Card>

            {/* ═══════════════════ Edit Dialog ═══════════════════ */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Pencil className="h-4 w-4 text-primary" />
                            </div>
                            Edit Category
                        </DialogTitle>
                        <DialogDescription>
                            Update the category name and image.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Category Name</Label>
                            <Input
                                id="edit-name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Enter category name"
                                className="h-11"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Category Image</Label>
                            <div className="flex items-center gap-4">
                                {/* Current/Preview Image */}
                                <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0 border-2 border-dashed border-muted-foreground/30">
                                    {editImage ? (
                                        <>
                                            <Image
                                                src={editImage}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                                onClick={() => setEditImage('')}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                            <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                                        </div>
                                    )}
                                </div>

                                {/* Upload Button */}
                                <div className="flex-1">
                                    <UploadButton
                                        endpoint="categoryImage"
                                        onClientUploadComplete={(res) => {
                                            if (res?.[0]?.url) {
                                                setEditImage(res[0].url)
                                                toast.success('Image uploaded!')
                                            }
                                        }}
                                        onUploadError={(error) => {
                                            toast.error('Upload failed', {
                                                description: error.message,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setEditOpen(false)
                                setEditName(category.name)
                                setEditImage(category.image ?? '')
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={isPending || !editName.trim()}
                            className="gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Check className="h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </DialogFooter>
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
                            Delete Category?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete <strong>&quot;{category.name}&quot;</strong>?
                            This action cannot be undone and will remove all associations.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-destructive hover:bg-destructive/90 gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
