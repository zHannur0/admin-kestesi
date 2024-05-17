import { FC } from "react";
import { ErrorIcons } from "../atoms/Icons";
import { Button } from "../atoms/UI/Buttons/Button";
import { Modal, ModalContent, ModalInner } from "../atoms/UI/Modal/Modal";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  onClose?: () => void;
}

const ErrorModal: FC<IProps> = ({ onClose }) => {
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
              <ErrorIcons />
            </div>

            <div className="modal_body">
              <div className="modal_body-title">{router.locale === "kz" ? "Қате" : "Ошибка"}</div>
              <div className="modal_body-subtitle">
                  {
                      router.locale === "kz" ? " Толтырылған ақпарат көзінде қателік бар. Қайталап толтыруды сұраймыз."
                          : "В заполненных данных есть ошибка. Пожалуйста, заполните повторно."
                  }

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

export default ErrorModal;
