import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getTeachersThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  handleClickGetId?: (id?: number) => void;
}

const TeachersTable: FC<IProps> = ({ handleClickGetId }) => {
  const disptach = useAppDispatch();
  const teachers = useTypedSelector((state) => state.pride.teachers);
  useEffect(() => {
    if (teachers) {
      disptach(getTeachersThunk());
    }
  }, [disptach]);
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/teacher/${id}/`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .then((res) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
    disptach(getTeachersThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">{t.teachers.title} </div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>{t.teachers.fullName}</Th>
              <Th>Фото</Th>
              <Th>{t.teachers.action}</Th>
            </tr>
          </Thead>

          {teachers &&
              teachers.slice().sort((a, b) => {
                const nameA = a.full_name || '';
                const nameB = b.full_name || '';

                return nameA.localeCompare(nameB);
              })
                  .map((item, index) => (
                      <Tr key={item.id}>
                        <Td>{index + 1}</Td>
                        <Td>{item.full_name}</Td>
                        <Td>
                          <div className="img-block">
                            {
                              item.photo3x4 ?
                              <img src={item.photo3x4} alt=""/> : router.locale === "kz" ? "Фото жоқ" : "Нет фото"

                            }
                          </div>
                        </Td>
                        <Td>
                          <div onClick={() => handleClickGetId && handleClickGetId(item.id)}>
                            <PenIcons />
                          </div>

                          <div onClick={() => handleDeleteItems(item.id)}>
                            <DeleteIcons />
                          </div>
                        </Td>
                      </Tr>
                  ))
          }

        </Table>
      </div>
    </div>
  );
};

export default TeachersTable;
