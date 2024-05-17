import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { IClass } from "@/types/assets.type";
import { FC } from "react";
import { instance } from "@/api/axios.instance";
import { getClassThunk } from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  classinfo?: IClass[];
  handleClickGetId?: (id?: number) => void;
}

const ClassTable: FC<IProps> = ({ classinfo, handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const onDelete = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/class/${id}/`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .catch((err) => console.log(err));

    dispatch(getClassThunk());
  };

  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  return (
    <div className="main_table">
      <div className="main_table-title">{t.classes.classes}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>{t.classes.classes}</Th>
              <Th>{t.classes.room}</Th>
              <Th>{t.classes.classTeacher}</Th>
              <Th>{t.classes.bellSchedule}</Th>
              <Th>{t.bells.shift}</Th>
              <Th>{t.bells.action}</Th>
            </tr>
          </Thead>
          {/* {classinfo &&
            classinfo.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.class_name}</Td>
                <Td>{item.classroom}</Td>
                <Td>{item.class_teacher}</Td>
                <Td>{item.osnova_plan}</Td>
                <Td>{item.osnova_smena}</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetId && handleClickGetId(item.id)
                    }
                  >
                    <PenIcons />
                  </div>

                  <div onClick={() => onDelete(item.id)}>
                    <DeleteIcons />
                  </div>
                </Td>
              </Tr>
            ))} */}

          {classinfo?.slice().sort((a, b) => {
            const numberA = parseInt(a?.class_number  || "", 10);
            const numberB = parseInt(b?.class_number   || "", 10);

            const textA = a?.class_letter || "";
            const textB = b?.class_letter || "";

            if (numberA !== numberB) {
              return numberA - numberB;
            }
            return textA.localeCompare(textB);
          }).map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item?.class_name}</Td>
              <Td>{item?.classroom?.classroom_name}{item?.classroom && "/"+item?.classroom?.classroom_number}</Td>
              <Td>{item?.class_teacher?.full_name}</Td>
              <Td>{item?.osnova_plan}</Td>
              <Td>{item?.osnova_smena}</Td>
              <Td>
                <div
                  onClick={() => handleClickGetId && handleClickGetId(item.id)}
                >
                  <PenIcons />
                </div>

                <div onClick={() => onDelete(item.id)}>
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

export default ClassTable;
