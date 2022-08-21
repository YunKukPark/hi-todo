import React, { InputHTMLAttributes, memo, Ref, RefObject } from 'react';
import styled from 'styled-components/macro';
import { textStyle } from 'styles/utils';

export type InputPropType = InputHTMLAttributes<HTMLInputElement> & {
  ref?: RefObject<any>;
  isHint?: boolean;
};

const Base = (props: InputPropType) => {
  const { isHint } = props;
  return (
    <Wrapper>
      <Input {...props} />
      {isHint && <Hint>hint 있어요</Hint>}
    </Wrapper>
  );
};

export default memo(Base);

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Input = styled.input`
  ${textStyle('base')};
  width: 100%;
  position: relative;
  margin-bottom: 4px;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fontFamilies.main};
  transition: border-bottom 250ms ease-in-out;

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.base};
  }
`;

const Hint = styled.p`
  ${textStyle('xxs')};
  color: ${({ theme }) => theme.colors.gray};
  padding: 0 15px;
`;
