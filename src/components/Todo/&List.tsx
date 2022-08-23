import { TodoType } from 'pages/home/Todo';
import TodoItem from 'components/Todo/&Item';

import React from 'react';
import styled from 'styled-components';
import { flexBox, textStyle } from 'styles/utils';

type ListProps = {
  todos: TodoType[];
  onDelete: (id: number) => void;
  onUpdate: (payload: {
    id: number;
    todo?: string;
    isCompleted?: boolean;
  }) => void;
};

const TodoList = (props: ListProps) => {
  const { todos, onDelete, onUpdate } = props;
  const hasTodo = todos.length > 0;
  return (
    <Styled.Todo>
      {!hasTodo ? (
        <Styled.Placeholder>No todos yet</Styled.Placeholder>
      ) : (
        <Styled.List>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              {...todo}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </Styled.List>
      )}
    </Styled.Todo>
  );
};

export default TodoList;

const Styled = {
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
};
