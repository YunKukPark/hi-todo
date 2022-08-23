import { TodoApi } from 'lib/api';
import { TodoItemType } from 'pages/home/Todo';
import React, {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useRef,
  useState,
} from 'react';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
  RiBallPenLine,
  RiCloseLine,
} from 'react-icons/ri';
import styled from 'styled-components/macro';
import theme from 'styles/theme';
import { flexBox, textStyle } from 'styles/utils';

interface TodoItemProps extends TodoItemType {
  onDelete: (id: number) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { id, todo, isCompleted, onDelete } = props;
  const [userInput, setUserInput] = useState(todo);
  const [isEditing, setIsEditing] = useState(false);

  const updateTodo = async (text: string, isCompleted: boolean) => {
    if (todo === text) return;
    const res = await TodoApi.put(`/${id}`, { todo: text, isCompleted });
    console.log(res);
  };

  const onClickEditBtn = () => {
    setIsEditing(prev => !prev);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    updateTodo(userInput, isCompleted);
    setIsEditing(false);
  };

  const onBlurInput = async () => {
    setIsEditing(false);
    await updateTodo(userInput, isCompleted);
  };

  const onClickCheckboxBtn = async () => {
    const res = await TodoApi.put(`/${id}`, {
      todo,
      isCompleted: !isCompleted,
    });
    console.log(res);
  };

  return (
    <Styled.Item>
      <div className="left">
        <Styled.Icon onClick={onClickCheckboxBtn}>
          {isCompleted ? (
            <RiCheckboxCircleLine color={theme.colors.semantic.success} />
          ) : (
            <RiCheckboxBlankCircleLine />
          )}
        </Styled.Icon>
        {isEditing ? (
          <Styled.TodoText
            as="input"
            autoFocus
            value={userInput ?? todo}
            onChange={handleInput}
            onBlur={onBlurInput}
            onKeyPress={onPressEnter}
          />
        ) : (
          <Styled.TodoText>{todo}</Styled.TodoText>
        )}
      </div>
      <div className="right">
        <Styled.Icon>
          <RiBallPenLine
            onClick={onClickEditBtn}
            color={isEditing ? theme.colors.primary.base : theme.colors.gray}
          />
        </Styled.Icon>
        <Styled.Icon onClick={() => onDelete(id)}>
          <RiCloseLine />
        </Styled.Icon>
      </div>
    </Styled.Item>
  );
};

const Styled = {
  Item: styled.li`
    ${flexBox('between', 'center')};
    width: 100%;
    height: 55px;
    padding: 8px 0;

    .left {
      ${flexBox('start', 'center')};
    }

    .right {
      ${flexBox('start', 'center')};
    }
  `,

  Icon: styled.div`
    ${flexBox()};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.gray};
    margin-right: 8px;
    transition: color 250ms ease-in-out;

    :last-child {
      margin-right: 0;
    }
  `,

  TodoText: styled.p`
    ${textStyle('base')};
  `,
};

export default memo(TodoItem);
