import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ColorBlock } from "../atoms/UI/Blocks/Block";
import { Button } from "../atoms/UI/Buttons/Button";
import {Input, TextArea} from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getExtraThunk } from "@/store/thunks/pride.thunk";
import { ColorCheckIcons } from "../atoms/Icons";
import {IExtraLessons, INotification} from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {getNotificationThunk} from "@/store/thunks/schoolnfo.thunk";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
    onReject?: Dispatch<SetStateAction<boolean>>;
    onEdit?: Dispatch<SetStateAction<boolean>>;
    notificationId?: INotification;
    getId?: number;
}

const NotificationTableBlock: FC<IProps> = ({
                                               onReject,
                                               onEdit,
                                               notificationId,
                                               getId,
                                           }) => {
    const dispatch = useAppDispatch();
    const [updateInput, setUpdateInput] = useState<string>("");
    const [chooseColor, setChooseColor] = useState<string>("");

    const {
        showSuccessModal,
        showErrorModal,
        onSuccessModalClose,
        onErrorModalClose,
        showSuccess,
        showError,
    } = useModalLogic();

    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;


    const onSave = async () => {
        try {
            if (updateInput) {
                if (!getId) {
                    console.log("Aa")

                    await instance
                        .post(
                            "https://www.bilimge.kz/admins/api/notification/",
                            {
                                text: updateInput,
                            },
                            {
                                headers: {
                                    Authorization: `Token ${getTokenInLocalStorage()}`,
                                },
                            },
                        )
                        .then((res) => {
                            if (res) {
                                dispatch(getNotificationThunk());
                                showSuccess();
                                setUpdateInput("");
                                setChooseColor("");
                                if (showSuccessModal && onReject) {
                                    onReject(false);
                                }
                            }
                        })
                        .catch((err) => {
                            showError();
                            if (showErrorModal && onReject) {
                                onReject(false);
                            }
                        });
                } else {
                    await instance
                        .put(
                            `https://www.bilimge.kz/admins/api/notification/${getId}/`,
                            {
                                text: updateInput,
                            },
                            {
                                headers: {
                                    Authorization: `Token ${getTokenInLocalStorage()}`,
                                },
                            },
                        )
                        .then((res) => {
                            if (res) {
                                dispatch(getNotificationThunk());
                            }
                        })
                        .catch((err) => {
                            showError();
                            if (showErrorModal && onReject) {
                                onReject(false);
                            }
                        });
                }
            }
        } catch (error) {}
    };

    return (
        <>
            {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
            {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
            <div className="main_table-modal">
                <div className="login_forms-label_pink">{t.notifications.text}</div>
                <div className="main_table-modal_forms">
                    <div className="forms">
                        <TextArea
                            placeholder={t.notifications.writeNotification}
                            name="type"
                            value={updateInput}
                            onChange={(e) => setUpdateInput(e.target.value)}/>
                    </div>
                </div>
                <div
                    className="flex"
                    style={{justifyContent: "flex-end", gap: "1.6rem"}}
                >
                    <Button
                        background="#CACACA"
                        color="#645C5C"
                        style={{width: "auto"}}
                        onClick={() => onReject && onReject(false)}
                    >
                        {t.notifications.delete}
                    </Button>
                    <Button background="#27AE60" style={{width: "auto"}} onClick={onSave}>
                        {t.notifications.save}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NotificationTableBlock;
