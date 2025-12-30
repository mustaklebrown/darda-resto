'use server';

import prisma from '@/lib/prisma';
import { menuSchema } from '@/lib/validators/menu';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ActionResult = { success: true } | { success: false; error: string };

export async function updateMenuAction(menuId: string, data: any) {
  try {
    await prisma.menu.update({
      where: { id: menuId },
      data: {
        name: data.name,
        description: data.description,
        isFeatured: data.isFeatured,
        startTime: data.startTime ? new Date(data.startTime) : null,
        endTime: data.endTime ? new Date(data.endTime) : null,

        plates: {
          set: data.plates.map((id: string) => ({ id })),
        },
        categories: {
          set: data.categories.map((id: string) => ({ id })),
        },
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update menu' };
  }
}

export async function deleteMenuAction(id: string) {
  await prisma.menu.delete({
    where: { id },
  });

  revalidatePath('/admin/menus');
}

export async function toggleFeaturedMenu(id: string, value: boolean) {
  await prisma.menu.update({
    where: { id },
    data: { isFeatured: value },
  });

  revalidatePath('/admin/menus');
}

export async function toggleActiveMenu(id: string, value: boolean) {
  await prisma.menu.update({
    where: { id },
    data: { isActive: value },
  });

  revalidatePath('/admin/menus');
}

export async function getMenus() {
  return await prisma.menu.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      plates: {
        include: {
          category: true,
        },
      },
      categories: true, // if menu ↔ categories exists
    },
  });
}

export async function createMenuAction(values: unknown): Promise<ActionResult> {
  try {
    const parsed = menuSchema.safeParse(values);

    if (!parsed.success) {
      return { success: false, error: 'Invalid menu data' };
    }

    const {
      name,
      description,
      isFeatured,
      startTime,
      endTime,
      plates,
      categories,
    } = parsed.data;

    await prisma.menu.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description,
        isFeatured,
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null,

        plates: {
          connect: (plates ?? []).map((id) => ({ id })),
        },

        categories: {
          connect: (categories ?? []).map((id) => ({ id })),
        },
      },
    });

    revalidatePath('/admin/menus');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create menu' };
  }
}
