import React from 'react';
import SignupOrLogin from 'pages/auth/SignupOrLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todo from 'pages/home/Todo';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyle from 'GlobalStyle';
import Layout from 'components/Layout';
import GNB from 'components/Layout/GNB';

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GNB />
        <Layout>
          <Routes>
            <Route path="/" element={<SignupOrLogin />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
