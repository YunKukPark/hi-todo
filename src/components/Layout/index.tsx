import React from 'react';
import styled from 'styled-components';

type LayoutProps = {
  children: any;
};

const Layout = ({ children }: LayoutProps) => {
  return <Styled.Container>{children}</Styled.Container>;
};

const Styled = {
  Container: styled.div`
    background-color: ${({ theme }) => theme.colors.wallpaper}; ;
  `,
};

export default Layout;
