import prisma from '@/lib/prisma'
import { PlateForm } from '@/app/_components/plate-form'
import { updatePlate } from '@/app/(dashbord)/admin/plates/actions'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function EditPlateContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try {
        const plate = await prisma.plate.findUnique({
            where: { id: id },
        })

        if (!plate) {
            redirect('/admin/plates')
        }

        const categories = await prisma.category.findMany()

        async function submit(data: { name?: string; description?: string; price?: number; categoryId?: string; image?: string }) {
            'use server'
            await updatePlate(id, data)
            redirect('/admin/plates')
        }

        return (
            <PlateForm
                initialData={plate}
                categories={categories}
                onSubmit={submit}
            />
        )
    } catch (error) {
        console.error("Error fetching plate:", error)
        redirect('/admin/plates')
    }
}

export default function EditPlatePage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8">Chargement...</div>}>
            <EditPlateContent params={params} />
        </Suspense>
    )
}
