import prisma from '@/lib/prisma'

import { createPlate } from '../actions'
import { redirect } from 'next/navigation'
import { PlateForm } from '@/app/_components/plate-form'
import { Prisma } from '@prisma/client'

export default async function NewPlatePage() {
    const categories = await prisma.category.findMany()

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
