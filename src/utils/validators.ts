import { FieldError } from '../types/index';

/**
 * Validates if the input value is not empty.
 */
export const required = (value: string): FieldError | undefined => {
    return value.trim().length === 0
        ? { message: 'This field is required', success: false }
        : undefined;
};

/**
 * Validates if the input value is a valid email address.
 */
export const email = (value: string): FieldError | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
        ? undefined
        : { message: 'Please enter a valid email address', success: false };
};

/**
 * Validates if the input value has a minimum length.
 */
export const min =
    (minLength: number) =>
    (value: string): FieldError | undefined => {
        return value.length >= minLength
            ? undefined
            : {
                  message: `This field must be at least ${minLength} characters long`,
                  success: false,
              };
    };

/**
 * Validates if the input value has a maximum length.
 */
export const max =
    (maxLength: number) =>
    (value: string): FieldError | undefined => {
        return value.length <= maxLength
            ? undefined
            : {
                  message: `This field must be no more than ${maxLength} characters long`,
                  success: false,
              };
    };

/**
 * Validates if the input value matches the confirmation value.
 */
export const match =
    (confirmationValue: string) =>
    (value: string): FieldError | undefined => {
        return value === confirmationValue
            ? undefined
            : { message: 'The values do not match', success: false };
    };