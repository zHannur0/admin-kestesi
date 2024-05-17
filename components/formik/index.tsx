import { FieldHookConfig, useField, Field } from "formik";
import styled from "@emotion/styled";

type FieldProps = FieldHookConfig<string> & { label?: string; error?: boolean };

const InputStyled = styled(Field)`
  display: block;
  width: 100%;

  background-color: #ebf2fc;
  border: none;
  border-radius: 4px;

  padding-block: 1.3rem;
  padding-inline: 1rem;
`;


export const ErrorMsg = styled.span`
  font-size: 12px;
  display: block;
  color: red;
  transition: all 500ms;
`;

export const Input: React.FC<FieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props);
  const hasError = Boolean(meta.touched && meta.error);

  return (
    <>
      <InputStyled type="text" {...props} {...field} />
      {hasError && <ErrorMsg>{meta.error}</ErrorMsg>}
    </>
  );
};

export const InputLog: React.FC<FieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props);
  const hasError = Boolean(meta.touched && meta.error);

  return (
      <>
        <Field type="text" {...props} {...field} />
        {hasError && <ErrorMsg>{meta.error}</ErrorMsg>}
      </>
  );
};

