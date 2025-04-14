export class PostalCode {
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

    // Check if the postal code has exactly 8 digits
    if (!/^\d{8}$/.test(normalizedValue)) {
      throw new Error('Invalid Brazilian postal code!');
    }

    return normalizedValue;
  }
}
