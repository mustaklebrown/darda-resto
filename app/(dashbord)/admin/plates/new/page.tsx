import prisma from '@/lib/prisma'
import { Suspense } from 'react'
import { createPlate } from '../actions'
import { redirect } from 'next/navigation'
import { PlateForm } from '@/app/_components/plate-form'
import { cacheLife } from 'next/cache'

async function getCategories() {
    "use cache"
    cacheLife("minutes")
    try {
        return await prisma.category.findMany()
    } catch (error) {
        console.error("Error fetching categories:", error)
        return []
    }
}

async function NewPlateContent() {
    const categories = await getCategories()

    async function submit(data: { name: string; description: string; price: number; categoryId: string; image?: string }) {
        'use server'
        await createPlate(data)
        redirect('/admin/plates')
    }

    return (
        <PlateForm
            categories={categories}
            initialData={{
                name: '',
                description: '',
                price: 0,
                image: '',
                categoryId: categories[0]?.id,
            }}
            onSubmit={submit}
        />
    )
}

export default function NewPlatePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8">Chargement...</div>}>
            <NewPlateContent />
        </Suspense>
    )
}
