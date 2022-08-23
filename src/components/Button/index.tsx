import React, { forwardRef, ReactNode, RefObject } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { flexBox } from 'styles/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outlined';

type ButtonProps = {
  variant: ButtonVariant;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  onBlur?: () => void;
  onClick?: () => void;
  onFocus?: () => void;
};

type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

const Button = forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const {
    variant,
    children,
    className,
    disabled,
    to,
    type = 'button',
    onBlur,
    onClick,
    onFocus,
  } = props;
  if (to) {
    return (
      <Styled.Button
        ref={ref as RefObject<HTMLAnchorElement>}
        variant={variant}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        as={Link}
        to={to}
        className={className}
      >
        {children}
      </Styled.Button>
    );
  }
  return (
    <Styled.Button
      ref={ref as RefObject<HTMLButtonElement>}
      variant={variant}
      type={type}
      disabled={disabled}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      className={className}
    >
      {children}
    </Styled.Button>
  );
});

export default Button;

const primaryButtonStyle = css`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary.base};
  transition: background-color 200ms ease-in-out;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const outlinedButtonStyle = css`
  color: ${({ theme }) => theme.colors.primary.base};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary.base};
  transition: background-color 200ms ease-in-out;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }
`;

function setButtonVariant(variant: ButtonVariant) {
  switch (variant) {
    case 'primary':
      return primaryButtonStyle;
    case 'outlined':
      return outlinedButtonStyle;
    default:
      return primaryButtonStyle;
  }
}

interface StyledButtonProps {
  variant: ButtonVariant;
}

const Styled = {
  Button: styled.button<StyledButtonProps>`
    ${flexBox()};
    width: 100%;
    padding: 0 8px;
    font-weight: 700;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    ${({ variant }) => setButtonVariant(variant)}
  `,
};
