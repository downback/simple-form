import './App.css';
import TextField from './components/text-field.tsx';
import Form from './components/form.tsx';

import { required, min, max, email, password, match } from './utils';

// import { FieldError } from './types';

function App() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const initialData = {
        id: '',
        password: '',
        'password-confirm': '',
        name: '',
        email: '',
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
            }}
        >
            <h1>회원가입</h1>
            <p>회원가입을 위해 아래 정보를 입력해주세요.</p>

            <Form id={'join'} onSubmit={handleSubmit} initialData={initialData}>
                {/*initialData를 넘겨주고 거기서 type 을 정의해줘도 되는가보오?*/}
                <TextField
                    name="id"
                    type="text"
                    placeholder="아이디"
                    validate={[required, min(5), max(15)]}
                />

                <TextField
                    name={'password'}
                    type="password"
                    placeholder="비밀번호"
                    validate={[required, password, min(8), max(20)]}
                />

                {/* <TextField
                    name={'password-confirm'}
                    type="password"
                    placeholder="비밀번호 확인"
                    validate={[
                        required,
                        (value): FieldError => {
                            if (value === initialData.password) {
                                return { success: true };
                            } else {
                                return {
                                    success: false,
                                    message: 'Passwords do not match',
                                };
                            }
                        },
                    ]}
                /> */}

                <TextField
                    name={'password-confirm'}
                    type="text"
                    placeholder="비밀번호 확인"
                    validate={[
                        required,
                        password,
                        match('password'),
                        min(8),
                        max(20),
                    ]}
                />

                <TextField
                    name={'name'}
                    type="text"
                    placeholder="이름"
                    validate={[required]}
                />

                <TextField
                    name={'email'}
                    type="email"
                    placeholder="이메일"
                    validate={[required, email]}
                />

                {/* TODO: create TextField for name, email and password confirm*/}
            </Form>
            <button
                type={'submit'}
                form={'join'}
                style={{
                    width: '300px',
                }}
            >
                제출하기
            </button>
        </div>
    );
}

export default App;
