import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, Select } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import {
  getTokenInLocalStorage,
  getWeekDayNumber,
  getWeekDayString,
} from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getClassRoomThunk,
  getMenuThunk,
} from "@/store/thunks/schoolnfo.thunk";
import { IMenu } from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import { useFormik, useField, Formik, Form } from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IUpdateInput {
  name?: string;
  recipe?: string;
  exits: Record<string, string>;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  getId?: any;
  menuid?: IMenu;
}

const MenuTableBlock: FC<IProps> = ({ onReject, getId, menuid, onEdit }) => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  const formik = useFormik({
    initialValues: {
      week_day: "",
      name: "",
      recipe: "",
      exits1: "",
      exits2: "",
      exits3: "",
    },
    validationSchema: Yup.object({
      week_day: Yup.number().required("Обязательно*"),
      name: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      if (!getId) {
        await instance
          .post(
            "https://www.bilimge.kz/admins/api/menu/",
            {
              food_name: values.name,
              food_sostav: values.recipe,
              vihod_1: values.exits1,
              vihod_2: values.exits2,
              vihod_3: values.exits3,
              week_day: values.week_day,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              dispatch(getMenuThunk());
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
            `https://www.bilimge.kz/admins/api/menu/${getId}/`,
            {
              food_name: values.name,
              food_sostav: values.recipe,
              vihod_1: values.exits1,
              vihod_2: values.exits2,
              vihod_3: values.exits3,
              week_day: values.week_day,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              dispatch(getMenuThunk());
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
    if (menuid && getId) {
      formik.resetForm({
        values: {
          week_day: menuid.week_day || "",
          name: menuid.food_name || "",
          recipe: menuid.food_sostav || "",
          exits1: menuid.vihod_1 || "",
          exits2: menuid.vihod_2 || "",
          exits3: menuid.vihod_3 || "",
        },
      });
    }
  }, [menuid, getId]);

  function onDelete() {
    formik.resetForm({
      values: {
        week_day: "",
        name: "",
        recipe: "",
        exits1: "",
        exits2: "",
        exits3: "",
      },
    });
  }


  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="main_table-modal">
          <div className="main_table-modal_title">{t.canteenMenu.name}</div>

          <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
            <div className="main_table-modal_upload sanaty">
              <div className="login_forms-label_pink">{t.canteenMenu.date}</div>
              <Select {...formik.getFieldProps("week_day")}>
                <option value="">{t.canteenMenu.selectDay}</option>
                {timeArr.map((item) => (
                  <option value={item.id}>{item.type}</option>
                ))}
              </Select>
            </div>

            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">{t.canteenMenu.foodName}</div>
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

              <div className="forms">
                <div className="login_forms-label_pink">{t.canteenMenu.foodComposition}</div>
                {formik.touched.recipe && formik.errors.recipe ? (
                  <div style={{ color: "red" }}>{formik.errors.recipe}</div>
                ) : null}
                <Input
                  name={"recipe"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recipe}
                  style={{
                    borderColor:
                      formik.touched.recipe && formik.errors.recipe
                        ? "red"
                        : "#c1bbeb",
                  }}
                />
              </div>

              <div className="forms flex" style={{ gap: "1.6rem" }}>
                <div
                  className="login_forms-label_pink"
                  style={{ marginBottom: "0" }}
                >
                  {t.canteenMenu.servings}
                </div>
                {formik.touched.exits1 && formik.errors.exits1 ? (
                  <div style={{ color: "red" }}>{formik.errors.exits1}</div>
                ) : null}
                <Input
                  name={"exits1"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.exits1}
                  style={{
                    borderColor:
                      formik.touched.exits1 && formik.errors.exits1
                        ? "red"
                        : "#c1bbeb",
                  }}
                />
                {formik.touched.exits2 && formik.errors.exits2 ? (
                  <div style={{ color: "red" }}>{formik.errors.exits2}</div>
                ) : null}
                <Input
                  name={"exits2"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.exits2}
                  style={{
                    borderColor:
                      formik.touched.exits2 && formik.errors.exits2
                        ? "red"
                        : "#c1bbeb",
                  }}
                />
                {formik.touched.exits3 && formik.errors.exits3 ? (
                  <div style={{ color: "red" }}>{formik.errors.exits3}</div>
                ) : null}
                <Input
                  name={"exits3"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.exits3}
                  style={{
                    borderColor:
                      formik.touched.exits3 && formik.errors.exits3
                        ? "red"
                        : "#c1bbeb",
                  }}
                />
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
                  Удалить
                </Button>
                <Button
                  background="#27AE60"
                  style={{ width: "auto" }}
                  type={"submit"}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const timeArr = [
  {
    id: 1,
    type: "Понедельник",
  },

  {
    id: 2,
    type: "Вторник",
  },

  {
    id: 3,
    type: "Среда",
  },

  {
    id: 4,
    type: "Четверг",
  },

  {
    id: 5,
    type: "Пятница",
  },

  {
    id: 6,
    type: "Суббота",
  },
];

export default MenuTableBlock;
