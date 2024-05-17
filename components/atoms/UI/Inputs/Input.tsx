import styled from "@emotion/styled";
import { useField } from "formik";

export const Input = styled.input`
  display: inline-block;

  width: 100%;

  background-color: white;
  border: 1px solid #c1bbeb;
  border-radius: 5px;

  padding-block: 1.5rem;
  padding-inline: 1.5rem;

  font-size: 1.4rem;

  &::placeholder {
    color: #a098ae;
  }

  &:read-only {
    background: white url(/icons/arrdown.svg) center right 15px no-repeat;
  }

  &[name="file"] {
    background: none;
  }
`;

export const TextArea = styled.textarea`
  display: inline-block;
    height: 175px;
  width: 100%;

  background-color: white;
  border: 1px solid #c1bbeb;
  border-radius: 5px;

  padding-block: 1.5rem;
  padding-inline: 1.5rem;

  font-size: 1.4rem;
  resize: none;

  &::placeholder {
    color: #a098ae;
  }
`;

export const Select = styled.select`
  display: inline-block;

  width: 100%;

  background-color: white;
  border: 1px solid #c1bbeb;
  border-radius: 5px;
  padding-block: 1.5rem;
  padding-inline: 1.5rem;
  font-size: 1.4rem;

  &::placeholder {
    color: #a098ae;
  }

  &[name="file"] {
    background: none;
  }
    
`;
