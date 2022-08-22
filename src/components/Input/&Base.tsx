import React, { InputHTMLAttributes, memo, Ref, RefObject } from 'react';
import styled from 'styled-components/macro';
import { textStyle } from 'styles/utils';

export type InputPropType = InputHTMLAttributes<HTMLInputElement> & {
  ref?: RefObject<any>;
};

const Base = (props: InputPropType) => {
  return <Input {...props} />;
};

export default memo(Base);

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
