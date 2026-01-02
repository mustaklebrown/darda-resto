import 'dotenv/config';
import prisma from '../lib/prisma';

console.log('DB URL exists:', !!process.env.DATABASE_URL);

async function main() {
  console.log('Start seeding ...');

  // Clean up existing data
  await prisma.plate.deleteMany();
  await prisma.categoryPlate.deleteMany();
  console.log('Deleted existing data.');

  // ... (commented out code)

  /* ------------------------
     Plate Categories
  ------------------------ */

  const appetizers = await prisma.categoryPlate.upsert({
    where: { slug: 'appetizers' },
    update: {},
    create: {
      name: 'Entrées',
      slug: 'appetizers',
      image: '/images/categories/appetizers.jpg',
    },
  });

  const mainCourses = await prisma.categoryPlate.upsert({
    where: { slug: 'main-courses' },
    update: {},
    create: {
      name: 'Plats Principaux',
      slug: 'main-courses',
      image: '/images/categories/mains.jpg',
    },
  });

  const seafood = await prisma.categoryPlate.upsert({
    where: { slug: 'seafood' },
    update: {},
    create: {
      name: 'Fruits de Mer',
      slug: 'seafood',
      image: '/images/categories/seafood.jpg',
    },
  });

  const desserts = await prisma.categoryPlate.upsert({
    where: { slug: 'desserts' },
    update: {},
    create: {
      name: 'Desserts',
      slug: 'desserts',
      image: '/images/categories/desserts.jpg',
    },
  });

  const beverages = await prisma.categoryPlate.upsert({
    where: { slug: 'beverages' },
    update: {},
    create: {
      name: 'Boissons',
      slug: 'beverages',
      image: '/images/categories/beverages.jpg',
    },
  });

  console.log('✅ Created 5 plate categories');

  /* ------------------------
     Menu Categories
  ------------------------ */

  const traditionalMenu = await prisma.categoryMenu.upsert({
    where: { slug: 'traditional' },
    update: {},
    create: {
      name: 'Traditionnel',
      slug: 'traditional',
    },
  });

  const seafoodMenu = await prisma.categoryMenu.upsert({
    where: { slug: 'seafood-special' },
    update: {},
    create: {
      name: 'Spécialités Marines',
      slug: 'seafood-special',
    },
  });

  console.log('✅ Created menu categories');

  /* ------------------------
     Plates - Appetizers
  ------------------------ */

  const sambusa = await prisma.plate.upsert({
    where: { slug: 'sambusa-viande' },
    update: {},
    create: {
      name: 'Sambusa à la Viande',
      slug: 'sambusa-viande',
      description:
        'Beignets croustillants farcis de viande épicée, oignons et herbes fraîches',
      price: 6.5,
      categoryId: appetizers.id,
      image: '/images/plates/sambusa.jpg',
    },
  });

  const mkatra = await prisma.plate.upsert({
    where: { slug: 'mkatra-foutra' },
    update: {},
    create: {
      name: 'Mkatra Foutra',
      slug: 'mkatra-foutra',
      description: 'Pain comorien traditionnel moelleux, parfait pour tremper',
      price: 3.0,
      categoryId: appetizers.id,
      image: '/images/plates/mkatra.jpg',
    },
  });

  const beignets = await prisma.plate.upsert({
    where: { slug: 'beignets-banane' },
    update: {},
    create: {
      name: 'Beignets de Banane',
      slug: 'beignets-banane',
      description:
        'Beignets dorés de bananes plantains, servis chauds avec sauce coco',
      price: 5.0,
      categoryId: appetizers.id,
      image: '/images/plates/beignets-banane.jpg',
    },
  });

  /* ------------------------
     Plates - Main Courses
  ------------------------ */

  const pilau = await prisma.plate.upsert({
    where: { slug: 'pilau-poulet' },
    update: {},
    create: {
      name: 'Pilau au Poulet',
      slug: 'pilau-poulet',
      description:
        'Riz parfumé aux épices, poulet tendre mariné, servi avec légumes et sauce tomate épicée',
      price: 16.0,
      categoryId: mainCourses.id,
      image: '/images/plates/pilau.jpg',
    },
  });

  const mataba = await prisma.plate.upsert({
    where: { slug: 'mataba' },
    update: {},
    create: {
      name: 'Mataba',
      slug: 'mataba',
      description:
        'Feuilles de manioc cuites au lait de coco avec viande et cacahuètes, plat signature comorien',
      price: 18.0,
      categoryId: mainCourses.id,
      image: '/images/plates/mataba.jpg',
    },
  });

  const biryani = await prisma.plate.upsert({
    where: { slug: 'biryani-agneau' },
    update: {},
    create: {
      name: "Biryani d'Agneau",
      slug: 'biryani-agneau',
      description:
        'Riz basmati parfumé au safran, agneau mariné aux épices, œuf dur et raita',
      price: 19.5,
      categoryId: mainCourses.id,
      image: '/images/plates/biryani.jpg',
    },
  });

  const rougail = await prisma.plate.upsert({
    where: { slug: 'rougail-saucisse' },
    update: {},
    create: {
      name: 'Rougail Saucisse',
      slug: 'rougail-saucisse',
      description:
        'Saucisses fumées mijotées dans une sauce tomate épicée, servi avec riz blanc',
      price: 15.0,
      categoryId: mainCourses.id,
      image: '/images/plates/rougail.jpg',
    },
  });

  /* ------------------------
     Plates - Seafood
  ------------------------ */

  const langouste = await prisma.plate.upsert({
    where: { slug: 'langouste-grille' },
    update: {},
    create: {
      name: 'Langouste Grillée',
      slug: 'langouste-grille',
      description:
        'Langouste fraîche grillée au feu de bois, sauce vanille et citron vert',
      price: 32.0,
      categoryId: seafood.id,
      image: '/images/plates/langouste.jpg',
    },
  });

  const poissonCoco = await prisma.plate.upsert({
    where: { slug: 'poisson-coco' },
    update: {},
    create: {
      name: 'Poisson au Lait de Coco',
      slug: 'poisson-coco',
      description:
        'Poisson du jour mijoté dans une sauce crémeuse au lait de coco et épices',
      price: 22.0,
      categoryId: seafood.id,
      image: '/images/plates/poisson-coco.jpg',
    },
  });

  const crevettes = await prisma.plate.upsert({
    where: { slug: 'crevettes-pili-pili' },
    update: {},
    create: {
      name: 'Crevettes Pili-Pili',
      slug: 'crevettes-pili-pili',
      description:
        "Grosses crevettes sautées à l'ail, piment et citron, servies sur lit de riz",
      price: 24.0,
      categoryId: seafood.id,
      image: '/images/plates/crevettes.jpg',
    },
  });

  const pweza = await prisma.plate.upsert({
    where: { slug: 'pweza-curry' },
    update: {},
    create: {
      name: 'Pweza au Curry',
      slug: 'pweza-curry',
      description:
        'Poulpe tendre mijoté dans un curry crémeux aux épices comoriennes',
      price: 20.0,
      categoryId: seafood.id,
      image: '/images/plates/pweza.jpg',
    },
  });

  /* ------------------------
     Plates - Desserts
  ------------------------ */

  const mkatra_siniya = await prisma.plate.upsert({
    where: { slug: 'mkatra-siniya' },
    update: {},
    create: {
      name: 'Mkatra Siniya',
      slug: 'mkatra-siniya',
      description:
        'Gâteau comorien à la noix de coco, cardamome et eau de rose',
      price: 7.0,
      categoryId: desserts.id,
      image: '/images/plates/mkatra-siniya.jpg',
    },
  });

  const bananes_flambees = await prisma.plate.upsert({
    where: { slug: 'bananes-flambees' },
    update: {},
    create: {
      name: 'Bananes Flambées',
      slug: 'bananes-flambees',
      description: 'Bananes caramélisées flambées au rhum, glace vanille',
      price: 8.5,
      categoryId: desserts.id,
      image: '/images/plates/bananes-flambees.jpg',
    },
  });

  const sorbet_coco = await prisma.plate.upsert({
    where: { slug: 'sorbet-coco-ylang' },
    update: {},
    create: {
      name: 'Sorbet Coco-Ylang Ylang',
      slug: 'sorbet-coco-ylang',
      description: "Sorbet artisanal à la noix de coco et fleur d'ylang-ylang",
      price: 6.5,
      categoryId: desserts.id,
      image: '/images/plates/sorbet.jpg',
    },
  });

  /* ------------------------
     Plates - Beverages
  ------------------------ */

  const jus_letchi = await prisma.plate.upsert({
    where: { slug: 'jus-letchi' },
    update: {},
    create: {
      name: 'Jus de Letchi Frais',
      slug: 'jus-letchi',
      description: 'Jus de litchi fraîchement pressé',
      price: 4.5,
      categoryId: beverages.id,
      image: '/images/plates/jus-letchi.jpg',
    },
  });

  const the_vanille = await prisma.plate.upsert({
    where: { slug: 'the-vanille' },
    update: {},
    create: {
      name: 'Thé à la Vanille',
      slug: 'the-vanille',
      description: 'Thé noir infusé à la vanille bourbon de Madagascar',
      price: 3.5,
      categoryId: beverages.id,
      image: '/images/plates/the-vanille.jpg',
    },
  });

  const cocktail_coco = await prisma.plate.upsert({
    where: { slug: 'cocktail-coco-passion' },
    update: {},
    create: {
      name: 'Cocktail Coco-Passion',
      slug: 'cocktail-coco-passion',
      description: 'Lait de coco, jus de fruit de la passion et menthe fraîche',
      price: 5.5,
      categoryId: beverages.id,
      image: '/images/plates/cocktail.jpg',
    },
  });

  console.log('✅ Created 17 authentic Comorian plates');

  /* ------------------------
     Menus
  ------------------------ */

  const dailySpecial = await prisma.menu.upsert({
    where: { slug: 'menu-du-jour' },
    update: {
      isFeatured: true,
      isActive: true,
    },
    create: {
      name: 'Menu du Jour',
      slug: 'menu-du-jour',
      description: 'Notre sélection quotidienne des meilleurs plats',
      type: 'DAILY',
      isFeatured: true,
      isActive: true,
      categoryMenuId: traditionalMenu.id,
      plates: {
        connect: [
          { id: sambusa.id },
          { id: pilau.id },
          { id: mataba.id },
          { id: mkatra_siniya.id },
          { id: jus_letchi.id },
        ],
      },
      categoryPlates: {
        connect: [
          { id: appetizers.id },
          { id: mainCourses.id },
          { id: desserts.id },
        ],
      },
    },
  });

  const seafoodSpecial = await prisma.menu.upsert({
    where: { slug: 'menu-fruits-mer' },
    update: {},
    create: {
      name: 'Menu Fruits de Mer',
      slug: 'menu-fruits-mer',
      description: "Découvrez les trésors de l'océan Indien",
      type: 'REGULAR',
      isFeatured: false,
      isActive: true,
      categoryMenuId: seafoodMenu.id,
      plates: {
        connect: [
          { id: beignets.id },
          { id: langouste.id },
          { id: crevettes.id },
          { id: pweza.id },
          { id: sorbet_coco.id },
        ],
      },
      categoryPlates: {
        connect: [{ id: seafood.id }, { id: desserts.id }],
      },
    },
  });

  const weekendMenu = await prisma.menu.upsert({
    where: { slug: 'menu-weekend' },
    update: {},
    create: {
      name: 'Menu Weekend Prestige',
      slug: 'menu-weekend',
      description: 'Menu gastronomique pour vos weekends',
      type: 'TIME_BASED',
      isFeatured: true,
      isActive: true,
      startTime: new Date(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 72), // +72h (weekend)
      categoryMenuId: traditionalMenu.id,
      plates: {
        connect: [
          { id: mkatra.id },
          { id: biryani.id },
          { id: poissonCoco.id },
          { id: bananes_flambees.id },
          { id: cocktail_coco.id },
        ],
      },
      categoryPlates: {
        connect: [
          { id: appetizers.id },
          { id: mainCourses.id },
          { id: seafood.id },
          { id: desserts.id },
          { id: beverages.id },
        ],
      },
    },
  });

  console.log('✅ Created 3 themed menus');

  /* ------------------------
     Reservations
  ------------------------ */
  console.log('🌱 Seeding reservations...');

  // Helper to create dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Past reservations
  await prisma.reservation.create({
    data: {
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+269-771-234-567',
      date: yesterday,
      guests: 4,
      message: 'Table près de la fenêtre si possible',
      status: 'CONFIRMED',
    },
  });

  // Today's reservations
  const lunchTime = new Date(today);
  lunchTime.setHours(12, 30, 0, 0);

  await prisma.reservation.create({
    data: {
      name: 'Fatima Said',
      email: 'fatima.said@email.com',
      phone: '+269-772-345-678',
      date: lunchTime,
      guests: 2,
      message: "Déjeuner d'affaires",
      status: 'CONFIRMED',
    },
  });

  const dinnerTime = new Date(today);
  dinnerTime.setHours(19, 0, 0, 0);

  await prisma.reservation.create({
    data: {
      name: 'Mohamed Ali',
      email: 'mohamed.ali@email.com',
      phone: '+269-773-456-789',
      date: dinnerTime,
      guests: 6,
      message: 'Dîner de famille pour anniversaire',
      status: 'PENDING',
    },
  });

  // Tomorrow's reservations
  const tomorrowLunch = new Date(tomorrow);
  tomorrowLunch.setHours(13, 0, 0, 0);

  await prisma.reservation.create({
    data: {
      name: 'Zahra Ibrahim',
      email: 'zahra.ibrahim@email.com',
      phone: '+269-774-567-890',
      date: tomorrowLunch,
      guests: 3,
      message: '',
      status: 'CONFIRMED',
    },
  });

  const tomorrowDinner = new Date(tomorrow);
  tomorrowDinner.setHours(20, 0, 0, 0);

  await prisma.reservation.create({
    data: {
      name: 'Saïd Abdou',
      email: 'said.abdou@email.com',
      phone: '+269-775-678-901',
      date: tomorrowDinner,
      guests: 2,
      message: 'Rendez-vous romantique',
      status: 'CONFIRMED',
    },
  });

  // Next week reservations
  const nextWeekDinner = new Date(nextWeek);
  nextWeekDinner.setHours(19, 30, 0, 0);

  await prisma.reservation.create({
    data: {
      name: 'Amina Mohamed',
      email: 'amina.mohamed@email.com',
      phone: '+269-776-789-012',
      date: nextWeekDinner,
      guests: 8,
      message: "Réunion de famille - besoin d'une grande table",
      status: 'PENDING',
    },
  });

  // Cancelled reservation
  const cancelledDate = new Date(tomorrow);
  cancelledDate.setHours(18, 0, 0, 0);

  await prisma.reservation.create({
    data: {
      name: 'Hassan Omar',
      email: 'hassan.omar@email.com',
      phone: '+269-777-890-123',
      date: cancelledDate,
      guests: 4,
      message: "Annulé en raison d'un empêchement",
      status: 'CANCELLED',
    },
  });

  console.log('✅ Seeded 7 reservations with various statuses');

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
