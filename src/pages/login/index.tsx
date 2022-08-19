import React from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <Styled.Page>
      <Styled.Container>
        <Styled.Test>Login Page</Styled.Test>
      </Styled.Container>
    </Styled.Page>
  );
};

export default Login;

const Styled = {
  Page: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  `,

  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    background-color: ${({ theme: { colors } }) => colors.primary.light};
    border-radius: 10px;
  `,

  Test: styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
};
