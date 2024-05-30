import { FieldError } from '../types/index';

// TODO: create min, max validators

export const required = (v: string): FieldError => {
    if (!v) {
        return {
            success: false,
            message: '필수 입력 항목입니다.',
        };
    }
    return {
        success: true,
    };
};

export const min =
    (min: number) =>
    (v: string): FieldError => {
        if (v.length < min) {
            return {
                success: false,
                message: `${min}자 이상 입력하세요.`,
            };
        }
        return {
            success: true,
        };
    };

export const max =
    (max: number) =>
    (v: string): FieldError => {
        if (v.length > max) {
            return {
                success: false,
                message: `${max}자 미만으로 입력하세요.`,
            };
        }
        return {
            success: true,
        };
    };

// //Examples to understand when a function defined in two parts
// const validateMaxLength = max(10);
// const fieldError = validateMaxLength('hello'); // { success: true }
// const fieldError2 = validateMaxLength('this is a very long string'); // { success: false, message: "10자 미만으로 입력하세요." }

export const email = (v: string): FieldError => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(v)) {
        return {
            success: false,
            message: '이메일 형식이 아닙니다.',
        };
    }
    return {
        success: true,
    };
};

//여기서 이 function을 만들어서 export해서 App에서 써야하는지 잘 모르겠어여....

export const match =
    (confirmationValue: string) =>
    (v: string): FieldError | undefined => {
        return v === confirmationValue
            ? undefined
            : { message: '비밀번호가 일치하지 않습니다.', success: false };
    };
