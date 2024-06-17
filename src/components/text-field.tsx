import { FieldProps } from '../types';

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
            let newError = {
                success: true,
            };
            for (const validator of validate) {
                const validationResult = validator(v);
                if (!validationResult.success) {
                    newError = validationResult;
                    break;
                }
            }
            setError?.(newError);
        }
    };

    return (
        <div className={'text-field'}>
            <input value={value} onChange={handleChange} {...rest} />
            <div className={'error-message'}>
                {/* {error.success === false && error.message && (
                    <p id={`${rest.name}-error`}>{error.message}</p>
                )} */}
                {error.success === false && (
                    <p
                        id={`${rest.name}-error`}
                        data-testid={`${rest.name}-error`}
                    >
                        {error.message ?? ''}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TextField;
