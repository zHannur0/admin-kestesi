import { FC } from "react";
import { SuccesIcons } from "../atoms/Icons";
import { Button } from "../atoms/UI/Buttons/Button";
import { Modal, ModalContent, ModalInner } from "../atoms/UI/Modal/Modal";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
    onClose?: () => void;
    handleDelete?: any;
}

const Delete: FC<IProps> = ({ onClose, handleDelete }) => {
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;
    return (
        <>
            <Modal style={{zIndex: "5000"}}>
                <ModalInner>
                    <ModalContent>
                        <div className="modal_header">
                            <SuccesIcons />
                        </div>

                        <div className="modal_body">
                            <div className="modal_body-title">{t.schedule.confirm}</div>
                            <div className="modal_body-subtitle">
                                {t.schedule.confirmDelete}
                            </div>
                        </div>

                        <div className="modal_footer">
                            <Button
                                background="#aaa"
                                radius="8px"
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: ".8rem",
                                }}
                                onClick={onClose}
                            >
                                {t.schedule.no}

                            </Button>
                            <Button
                                background="#4F4F4F"
                                radius="8px"
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: ".8rem",
                                }}
                                onClick={handleDelete}
                            >
                                {t.schedule.yes}

                            </Button>
                        </div>
                    </ModalContent>
                </ModalInner>
            </Modal>
        </>
    );
};

export default Delete;
