import { Dispatch, FC, SetStateAction } from "react";
import { ISchoolInfo } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { getSchoolThunk } from "@/store/thunks/schoolnfo.thunk";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  school?: ISchoolInfo[];
  onEdit?: (id?: string) => void;
}

const SuperAdminTable: FC<IProps> = ({ school, onEdit }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const handleDeleteItems = async (id?: string) => {
    await instance
      .delete(`https://www.bilimge.kz/admins/api/school/${id}/`, {
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
    dispatch(getSchoolThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">{t.superadmin.schools}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>{t.superadmin.schoolsList}</Th>
              <Th>{t.superadmin.action}</Th>
            </tr>
          </Thead>

          {school &&
            school.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.school_kz_name}</Td>
                <Td>
                  <div onClick={() => onEdit && onEdit(item.url)}>
                    <PenIcons />
                  </div>

                  <div onClick={() => handleDeleteItems(item.url)}>
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

export default SuperAdminTable;
