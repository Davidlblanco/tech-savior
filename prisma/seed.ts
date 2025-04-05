import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const schoolExists = await prisma.school.count();
  if (schoolExists) {
    console.log('Your db was already seeded! 🐣');
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash('123456', 10); // 10 is the salt rounds

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
      phone: '99999999',
      email: 'school@school.com',
      password: hashedPassword, // Use the hashed password
    },
  });

  // Create a donor
  const donor = await prisma.donor.create({
    data: {
      email: 'donor@example.com',
      name: 'Generous Donor',
      document: '123456789',
      mobile: '+1234567890',
      site: 'www.example.com',
    },
  });

  // Create items donated to the school
  await prisma.item.createMany({
    data: [
      {
        item: 'NOTEBOOKS',
        name: 'NOTEBOOK samsung',
        condition: 'GOOD',
        donorId: donor.id, // Use donorId for relation
        schoolId: school.id, // Use schoolId for relation
      },
      {
        item: 'MONITOR',
        name: 'monitor dell',
        condition: 'NEW',
        donorId: donor.id,
        schoolId: school.id,
      },
      {
        item: 'MOUSE',
        name: 'mouse logitec',
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
