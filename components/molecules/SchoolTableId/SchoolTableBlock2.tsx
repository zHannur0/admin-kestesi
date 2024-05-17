import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction, useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import {getTokenInLocalStorage, urlToFile} from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {getSchoolAdminThunk, getSchoolPhotosThunk, getSchoolSocialThunk} from "@/store/thunks/schoolnfo.thunk";
import { ISchoolPhotos } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDropzone} from 'react-dropzone'
import {MdClear} from "react-icons/md";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";


interface UpdateInputProps {
  name?: string;
  file: any;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  photosid?: ISchoolPhotos;
  getId?: number;
}

const SchoolTableBlock2: FC<IProps> = ({
  onReject,
  onEdit,
  photosid,
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
  const [photo, setPhoto] = useState<File | null>();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("slider_name", values.name);
      photo &&
      formData.append("slider_photo", photo);

      if (!getId) {
        await instance
            .post("https://bilimge.kz/admins/api/slider/", formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolPhotosThunk());
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
            .put(`https://bilimge.kz/admins/api/slider/${getId}/`, formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolPhotosThunk());
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
    }
  });

  useEffect(() => {
    async function fetchPhoto() {
      if (photosid && getId) {
        formik.resetForm({
          values: {
            name: photosid.slider_name || "",
          },
        });
      }

      const phot = await urlToFile(photosid?.slider_photo);
      setPhoto(phot);
    }

    fetchPhoto();
  }, [photosid, getId]);



  function onDelete() {
    formik.resetForm({
      values: {
        name: "",
      },
    });
    setPhoto(null);
  }


  const onDrop = useCallback((acceptedFiles: any[])=> {
    setPhoto(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
      <>
        {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
        {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
        <div className="main_table-modal">
          <form onSubmit={formik.handleSubmit}>
            <div className="main_table-modal_title">{t.photos.photoTitle}</div>
            <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
              <div className="main_table-modal_forms">
                <div className="forms">
                  <div className="login_forms-label_pink">{t.photos.photoTitle}</div>
                  {formik.touched.name && formik.errors.name ? (
                      <div style={{color: "red"}}>{formik.errors.name}</div>
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
                  <div className="login_forms-label_pink">{t.schoolAdministration.fields.photo} *</div>
                  <div {...getRootProps()} style={{
                    border: '2px dashed #ccc', /* Штрихованный бордер */
                    padding: '20px', /* Паддинг внутри div */
                    borderRadius: '5px', /* Скругленные углы */
                    textAlign: 'center', /* Текст по центру */
                    marginBottom: '20px', /* Отступ снизу */
                    backgroundColor: "white",
                  }}>
                    <input {...getInputProps()}/>
                    {
                      isDragActive ?
                          <p>{t.photos.dropFilesHere}</p> : /* Предполагая наличие такого ключа */
                          <p>{t.photos.dragAndDropOrClick}</p> /* Предполагая наличие такого ключа */
                    }
                  </div>
                  {photo && <div className="file-item">
                    <div className="file-info">
                      <p>{photo?.name}</p>
                    </div>
                    <div className="file-actions">
                      <MdClear onClick={() => {
                        setPhoto(null)
                      }}/>
                    </div>
                  </div>
                  }
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
                  onClick={onDelete}
                  type="button"
              >
                {t.generalActions.delete}
              </Button>
              <Button
                  background="#27AE60"
                  style={{width: "auto"}}
                  type="submit"
              >
                {t.generalActions.save}
              </Button>
            </div>
          </form>
        </div>
      </>

  );
};

export default SchoolTableBlock2;
