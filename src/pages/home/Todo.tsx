import TodoList from 'components/Todo/&List';
import Header from 'components/Todo/Header';
import { TodoApi } from 'lib/api';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { flexBox, textStyle } from 'styles/utils';

export type TodoType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

const Todo = () => {
  const token = localStorage.getItem('accessToken') || null;
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    const res = await TodoApi.get('');
    setTodos(res.data);
    setIsLoading(false);
  };

  const createTodo = async (userInput: string) => {
    if (!userInput) return;
    const res = await TodoApi.post('', { todo: userInput });
    setTodos([...todos, res.data]);
  };

  const deleteTodo = async (id: number) => {
    await TodoApi.delete(`/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = async (payload: {
    id: number;
    todo?: string;
    isCompleted?: boolean;
  }) => {
    const { id, todo, isCompleted } = payload;
    const res = await TodoApi.put(`/${id}`, { todo, isCompleted });
    setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchTodos();
  }, [token, navigate]);

  if (!token) return null;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Styled.Page>
      <Styled.Container>
        <Styled.Title>TODO</Styled.Title>
        <Header createTodo={createTodo} />
        <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
      </Styled.Container>
    </Styled.Page>
  );
};

export default memo(Todo);

const Styled = {
  Page: styled.div`
    ${flexBox()};
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.wallpaper};
  `,

  Container: styled.main`
    width: 384px;
    padding: 32px 36px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 24px; ;
  `,

  Title: styled.h1`
    ${textStyle('lg')};
    font-weight: 700;
  `,
};
