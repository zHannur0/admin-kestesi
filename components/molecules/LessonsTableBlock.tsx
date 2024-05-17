import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, Select } from "../atoms/UI/Inputs/Input";
import TypeModal from "../modals/TypeModal";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getLessonsThunk } from "@/store/thunks/pride.thunk";
import { ILessons } from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getMenuThunk } from "@/store/thunks/schoolnfo.thunk";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  lessonsid?: ILessons;
  getId?: number;
}

const LessonsTableBlock: FC<IProps> = ({
  onReject,
  lessonsid,
  onEdit,
  getId,
}) => {
  const dispatch = useAppDispatch();
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();

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

  const formik = useFormik({
    initialValues: {
      name: "",
      sanat: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      if (!getId) {
        await instance
          .post(
            "https://www.bilimge.kz/admins/api/subject/",
            {
              full_name: values.name,
              type: values.sanat,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              dispatch(getLessonsThunk());
              showSuccess();
              onDelete();
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
            `https://www.bilimge.kz/admins/api/subject/${getId}/`,
            {
              full_name: values.name,
              type: values.sanat,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              dispatch(getLessonsThunk());
              showSuccess();
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
      }
    },
  });

  useEffect(() => {
    if (lessonsid && getId) {
      formik.resetForm({
        values: {
          name: lessonsid.full_name || "",
          sanat: lessonsid.type || "",
        },
      });
    }
  }, [lessonsid, getId]);

  function onDelete() {
    formik.resetForm({
      values: {
        name: "",
        sanat: "",
      },
    });
  }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="main_table-modal">
          <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
            <div className="main_table-modal_forms">
              <div className="forms flex" style={{ alignItems: "flex-start" }}>
                <div style={{ width: "70%" }}>
                  <div className="login_forms-label_pink">{t.subjects.subjectName}</div>
                  {formik.touched.name && formik.errors.name ? (
                    <div style={{ color: "red" }}>{formik.errors.name}</div>
                  ) : null}
                  <Input
                    name={"name"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    style={{
                      borderColor:
                        formik.touched.name && formik.errors.name
                          ? "red"
                          : "#c1bbeb",
                    }}
                  />
                </div>
                <div className="sanaty">
                  <div className="login_forms-label_pink">{t.subjects.classLevel}</div>
                  <Select {...formik.getFieldProps("sanat")}>
                    <option value="EASY">EASY</option>
                    {timeArr.map((item) => (
                      <option value={item.type}>{item.type}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex"
            style={{ justifyContent: "flex-end", gap: "1.6rem" }}
          >
            <Button
              background="#CACACA"
              color="#645C5C"
              style={{ width: "auto" }}
              type="button"
              onClick={onDelete}
            >
              {t.subjects.delete}
            </Button>
            <Button
              background="#27AE60"
              style={{ width: "auto" }}
              type="submit"
            >
              {t.subjects.save}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

const timeArr = [
  { id: 1, type: "MEDIUM" },
  { id: 2, type: "HARD" },
];

export default LessonsTableBlock;
