'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateReservationStatus(
  id: string,
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
) {
  await prisma.reservation.update({
    where: { id },
    data: { status },
  });
  revalidatePath('/admin/reservations');
}
