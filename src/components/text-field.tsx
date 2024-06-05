import { FieldProps } from '../types';
//import { required } from '../utils';

/*
 * TextField 컴포넌트는 input 요소를 렌더링하고, 에러 메시지를 표시합니다.
 **/
const TextField = ({
    validate,
    error = {
        success: true,
    },
    value,
    setValue,
    setError,
    ...rest
}: FieldProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValue?.(v);

        // Validate the input using if statements
        if (validate) {
            for (const validator of validate) {
                const validationResult = validator(v);
                if (!validationResult.success) {
                    error = validationResult;
                    break;
                }
            }
            if (setError) {
                setError(error);
            }
        }

        if (setValue) {
            setValue(v);
        }

        // TODO: validation
        // 1. when there is validate function, execute the validate function and set error messages.
        // 2. when there is an error, call setError function and set error messages.
        // 3. when there is no error, set success to true.
    };

    return (
        <div className={'text-field'}>
            <input value={value} onChange={handleChange} {...rest} />
            <div className={'error-message'}>
                {error.success === false && (
                    <p id={`${rest.name}-error`}>{error.message ?? ''}</p>
                )}
            </div>
            {/* {error?.message && <div>{error.message}</div>} */}
        </div>
    );
};

export default TextField;
