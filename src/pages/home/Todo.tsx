import { InputBase } from 'components/Input';
import TodoItem from 'components/Todo/&Item';
import { TodoApi } from 'lib/api';
import { KeyboardEvent, ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { flexBox, textStyle } from 'styles/utils';

export type TodoItemType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

type TodoListType = TodoItemType[];

const Todo = () => {
  const token = localStorage.getItem('accessToken') || null;
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoListType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const hasTodo = todos.length > 0;

  const createTodo = async () => {
    if (!userInput) return;
    await TodoApi.post('', { todo: userInput });
    setUserInput('');
  };

  const deleteTodo = async (id: number) => {
    await TodoApi.delete(`/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onClickAddBtn = () => {
    createTodo();
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    createTodo();
  };

  const onChangeTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setUserInput(target.value);
  };

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await TodoApi.get('');
      setTodos(res.data);
      setIsLoading(false);
    };
    fetchTodos();
  }, [todos]);

  if (isLoading) return <></>;

  return (
    <Styled.Page>
      <Styled.Container>
        <Styled.Title>TODO</Styled.Title>
        <Styled.InputContainer>
          <InputBase
            onChange={onChangeTodoInput}
            onKeyDown={onPressEnter}
            value={userInput}
          />
          <Styled.Button onClick={onClickAddBtn}>Add</Styled.Button>
        </Styled.InputContainer>
        <Styled.Todo>
          {!hasTodo ? (
            <Styled.Placeholder>No todos yet</Styled.Placeholder>
          ) : (
            <Styled.List>
              {todos.map(todo => (
                <TodoItem key={todo.id} {...todo} onDelete={deleteTodo} />
              ))}
            </Styled.List>
          )}
        </Styled.Todo>
      </Styled.Container>
    </Styled.Page>
  );
};

export default Todo;

const Styled = {
  Page: styled.div`
    ${flexBox()};
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.wallpaper};
  `,

  Container: styled.main`
    width: 384px;
    padding: 32px 36px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 24px; ;
  `,

  InputContainer: styled.div`
    ${flexBox('start', 'center')};
  `,

  Title: styled.h1`
    ${textStyle('lg')};
    font-weight: 700;
  `,

  Todo: styled.div`
    ${flexBox('start', 'start')};
  `,

  Placeholder: styled.p`
    ${textStyle('base')};
    ${flexBox()};
    color: ${({ theme }) => theme.colors.placeholder};
    width: 100%;
    font-weight: 700;
    padding: 44px 0;
  `,

  List: styled.ul`
    width: 100%;
    margin: 16px 0;
  `,

  Button: styled.button`
    ${textStyle('base')};
    width: 50%;
    margin-left: 8px;
    padding: 8px 6px;
    background-color: ${({ theme }) => theme.colors.primary.base};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    font-weight: 700;
  `,
};
