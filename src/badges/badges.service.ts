import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Badges, Item } from '@prisma/client';
// import { Prisma } from '@prisma/client';

@Injectable()
export class BadgeService {
  constructor(private prisma: PrismaService) {}

  private async getDonationsByDonor(donorId: number) {
    return this.prisma.item.findMany({ where: { donorId } });
  }

  private async getDonor(donorId: number) {
    return this.prisma.donor.findMany({ where: { id: donorId } });
  }

  // 🥇 First Donation – Awarded for the first item donated.
  private firstDonation(badges: Badges[], donationsQuantity: number) {
    if (!badges.includes('FIRST_DONATION') && donationsQuantity > 0) {
      badges.push('FIRST_DONATION');
    }
    return badges;
  }

  // 🔥 Tech Savior – Given to those who donate more than 5 items.
  private techSavior(badges: Badges[], donationsQuantity: number) {
    if (!badges.includes('TECH_SAVIOR') && donationsQuantity >= 5) {
      badges.push('TECH_SAVIOR');
    }
    return badges;
  }

  // 🌍 Eco Hero – For donating energy-efficient items like laptops or tablets.
  private ecoHero(badges: Badges[], items: Item[]) {
    const ecoHeroFiltered = items.filter(
      (item) => item.item === 'NOTEBOOKS' || item.item === 'TABLETS',
    );
    if (!badges.includes('ECO_HERO') && ecoHeroFiltered.length >= 1) {
      badges.push('ECO_HERO');
    }
    return badges;
  }

  // 🎓 Education Ally – For donating to schools in neediest areas.
  private async educationAlly(badges: Badges[], items: Item[]) {
    if (badges.includes('EDUCATION_ALLY')) return badges;

    const schoolIds = [...new Set(items.map((item) => item.schoolId))];

    const schools = await this.prisma.school.findMany({
      where: {
        id: { in: schoolIds },
      },
    });

    const needySchools = schools.filter((school) => school.unprivilegedArea);

    if (needySchools.length > 0) {
      badges.push('EDUCATION_ALLY');
    }

    return badges;
  }

  async handleDonnorBadges(donorId: number) {
    const [donorItems, donor] = await Promise.all([
      this.getDonationsByDonor(donorId),
      this.getDonor(donorId),
    ]);

    let { badges } = donor[0];
    badges = this.firstDonation(badges, donorItems.length);
    badges = this.techSavior(badges, donorItems.length);
    badges = this.ecoHero(badges, donorItems);
    badges = await this.educationAlly(badges, donorItems);

    const data = donor[0];
    data.badges = badges;
    return this.prisma.donor.update({ where: { id: donorId }, data });
  }
}
