import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getIAClassThunk } from "@/store/thunks/available.thunk";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TabsClass = () => {
  const dispatch = useAppDispatch();
  const classess = useTypedSelector((state) => state.ia.iaclass);
  useEffect(() => {
    if (classess) {
      dispatch(getIAClassThunk());
    }
  }, [dispatch]);
  return (
    <>
      <TabsClassStyled>
        {classess &&
          classess?.slice().sort((a, b) => {
            const numberA = parseInt(a?.class_number  || "", 10);
            const numberB = parseInt(b?.class_number   || "", 10);

            const textA = a?.class_letter || "";
            const textB = b?.class_letter || "";

            if (numberA !== numberB) {
              return numberA - numberB;
            }
            return textA.localeCompare(textB);
          }).map((item) => (
            <Link href={`/schedule/1/${item.class_name}`} key={item.id}>
              <TabClassStyled>{item.class_name}</TabClassStyled>
            </Link>
          ))}
      </TabsClassStyled>
    </>
  );
};

const TabsClassStyled = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 30px;

  margin-top: 4.7rem;
`;
const TabClassStyled = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  color: #1b447a;
  text-transform: uppercase;
  width: 94px;
  height: 67px;
  border: 1px solid #4090ff;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition:
    background-color 0.2s linear,
    color 0.2s linear;

  &:hover {
    background-color: #4090ff;
    color: #ffffff;
  }
`;

export default TabsClass;
