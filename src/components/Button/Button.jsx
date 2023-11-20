import { ButtonStyle, WrapperButton } from './Button.styled';

export const Button = ({ onClick }) => (
  <WrapperButton>
    <ButtonStyle type="button" onClick={onClick}>
      Load more
    </ButtonStyle>
  </WrapperButton>
);
