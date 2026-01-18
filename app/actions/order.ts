'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Nom requis'),
  customerEmail: z.string().email('Email invalide'),
  customerPhone: z.string().min(8, 'Téléphone requis'),
  address: z.string().min(5, 'Adresse requise'),
  items: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['plate', 'menu']),
      quantity: z.number().min(1),
      price: z.number(),
      name: z.string(),
    }),
  ),
});

export async function createOrderAction(data: z.infer<typeof orderSchema>) {
  const result = orderSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const { customerName, customerEmail, customerPhone, address, items } =
    result.data;

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  try {
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        address,
        totalPrice,
        items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            plateId: item.type === 'plate' ? item.id : undefined,
            menuId: item.type === 'menu' ? item.id : undefined,
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Failed to create order' };
  }
}
