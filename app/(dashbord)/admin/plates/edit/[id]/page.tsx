import prisma from '@/lib/prisma'
import { PlateForm } from '@/app/_components/plate-form'
import { updatePlate } from '@/app/(dashbord)/admin/plates/actions'
import { redirect } from 'next/navigation'
import { Prisma } from '@/lib/prisma'
import { Suspense } from 'react'

async function EditPlateContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const plate = await prisma.plate.findUnique({
        where: { id: id },
    })

    if (!plate) {
        redirect('/admin/plates')
    }

    const categories = await prisma.category.findMany()

    async function submit(data: Prisma.PlateUpdateInput) {
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
}

export default function EditPlatePage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8">Chargement...</div>}>
            <EditPlateContent params={params} />
        </Suspense>
    )
}
