import React, { FormHTMLAttributes, ReactElement, useState } from 'react';
import { FieldProps, FieldError, FormError, FormData } from '../types';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactElement<FieldProps>[];
    initialData: FormData;
}
//FormProps는 왜 types/index.ts에서 declare 하지 않는건가요??
//:해당 컴포넌트 프롭스들은 그 컴포넌트 파일에 선언하는 것이 일반적.

//This function is useful for initializing the error state for a form,
//ensuring that each field starts with a default success state and no error message.
const getInitialError = (data?: FormData) => {
    const error: FormError = {};
    for (const key in data) {
        error[key] = {
            success: true,
            message: undefined,
        };
    }
    return error;
};

const Form = (props: FormProps) => {
    const [values, setValues] = useState<FormData>(props.initialData);
    const [errors, setErrors] = useState<FormError>(
        getInitialError(props.initialData)
    );

    return (
        <form id={props.id} onSubmit={props.onSubmit}>
            {React.Children.map(
                props.children,
                (child: React.ReactElement<FieldProps>) =>
                    React.cloneElement(child, {
                        value: values?.[child.props.name],
                        setValue: (v: string) => {
                            setValues({
                                ...values,
                                [child.props.name]: v,
                            });
                        },
                        error: errors?.[child.props.name],
                        setError: (v: FieldError) => {
                            setErrors({
                                ...errors,
                                [child.props.name]: v,
                            });
                        },
                    })
            )}
        </form>
    );
};

export default Form;
