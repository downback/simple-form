import { FieldError } from '../types/index';

/**
 * Validates if the input value is not empty.
 * @param value - The input value to be validated.
 * @returns An error object if the value is empty, otherwise `undefined`.
 */
export const required = (value: string): FieldError | undefined => {
    return value.trim().length === 0
        ? { message: 'This field is required', success: false }
        : undefined;
};

/**
 * Validates if the input value is a valid email address.
 * @param value - The input value to be validated.
 * @returns An error object if the value is not a valid email, otherwise `undefined`.
 */
export const email = (value: string): FieldError | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
        ? undefined
        : { message: 'Please enter a valid email address', success: false };
};

/**
 * Validates if the input value has a minimum length.
 * @param minLength - The minimum length required for the input value.
 * @returns A function that takes the input value and returns an error object if the value is too short, otherwise `undefined`.
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
 * @param maxLength - The maximum length allowed for the input value.
 * @returns A function that takes the input value and returns an error object if the value is too long, otherwise `undefined`.
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
 * @param confirmationValue - The value to be matched.
 * @returns A function that takes the input value and returns an error object if the values don't match, otherwise `undefined`.
 */
export const match =
    (confirmationValue: string) =>
    (value: string): FieldError | undefined => {
        return value === confirmationValue
            ? undefined
            : { message: 'The values do not match', success: false };
    };
