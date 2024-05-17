import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getSchoolAltynThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  handleClickGetIdAltyn?: (id?: number) => void;
}

const PrideSchoolTable4: FC<IProps> = ({ handleClickGetIdAltyn }) => {
  const dispatch = useAppDispatch();
  const altyn = useTypedSelector((state) => state.pride.altyn);
  console.log(altyn)
  useEffect(() => {
    if (altyn) {
      dispatch(getSchoolAltynThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/School_AltynBelgiApi/${id}/`, {
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
    dispatch(getSchoolAltynThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Алтын белгі</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Фото</Th>
              <Th>ФИО</Th>
              <Th>Текст</Th>
              {/*<Th>Год</Th>*/}
              <Th>Действие</Th>
            </tr>
          </Thead>

          {altyn &&
            altyn.map((item, index) => (
              <Tr>
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
                <Td>{item.student_success}</Td>
                {/*<Td>{item.endyear}</Td>*/}
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetIdAltyn && handleClickGetIdAltyn(item.id)
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

export default PrideSchoolTable4;
