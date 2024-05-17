import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getSchoolAtestThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  handleClickGetIdAtest?: (id?: number) => void;
}

const PrideSchoolTable5: FC<IProps> = ({ handleClickGetIdAtest }) => {
  const dispatch = useAppDispatch();
  const atest = useTypedSelector((state) => state.pride.atest);

  useEffect(() => {
    if (atest) {
      dispatch(getSchoolAtestThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/School_RedCertificateApi/${id}/`, {
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
    dispatch(getSchoolAtestThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Қызыл аттестат</div>

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

          {atest &&
            atest.map((item, index) => (
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
                      handleClickGetIdAtest && handleClickGetIdAtest(item.id)
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

export default PrideSchoolTable5;
