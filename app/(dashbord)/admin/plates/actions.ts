'use server';

import prisma, { Prisma } from '@/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function deletePlate(id: string) {
  await prisma.plate.delete({ where: { id } });
  revalidatePath('/admin/plates');
  revalidateTag('plates', 'max');
  revalidateTag('menu-data', 'max');
}

export async function createPlate(data: Prisma.PlateCreateInput) {
  await prisma.plate.create({ data });
  revalidatePath('/admin/plates');
  revalidateTag('plates', 'max');
  revalidateTag('menu-data', 'max');
}

export async function updatePlate(id: string, data: Prisma.PlateUpdateInput) {
  await prisma.plate.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/plates');
  revalidateTag('plates', 'max');
  revalidateTag('menu-data', 'max');
}
