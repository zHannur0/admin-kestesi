import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import {Input, Select} from "../../atoms/UI/Inputs/Input";
import NumberModal from "@/components/modals/NumberModal";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getDopThunk, getOSThunk } from "@/store/thunks/pride.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ICalls } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface UpdateInputProps {
  start?: string;
  end?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  dopid?: ICalls;
  getId?: number;
}

const CallsTableBlock2: FC<IProps> = ({ onReject, dopid, getId, onEdit }) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState([false, false, false]);

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
      start: "",
      end: "",
      plan: "",
      number: "",
      smena: "",
    },
    validationSchema: Yup.object({
      start: Yup.string().required("Обязательно*"),
      end: Yup.string().required("Обязательно*"),
      plan: Yup.string().required("Обязательно*"),
      number: Yup.string().required("Обязательно*"),
      smena: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      if (!getId) {
        const res = await instance.post(
            "https://bilimge.kz/admins/api/DopUrokRingApi/",
            {
              plan: String(values.plan),
              number: String(values.number),
              smena: String(values.smena),
              start_time: values.start,
              end_time: values.end,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
        ).then((res) => {
          if (res) {
            dispatch(getDopThunk());
            showSuccess();
            onDelete();
            if (showSuccessModal && onReject) {
              onReject(false);
            }
          }
        })
            .catch((e) => {
              showError();
              if (showErrorModal && onReject) {
                onReject(false);
              }
            });

      } else {
        const res = await instance.put(
            `https://bilimge.kz/admins/api/DopUrokRingApi/${getId}/`,
            {
              plan: String(values.plan),
              number: String(values.number),
              smena: String(values.smena),
              start_time: values.start,
              end_time: values.end,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
        ).then((res) => {
          if (res) {
            dispatch(getDopThunk());
            showSuccess();
            if (showSuccessModal && onReject) {
              onReject(false);
            }
          }
        })
            .catch((e) => {
              showError();
              if (showErrorModal && onReject) {
                onReject(false);
              }
            });
      }
    },
  });

  useEffect(() => {
    if (dopid && getId) {
      formik.resetForm({
        values: {
          start: dopid.start_time?.slice(0, -3) || "",
          end: dopid.end_time?.slice(0, -3) || "",
          plan: String(dopid.plan) || "",
          number: String(dopid.number) || "",
          smena: String(dopid.smena) || "",
        },
      });
    }
  }, [dopid, getId]);

  function onDelete() {
    formik.resetForm({
      values: {
        start: "",
        end: "",
        plan: "",
        number: "",
        smena: "",
      },
    });
  }
  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="login_forms-label_pink">{t.bells.additionalLesson}</div>
          <div className="main_table-modal_forms">
            <div
                className="forms flex"
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "5.2rem",
                }}
            >
              <div>
                <div className="login_forms-label_pink">{t.bells.bellsPlan}</div>
                <Select {...formik.getFieldProps("plan")}>
                  <option value="">{t.bells.selectBellsPlan}</option>
                  {timeArr2.map((item) => (
                      <option key={item} value={item}>{item}</option>
                  ))}
                </Select>
              </div>

              <div>
                <div className="login_forms-label_pink">{t.bells.lessonNumber}</div>
                <Select {...formik.getFieldProps("number")}>
                  <option value="">{t.bells.selectLessonNumber}</option>
                  {timeArr.map((item) => (
                      <option key={item} value={item}>{item}</option>
                  ))}
                </Select>
              </div>

              <div>
                <div>
                  <div className="login_forms-label_pink">{t.bells.shift}</div>
                  <Select {...formik.getFieldProps("smena")}>
                    <option value="">{t.bells.selectShift}</option>
                    {timeArr2.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">{t.bells.lessonStart}</div>
              {formik.touched.start && formik.errors.start ? (
                  <div style={{color: "red"}}>{formik.errors.start}</div>
              ) : null}
              <Input
                  name={"start"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.start}
                  style={{
                    borderColor:
                        formik.touched.start && formik.errors.start
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">{t.bells.lessonEnd}</div>
              {formik.touched.end && formik.errors.end ? (
                  <div style={{color: "red"}}>{formik.errors.end}</div>
              ) : null}
              <Input
                  name={"end"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.end}
                  style={{
                    borderColor:
                        formik.touched.end && formik.errors.end
                            ? "red"
                            : "#c1bbeb",
                  }}
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
                onClick={onDelete}
                type="button"
            >
              {t.bells.close}
            </Button>
            <Button
                background="#27AE60"
                style={{width: "auto"}}
                type="submit"
            >
              {t.bells.save}
            </Button>
          </div>
        </form>
      </div>
    </>
);
};

const timeArr = [0,1, 2, 3, 4, 5, 6,7,8,9,10];
const timeArr2 = [1, 2, 3, 4, 5, 6,7,8,9,10];


export default CallsTableBlock2;
