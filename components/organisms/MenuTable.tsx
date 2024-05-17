import { FC, useCallback, useEffect } from "react";
import { IMenu } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { formatWeekDay, getTokenInLocalStorage } from "@/utils/assets.utils";
import { instance } from "@/api/axios.instance";
import { getMenuThunk } from "@/store/thunks/schoolnfo.thunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  menu: IMenu[] | undefined;
  setDel?: any;
  del?: boolean;
  handleClickGetId?: (id?: number) => void;
}

const MenuTable: FC<IProps> = ({ menu, setDel, del, handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://www.bilimge.kz/admins/api/menu/${id}/`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .then((res) => {
        if (res) {
          setDel(true);
        }
      })
      .catch((e) => console.log(e));
    dispatch(getMenuThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">{t.canteenMenu.name}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>{t.canteenMenu.date}</Th>
              <Th>{t.canteenMenu.foodName}</Th>
              <Th>{t.canteenMenu.foodComposition}</Th>
              <Th>{t.canteenMenu.servings}</Th>
              <Th>{t.bells.action}</Th>
            </tr>
          </Thead>

          {menu &&
            menu.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{formatWeekDay(item.week_day)}</Td>
                <Td>{item.food_name}</Td>
                <Td>{item.food_sostav}</Td>
                <Td>{item.vihod_1}</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetId && handleClickGetId(item.id)
                    }
                  >
                    <PenIcons />
                  </div>

                  <div onClick={() => handleDeleteItems(item.id)}>
                    <DeleteIcons />
                  </div>
                </Td>
              </Tr>
            ))}
        </Table>
      </div>
    </div>
  );
};

export default MenuTable;
