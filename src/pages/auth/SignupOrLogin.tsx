import { AuthApi, TodoApi } from 'lib/api';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { flexBox } from 'styles/utils';
import { textStyle } from 'styles/utils';
import { InputLabel } from 'components/Input';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

type UserForm = {
  email: string;
  password: string;
};

const RULES = {
  email: (value: string) => value.includes('@'),
  password: (value: string) => value.length >= 8,
};

const SignupOrLogin = () => {
  const token = localStorage.getItem('accessToken') || null;
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState<UserForm>({
    email: '',
    password: '',
  });

  const isValid = (() => {
    const { email, password } = userForm;
    const isValid = RULES.email(email) && RULES.password(password);
    return !!(isValid && email && password);
  })() as boolean;

  const goToTodo = useCallback(
    (token: string) => {
      localStorage.setItem('accessToken', token);
      TodoApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/todo');
    },
    [navigate]
  );

  const onChangeText = useCallback(
    ({ target }: { target: HTMLInputElement }) => {
      setUserForm({ ...userForm, [target?.name]: target?.value });
    },
    [userForm]
  );

  const handleClickSubmitButton = useCallback(async () => {
    if (!isValid) {
      alert('다시 한번 확인해 주세요');
      return;
    }

    const { email, password } = userForm;
    try {
      const { data } = await AuthApi.post('/signin', { email, password });
      goToTodo(data.access_token);
    } catch (err: any) {
      if (err.response.status === 401) {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
        return;
      }
      if (err.response.status === 404) {
        // signup
        const { data } = await AuthApi.post('/signup', { email, password });
        goToTodo(data.access_token);
        return;
      }
    }
  }, [userForm, isValid, goToTodo]);

  useEffect(() => {
    if (token) navigate('/todo');
  }, [navigate, token]);

  return (
    <Styled.Page>
      <Styled.Container>
        <Styled.WelcomeHand>👋</Styled.WelcomeHand>
        <Styled.Title>Welcome!</Styled.Title>
        <Styled.Wrapper>
          <form onClick={e => e.preventDefault()}>
            <InputLabel
              label="Email"
              name="email"
              value={userForm.email}
              type="text"
              placeholder="Email"
              onChange={onChangeText}
              hintLabel="Email은 @가 포함되어야 합니다"
            />
            <InputLabel
              label="Password"
              name="password"
              type="password"
              value={userForm.password}
              placeholder="Password"
              onChange={onChangeText}
              hintLabel="Password는 8자 이상이 되어야 합니다"
            />
            <Styled.Button
              variant="primary"
              disabled={!isValid}
              onClick={handleClickSubmitButton}
              type="submit"
            >
              로그인 / 회원가입
            </Styled.Button>
          </form>
        </Styled.Wrapper>
      </Styled.Container>
    </Styled.Page>
  );
};

export default SignupOrLogin;

const Styled = {
  Page: styled.div`
    ${flexBox()};
    width: 100%;
    height: 100vh;
  `,

  WelcomeHand: styled.p`
    font-size: 48px;
    margin-bottom: 24px;
  `,

  Container: styled.main`
    ${flexBox()};
    flex-direction: column;
    width: 430px;
    margin: 0 auth;
    padding: 48px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
  `,

  Title: styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 700;
    margin-bottom: 24px;
  `,

  Wrapper: styled.div`
    width: 100%;
    margin-bottom: 16px;
  `,

  Button: styled(Button)`
    ${textStyle('base')};
    width: 100%;
    margin-top: 24px;
    height: 55px;
    transition: opacity 250ms ease-in-out;
  `,
};
