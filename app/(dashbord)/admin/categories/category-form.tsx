'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { UploadButton } from '@/lib/uploadthing'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createCategory, updateCategory, createMenuCategory, updateMenuCategory } from './action/actions'
import { Loader2, Plus, Check } from 'lucide-react'

type Props = {
    type: 'PLATE' | 'MENU'
    category?: {
        id: string
        name: string
        image: string
    }
}

export function CategoryForm({ category, type }: Props) {
    const [name, setName] = useState(category?.name ?? '')
    const [image, setImage] = useState(category?.image ?? '')
    const [loading, setLoading] = useState(false)

    async function onSubmit() {
        setLoading(true)

        try {
            if (type === 'PLATE') {
                if (category) {
                    await updateCategory(category.id, { name, image })
                } else {
                    await createCategory({ name, image })
                    setName('')
                    setImage('')
                }
            } else {
                if (category) {
                    await updateMenuCategory(category.id, { name, image })
                } else {
                    await createMenuCategory({ name, image })
                    setName('')
                    setImage('')
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Input
                    placeholder={type === 'PLATE' ? "Nom de la catégorie (ex: Pizzas)" : "Nom de la catégorie (ex: Petit Déj)"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Image de couverture</span>
                    {image && <Check className="h-4 w-4 text-green-500" />}
                </div>

                <UploadButton
                    endpoint="categoryImage"
                    onClientUploadComplete={(res) => {
                        setImage(res[0].url)
                    }}
                    appearance={{
                        button: "ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded-xl bg-muted text-foreground after:bg-primary",
                    }}
                />

                {image && (
                    <div className="relative group rounded-xl overflow-hidden border h-40 w-full">
                        <Image
                            src={image}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
            </div>

            <Button
                disabled={loading || !name || !image}
                onClick={onSubmit}
                className="w-full h-11 rounded-xl gap-2"
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : category ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <Plus className="h-4 w-4" />
                )}
                {category ? 'Mettre à jour' : 'Créer la catégorie'}
            </Button>
        </div>
    )
}
