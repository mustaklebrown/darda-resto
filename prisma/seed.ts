import 'dotenv/config';
import prisma from '../lib/prisma';

console.log('DB URL exists:', !!process.env.DATABASE_URL);

async function main() {
  console.log('Start seeding ...');

  // Clean up existing data
  await prisma.plate.deleteMany();
  await prisma.category.deleteMany();
  console.log('Deleted existing data.');

  // Categories
  // const starters = await prisma.category.create({
  //   data: {
  //     name: 'Starters',
  //     slug: 'starters',
  //     image: '/images/starters.jpg', // Placeholder
  //     plates: {
  //       create: [
  //         {
  //           name: 'Samboussa',
  //           description:
  //             'Traditional Comorian fried pastry filled with spiced meat or fish.',
  //           price: 5.0,
  //           image: '/images/samboussa.jpg',
  //         },
  //         {
  //           name: 'Ladew',
  //           description:
  //             'Spicy pepper sauce with green mangoes, perfect for dipping.',
  //           price: 3.5,
  //           image: '/images/ladew.jpg',
  //         },
  //         {
  //           name: 'Fried Plantains',
  //           description: 'Sweet ripe plantains fried to golden perfection.',
  //           price: 4.5,
  //           image: '/images/plantains.jpg',
  //         },
  //       ],
  //     },
  //   },
  // });

  // const mainCourses = await prisma.category.create({
  //   data: {
  //     name: 'Main Courses',
  //     slug: 'main-courses',
  //     image: '/images/mains.jpg', // Placeholder
  //     plates: {
  //       create: [
  //         {
  //           name: 'Pilao',
  //           description:
  //             'Fragrant Comorian rice dish cooked with meat and spices.',
  //           price: 15.0,
  //           image: '/images/pilao.jpg',
  //         },
  //         {
  //           name: 'Mataba',
  //           description:
  //             'Cassava leaves cooked in coconut milk, often served with rice.',
  //           price: 12.0,
  //           image: '/images/mataba.jpg',
  //         },
  //         {
  //           name: 'Lobster Vanilla Sauce',
  //           description:
  //             'Fresh lobster served with a rich and creamy vanilla sauce.',
  //           price: 25.0,
  //           image: '/images/lobster.jpg',
  //         },
  //         {
  //           name: 'Grilled Fish',
  //           description:
  //             'Fresh catch of the day, marinated and grilled with local spices.',
  //           price: 18.0,
  //           image: '/images/grilled-fish.jpg',
  //         },
  //       ],
  //     },
  //   },
  // });

  // const desserts = await prisma.category.create({
  //   data: {
  //     name: 'Desserts',
  //     slug: 'desserts',
  //     image: '/images/desserts.jpg', // Placeholder
  //     plates: {
  //       create: [
  //         {
  //           name: 'Exotic Fruit Salad',
  //           description: 'A mix of fresh, seasonal tropical fruits.',
  //           price: 7.0,
  //           image: '/images/fruit-salad.jpg',
  //         },
  //         {
  //           name: 'Coconut Cake',
  //           description: 'Moist cake made with freshly grated coconut.',
  //           price: 6.5,
  //           image: '/images/coconut-cake.jpg',
  //         },
  //       ],
  //     },
  //   },
  // });

  // const drinks = await prisma.category.create({
  //   data: {
  //     name: 'Drinks',
  //     slug: 'drinks',
  //     image: '/images/drinks.jpg', // Placeholder
  //     plates: {
  //       create: [
  //         {
  //           name: 'Fresh Passion Juice',
  //           description: 'Freshly squeezed passion fruit juice.',
  //           price: 4.0,
  //           image: '/images/passion-juice.jpg',
  //         },
  //         {
  //           name: 'Comorian Tea',
  //           description: 'Spiced tea with milk and aromatic herbs.',
  //           price: 3.0,
  //           image: '/images/comorian-tea.jpg',
  //         },
  //       ],
  //     },
  //   },
  // });
  // await prisma.reservation.createMany({
  //   data: [
  //     {
  //       name: 'Ahmed Ali',
  //       email: 'ahmed@mail.com',
  //       phone: '+33 612345678',
  //       date: new Date('2025-01-05T19:00:00'),
  //       guests: 2,
  //       message: 'Anniversaire',
  //       status: 'CONFIRMED',
  //     },
  //     {
  //       name: 'Sarah Mohamed',
  //       email: 'sarah@mail.com',
  //       phone: '+33 698765432',
  //       date: new Date('2025-01-06T20:00:00'),
  //       guests: 4,
  //       status: 'PENDING',
  //     },
  //     {
  //       name: 'Youssouf Abdou',
  //       email: 'youssouf@mail.com',
  //       phone: '+269 3214567',
  //       date: new Date('2025-01-07T18:30:00'),
  //       guests: 3,
  //       status: 'CANCELLED',
  //     },
  //     {
  //       name: 'Fatima Hassan',
  //       email: 'fatima@mail.com',
  //       phone: '+90 5551234567',
  //       date: new Date('2025-01-08T21:00:00'),
  //       guests: 5,
  //       message: 'Table près de la fenêtre',
  //       status: 'PENDING',
  //     },
  //     {
  //       name: 'Ali Said',
  //       email: 'ali@mail.com',
  //       phone: '+33 612987654',
  //       date: new Date('2025-01-09T19:30:00'),
  //       guests: 2,
  //       status: 'CANCELLED',
  //     },
  //     {
  //       name: 'Mariam Kassim',
  //       email: 'mariam@mail.com',
  //       phone: '+269 3312233',
  //       date: new Date('2025-01-10T20:00:00'),
  //       guests: 6,
  //       message: 'Dîner de famille',
  //       status: 'CONFIRMED',
  //     },
  //     {
  //       name: 'Omar Salim',
  //       email: 'omar@mail.com',
  //       phone: '+90 532998877',
  //       date: new Date('2025-01-11T18:00:00'),
  //       guests: 2,
  //       status: 'PENDING',
  //     },
  //     {
  //       name: 'Nour Ahmed',
  //       email: 'nour@mail.com',
  //       phone: '+33 645778899',
  //       date: new Date('2025-01-12T21:30:00'),
  //       guests: 4,
  //       message: 'Menu végétarien',
  //       status: 'CONFIRMED',
  //     },
  //     {
  //       name: 'Ismail Ali',
  //       email: 'ismail@mail.com',
  //       phone: '+269 3456677',
  //       date: new Date('2025-01-13T19:00:00'),
  //       guests: 3,
  //       status: 'PENDING',
  //     },
  //     {
  //       name: 'Amina Abdallah',
  //       email: 'amina@mail.com',
  //       phone: '+90 554112233',
  //       date: new Date('2025-01-14T20:30:00'),
  //       guests: 2,
  //       message: 'Réservation romantique',
  //       status: 'CONFIRMED',
  //     },
  //   ],
  // });

  // console.log('✅ 10 reservations seeded successfully');

  console.log('🌱 Seeding menus...');

  console.log('🌱 Seeding menus...');

  /* ------------------------
     Categories
  ------------------------ */

  const starters = await prisma.category.upsert({
    where: { slug: 'starters' },
    update: {},
    create: {
      name: 'Entrées',
      slug: 'starters',
    },
  });

  const mains = await prisma.category.upsert({
    where: { slug: 'mains' },
    update: {},
    create: {
      name: 'Plats',
      slug: 'mains',
    },
  });

  /* ------------------------
     Plates
  ------------------------ */

  const salad = await prisma.plate.upsert({
    where: { slug: 'salade-tropicale' },
    update: {},
    create: {
      name: 'Salade Tropicale',
      slug: 'salade-tropicale',
      description: 'Salade fraîche aux fruits tropicaux',
      price: 8.5,
      categoryId: starters.id,
    },
  });

  const coconutPasta = await prisma.plate.upsert({
    where: { slug: 'pates-coco' },
    update: {},
    create: {
      name: 'Pâtes au Coco',
      slug: 'pates-coco',
      description: 'Pâtes crémeuses au lait de coco',
      price: 14.0,
      categoryId: mains.id,
    },
  });

  const mangoJuice = await prisma.plate.upsert({
    where: { slug: 'jus-mangue' },
    update: {},
    create: {
      name: 'Jus de Mangue',
      slug: 'jus-mangue',
      description: 'Jus de mangue frais',
      price: 4.0,
      categoryId: starters.id,
    },
  });

  /* ------------------------
     Menus
  ------------------------ */

  const dailyMenu = await prisma.menu.upsert({
    where: { slug: 'menu-du-jour' },
    update: {
      isFeatured: true,
    },
    create: {
      name: 'Menu du Jour',
      slug: 'menu-du-jour',
      isFeatured: true,
      startTime: new Date(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 6), // +6h
      plates: {
        connect: [
          { id: salad.id },
          { id: coconutPasta.id },
          { id: mangoJuice.id },
        ],
      },
    },
  });

  console.log('✅ Menu seeded:', dailyMenu.name);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
