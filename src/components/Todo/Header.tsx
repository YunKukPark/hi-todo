import { InputBase } from 'components/Input';
import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import styled from 'styled-components';
import { flexBox, textStyle } from 'styles/utils';

type TodoHeaderProps = {
  createTodo: (string: string) => Promise<void>;
};

const Header = (props: TodoHeaderProps) => {
  const { createTodo } = props;
  const [userInput, setUserInput] = useState('');

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    createTodo(userInput);
    setUserInput('');
  };

  const onChangeTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setUserInput(target.value);
  };

  const onClickAddBtn = () => {
    createTodo(userInput);
    setUserInput('');
  };

  return (
    <Styled.InputContainer>
      <InputBase
        onChange={onChangeTodoInput}
        onKeyDown={onPressEnter}
        value={userInput}
      />
      <Styled.Button onClick={onClickAddBtn}>Add</Styled.Button>
    </Styled.InputContainer>
  );
};

const Styled = {
  InputContainer: styled.div`
    ${flexBox('start', 'center')};
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
    transition: background-color 250ms ease-in-out;

    :hover {
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
  `,
};

export default memo(Header);
