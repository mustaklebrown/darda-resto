'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UploadImage } from '@/components/upload-image'


import { CategoryPlate, Plate } from '@/lib/prisma'

interface PlateFormProps {
    initialData: Partial<Plate>
    categories: CategoryPlate[]
    onSubmit: (data: any) => void
}

export function PlateForm({
    initialData,
    categories,
    onSubmit,
}: PlateFormProps) {
    const [form, setForm] = useState(initialData)

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                onSubmit(form)
            }}
            className="space-y-6 rounded-3xl border bg-background/70 backdrop-blur-xl p-8"
        >
            <Input
                placeholder="Nom du plat"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <Textarea
                placeholder="Description"
                value={form.description}
                onChange={e =>
                    setForm({ ...form, description: e.target.value })
                }
            />

            <Input
                type="number"
                placeholder="Prix"
                value={form.price}
                onChange={e =>
                    setForm({ ...form, price: Number(e.target.value) })
                }
            />

            <select
                className="w-full rounded-xl border p-3 bg-background"
                value={form.categoryId}
                onChange={e =>
                    setForm({ ...form, categoryId: e.target.value })
                }
            >
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            {form.image && (
                <img
                    src={form.image}
                    className="rounded-xl h-40 object-cover"
                />
            )}

            <UploadImage
                onUploaded={url => setForm({ ...form, image: url })}
            />

            <Button type="submit" className="w-full">
                Sauvegarder le Plat
            </Button>
        </form>
    )
}
