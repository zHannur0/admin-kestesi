import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getSchoolOlimpThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  handleClickGetIdOlimp?: (id?: number) => void;
}

const PrideSchoolTable3: FC<IProps> = ({ handleClickGetIdOlimp }) => {
  const dispatch = useAppDispatch();
  const olimp = useTypedSelector((state) => state.pride.olimp);

  useEffect(() => {
    if (olimp) {
      dispatch(getSchoolOlimpThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/PandikOlimpiadaApi/${id}/`, {
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
    dispatch(getSchoolOlimpThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Пәндік олимпиада</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Фото</Th>
              <Th>ФИО</Th>
              <Th>Текст</Th>
              {/*<Th>Класс</Th>*/}
              <Th>Действие</Th>
            </tr>
          </Thead>

          {olimp &&
            olimp.map((item, index) => (
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
                {/*<Td>{item.classl} класс</Td>*/}
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetIdOlimp && handleClickGetIdOlimp(item.id)
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

export default PrideSchoolTable3;
