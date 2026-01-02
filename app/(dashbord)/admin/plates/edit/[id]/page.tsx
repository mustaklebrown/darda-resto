import prisma from '@/lib/prisma'
import { PlateForm } from '@/app/_components/admin/plate-form'
import { updatePlate } from '@/app/(dashbord)/admin/plates/actions'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function EditPlateContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    let plate, categories;

    try {
        plate = await prisma.plate.findUnique({
            where: { id: id },
        })
        categories = await prisma.categoryPlate.findMany()
    } catch (error) {
        console.error("Error fetching plate:", error)
        // If DB fails, we redirect. 
        // Note: we can't easily distinguish between a DB error and other errors here without more logic, 
        // but for now this mimics previous behavior safely.
    }

    if (!plate) {
        redirect('/admin/plates')
    }

    async function submit(data: { name?: string; description?: string; price?: number; categoryId?: string; image?: string }) {
        'use server'
        await updatePlate(id, data)
        redirect('/admin/plates')
    }

    return (
        <PlateForm
            initialData={plate}
            categories={categories || []}
            onSubmit={submit}
        />
    )
}

export default function EditPlatePage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8">Chargement...</div>}>
            <EditPlateContent params={params} />
        </Suspense>
    )
}
