import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FC,
  useEffect,
} from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getClassRoomThunk,
  getUsersThunk,
} from "@/store/thunks/schoolnfo.thunk";
import { IClassRoom } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IUpdateInputProps {
  name?: string;
  gr?: string;
  floor?: string;
  corpuse?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  setEditActive?: Dispatch<SetStateAction<boolean>>;
  cabinetid?: IClassRoom;
  getId?: number;
}

const CabinetTableBlock: FC<IProps> = ({
  onReject,
  getId,
  cabinetid,
  setEditActive,
}) => {
  const dispatch = useAppDispatch();

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
      gr: "",
      floor: "",
      corpuse: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательно*"),
      gr: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      if (!getId) {
        await instance
          .post(
            "https://www.bilimge.kz/admins/api/classroom/",
            {
              classroom_name: values.name,
              classroom_number: values.gr,
              flat: Number(values.floor),
              korpus: Number(values.corpuse),
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              dispatch(getClassRoomThunk());
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
        await instance
          .put(
            `https://www.bilimge.kz/admins/api/classroom/${getId}/`,
            {
              classroom_name: values.name,
              classroom_number: values.gr,
              flat: Number(values.floor),
              korpus: Number(values.corpuse),
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              dispatch(getClassRoomThunk());
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
    if (cabinetid && getId) {
      formik.resetForm({
        values: {
          name: cabinetid.classroom_name || "",
          gr: String(cabinetid.classroom_number) || "",
          floor: String(cabinetid.flat) || "",
          corpuse: String(cabinetid.korpus) || "",
        },
      });
    }
  }, [cabinetid, getId]);

  function onDelete() {
    formik.resetForm({
      values: {
        name: "",
        gr: "",
        floor: "",
        corpuse: "",
      },
    });
  }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="main_table-modal">
          <div className="main_table-modal_title">{t.room.title}</div>
          <div className="main_table-modal_forms">
            <div className="forms">
              <div className="login_forms-label_pink">{t.room.roomName}</div>
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

            <div className="flex">
              <div className="forms" style={{width:"30%"}}>
                <div className="login_forms-label_pink">{t.room.roomNumber}</div>
                {formik.touched.gr && formik.errors.gr ? (
                  <div style={{ color: "red" }}>{formik.errors.gr}</div>
                ) : null}
                <Input
                  name={"gr"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gr}
                  style={{
                    borderColor:
                      formik.touched.gr && formik.errors.gr ? "red" : "#c1bbeb",
                  }}
                />
              </div>

              <div className="forms" style={{width:"30%"}}>
                <div className="login_forms-label_pink">{t.room.floor}</div>
                {formik.touched.floor && formik.errors.floor ? (
                  <div style={{ color: "red" }}>{formik.errors.floor}</div>
                ) : null}
                <Input
                  name={"floor"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.floor}
                  style={{
                    borderColor:
                      formik.touched.floor && formik.errors.floor
                        ? "red"
                        : "#c1bbeb",
                  }}
                />
              </div>

              <div className="forms" style={{width:"30%"}}>
                <div className="login_forms-label_pink">{t.room.building}</div>
                {formik.touched.corpuse && formik.errors.corpuse ? (
                  <div style={{ color: "red" }}>{formik.errors.corpuse}</div>
                ) : null}
                <Input
                  name={"corpuse"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.corpuse}
                  style={{
                    borderColor:
                      formik.touched.corpuse && formik.errors.corpuse
                        ? "red"
                        : "#c1bbeb",
                  }}
                />
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
              {t.room.delete}
            </Button>
            <Button
              background="#27AE60"
              style={{ width: "auto" }}
              type="submit"
            >
              {t.room.save}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CabinetTableBlock;
