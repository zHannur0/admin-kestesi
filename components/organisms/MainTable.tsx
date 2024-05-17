import {FC, useState} from "react";

import { IKruzhok } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import {
  formatName,
  formatWeekDay,
  getTokenInLocalStorage,
} from "@/utils/assets.utils";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getKruzhokInfoThunk } from "@/store/thunks/schoolnfo.thunk";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {useRouter} from "next/router";

interface IProps {
  kruzhok: IKruzhok[] | undefined;
  handleClickGetId?: (id?: number) => void;
}

const MainTable: FC<IProps> = ({ kruzhok, handleClickGetId }) => {
  const dispatch = useAppDispatch();

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/kruzhok/${id}/`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .then((res) => {
        if (res) {
        }
      });
    dispatch(getKruzhokInfoThunk());
  };

  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;

  return (
    <div className="main_table">
      <div className="main_table-title">{t.clubs.name}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>{t.clubs.clubName}</Th>
              <Th>{t.clubs.teacherFullName}</Th>
              <Th>{t.clubs.goal}</Th>
              <Th>{t.clubs.date}</Th>
              <Th>{t.bells.action}</Th>
            </tr>
          </Thead>

          {kruzhok &&
            kruzhok.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.kruzhok_name}</Td>
                <Td>{formatName(item.teacher?.full_name || "")}</Td>
                <Td>{item.purpose}</Td>
                <Td>
                  {item.lessons?.map((i) => (
                    <>
                      <div>{formatWeekDay(i.week_day)}</div>
                      <div>{i.start_end_time}</div>
                      <br />
                    </>
                  ))}
                </Td>
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

export default MainTable;
