import Brands from '../enum/brands.enum';

const generateCreditCard = (brand: Brands): string =>
  ({
    [Brands.VISA]: '5379942932175297',
    [Brands.MASTERCARD]: '5379942932175297',
    [Brands.AMEX]: '375292876254061',
  }[brand]);

export default generateCreditCard;
