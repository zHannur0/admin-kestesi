import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {getSchoolAltynThunk, getSchoolAtestThunk} from "@/store/thunks/pride.thunk";
import {getTokenInLocalStorage, urlToFile} from "@/utils/assets.utils";
import { ISchoolAltyn } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MdClear} from "react-icons/md";


interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  altynid?: ISchoolAltyn;
  getId?: number;
}

const PrideSchoolTableBlock4: FC<IProps> = ({
  onReject,
  onEdit,
  altynid,
  getId,
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
  const [photo, setPhoto] = useState<File | null>()
  const [photoId, setPhotoId] = useState<string | null>()

  const formik = useFormik({
    initialValues: {
      fullname: "",
      student_success: "",
      // endyear: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Обязательно*"),
      student_success: Yup.string().required("Обязательно*"),
      // endyear: Yup.string()
      //     .matches(/^\d{4}-\d{4}$/, 'Неверный формат годового диапазона')
      //     .required('Годовой диапазон обязателен для заполнения'),
    }),
    onSubmit: async (values) => {
      let headers = photo ? {
        Authorization: `Token ${getTokenInLocalStorage()}`,
        "Content-Type": "multipart/form-data",
      } : {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      };
      if (!getId) {
        await instance
            .post("https://bilimge.kz/admins/api/School_AltynBelgiApi/", {
              fullname: values.fullname,
              // endyear: values.endyear,
              student_success: values.student_success,
              photo: photo
            }, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolAltynThunk());
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
            .put(`https://bilimge.kz/admins/api/School_AltynBelgiApi/${getId}/`,
                {
                      fullname: values.fullname,
                      // endyear: values.endyear,
                      student_success: values.student_success,
                      photo: photo
                    } , {
                  headers: headers,
                })
            .then((res) => {
              if (res) {
                if (res) {
                  dispatch(getSchoolAltynThunk());
                  showSuccess();
                  if (showSuccessModal && onReject) {
                    onReject(false);
                  }
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


  useEffect(() => {
    if (altynid && getId) {
      formik.resetForm({
        values: {
          fullname: altynid.fullname || "",
          student_success: altynid.student_success || "",
          // endyear: altynid.endyear || "",
        },
      });
      fetchAndSetPhoto(altynid.photo);
    }
  }, [altynid, getId]);
  async function fetchAndSetPhoto(photoUrl?: string) {
    const phot = await urlToFile(photoUrl);
    setPhoto(phot);
  }

  function onDelete() {
    formik.resetForm({
      values: {
        fullname: "",
        student_success: "",
        // endyear: "",
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
          <div className="main_table-modal_title">Должность</div>
          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload">
              <div className="login_forms-label_pink">Фото *</div>
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
                    }}
                    />
                )
              }
            </div>

            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">ФИО *</div>
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
                <div className="login_forms-label_pink">Текст</div>
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

              {/*<div className="forms">*/}
              {/*  <div className="login_forms-label_pink">Год</div>*/}
              {/*  {formik.touched.endyear && formik.errors.endyear ? (*/}
              {/*      <div style={{color: "red"}}>{formik.errors.endyear}</div>*/}
              {/*  ) : null}*/}
              {/*  <Input*/}
              {/*      name={"endyear"}*/}
              {/*      onChange={formik.handleChange}*/}
              {/*      onBlur={formik.handleBlur}*/}
              {/*      value={formik.values.endyear}*/}
              {/*      style={{*/}
              {/*        borderColor:*/}
              {/*            formik.touched.endyear && formik.errors.endyear*/}
              {/*                ? "red"*/}
              {/*                : "#c1bbeb",*/}
              {/*      }}*/}
              {/*      placeholder={"YYYY-YYYY "}*/}
              {/*  />*/}
              {/*</div>*/}

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
                  Удалить
                </Button>
                <Button
                    background="#27AE60"
                    style={{width: "auto"}}
                    type="submit"
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

export default PrideSchoolTableBlock4;
