import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexBox, textStyle } from 'styles/utils';

const GNB = () => {
  const navigate = useNavigate();
  const hasToken = localStorage.getItem('accessToken') || false;

  const onClickLogoutBtn = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  if (!hasToken) return null;
  return (
    <Styled.Container>
      <Styled.Button onClick={onClickLogoutBtn}>로그아웃</Styled.Button>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.nav`
    position: fixed;
    width: 100%;
    height: 50px;
    background-color: ${({ theme }) => theme.colors.primary.light};
    ${flexBox('center', 'center')};
  `,

  Button: styled.button`
    ${textStyle('md')}
    font-weight: 700;
  `,
};

export default GNB;
