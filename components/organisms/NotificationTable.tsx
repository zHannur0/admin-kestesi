import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { ColorBlock } from "../atoms/UI/Blocks/Block";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { getExtraThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import {getNotificationThunk} from "@/store/thunks/schoolnfo.thunk";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
    onEdit?: Dispatch<SetStateAction<boolean>>;
    handleClickGetId?: (id?: number) => void;
}

const NotificationTable: FC<IProps> = ({ onEdit, handleClickGetId }) => {
    const dispatch = useAppDispatch();
    const notifications = useTypedSelector((state) => state.system.notifications);
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;

    useEffect(() => {
        if (notifications) {
            dispatch(getNotificationThunk());
        }
    }, [dispatch]);


    const handleDeleteItems = async (id?: number) => {
        await instance
            .delete(`https://www.bilimge.kz/admins/api/notification/${id}/`, {
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
        dispatch(getNotificationThunk());
    };

    return (
        <div className="main_table">
            <div className="main_table-title">{t.notifications.name}</div>
            <div className="main_table-block">
                <Table>
                    <Thead>
                        <tr>
                            <Th>№</Th>
                            <Th>{t.notifications.text}</Th>
                            <Th>{t.notifications.action}</Th>
                        </tr>
                    </Thead>

                    {notifications &&
                        notifications.map((item, index) => (
                            <Tr key={item.id}>
                                <Td>{index + 1}</Td>
                                <Td>{item.text}</Td>
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

export default NotificationTable;
