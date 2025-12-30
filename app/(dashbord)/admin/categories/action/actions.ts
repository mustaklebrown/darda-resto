// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { name } = await req.json();

//   await prisma.category.create({
//     data: {
//       name,
//       slug: name.toLowerCase().replace(/\s+/g, '-'),
//     },
//   });

//   return NextResponse.json({ success: true });
// }

'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCategory(data: { name: string; image: string }) {
  await prisma.category.create({
    data: {
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      image: data.image,
    },
  });
  revalidatePath('/admin/categories');
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
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categories');
}
