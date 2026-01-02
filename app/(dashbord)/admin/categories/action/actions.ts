'use server';

import prisma from '@/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';

/* ----------------------------------
   PLATE CATEGORIES
----------------------------------- */
export async function createCategory(data: { name: string; image: string }) {
  await prisma.categoryPlate.create({
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
  await prisma.categoryPlate.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/categories');
  revalidateTag('categories', 'max');
  revalidateTag('menu-data', 'max');
}

export async function deleteCategory(id: string) {
  await prisma.categoryPlate.delete({ where: { id } });
  revalidatePath('/admin/categories');
  revalidateTag('categories', 'max');
  revalidateTag('menu-data', 'max');
}

/* ----------------------------------
   MENU CATEGORIES
----------------------------------- */
export async function createMenuCategory(data: {
  name: string;
  image: string;
}) {
  await prisma.categoryMenu.create({
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

export async function updateMenuCategory(
  id: string,
  data: { name: string; image?: string }
) {
  await prisma.categoryMenu.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/categories');
  revalidateTag('categories', 'max');
  revalidateTag('menu-data', 'max');
}

export async function deleteMenuCategory(id: string) {
  await prisma.categoryMenu.delete({ where: { id } });
  revalidatePath('/admin/categories');
  revalidateTag('categories', 'max');
  revalidateTag('menu-data', 'max');
}
