import Button from 'components/Button';
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
      <Styled.Button variant="primary" onClick={onClickAddBtn}>
        추가하기
      </Styled.Button>
    </Styled.InputContainer>
  );
};

const Styled = {
  InputContainer: styled.div`
    ${flexBox('start', 'center')};
  `,

  Button: styled(Button)`
    width: 30%;
    height: 40px;
    margin-left: 8px;
    border-radius: 12px;
  `,
};

export default memo(Header);
