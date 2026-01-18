import { z } from 'zod';

export const menuSchema = z.object({
  name: z.string().min(2, 'Menu name is required'),
  description: z.string().optional(),

  isFeatured: z.boolean(),

  startTime: z.string().optional(),
  endTime: z.string().optional(),

  plates: z.array(z.string()),
  categories: z.array(z.string()),
  image: z.string().optional(),
});

export type MenuInput = z.infer<typeof menuSchema>;
