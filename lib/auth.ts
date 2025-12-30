import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';

import { nextCookies } from 'better-auth/next-js';
import prisma from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Ajouter le plugin admin pour les rôles et permissions
  plugins: [
    nextCookies(),

    admin({
      // Rôles par défaut : admin a tous les droits
      defaultRole: 'user',
      adminRoles: ['admin'], // Le rôle "admin" a full access
    }),
  ],
  // Ajouter un champ rôle personnalisé (optionnel mais recommandé)
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        required: false,
      },
    },
  },
  // Hook pour assigner automatiquement le rôle admin au premier utilisateur ou via env
  databaseHooks: {
    user: {
      create: {
        before: async (data) => {
          // Exemple : premier user créé devient admin
          const userCount = await prisma.user.count();
          if (userCount === 0) {
            return { data: { ...data, role: 'admin' } };
          }
          return { data };
        },
      },
    },
  },
});
