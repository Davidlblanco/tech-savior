export class Mobile {
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

    // Check if the number has exactly 11 digits (e.g., 11999999999)
    if (!/^\d{11}$/.test(normalizedValue)) {
      throw new Error('Invalid Brazilian mobile number!');
    }

    // Validate the area code (first two digits after the country code)
    const areaCode = normalizedValue.substring(2, 4);
    if (!/^[1-9][0-9]$/.test(areaCode)) {
      throw new Error('Invalid area code in Brazilian mobile number!');
    }

    // Validate the mobile number (should start with 9 after the area code)
    const mobileNumber = normalizedValue.substring(2);
    if (!/^9\d{8}$/.test(mobileNumber)) {
      throw new Error('Invalid mobile number format in Brazil!');
    }

    return normalizedValue;
  }
}
