import prisma from '../lib/prisma';

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.log('Usage: bun scripts/promote-admin.ts <email>');
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'admin' },
    });
    console.log(`✅ Success: User ${user.email} is now an admin.`);
  } catch (error) {
    console.error('❌ Error: User not found or database error.');
  }
}

main();
