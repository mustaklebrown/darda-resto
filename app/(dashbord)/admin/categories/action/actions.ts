'use server';

import prisma from '@/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';
import { randomUUID } from 'crypto';

export async function createCategory(data: { name: string; image: string }) {
  await prisma.category.create({
    data: {
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      image: data.image,
    },
  });
  revalidatePath('/admin/categories');
  revalidateTag('categories', 'max');
  revalidateTag('menu-data', 'max');
}

export async function updateCategory(
  id: string,
  data: { name: string; image?: string }
) {
  await prisma.category.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/categories');
  revalidateTag('categories', 'max');
  revalidateTag('menu-data', 'max');
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categories');
  revalidateTag('categories', 'max');
  revalidateTag('menu-data', 'max');
}
