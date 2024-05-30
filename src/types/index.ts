import { InputHTMLAttributes } from 'react';

export type FieldError = {
    success: boolean;
    message?: string;
};

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    validate?: ((v: string) => FieldError)[] | undefined;
    value?: string;
    error?: FieldError;
    setValue?: (v: string) => void;
    setError?: (v: FieldError) => void;
}

//WHAT is void? => it doesn't return a value

export type FormError = Record<string, FieldError>;

//EXAMPLE to understand Record<string, FieldError>
// const formError: FormError = {
//     name: {
//         success: true,
//         message: '',
//     },
//     email: {
//         success: true,
//         message: '',
//     },
// };
// console.log(formError);

export type FormData = Record<string, string>;

// const formData: FormData = {
//     username: 'John',
//     password: 'password123',
//     email: 'johndoe@example.com',
//   };

// console.log(formData);
