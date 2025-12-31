import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Darda Resto - Restaurant Comorien à Moroni',
    short_name: 'Darda Resto',
    description:
      'Restaurant traditionnel comorien à Moroni, Union des Comores. Cuisine authentique avec produits frais locaux.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#d97706',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['food', 'restaurant', 'dining'],
    lang: 'fr',
    dir: 'ltr',
  };
}
