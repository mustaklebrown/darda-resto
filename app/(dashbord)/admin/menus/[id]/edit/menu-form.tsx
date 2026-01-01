'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import {
    Clock,
    Sparkles,
    UtensilsCrossed,
    FolderOpen,
    Eye,
    Save,
    Loader2,
    Check,
    AlertCircle,
    ArrowLeft,
} from 'lucide-react'
import { toast } from 'sonner'

import { updateMenuAction } from '@/app/actions/menu'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Plate, Category, Menu, Prisma } from '@/app/generated/prisma'

/* ─────────────────────────────────────────────────────────── */

const menuSchema = z.object({
    name: z.string().min(2, 'Menu name is required'),
    description: z.string().optional(),
    isFeatured: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    plates: z.array(z.string()),
    categories: z.array(z.string()),
})

type MenuInput = z.infer<typeof menuSchema>

/* ─────────────────────────────────────────────────────────── */

type MenuWithRelations = Menu & {
    plates: Plate[]
    categories: Category[]
}

interface MenuFormProps {
    menu: MenuWithRelations
    plates: Plate[]
    categories: Category[]
}

export default function MenuForm({ menu, plates, categories }: MenuFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [previewOpen, setPreviewOpen] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const form = useForm<MenuInput>({
        resolver: zodResolver(menuSchema),
        defaultValues: {
            name: menu?.name ?? '',
            description: menu?.description ?? '',
            isFeatured: menu?.isFeatured ?? false,
            startTime: menu?.startTime
                ? new Date(menu.startTime).toISOString().slice(0, 16)
                : '',
            endTime: menu?.endTime
                ? new Date(menu.endTime).toISOString().slice(0, 16)
                : '',
            plates: menu?.plates?.map((p) => p.id) ?? [],
            categories: menu?.categories?.map((c) => c.id) ?? [],
        },
    })

    const watchedPlates = form.watch('plates') ?? []
    const watchedCategories = form.watch('categories') ?? []

    const selectedPlates = plates.filter((p) => watchedPlates.includes(p.id))
    const selectedCategories = categories.filter((c) => watchedCategories.includes(c.id))

    function onSubmit(values: MenuInput) {
        setFormError(null)

        startTransition(async () => {
            try {
                const result = await updateMenuAction(menu.id, values)

                if (!result.success) {
                    toast.error('Save failed', {
                        description: result.error,
                    })
                    return
                }

                toast.success('Menu updated!', {
                    description: `"${values.name}" has been saved successfully.`,
                })

                router.push('/admin/menus')
            } catch {
                toast.error('Something went wrong', {
                    description: 'Please try again later.',
                })
            }
        })
    }

    return (
        <>
            {/* Back Button */}
            <div className="mb-6">
                <Link href="/admin/menus">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Menus
                    </Button>
                </Link>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">

                {/* Global error alert */}
                {formError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                )}

                {/* ══════════════════ Basic Info Card ══════════════════ */}
                <Card className="border-0 shadow-lg bg-linear-to-br from-background to-muted/30">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <UtensilsCrossed className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Menu Details</CardTitle>
                                <CardDescription>
                                    Update your menu name and description
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Menu Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Weekend Brunch Special"
                                className="h-11"
                                {...form.register('name')}
                            />
                            {form.formState.errors.name && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Describe what makes this menu special..."
                                className="min-h-[100px] resize-none"
                                {...form.register('description')}
                            />
                        </div>

                        {/* Featured toggle */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-5 w-5 text-amber-500" />
                                <div>
                                    <Label className="font-medium">Featured Menu</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Highlight this menu on the homepage
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={form.watch('isFeatured')}
                                onCheckedChange={(v) => form.setValue('isFeatured', v)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* ══════════════════ Time Range Card ══════════════════ */}
                <Card className="border-0 shadow-lg bg-linear-to-br from-background to-muted/30">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <Clock className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Availability</CardTitle>
                                <CardDescription>
                                    Set when this menu should be available (optional)
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startTime" className="text-sm font-medium">
                                    Start Time
                                </Label>
                                <Input
                                    id="startTime"
                                    type="datetime-local"
                                    className="h-11"
                                    {...form.register('startTime')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime" className="text-sm font-medium">
                                    End Time
                                </Label>
                                <Input
                                    id="endTime"
                                    type="datetime-local"
                                    className="h-11"
                                    {...form.register('endTime')}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ══════════════════ Categories Card ══════════════════ */}
                <Card className="border-0 shadow-lg bg-linear-to-br from-background to-muted/30">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/10">
                                    <FolderOpen className="h-5 w-5 text-purple-500" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Categories</CardTitle>
                                    <CardDescription>
                                        Organize your menu by selecting categories
                                    </CardDescription>
                                </div>
                            </div>
                            {selectedCategories.length > 0 && (
                                <Badge variant="secondary" className="gap-1">
                                    <Check className="h-3 w-3" />
                                    {selectedCategories.length} selected
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {categories.map((cat) => {
                                const isSelected = watchedCategories.includes(cat.id)
                                return (
                                    <label
                                        key={cat.id}
                                        className={`
                                            relative flex items-center gap-3 p-3 rounded-xl cursor-pointer
                                            border-2 transition-all duration-200
                                            ${isSelected
                                                ? 'border-primary bg-primary/5 shadow-sm'
                                                : 'border-muted hover:border-muted-foreground/30 hover:bg-muted/50'
                                            }
                                        `}
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={(checked) => {
                                                const current = form.getValues('categories') ?? []
                                                form.setValue(
                                                    'categories',
                                                    checked
                                                        ? [...current, cat.id]
                                                        : current.filter((id) => id !== cat.id)
                                                )
                                            }}
                                            className="data-[state=checked]:bg-primary"
                                        />
                                        <span className="text-sm font-medium truncate">
                                            {cat.name}
                                        </span>
                                    </label>
                                )
                            })}
                        </div>
                        {categories.length === 0 && (
                            <p className="text-center text-muted-foreground py-6">
                                No categories available. Create some first!
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* ══════════════════ Plates Card ══════════════════ */}
                <Card className="border-0 shadow-lg bg-linear-to-br from-background to-muted/30">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-500/10">
                                    <UtensilsCrossed className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Plates</CardTitle>
                                    <CardDescription>
                                        Select the dishes to include in this menu
                                    </CardDescription>
                                </div>
                            </div>
                            {selectedPlates.length > 0 && (
                                <Badge variant="secondary" className="gap-1">
                                    <Check className="h-3 w-3" />
                                    {selectedPlates.length} selected
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {plates.map((plate) => {
                                const isSelected = watchedPlates.includes(plate.id)
                                return (
                                    <label
                                        key={plate.id}
                                        className={`
                                            relative flex items-center gap-4 p-4 rounded-xl cursor-pointer
                                            border-2 transition-all duration-200
                                            ${isSelected
                                                ? 'border-primary bg-primary/5 shadow-sm'
                                                : 'border-muted hover:border-muted-foreground/30 hover:bg-muted/50'
                                            }
                                        `}
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={(checked) => {
                                                const current = form.getValues('plates') ?? []
                                                form.setValue(
                                                    'plates',
                                                    checked
                                                        ? [...current, plate.id]
                                                        : current.filter((id) => id !== plate.id)
                                                )
                                            }}
                                            className="data-[state=checked]:bg-primary"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{plate.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {plate.price?.toFixed(2) ?? '0.00'}€
                                            </p>
                                        </div>
                                    </label>
                                )
                            })}
                        </div>
                        {plates.length === 0 && (
                            <p className="text-center text-muted-foreground py-6">
                                No plates available. Create some first!
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* ══════════════════ Action Buttons ══════════════════ */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="gap-2"
                        onClick={() => setPreviewOpen(true)}
                    >
                        <Eye className="h-4 w-4" />
                        Preview
                    </Button>

                    <Button
                        type="submit"
                        size="lg"
                        disabled={isPending}
                        className="flex-1 gap-2 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>

            {/* ══════════════════ Preview Dialog ══════════════════ */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-primary" />
                            Menu Preview
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Name & featured badge */}
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-2xl font-bold">
                                {form.watch('name') || 'Untitled Menu'}
                            </h2>
                            {form.watch('isFeatured') && (
                                <Badge className="bg-linear-to-r from-amber-500 to-orange-500 text-white gap-1">
                                    <Sparkles className="h-3 w-3" />
                                    Featured
                                </Badge>
                            )}
                        </div>

                        {/* Description */}
                        {form.watch('description') && (
                            <p className="text-muted-foreground leading-relaxed">
                                {form.watch('description')}
                            </p>
                        )}

                        {/* Time range */}
                        {(form.watch('startTime') || form.watch('endTime')) && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                    {form.watch('startTime')
                                        ? new Date(form.watch('startTime')!).toLocaleString()
                                        : 'Anytime'}
                                    {' → '}
                                    {form.watch('endTime')
                                        ? new Date(form.watch('endTime')!).toLocaleString()
                                        : 'Anytime'}
                                </span>
                            </div>
                        )}

                        <Separator />

                        {/* Categories */}
                        {selectedCategories.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                    Categories ({selectedCategories.length})
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCategories.map((c) => (
                                        <Badge key={c.id} variant="outline">
                                            {c.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Plates */}
                        {selectedPlates.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                    Plates ({selectedPlates.length})
                                </h4>
                                <div className="space-y-2">
                                    {selectedPlates.map((p) => (
                                        <div
                                            key={p.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                        >
                                            <span className="font-medium">{p.name}</span>
                                            <span className="text-primary font-semibold">
                                                {p.price?.toFixed(2) ?? '0.00'}€
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedPlates.length === 0 && selectedCategories.length === 0 && (
                            <p className="text-center text-muted-foreground py-4">
                                No categories or plates selected yet.
                            </p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
