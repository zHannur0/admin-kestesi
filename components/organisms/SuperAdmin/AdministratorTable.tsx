import { IUsers } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { FC, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { getUsersThunk } from "@/store/thunks/schoolnfo.thunk";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getIASchoolThunk } from "@/store/thunks/available.thunk";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  users?: IUsers[];
  handleClickGetId?: (id?: number) => void;
}

const AdministratorTable: FC<IProps> = ({ users, handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://www.bilimge.kz/admins/api/users/${id}/`, {
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
    dispatch(getUsersThunk());
  };

  const school = useTypedSelector((state) => state.ia.iaschool);
  useEffect(() => {
    dispatch(getIASchoolThunk());
  }, [dispatch]);

  const getSchoolLabelById = (id?: number) => {
    const selectedSchool = school?.find((item) => item.id === id);
    return selectedSchool ? selectedSchool.school_kz_name : "";
  };

  const getSchoolUrlById = (id?: number) => {
    const selectedSchool = school?.find((item) => item.id === id);
    return selectedSchool ? selectedSchool.url : "";
  };

  return (
    <div className="main_table">
      <div className="main_table-title">{t.superadmin.schools}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>{t.superadmin.admin}</Th>
              <Th>{t.superadmin.school}</Th>
              <Th>URL</Th>
              <Th>{t.superadmin.action}</Th>
            </tr>
          </Thead>

          {users &&
            users
              .filter((user) => user.role === "admin")
              .map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.username}</Td>
                  <Td>{getSchoolLabelById(item.school) || "null"}</Td>
                  <Td>{getSchoolUrlById(item.school) || "null"}</Td>
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

export default AdministratorTable;
