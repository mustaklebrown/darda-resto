'use server';

import prisma from '@/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';
import { randomUUID } from 'crypto';

type PlateData = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image?: string;
  slug?: string;
};

export async function deletePlate(id: string) {
  await prisma.plate.delete({ where: { id } });
  revalidatePath('/admin/plates');
  revalidateTag('plates', 'max');
  revalidateTag('menu-data', 'max');
}

export async function createPlate(data: PlateData) {
  await prisma.plate.create({
    data: {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      image: data.image || null,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
    },
  });
  revalidatePath('/admin/plates');
  revalidateTag('plates', 'max');
  revalidateTag('menu-data', 'max');
}

export async function updatePlate(id: string, data: Partial<PlateData>) {
  await prisma.plate.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.categoryId && { categoryId: data.categoryId }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.slug && { slug: data.slug }),
    },
  });
  revalidatePath('/admin/plates');
  revalidateTag('plates', 'max');
  revalidateTag('menu-data', 'max');
}
