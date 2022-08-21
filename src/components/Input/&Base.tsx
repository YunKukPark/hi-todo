import React, { InputHTMLAttributes, memo } from 'react';
import styled from 'styled-components/macro';
import { textStyle } from 'styles/utils';

export type InputPropType = InputHTMLAttributes<HTMLInputElement> & {
  isHint?: boolean;
};

const Base = (props: InputPropType) => {
  return (
    <>
      <Input {...props} />
    </>
  );
};

export default memo(Base);

const Input = styled.input`
  ${textStyle('base')};
  width: 100%;
  position: relative;
  margin-bottom: 8px;
  padding: 13px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  transition: border-bottom 250ms ease-in-out;

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.base};
  }
`;
