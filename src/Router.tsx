import React from 'react';
import Login from 'pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todo from 'pages/home';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyle from 'GlobalStyle';
import Layout from 'components/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
