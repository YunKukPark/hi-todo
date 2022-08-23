import React, { ReactNode } from 'react';
import styled from 'styled-components';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <Styled.Container>{children}</Styled.Container>;
};

const Styled = {
  Container: styled.div`
    padding-top: 50px;
    background-color: ${({ theme }) => theme.colors.wallpaper}; ;
  `,
};

export default Layout;
