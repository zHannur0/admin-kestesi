import {FC, useEffect, useState} from "react";
import { IClassRoom } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getClassRoomThunk } from "@/store/thunks/schoolnfo.thunk";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  cabinet?: IClassRoom[];
  handleClickGetId?: (id?: number) => void;
}

const CabinetTable: FC<IProps> = ({ cabinet, handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const[cab,setCab] = useState<any[]>([]);

  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://www.bilimge.kz/admins/api/classroom/${id}/`, {
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
    dispatch(getClassRoomThunk());
  };

  useEffect(() => {
    function sortClassrooms(classrooms: IClassRoom[]) {
      return classrooms.slice().sort((a, b) => {
        const flatA = a.flat ?? 0;
        const flatB = b.flat ?? 0;

        if (flatA !== flatB) {
          return flatA - flatB;
        }

        const numberA = a.classroom_number?.toString() ?? "";
        const numberB = b.classroom_number?.toString() ?? "";

        const isANumber = !isNaN(Number(a.classroom_number));
        const isBNumber = !isNaN(Number(b.classroom_number));

        if (isANumber && isBNumber) {
          return parseInt(numberA, 10) - parseInt(numberB, 10);
        }

        if (!isANumber && isBNumber) {
          return -1;
        }
        if (isANumber && !isBNumber) {
          return 1;
        }

        return numberA.localeCompare(numberB);
      });
    }

    setCab(sortClassrooms(cabinet || []))
  }, [cabinet]);
  return (
    <div className="main_table">
      <div className="main_table-title">{t.room.title}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>{t.room.roomName}</Th>
              <Th>{t.room.roomNumber}</Th>
              <Th>{t.room.floor}</Th>
              <Th>{t.room.building}</Th>
              <Th>{t.room.action}</Th>
            </tr>
          </Thead>

          {cab &&
            cab.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.classroom_name}</Td>
                <Td>{item.classroom_number}</Td>
                <Td>{item.flat}</Td>
                <Td>{item.korpus}</Td>
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

export default CabinetTable;
