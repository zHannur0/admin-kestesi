import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getLessonsThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  handleClickGetId?: (id?: number) => void;
}

const LessonsTable: FC<IProps> = ({ handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const lessons = useTypedSelector((state) => state.pride.lessons);
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  useEffect(() => {
    if (lessons) {
      dispatch(getLessonsThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://www.bilimge.kz/admins/api/subject/${id}/`, {
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
    dispatch(getLessonsThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">{t.subjects.title}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>{t.subjects.subjectName}</Th>
              <Th>{t.subjects.action}</Th>
            </tr>
          </Thead>

          {lessons &&
            lessons.slice().sort((a, b) => {
              const nameA = a.full_name || '';
              const nameB = b.full_name || '';

              return nameA.localeCompare(nameB);
            }).map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.full_name}</Td>
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

export default LessonsTable;
