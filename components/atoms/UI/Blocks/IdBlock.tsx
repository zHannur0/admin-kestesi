import styled from "@emotion/styled";
export const IdBlock = styled.div<{
  background?: string;
  color?: string;
  border?: string;
}>`
  padding: 1rem 2rem;
  

  border: 1px solid #092c4c;
  border-radius: 66px;


  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22.4px;

  cursor: pointer;

  transition:
    background-color 0.2s linear,
    color 0.2s linear,
    border-color 0.2s linear;

  background-color: ${(props) =>
    props.background ? props.background : "transparent"};
  color: ${(props) => (props.color ? props.color : "#092C4C")};
  border-color: ${(props) => (props.border ? props.border : "#092C4C")};

  &:hover {
    background-color: #4090ff;
    color: #ffffff;
    border-color: white;
  }
`;
