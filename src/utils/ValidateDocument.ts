import { CNPJ } from './Cnpj';
import { CPF } from './Cpf';

export class ValidateDocument {
  readonly value: string;

  constructor(value: string) {
    this.value = this.isValisDocument(value);
  }

  private isValisDocument = (value) => {
    try {
      const document = new CPF(value);
      return document.value;
    } catch (e) {
      console.log('is not a cpf', e);
      try {
        const document = new CNPJ(value);
        return document.value;
      } catch (e) {
        console.log('is not a cnpj', e);
        throw new Error('Document is not valid!');
      }
    }
  };
}
