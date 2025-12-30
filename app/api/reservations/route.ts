import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const reservationSchema = z.object({
  name: z.string().min(2, 'Le nom est trop court'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  date: z.string(),
  guests: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'Au moins 1 invité')
  ),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const rawData = await req.json();
    const validatedData = reservationSchema.parse(rawData);

    await prisma.reservation.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la réservation' },
      { status: 500 }
    );
  }
}
