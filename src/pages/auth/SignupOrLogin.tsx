import api from 'lib/api';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { flexBox } from 'styles/utils';
import { textStyle } from 'styles/utils';
import { InputLabel } from 'components/Input';

// 1. input Core Component 만들기
// 2. axios fetching util 함수 만들기
// 3. env에 따른 변경사항 점 만들기 (getEnv() 해서 env에 해당하는 url 뺄 수 있게끔)
// 4. Login 요청

// 근데 처음부터 클린코드를 할 생각 하지말고 선 구현 후 Component 나누고, axios instance 만들 것!

type UserForm = {
  email: string;
  password: string;
};

const SignupOrLogin = () => {
  const [userForm, setUserForm] = useState<UserForm>({
    email: '',
    password: '',
  });

  const handleInput = ({ target }: { target: HTMLInputElement }) => {
    setUserForm({ ...userForm, [target?.name]: target?.value });
    console.log(userForm);
  };

  const handlePressSubmitButton = async () => {
    const data = await axios.post(api.auth.signup, userForm);
    console.log(data);
  };

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
              type="text"
              placeholder="Email"
              onChange={handleInput}
              isHint
            />
            <InputLabel
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInput}
              isHint
            />
            <Styled.Button onClick={handlePressSubmitButton} type="submit">
              제출요
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

  Button: styled.button`
    ${textStyle('base')};
    width: 100%;
    margin-top: 24px;
    padding: 16px 0;
    border-radius: 4px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary.base};
    transition: background-color 300ms ease-in-out;

    :hover {
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
  `,
};
