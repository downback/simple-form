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
