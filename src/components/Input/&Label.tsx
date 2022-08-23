import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { textStyle } from 'styles/utils';
import { InputBase } from '.';
import { InputPropType } from './&Base';

type LabelInputPropType = InputPropType & {
  label: string;
  hintLabel?: string;
};

const Label = (props: LabelInputPropType) => {
  const { value, onChange: _onChange, onFocus: _onFocus, hintLabel } = props;
  const { placeholder, ...others } = props;
  const [isLabelActive, setIsLabelActive] = useState(false);

  const onBlur = () => {
    if (value) return;
    setIsLabelActive(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _onChange?.(e);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    _onFocus?.(e);
    setIsLabelActive(true);
  };

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Label className={isLabelActive ? 'active' : ''}>
          {placeholder}
        </Styled.Label>
        <Styled.Input
          {...others}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Styled.Wrapper>
      {hintLabel && <Styled.Hint>{hintLabel}</Styled.Hint>}
    </Styled.Container>
  );
};

export default memo(Label);

const Styled = {
  Container: styled.div`
    min-height: 66px;
    margin-bottom: 8px;
  `,

  Wrapper: styled.div`
    position: relative;
    flex-direction: column;
  `,

  Input: styled(InputBase)`
    ::placeholder {
      color: transparent;
    }
  `,

  Label: styled.span`
    ${textStyle('base')};
    position: absolute;
    top: 50%;
    padding: 0 15px;
    transform: translateY(-50%);
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.gray};
    transition: ease 0.3s;

    &.active {
      ${textStyle('xxs')}
      top: 0;
      padding: 0;
      color: ${({ theme }) => theme.colors.text};
    }
  `,

  Hint: styled.p`
    ${textStyle('xxs')};
    color: ${({ theme }) => theme.colors.gray};
    padding: 0 15px;
  `,
};
