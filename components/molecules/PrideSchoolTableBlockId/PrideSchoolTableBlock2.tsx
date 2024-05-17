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
  getClassNameThunk,
  getSchoolOnerThunk, getSchoolSportThunk,
} from "@/store/thunks/pride.thunk";
import {getTokenInLocalStorage, urlToFile} from "@/utils/assets.utils";
import { ISchoolOner } from "@/types/assets.type";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import ClassNamesModal from "@/components/modals/ClassNames";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import SanatyModalModal from "@/components/modals/SanatyModal";
import { getIAClassThunk } from "@/store/thunks/available.thunk";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MdClear} from "react-icons/md";

interface UpdateInputProps {
  fullname: string;
  text?: string;
  class?: string;
  file: any;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  onerid?: ISchoolOner;
  getId?: number;
}

const PrideSchoolTableBlock2: FC<IProps> = ({
  onReject,
  onEdit,
  onerid,
  getId,
}) => {
  const dispatch = useAppDispatch();
  const classname = useTypedSelector((state) => state.pride.classname);
  const classes = useTypedSelector((state) => state.ia.iaclass);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [photo, setPhoto] = useState<File | null>()
  const [photoId, setPhotoId] = useState<string | null>()

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  useEffect(() => {
    if (classname) {
      dispatch(getClassNameThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (classes) {
      dispatch(getIAClassThunk());
    }
  }, [dispatch]);


  const formik = useFormik({
    initialValues: {
      fullname: "",
      student_success: "",
      // class_id: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Обязательно*"),
      student_success: Yup.string().required("Обязательно*"),
      // class_id: Yup.number().required("Обязательно*"),
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
            .post("https://bilimge.kz/admins/api/Oner_SuccessApi/",  {
              fullname: values.fullname,
              // classl: values.class_id,
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
                dispatch(getSchoolOnerThunk());
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
            .put(`https://bilimge.kz/admins/api/Oner_SuccessApi/${getId}/`,
                {
                      fullname: values.fullname,
                      // classl: values.class_id,
                      student_success: values.student_success,
                      photo: photo
                    }, {
                  headers:headers,
                })
            .then((res) => {
              if (res) {
                if (res) {
                  dispatch(getSchoolOnerThunk());
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
    if (onerid && getId) {
      formik.resetForm({
        values: {
          fullname: onerid.fullname || "",
          student_success: onerid.student_success || "",
          // class_id: onerid.classl || "",
        },
      });
      fetchAndSetPhoto(onerid.photo);

    }
  }, [onerid, getId]);
  async function fetchAndSetPhoto(photoUrl?: string) {
    const phot = await urlToFile(photoUrl);
    setPhoto(phot);
  }

  function onDelete() {
    formik.resetForm({
      values: {
        fullname: "",
        student_success: "",
        // class_id: "",
      },
    });
    setPhoto(null);
    setPhotoId(null);
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
                        <p>{photo.name}</p>
                      </div>
                      <div className="file-actions">
                        <MdClear onClick={() => setPhoto(null)}/>
                      </div>
                    </div>
                ) : (
                    <Input type="file" name="file" onChange={(event) => {
                      return setPhoto(event?.target?.files?.[0]);
                    }} />
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
                    type="button"
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

export default PrideSchoolTableBlock2;
