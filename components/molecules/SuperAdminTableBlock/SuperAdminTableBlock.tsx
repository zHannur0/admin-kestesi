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
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getSchoolIdThunk,
  getSchoolThunk,
  getUsersThunk,
} from "@/store/thunks/schoolnfo.thunk";
import {getTokenInLocalStorage, urlToFile} from "@/utils/assets.utils";
import { ISchoolInfo } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { Formik, Form, Field, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {MdClear} from "react-icons/md";

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  getId?: number;
  schoolid?: ISchoolInfo;
  onEdit?: any;
}

interface IUpdateInputProps {
  kz?: string;
  ru?: string;
  eng?: string;
  city?: string;
  url?: string;
  timezone?: string;
}

const SuperAdminTableBlock: FC<IProps> = ({
  onReject,
  getId,
  schoolid,
  onEdit,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const [photo, setPhoto] = useState<File | null>()

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
      kz: "",
      ru: "",
      eng: "",
      city: "",
      url: "",
      timezone: "",
      x: "",
      y: "",
    },
    validationSchema: Yup.object({
      kz: Yup.string().required("Обязательно*"),
      ru: Yup.string().required("Обязательно*"),
      eng: Yup.string().required("Обязательно*"),
      url: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      values.kz && formData.append("school_kz_name", values.kz);
      values.ru && formData.append("school_ru_name", values.ru);
      values.eng && formData.append("school_eng_name", values.eng);
      values.url && formData.append("url", values.url);
      values.city && formData.append("region", values.city);
      formData.append("timezone", "GMT+5" );
      photo && formData.append("school_map", photo);
      if (!getId) {
        await instance
          .post(
            `https://www.bilimge.kz/admins/api/school/`,
            formData,
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res && onReject) {
              showSuccess();
              dispatch(getSchoolThunk());
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
            `https://www.bilimge.kz/admins/api/school/${getId}/`,
              formData,
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res && onEdit) {
              showSuccess();
              dispatch(getSchoolThunk());
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
    if (schoolid && getId) {
      formik.resetForm({
        values: {
          kz: schoolid.school_kz_name || "",
          ru: schoolid.school_ru_name || "",
          eng: schoolid.school_eng_name || "",
          city: schoolid.region || "",
          url: schoolid.url || "",
          timezone: schoolid.timezone || "",
          x: schoolid.coordinate_x || "",
          y: schoolid.coordinate_y || "",
        },
      });
      fetchAndSetPhoto(schoolid.school_map);

    }
  }, [schoolid, getId, formik.resetForm]);

  async function fetchAndSetPhoto(photoUrl?: string) {
    const phot = await urlToFile(photoUrl);
    setPhoto(phot);
  }

  function onDelete() {
    formik.resetForm({
      values: {
        kz: "",
        ru: "",
        eng: "",
        city: "",
        url: "",
        timezone: "",
        x: "",
        y: "",
      },
    });
    setPhoto(null);

  }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <div className="main_table-modal_title">{t.superadmin.schools}</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_flex">
            <div className="main_table-modal_forms">
              <div>
                <div className="login_forms-label_pink">{router.locale === "kz" ? "Карта суреті" : "Фото карты"}</div>
                {
                  photo ? (
                      <div className="file-item">
                        <div className="file-info">
                          <p>{photo.name.substring(0, 14)}</p>
                        </div>
                        <div className="file-actions">
                          <MdClear onClick={() => setPhoto(null)}/>
                        </div>
                      </div>
                  ) : (
                      <Input type="file" name="file" onChange={(event) => {
                        return setPhoto(event?.target?.files?.[0]);
                      }}/>
                  )
                }

              </div>
              <div className="forms">
                <div className="login_forms-label_pink">
                  {t.superadmin.schoolNameKZ}
                </div>
                {formik.touched.kz && formik.errors.kz ? (
                    <div style={{color: "red"}}>{formik.errors.kz}</div>
                ) : null}
                <Input
                    name={"kz"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.kz}
                    style={{
                      borderColor:
                          formik.touched.kz && formik.errors.kz ? "red" : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">
                  {t.superadmin.schoolNameRU}

                </div>
                {formik.touched.ru && formik.errors.ru ? (
                    <div style={{color: "red"}}>{formik.errors.ru}</div>
                ) : null}
                <Input
                    name={"ru"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ru}
                    style={{
                      borderColor:
                          formik.touched.ru && formik.errors.ru ? "red" : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">
                  {t.superadmin.schoolNameENG}

                </div>
                {formik.touched.eng && formik.errors.eng ? (
                    <div style={{color: "red"}}>{formik.errors.eng}</div>
                ) : null}
                <Input
                    name={"eng"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.eng}
                    style={{
                      borderColor:
                          formik.touched.eng && formik.errors.eng
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms flex">
                <div>
                  <div className="login_forms-label_pink">{t.superadmin.city}</div>
                  {formik.touched.city && formik.errors.city ? (
                      <div style={{color: "red"}}>{formik.errors.city}</div>
                  ) : null}
                  <Select {...formik.getFieldProps("city")}>
                    <option value="">Выберите регион</option>
                    {cities.map((item) => (
                        <option value={item.name}>{item.nameUpper}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="login_forms-label_pink">URL</div>
                  {formik.touched.url && formik.errors.url ? (
                      <div style={{color: "red"}}>{formik.errors.url}</div>
                  ) : null}
                  <Input
                      name={"url"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.url}
                      style={{
                        borderColor:
                            formik.touched.url && formik.errors.url
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>
              </div>
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
                onClick={() => onDelete()}
            >
              {t.superadmin.delete}
            </Button>
            <Button
                background="#27AE60"
                style={{width: "auto"}}
                type="submit"
            >
              {t.superadmin.save}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

const cities = [
  {
    name: "almaty",
    nameUpper: "Алматы"
  },
  {
    name: "astana",
    nameUpper: "Астана"
  },
  {
    name: "shymkent",
    nameUpper: "Шымкент"
  },
  {
    name: "abay_oblast",
    nameUpper: "Абайская область"
  },
  {
    name: "akmolinsk_oblast",
    nameUpper: "Акмолинская область"
  },
  {
    name: "aktobe_oblast",
    nameUpper: "Актюбинская область"
  },
  {
    name: "almaty_region",
    nameUpper: "Алматинская область"
  },
  {
    name: "atyrau_oblast",
    nameUpper: "Атырауская область"
  },
  {
    name: "east_kazakhstan_oblast",
    nameUpper: "Восточно-Казахстанская область"
  },
  {
    name: "zhambyl_oblast",
    nameUpper: "Жамбылская область"
  },
  {
    name: "west_kazakhstan_oblast",
    nameUpper: "Западно-Казахстанская область"
  },
  {
    name: "zhetysu_oblast",
    nameUpper: "Жетысуская область"
  },
  {
    name: "karaganda_oblast",
    nameUpper: "Карагандинская область"
  },
  {
    name: "kostanay_oblast",
    nameUpper: "Костанайская область"
  },
  {
    name: "kyzylorda_oblast",
    nameUpper: "Кызылординская область"
  },
  {
    name: "mangystau_oblast",
    nameUpper: "Мангистауская область"
  },
  {
    name: "pavlodar_oblast",
    nameUpper: "Павлодарская область"
  },
  {
    name: "north_kazakhstan_oblast",
    nameUpper: "Северо-Казахстанская область"
  },
  {
    name: "turkestan_oblast",
    nameUpper: "Туркестанская область"
  },
  {
    name: "ulytau_oblast",
    nameUpper: "Улытауская область"
  },
]

export default SuperAdminTableBlock;
