import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { flexBox, textStyle } from 'styles/utils';
import { InputBase } from '.';
import { InputPropType } from './&Base';

type LabelInputPropType = InputPropType & {
  label: string;
};

const Label = (props: LabelInputPropType) => {
  const { label, ...others } = props;
  const [isFocused, setIsFocused] = useState(false);
  console.log(isFocused);
  return (
    <Styled.Wrapper>
      <Styled.Label>{label}</Styled.Label>
      <InputBase
        {...others}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Styled.Wrapper>
  );
};

export default memo(Label);

const Styled = {
  Wrapper: styled.div`
    ${flexBox('start', 'start')};
    flex-direction: column;
    min-height: 122px;
  `,

  Label: styled.span`
    ${textStyle('xxs')};
  `,
};
