'use server';

import { loginSchema, signupSchema } from '@/lib/validators/auth';
import { z } from 'zod';
import { auth } from '@/lib/auth';

type SignUpResult = { success: true } | { success: false; error: string };
type SignInResult = { success: true } | { error: string };

/* ----------------------------------
   SIGN UP (unchanged)
----------------------------------- */
export async function signUpAction(
  values: z.infer<typeof signupSchema>
): Promise<SignUpResult> {
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: 'Données invalides' };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.name,
      },
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message ?? 'Impossible de créer le compte',
    };
  }
}

/* ----------------------------------
   FIXED SIGN IN (same logic)
----------------------------------- */

export type LoginInput = z.infer<typeof loginSchema>;
export async function signInAction(values: LoginInput): Promise<SignInResult> {
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return { error: 'Invalid form data' };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
      },
    });

    return { success: true };
  } catch (error: any) {
    return {
      error: error?.message ?? 'Invalid email or password',
    };
  }
}
