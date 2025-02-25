import { validateBr, maskBr } from "js-brasil";
import uuidValidator from "uuid-validate";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js/mobile";

import { validate as emailValidator } from "email-validator";

export enum PixKeyType {
  CPF = "cpf",
  CNPJ = "cnpj",
  RANDOM = "random",
  EMAIL = "email",
  PHONE = "phone",
}

const PIX_KEY_CPF = PixKeyType.CPF;
const PIX_KEY_CNPJ = PixKeyType.CNPJ;
const PIX_KEY_RANDOM = PixKeyType.RANDOM;
const PIX_KEY_EMAIL = PixKeyType.EMAIL;
const PIX_KEY_PHONE = PixKeyType.PHONE;

export interface PixKeyValidationResult {
  isValid: boolean;
  types: PixKeyType[];
}

const validate = (pixKey: string): PixKeyType[] => {
  if (!pixKey || typeof pixKey !== "string") {
    return [];
  }

  const keyTypes: PixKeyType[] = [];
  pixKey = pixKey.trim();

  if (validateBr.cpf(pixKey)) {
    keyTypes.push(PIX_KEY_CPF);
  }
  if (validateBr.cnpj(pixKey)) {
    keyTypes.push(PIX_KEY_CNPJ);
  }
  if (uuidValidator(pixKey)) {
    keyTypes.push(PIX_KEY_RANDOM);
  }
  if (isValidPhoneNumber(pixKey, "BR")) {
    keyTypes.push(PIX_KEY_PHONE);
  }
  if (emailValidator(pixKey)) {
    keyTypes.push(PIX_KEY_EMAIL);
  }

  return keyTypes;
};

const normalize = (pixKey: string, as?: PixKeyType | null): string | null => {
  if (!pixKey || typeof pixKey !== "string") {
    return null;
  }

  pixKey = pixKey.trim();
  const validTypes = validate(pixKey);

  if (validTypes.length === 0) {
    return null;
  }

  let useType: PixKeyType;
  if (as && validTypes.includes(as)) {
    useType = as;
  } else if (validTypes.length === 1) {
    useType = validTypes[0];
  } else {
    return null;
  }

  switch (useType) {
    case PIX_KEY_CPF:
    case PIX_KEY_CNPJ:
      return pixKey.replace(/[^0-9]/g, "");

    case PIX_KEY_RANDOM:
    case PIX_KEY_EMAIL:
      return pixKey;

    case PIX_KEY_PHONE:
      try {
        return parsePhoneNumber(pixKey, "BR").number;
      } catch {
        return null;
      }

    default:
      return null;
  }
};

const format = (pixKey: string, as?: PixKeyType | null): string | null => {
  const normalized = normalize(pixKey, as);
  if (!normalized) {
    return null;
  }

  const validTypes = validate(normalized);
  if (validTypes.length === 0) {
    return null;
  }

  const useType = as && validTypes.includes(as) ? as : validTypes[0];

  try {
    switch (useType) {
      case PIX_KEY_CPF:
        return maskBr.cpf(normalized);

      case PIX_KEY_CNPJ:
        return maskBr.cnpj(normalized);

      case PIX_KEY_RANDOM:
      case PIX_KEY_EMAIL:
        return normalized;

      case PIX_KEY_PHONE:
        const phoneNumber = parsePhoneNumber(normalized, "BR");
        return phoneNumber.country === "BR"
          ? phoneNumber.formatNational()
          : phoneNumber.formatInternational();

      default:
        return null;
    }
  } catch {
    return null;
  }
};

export { validate, normalize, format };
