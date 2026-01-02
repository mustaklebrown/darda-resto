'use server';

import prisma from '@/lib/prisma';
import { menuSchema } from '@/lib/validators/menu';
import { revalidatePath, revalidateTag } from 'next/cache';
import { randomUUID } from 'crypto';

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
        categoryPlates: {
          set: data.categories.map((id: string) => ({ id })),
        },
      },
    });

    revalidatePath('/admin/menus');
    revalidateTag('menus', 'max');
    revalidateTag('menu-data', 'max');
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
  revalidateTag('menus', 'max');
  revalidateTag('menu-data', 'max');
}

export async function toggleFeaturedMenu(id: string, value: boolean) {
  await prisma.menu.update({
    where: { id },
    data: {
      isFeatured: value,
      updatedAt: new Date(),
    },
  });

  revalidatePath('/admin/menus');
  revalidateTag('menus', 'max');
  revalidateTag('menu-data', 'max');
}

export async function toggleActiveMenu(id: string, value: boolean) {
  await prisma.menu.update({
    where: { id },
    data: {
      isActive: value,
      updatedAt: new Date(),
    },
  });

  revalidatePath('/admin/menus');
  revalidateTag('menus', 'max');
  revalidateTag('menu-data', 'max');
}

export async function getMenus() {
  return await prisma.menu.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      plates: {
        include: {
          categoryPlate: true,
        },
      },
      categoryPlates: true, // if menu ↔ categories exists
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

        categoryPlates: {
          connect: (categories ?? []).map((id) => ({ id })),
        },
      },
    });

    revalidatePath('/admin/menus');
    revalidateTag('menus', 'max');
    revalidateTag('menu-data', 'max');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create menu' };
  }
}
