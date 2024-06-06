import { fireEvent, render } from '@testing-library/react';
import App from '../App.tsx';
import '@testing-library/jest-dom';

/* NOTE: 이번에도 테스트를 하나씩 통과하도록 진행해보세요.
 ** 1번 완료 후 2번 진행, 중간에 막히면 다음 번호로 넘어가지 말고 할 수 있는 데까지만 진행합니다.
 ** 1. name validation
 ** 2. email validation
 ** 3. password validation
 ** 4. password-confirm validation
 */

// TODO: 아래 테스트를 통과하도록 name field validation을 구현하세요.
test('name field validation - required', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const nameInput = getByPlaceholderText('이름');

    fireEvent.change(nameInput, { target: { value: 'abc' } }); // write something
    fireEvent.change(nameInput, { target: { value: '' } }); // remove text

    const errorMessage = getByText('값을 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

// TODO: email field validation 테스트를 만족하도록 구현하세요.
// 이메일 주소는 일반적으로 다음과 같은 형식을 따릅니다:
//     - [로컬파트]@[도메인명].[최상위도메인]
//     - ex) test@example.com
// 로컬파트 (Local Part): @ 기호 앞에 위치하며, 실제 사용자 계정을 나타냅니다. 글자, 숫자, 마침표(.), 하이픈(-), 밑줄(_) 등을 포함할 수 있습니다. 예를 들어, "test"가 로컬파트입니다.
// @ 기호: 로컬파트와 도메인명을 구분하는 기호입니다.
// 도메인명 (Domain Name): @ 기호 뒤에 위치하며, 이메일 서비스를 제공하는 서버를 나타냅니다. 예를 들어, "example"가 도메인명입니다.
// 최상위도메인 (Top-Level Domain, TLD): 도메인명 뒤에 마침표(.)로 구분되어 나타나며, 도메인의 목적과 종류를 나타냅니다. 국가코드최상위도메인(ccTLD)과 일반최상위도메인(gTLD)이 있습니다. 예를 들어, "com"은 상업용 gTLD입니다.

test('email field validation - invalid local part', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const emailInput = getByPlaceholderText('이메일');

    fireEvent.change(emailInput, { target: { value: 'test#@example.com' } });

    const errorMessage = getByText('이메일 형식에 맞게 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

test('email field validation - missing @', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const emailInput = getByPlaceholderText('이메일');

    fireEvent.change(emailInput, { target: { value: 'testexample.com' } });

    const errorMessage = getByText('이메일 형식에 맞게 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

test('email field validation - invalid domain name', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const emailInput = getByPlaceholderText('이메일');

    fireEvent.change(emailInput, { target: { value: 'test@example#.com' } });

    const errorMessage = getByText('이메일 형식에 맞게 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

// TODO: 위 email validation 테스트에서 빠진 엣지 케이스가 있는지 생각해보고 가능하면 추가해보세요.

test('email field validation - missing domain', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const emailInput = getByPlaceholderText('이메일');

    fireEvent.change(emailInput, { target: { value: 'test@' } });

    const errorMessage = getByText('이메일 형식에 맞게 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

test('email field validation - extra characters after domain', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const emailInput = getByPlaceholderText('이메일');

    fireEvent.change(emailInput, {
        target: { value: 'test@example.com.extra' },
    });

    const errorMessage = getByText('이메일 형식에 맞게 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

test('email field validation - multiple @ symbols', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const emailInput = getByPlaceholderText('이메일');

    fireEvent.change(emailInput, { target: { value: 'test@@example.com' } });

    const errorMessage = getByText('이메일 형식에 맞게 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

test('email field validation - spaces in email', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const emailInput = getByPlaceholderText('이메일');

    fireEvent.change(emailInput, { target: { value: 'test @example.com' } });

    const errorMessage = getByText('이메일 형식에 맞게 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

// TODO: password field validation 테스트를 만족하도록 구현하세요.
test('password field validation - min', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const passwordInput = getByPlaceholderText('비밀번호');

    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    const errorMessage = getByText('최소 8자 이상 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

test('password field validation - max', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const passwordInput = getByPlaceholderText('비밀번호');

    fireEvent.change(passwordInput, {
        target: { value: '123456789012345678901' },
    });

    const errorMessage = getByText('최대 20자 이하로 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
});

test('password field validation - invalid character', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const passwordInput = getByPlaceholderText('비밀번호');

    fireEvent.change(passwordInput, { target: { value: '12345678!' } });

    const errorMessage = getByText('비밀번호는 영문, 숫자만 입력 가능합니다.');
    expect(errorMessage).toBeInTheDocument();
});

// NOTE: 아래 테스트 코드는 password-confirm과 password가 일치하는지 확인하는 테스트입니다.
// 그런데 현재 상태에서는 password와 password-confirm이 일치하는지 확인하는 것이 불가능합니다.
// TODO: 그 이유를 설명해주세요.(password와 password-confirm의 value를 APP.tsx에서 비교하는 것이 불가능한 이유)
test('password-confirm field validation - match', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const passwordInput = getByPlaceholderText('비밀번호');
    const passwordConfirmInput = getByPlaceholderText('비밀번호 확인');

    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(passwordConfirmInput, { target: { value: '123456789' } }); // not match

    const errorMessage = getByText('비밀번호가 일치하지 않습니다.');
    expect(errorMessage).toBeInTheDocument();
});

//validation을 통과했는데도 에러메세지가 뜨는 경우를 방지하기 위해 아래와 같은 테스트도 필요하다고 생각했는데 맞을까요?
// 에러메세지 안뜨는지 테스트
test.skip('name field validation - proper value', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const nameInput = getByPlaceholderText('이름');

    fireEvent.change(nameInput, { target: { value: 'Hannah' } });

    const errorMessage = getByText('');
    expect(!errorMessage).toBeInTheDocument();
});
