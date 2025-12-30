'use server';

import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deletePlate(id: string) {
  await prisma.plate.delete({ where: { id } });
  revalidatePath('/admin/plates');
}

export async function createPlate(data: Prisma.PlateCreateInput) {
  await prisma.plate.create({ data });
  revalidatePath('/admin/plates');
}

export async function updatePlate(id: string, data: Prisma.PlateUpdateInput) {
  await prisma.plate.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/plates');
}
