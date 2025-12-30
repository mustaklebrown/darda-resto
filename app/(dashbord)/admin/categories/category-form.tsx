'use client'

import { useState } from 'react'
import { UploadButton } from '@/lib/uploadthing'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createCategory, updateCategory } from './action/actions'
import image from 'next/image'

type Props = {
    category?: {
        id: string
        name: string
        image: string
    }
}

export function CategoryForm({ category }: Props) {
    const [name, setName] = useState(category?.name ?? '')
    const [image, setImage] = useState(category?.image ?? '')
    const [loading, setLoading] = useState(false)

    async function onSubmit() {
        setLoading(true)

        if (category) {
            await updateCategory(category.id, { name, image })
        } else {
            await createCategory({ name, image })
            setName('')
            setImage('')
        }


        setLoading(false)
    }

    return (
        <div className="space-y-4">
            <Input
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <UploadButton
                endpoint="categoryImage"
                onClientUploadComplete={(res) => {
                    setImage(res[0].url)
                }}
            />

            {image && (
                <img
                    src={image}
                    alt="Preview"
                    className="rounded-xl h-40 object-cover"
                />
            )}

            <Button
                disabled={loading || !name || !image}
                onClick={onSubmit}
                className="w-full"
            >
                {category ? 'Update Category' : 'Create Category'}
            </Button>
        </div>
    )
}
