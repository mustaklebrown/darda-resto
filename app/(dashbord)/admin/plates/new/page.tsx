import prisma from '@/lib/prisma'
import { Suspense } from 'react'
import { createPlate } from '../actions'
import { redirect } from 'next/navigation'
import { PlateForm } from '@/app/_components/plate-form'
import { Prisma } from '@/lib/prisma'
import { cacheLife } from 'next/cache'

async function getCategories() {
    "use cache"
    cacheLife("minutes")
    return await prisma.category.findMany()
}

async function NewPlateContent() {
    const categories = await getCategories()

    async function submit(data: Prisma.PlateCreateInput) {
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
