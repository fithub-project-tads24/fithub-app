import React from 'react';
import styled, { keyframes } from 'styled-components';

const ButtonLoginRegister = ({
  children,
  type = 'button',
  onClick,
  fullWidth = false,
  className,
  loading = false,
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      className={className}
      $fullWidth={fullWidth}
      disabled={isDisabled}
      {...rest}
    >
      <span>{children}</span>
      {loading && <Spinner aria-hidden="true" />}
    </StyledButton>
  );
};

export default ButtonLoginRegister;

const StyledButton = styled.button`
  text-decoration: none;
  position: relative;
  border: none;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  color: #fff;
  width: ${(p) => (p.$fullWidth ? '100%' : '9em')};
  height: 3em;
  line-height: 2em;
  text-align: center;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 300%;
  border-radius: 30px;
  z-index: 1;

  &:hover {
    animation: ani 8s linear infinite;
    border: none;
  }

  @keyframes ani {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 35px;
    transition: 1s;
  }

  &:hover::before {
    filter: blur(20px);
  }

  &:active {
    background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    animation: none;
  }

  & > span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-left: 8px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
