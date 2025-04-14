export class Landline {
  readonly value: string;

  constructor(value: string) {
    this.value = this.validate(value);
  }

  private normalize(value: string): string {
    // Remove all non-numeric characters
    return value.replace(/\D/g, '');
  }

  private validate(value: string): string {
    const normalizedValue = this.normalize(value);

    // Check if the number has exactly 10 digits (e.g., 1133333333)
    if (!/^\d{10}$/.test(normalizedValue)) {
      throw new Error('Invalid Brazilian landline number!');
    }

    // Validate the area code (first two digits after the country code)
    const areaCode = normalizedValue.substring(2, 4);
    if (!/^[1-9][0-9]$/.test(areaCode)) {
      throw new Error('Invalid area code in Brazilian landline number!');
    }

    // Validate the landline number (should not start with 9 after the area code)
    const landlineNumber = normalizedValue.substring(2);
    if (/^8/.test(landlineNumber)) {
      throw new Error('Invalid landline number format in Brazil!');
    }

    return normalizedValue;
  }
}
