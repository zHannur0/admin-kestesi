import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {FC, useEffect, useState} from "react";
import { getDopThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import {
  getTokenInLocalStorage,
  removeSecondOfTime,
} from "@/utils/assets.utils";
import {ICalls} from "@/types/assets.type";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  handleClickGetIdDop?: (id?: number) => void;
}

const CallsTable2: FC<IProps> = ({ handleClickGetIdDop }) => {
  const dispatch = useAppDispatch();
  const dop = useTypedSelector((state) => state.pride.dop);
  const [calls, setCalls] = useState<ICalls[][]>([]);
  useEffect(() => {
    if (dop) {
      dispatch(getDopThunk());
    }
  }, [dispatch]);
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;

  useEffect(() => {
    if(dop) {
      const groupByPlan = () => {
        const groups: { [key: number]: ICalls[] } = {};
        for (const item of dop) {
          if (item.plan !== undefined) {
            if (!groups[item.plan]) {
              groups[item.plan] = [];
            }
            groups[item.plan].push(item);
          }
        }
        return Object.values(groups);
      };
      setCalls(groupByPlan);
    }
  }, [dop]);


  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/DopUrokRingApi/${id}/`, {
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
    dispatch(getDopThunk());
  };

  return (
      <div className="main_table">
        <div className="main_table-title">{t.bells.additionalLesson}</div>

        <div className="main_table-block" style={{display: "flex", flexWrap: "wrap", gap: "4%"}}>
          {
              calls &&
              calls.map((call, index) => (
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        width: "48%",
                        padding: "21px",
                        background: "#F4F4F4",
                        borderRadius: "11.429px",
                        marginBottom: "20px",
                      }} key={index}>
                        <div style={{color: "#D12E34", fontWeight: "bold"}}>
                          {t.bells.bellsPlan}: <span style={{color: "black"}}>{call[0].plan}</span>
                        </div>
                        <div style={{color: "#D12E34", fontWeight: "bold"}}>
                          {t.bells.shift}: <span style={{color: "black"}}>{call[0].smena}</span>
                        </div>
                        <div>

                        </div>
                        <Table>
                          <Thead>
                            <tr>
                              <Th>№</Th>
                              <Th>{t.bells.lessonStart}</Th>
                              <Th>{t.bells.lessonEnd}</Th>
                              <Th>{t.bells.action}</Th>
                            </tr>
                          </Thead>

                          {call &&
                              call.map((item, index) => (
                                  <Tr key={item.plan}>
                                    <Td>{item.number}</Td>
                                    <Td>{removeSecondOfTime(item.start_time)}</Td>
                                    <Td>{removeSecondOfTime(item.end_time)}</Td>
                                    <Td>
                                      <div
                                          onClick={() =>
                                              handleClickGetIdDop && handleClickGetIdDop(item.id)
                                          }
                                      >
                                        <PenIcons/>
                                      </div>

                                      <div onClick={() => handleDeleteItems(item.id)}>
                                        <DeleteIcons/>
                                      </div>
                                    </Td>
                                  </Tr>
                              ))}
                        </Table>
                      </div>

                  )
              )
          }

        </div>
      </div>
  );
};

export default CallsTable2;
