export class CNPJ {
  readonly value: string;

  constructor(value: string) {
    this.value = this.validate(value);
  }

  private normalize(value: string) {
    const normalizedString = /^\d+$/.test(value)
      ? value
      : value.replace(/\D/g, '');
    const normalizedNumber = parseInt(normalizedString, 10);
    return { normalizedNumber, normalizedString };
  }

  private validate(value: string) {
    if (/[a-zA-Z]/.test(value)) throw new Error('Invalid cnpj!');
    const normalizedCnpj = this.normalize(value).normalizedNumber;
    if (normalizedCnpj >= 1e14) throw new Error('Invalid cnpj!');
    if (!normalizedCnpj) throw new Error('Invalid cnpj!');
    if (isNaN(normalizedCnpj)) throw new Error('Invalid cnpj!');
    if (!this.isCnpj(this.normalize(value).normalizedString))
      throw new Error('Invalid cnpj!');

    return this.normalize(value).normalizedString;
  }

  private isCnpj(value: string): boolean {
    try {
      const cnpj = value.split('').map((item) => parseInt(item));

      const arr1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const arr2 = [6, ...arr1];

      const validator1 = cnpj[cnpj.length - 2];
      const validator2 = cnpj[cnpj.length - 1];

      const finalArr1 = arr1.map((item, index) => item * cnpj[index]);
      const finalArr2 = arr2.map((item, index) => item * cnpj[index]);

      const finalSum1 = finalArr1.reduce((acc, cur) => {
        acc += cur;
        return acc;
      }, 0);
      const finalSum2 = finalArr2.reduce((acc, cur) => {
        acc += cur;
        return acc;
      }, 0);

      let rest1 = finalSum1 % 11;
      rest1 = rest1 < 2 ? 0 : 11 - rest1;

      let rest2 = finalSum2 % 11;
      rest2 = rest2 < 2 ? 0 : 11 - rest2;

      return rest1 === validator1 && rest2 === validator2;
    } catch (e) {
      console.error('Error:', e);
      return false;
    }
  }
}

// const validCnpjs = [
//   '64859821000160',
//   '36378760000184',
//   '25597747000108',
//   '94682825000187',
//   '26480952000143',
//   '38617420000194',
//   '29790918000163',
//   '71705442000181',
//   '01832017000178',
//   '43206849000129',
// ];
