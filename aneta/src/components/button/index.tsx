import React from 'react';
import styled from 'styled-components';

interface ButtonStyleProps {
  variant: number;
  disabled: boolean;
}

const BtnContainer = styled.div`
  max-height: 8.4vh;
  font-family: calibri;
  font-size: 1.2rem;
  opacity: 0.84;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.14rem;
  border-radius: 0.42rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  ${(props: ButtonStyleProps) => {
    switch (props.variant) {
      case 1:
        return `background-color: #fff568;`;
      case 2:
        return `background-color: #8dc63f;`;
      case 3:
        return `background-color: #f26d7d;`;
      case 4:
        return `background-color: #00aeef;`;
      case 5:
        return `background-color: #fbaf5d;`;
      default:
        return ``;
    }
  }}
  ${(props: ButtonStyleProps) =>
    props.disabled && `opacity: 0.5; cursor: not-allowed;`}
`;

interface ButtonProps {
  variant: number;
  text: string;
  onPress: () => void;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({variant, text, onPress, disabled}) => {
    return (
      <BtnContainer disabled={disabled} variant={variant} onClick={onPress}>
        <span>{text}</span>
      </BtnContainer>
    );
};

export default Button;
