import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const schoolExists = await prisma.school.count();
  if (schoolExists) {
    console.log('Your db was already seeded! 🐣');
    return;
  }

  // Create a school
  const school = await prisma.school.create({
    data: {
      name: 'Tech Savior School',
      street: '123 Main St',
      number: '456',
      postalCode: '12345',
      neighbourhood: 'Downtown',
      unprivilegedArea: true,
      urgency: 'THREE',
      quantityOfStudents: 500,
      availability: 'Mon-Fri 08:00-16:00',
    },
  });

  // Create a donor
  const donor = await prisma.donor.create({
    data: {
      email: 'donor@example.com',
      name: 'Generous Donor',
      document: '123456789',
      mobile: '+1234567890',
    },
  });

  // Create items donated to the school
  await prisma.item.createMany({
    data: [
      {
        item: 'NOTEBOOKS',
        condition: 'GOOD',
        donorId: donor.id,
        schoolId: school.id,
      },
      {
        item: 'MONITOR',
        condition: 'NEW',
        donorId: donor.id,
        schoolId: school.id,
      },
      {
        item: 'MOUSE',
        condition: 'FAIR',
        donorId: donor.id,
        schoolId: school.id,
      },
    ],
  });

  console.log('Postgres was successfully seeded! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
