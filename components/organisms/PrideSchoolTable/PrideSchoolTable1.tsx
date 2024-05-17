import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import {getPrideThunk, getSchoolSportThunk} from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  handleGetPrideId?: (id?: number) => void;
}

const PrideSchoolTable1: FC<IProps> = ({ handleGetPrideId }) => {
  const dispatch = useAppDispatch();
  const pride = useTypedSelector((state) => state.pride.pride);
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  useEffect(() => {
    if (pride) {
      dispatch(getPrideThunk());
    }
  }, [dispatch]);
  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/proudofschool/${id}/`, {
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
    dispatch(getPrideThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">{t.schoolPride.title}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>Фото</Th>
              <Th>{t.schoolPride.fullName}</Th>
              <Th>{t.schoolPride.type}</Th>
              <Th>{t.schoolPride.text}</Th>
              <Th>{t.bells.action}</Th>
            </tr>
          </Thead>

          {pride &&
            pride.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>
                  {
                    item.photo ?
                        <div className="img-block">

                          <img src={item.photo} alt={item.photo}/>
                        </div> :
                        "Нет фото"
                  }

                </Td>
                <Td>{item.fullname}</Td>
                <Td>{item.success}</Td>
                <Td>{item.student_success}</Td>
                <Td>
                  <div
                    onClick={() =>
                        handleGetPrideId && handleGetPrideId(item.id)
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

export default PrideSchoolTable1;
