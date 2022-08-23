import { TodoApi } from 'lib/api';
import { TodoType } from 'pages/home/Todo';
import React, {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
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

interface TodoItemProps extends TodoType {
  onDelete: (id: number) => void;
  onUpdate: (payload: {
    id: number;
    todo?: string;
    isCompleted?: boolean;
  }) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { id, todo, isCompleted, onDelete, onUpdate } = props;
  const [userInput, setUserInput] = useState(todo);
  const [isEditing, setIsEditing] = useState(false);

  const onClickEditBtn = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  }, []);

  const onPressEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      onUpdate({ id, todo: userInput, isCompleted });
      setIsEditing(false);
    },
    [id, onUpdate, userInput, isCompleted]
  );

  const onBlurInput = useCallback(async () => {
    setIsEditing(false);
    onUpdate({ id, todo: userInput, isCompleted });
  }, [id, onUpdate, userInput, isCompleted]);

  const onClickCheckboxBtn = useCallback(() => {
    onUpdate({ id, todo, isCompleted: !isCompleted });
  }, [id, isCompleted, onUpdate, todo]);

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
          <Styled.TodoText className={isCompleted ? 'is-completed' : ''}>
            {todo}
          </Styled.TodoText>
        )}
      </div>
      <div className="right">
        <Styled.Icon>
          <Styled.EditBtn selected={isEditing} onClick={onClickEditBtn} />
        </Styled.Icon>
        <Styled.Icon onClick={() => onDelete(id)}>
          <Styled.DeleteBtn />
        </Styled.Icon>
      </div>
    </Styled.Item>
  );
};

type IconStyleProps = {
  selected: boolean;
};

type TodoTextStyleProps = {
  isCompleted: boolean;
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
    cursor: pointer;

    :last-child {
      margin-right: 0;
    }
  `,

  EditBtn: styled(RiBallPenLine)<IconStyleProps>`
    transition: color 250ms ease-in-out;
    color: ${({ selected, theme }) =>
      selected ? theme.colors.primary.base : theme.colors.gray};
    :hover {
      color: ${({ theme }) => theme.colors.primary.light};
    }
  `,

  DeleteBtn: styled(RiCloseLine)`
    transition: color 250ms ease-in-out;

    :hover {
      color: ${({ theme }) => theme.colors.semantic.error};
    }
  `,

  TodoText: styled.p`
    ${textStyle('base')};

    &.is-completed {
      color: ${({ theme }) => theme.colors.gray};
      text-decoration: line-through;
      text-decoration-color: ${({ theme }) => theme.colors.gray};
      text-decoration-thickness: 1px;
    }
  `,
};

export default memo(TodoItem);
