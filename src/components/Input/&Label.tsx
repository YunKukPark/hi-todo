import React, { memo, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { flexBox, textStyle } from 'styles/utils';
import { InputBase } from '.';
import { InputPropType } from './&Base';

type LabelInputPropType = InputPropType & {
  label: string;
};

const Label = (props: LabelInputPropType) => {
  const { onChange: _onChange, onBlur: _onBlur } = props;
  const inputRef = useRef<string>('');
  const { placeholder, ...others } = props;
  const [isLabelActive, setIsLabelActive] = useState(false);

  const onBlur = () => {
    if (inputRef.current !== '') return;
    setIsLabelActive(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _onChange?.(e);
    inputRef.current = e?.target?.value;
  };

  return (
    <Styled.Wrapper>
      <Styled.Label isLabelActive={isLabelActive}>{placeholder}</Styled.Label>
      <Styled.Input
        {...props}
        ref={inputRef}
        onChange={onChange}
        onFocus={() => setIsLabelActive(true)}
        onBlur={onBlur}
      />
    </Styled.Wrapper>
  );
};

export default memo(Label);

type StyledLabel = {
  isLabelActive: boolean;
};

const Styled = {
  Wrapper: styled.div`
    ${flexBox('start', 'start')};
    position: relative;
    flex-direction: column;
    min-height: 66px;
  `,

  Input: styled(InputBase)`
    ::placeholder {
      color: transparent;
    }
  `,

  Label: styled.span<StyledLabel>`
    ${({ isLabelActive }) =>
      isLabelActive ? textStyle('xxs') : textStyle('base')};
    position: absolute;
    top: ${({ isLabelActive }) => (isLabelActive ? 0 : `40%`)};
    padding: ${({ isLabelActive }) => (isLabelActive ? 0 : '0 15px')};
    transform: translateY(-50%);
    letter-spacing: 1px;
    color: ${({ isLabelActive, theme }) =>
      isLabelActive ? theme.colors.text : 'rgb(120, 120, 120)'};
    transition: ease 0.3s;
  `,
};
