export class CPF {
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
    if (/[a-zA-Z]/.test(value)) throw new Error('invalid cpf!');
    const normalizedCpf = this.normalize(value).normalizedNumber;
    if (normalizedCpf >= 1e11) throw new Error('invalid cpf!');
    if (isNaN(normalizedCpf)) throw new Error('invalid cpf!');
    if (!this.isCpf(this.normalize(value).normalizedString))
      throw new Error('invalid cpf!');

    return this.normalize(value).normalizedString;
  }

  private isCpf(value: string): boolean {
    try {
      // Pad the CPF number to always have 11 digits
      const paddedCpf = value.padStart(11, '0');
      const arr1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
      const arr2 = [11, ...arr1];

      const cpf = paddedCpf.split('').map((item) => parseInt(item));

      const validator1 = cpf[cpf.length - 2];
      const validator2 = cpf[cpf.length - 1];

      const finalArr1 = arr1.map((item, index) => item * cpf[index]);
      const finalArr2 = arr2.map((item, index) => item * cpf[index]);

      const finalSum1 = finalArr1.reduce((acc, cur) => acc + cur, 0);
      const finalSum2 = finalArr2.reduce((acc, cur) => acc + cur, 0);
      let rest1 = (finalSum1 * 10) % 11;
      let rest2 = (finalSum2 * 10) % 11;

      rest1 = rest1 === 10 ? 0 : rest1;
      rest2 = rest2 === 10 ? 0 : rest2;

      return rest1 === validator1 && rest2 === validator2;
    } catch (e) {
      console.error('Error:', e);
      return false;
    }
  }
}

// const validCpfs=[
// "41763099032",
// "21584795077",
// "03435140011",
// "73453313003",
// "61839882000",
// "47092552028",
// "86621894074",
// "28694546000",
// "09955691000",
// "26100572028",]
