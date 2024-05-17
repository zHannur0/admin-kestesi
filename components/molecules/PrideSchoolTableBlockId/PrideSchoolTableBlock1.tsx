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
  getClassNameThunk, getPrideThunk,
  getSchoolSportThunk,
} from "@/store/thunks/pride.thunk";
import {getTokenInLocalStorage, urlToFile} from "@/utils/assets.utils";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import ClassNamesModal from "@/components/modals/ClassNames";
import {ISchoolPride, ISchoolSport} from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import SanatyModalModal from "@/components/modals/SanatyModal";
import { getIAClassThunk } from "@/store/thunks/available.thunk";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getMenuThunk} from "@/store/thunks/schoolnfo.thunk";
import school from "@/pages/school";
import {log} from "console";
import {MdClear} from "react-icons/md";
import {headers} from "next/headers";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface UpdateInputProps {
  fullname: string;
  text?: string;
  class?: string;
  file: any;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  prideId?: ISchoolPride;
  getId?: number;
}

const PrideSchoolTableBlock1: FC<IProps> = ({
  onReject,
  onEdit,
  prideId,
  getId,
}) => {
  const dispatch = useAppDispatch();
  const classes = useTypedSelector((state) => state.ia.iaclass);
  const clasname = useTypedSelector((state) => state.pride.classname);
  const [photo, setPhoto] = useState<File | null>()

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  useEffect(() => {
    if (classes) {
      dispatch(getIAClassThunk());
    }
  }, [dispatch]);


  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;

  useEffect(() => {
    if (clasname) {
      dispatch(getClassNameThunk());
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      student_success: "",
      type: "sport",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("*"),
      student_success: Yup.string().required("*"),
      type: Yup.string().required("*"),
    }),
    onSubmit: async (values) => {
      console.log(values)
      let headers = photo ? {
        Authorization: `Token ${getTokenInLocalStorage()}`,
        "Content-Type": "multipart/form-data",
      } : {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      };
      if (!getId) {
                await instance
                  .post("https://bilimge.kz/admins/api/proudofschool/", {
                    fullname: values.fullname,
                    student_success: values.student_success,
                    success: values.type,
                    photo: photo
                  }, {
                    headers: {
                      Authorization: `Token ${getTokenInLocalStorage()}`,
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  .then((res) => {
                    if (res) {
                      dispatch(getPrideThunk());
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
                  .put(`https://bilimge.kz/admins/api/proudofschool/${getId}/`,
                      {
                        fullname: values.fullname,
                        // classl: String(values.class_id),
                        student_success: values.student_success,
                        success: values.type,
                        photo: photo || null
                      } , {
                    headers: headers,
                  })
                  .then((res) => {
                    if (res) {
                        dispatch(getPrideThunk());
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
            }
  });
  console.log(prideId)
  useEffect(() => {
    if (prideId && getId) {
      formik.resetForm({
        values: {
          fullname: prideId.fullname || "",
          student_success: prideId.student_success || "",
          type: prideId.success || ""

          // class_id: sportid.classl || "",
        },
      });
      fetchAndSetPhoto(prideId.photo)
    }
  }, [prideId, getId]);
  async function fetchAndSetPhoto(photoUrl?: string) {
    const phot = await urlToFile(photoUrl);
    setPhoto(phot);
  }


  function onDelete() {
    formik.resetForm({
      values: {
        fullname: "",
        student_success: "",
        type: ""
        // class_id: "",
      },
    });
    setPhoto(null);
  }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_title"> </div>
          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload">
              <div className="login_forms-label_pink">Фото *</div>
              {
                photo ? (
                    <div className="file-item">
                      <div className="file-info">
                        <p>{photo.name}</p>
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

            <div className="main_table-modal_forms">
              <div style={{marginBottom: "2.4rem"}} className="sanaty">
                <div className="login_forms-label_pink">{t.schoolPride.type}</div>
                <Select {...formik.getFieldProps("type")}>

                  <option value="sport">Спорт</option>
                  <option value="oner">{t.schoolPride.art}</option>
                  <option value="olimpiada">{t.schoolPride.academicOlympiad}</option>
                  <option value="altynbelgi">{t.schoolPride.goldMedal}</option>
                  <option value="redcertificate">{t.schoolPride.redCertificate}</option>

                </Select>
              </div>
              <div className="forms">
              <div className="login_forms-label_pink">{t.schoolPride.fullName}</div>

                {formik.touched.fullname && formik.errors.fullname ? (
                    <div style={{color: "red"}}>{formik.errors.fullname}</div>
                ) : null}
                <Input
                    name={"fullname"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullname}
                    style={{
                      borderColor:
                          formik.touched.fullname && formik.errors.fullname
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">{t.schoolPride.text}</div>
                {formik.touched.student_success && formik.errors.student_success ? (
                    <div style={{color: "red"}}>{formik.errors.student_success}</div>
                ) : null}
                <Input
                    name={"student_success"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.student_success}
                    style={{
                      borderColor:
                          formik.touched.student_success && formik.errors.student_success
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              {/*<div className="forms sanaty">*/}
              {/*  <div className="login_forms-label_pink">Класс</div>*/}
              {/*  {formik.touched.class_id && formik.errors.class_id ? (*/}
              {/*      <div style={{color: "red"}}>{formik.errors.class_id}</div>*/}
              {/*  ) : null}*/}
              {/*  <Input*/}
              {/*      name={"class_id"}*/}
              {/*      onChange={formik.handleChange}*/}
              {/*      onBlur={formik.handleBlur}*/}
              {/*      value={formik.values.class_id}*/}
              {/*      style={{*/}
              {/*        borderColor:*/}
              {/*            formik.touched.class_id && formik.errors.class_id*/}
              {/*                ? "red"*/}
              {/*                : "#c1bbeb",*/}
              {/*      }}*/}
              {/*  />*/}
              {/*</div>*/}

              <div
                  className="flex"
                  style={{justifyContent: "flex-end", gap: "1.6rem"}}
              >
                <Button
                    type={"button"}
                    background="#CACACA"
                    color="#645C5C"
                    style={{width: "auto"}}
                    onClick={onDelete}
                >
                  Удалить
                </Button>
                <Button
                    background="#27AE60"
                    style={{width: "auto"}}
                    type={"submit"}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PrideSchoolTableBlock1;
