import { IdBlock } from "@/components/atoms/UI/Blocks/IdBlock";
import { ITabs } from "@/types/assets.type";
import Link from "next/link";

import { useRouter } from "next/router";
import { FC } from "react";
import {rotate} from "next/dist/server/lib/squoosh/impl";

interface IProps {
  tabs?: ITabs[];
  link?: string;
  handleAddButtonClick?: any;
}

const Tabs: FC<IProps> = ({ tabs, link, handleAddButtonClick }) => {
  const router = useRouter();
  const rout = router?.asPath?.split(`${link}/`);

  return (
    <>
      {tabs?.map((item) => (
        <Link href={`/${link}/${item.id}`} key={item.id}>
          <IdBlock
            background={
              rout[rout?.length - 1] === String(item.id) ? "#4090FF" : ""
            }
            color={
              rout[rout?.length - 1] === String(item.id) ? "#fff" : ""
            }
            border={
              rout[rout?.length - 1] === String(item.id) ? "white" : ""
            }
            onClick={handleAddButtonClick}
          >
            {item.type}
          </IdBlock>
        </Link>
      ))}
    </>
  );
};

export default Tabs;
