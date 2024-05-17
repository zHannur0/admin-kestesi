import styled from "@emotion/styled";

interface ButtonProps {
  width?: string;
  background?: string;
  block?: string;
  inline?: string;
  radius?: string;
  color?: string;
}

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  background-color: ${(props) =>
    props.background ? props.background : "transparent"};
  width: ${(props) => (props.width ? props.width : "100%")};
  border: none;
  padding-block: ${(props) => (props.block ? props.block : "1.1rem")};
  padding-inline: ${(props) => (props.inline ? props.inline : "4.5rem")};

  border-radius: ${(props) => (props.radius ? props.radius : "23px")};

  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.2rem;

  cursor: pointer;
`;

export const ButtonLogout = styled.button`
  display: inline-block;

  background-color: #4090ff;
  border-radius: 6px;

  border: none;

  padding: 1.5rem 1.9rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  color: white;
  font-weight: 400;
  font-size: 1.6rem;

  cursor: pointer;
`;
