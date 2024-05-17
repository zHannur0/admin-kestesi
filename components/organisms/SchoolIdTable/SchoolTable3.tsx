import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getSchoolSocialThunk } from "@/store/thunks/schoolnfo.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {useRouter} from "next/router";

interface IProps {
  handleClickGetIdDop?: (id?: number) => void;
}

const SchoolTable3: FC<IProps> = ({ handleClickGetIdDop }) => {
  const dispatch = useAppDispatch();
  const media = useTypedSelector((state) => state.system.schoolsocial);
  const router = useRouter();

  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;

  useEffect(() => {
    if (media) {
      dispatch(getSchoolSocialThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/School_SocialMediaApi/${id}/`, {
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
    dispatch(getSchoolSocialThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">{t.socialMedia.title}</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>№</Th>
              <Th>{t.socialMedia.fields.type}</Th>
              <Th>{t.socialMedia.fields.link}</Th>
              <Th>{t.bells.action}</Th>
            </tr>
          </Thead>

          {media &&
            media.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.type}</Td>
                <Td>{item.account_name}</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetIdDop && handleClickGetIdDop(item.id)
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

export default SchoolTable3;
