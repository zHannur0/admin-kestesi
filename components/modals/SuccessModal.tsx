import { FC } from "react";
import { SuccesIcons } from "../atoms/Icons";
import { Button } from "../atoms/UI/Buttons/Button";
import { Modal, ModalContent, ModalInner } from "../atoms/UI/Modal/Modal";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  onClose?: () => void;
}

const SuccessModal: FC<IProps> = ({ onClose }) => {
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;
  return (
    <>
      <Modal>
        <ModalInner>
          <ModalContent>
            <div className="modal_header">
              <SuccesIcons />
            </div>

            <div className="modal_body">
              <div className="modal_body-title">{t.lessonTypes.success}</div>
              <div className="modal_body-subtitle">
                  {t.lessonTypes.dataSaved}
              </div>
            </div>

            <div className="modal_footer">
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
                onClick={onClose}
              >
                ОК
              </Button>
            </div>
          </ModalContent>
        </ModalInner>
      </Modal>
    </>
  );
};

export default SuccessModal;
