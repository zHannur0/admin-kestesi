import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ColorBlock } from "../atoms/UI/Blocks/Block";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getExtraThunk } from "@/store/thunks/pride.thunk";
import { ColorCheckIcons } from "../atoms/Icons";
import { IExtraLessons } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const typeColor = [
  "#27AE60",
  "#E2B93B",
  "#F2994A",
  "#CF3535",
  "#E0E0E0",
  "#64748B",
  "#3F6212",
  "#CA8A04",
  "#C84D24",
  "#9F1239",
  "#86198F",
  "#1E293B",
];

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  extraid?: IExtraLessons;
  getId?: number;
}

const TypeLessonsTableBlock: FC<IProps> = ({
  onReject,
  onEdit,
  extraid,
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

  useEffect(() => {
    if (extraid && getId) {
      setUpdateInput((extraid?.type_full_name as string) || "");
    }
  }, [extraid]);

  const onSave = async () => {
    try {
      if (updateInput) {
        if (!getId) {
          await instance
            .post(
              "https://www.bilimge.kz/admins/api/extra_lesson/",
              {
                type_full_name: updateInput,
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              },
            )
            .then((res) => {
              if (res) {
                dispatch(getExtraThunk());
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
              `https://www.bilimge.kz/admins/api/extra_lesson/${getId}/`,
              {
                type_full_name: updateInput,
                type_color: chooseColor,
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              },
            )
            .then((res) => {
              if (res) {
                dispatch(getExtraThunk());
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
          <div className="login_forms-label_pink">{t.lessonTypes.nameL}</div>
          <div className="main_table-modal_forms">
            <div className="forms">
              <Input
                  type="text"
                  placeholder={t.lessonTypes.nameL}
                  name="type"
                  value={updateInput}
                  onChange={(e) => setUpdateInput(e.target.value)}
              />
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
              {t.lessonTypes.delete}
            </Button>
            <Button background="#27AE60" style={{width: "auto"}} onClick={onSave}>
              {t.lessonTypes.save}
            </Button>
          </div>
        </div>
      </>

  );
};

export default TypeLessonsTableBlock;
