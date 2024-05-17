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
import { getSchoolAdminThunk } from "@/store/thunks/schoolnfo.thunk";
import {getTokenInLocalStorage, urlToFile} from "@/utils/assets.utils";
import { ISchoolAdmin } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getSchoolSportThunk} from "@/store/thunks/pride.thunk";
import {MdClear} from "react-icons/md";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  adminid?: ISchoolAdmin;
  getId?: number;
}

const SchoolTableBlock1: FC<IProps> = ({
  onReject,
  onEdit,
  adminid,
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
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;

  const formik = useFormik({
    initialValues: {
      name: "",
      prof: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательно*"),
      prof: Yup.string().required("Обязательно*"),
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
            .post("https://bilimge.kz/admins/api/school_administration/", {
              administrator_name: values.name,
              position: values.prof,
              administator_photo: photo
            }, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolAdminThunk());
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
            .put(`https://bilimge.kz/admins/api/school_administration/${getId}/`, {
              administrator_name: values.name,
              position: values.prof,
              administator_photo: photo
            }, {
              headers: headers,
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolAdminThunk());
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


  useEffect(() => {
    if (adminid && getId) {
      formik.resetForm({
        values: {
          name: adminid.administrator_name || "",
          prof: adminid.position || "",
        },
      });
      fetchAndSetPhoto(adminid.administator_photo);
    }
  }, [adminid, getId]);

  async function fetchAndSetPhoto(photoUrl?: string) {
    const phot = await urlToFile(photoUrl);
    setPhoto(phot);
  }



  function onDelete() {
    formik.resetForm({
      values: {
        name: "",
        prof: "",
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
            <div className="main_table-modal_title">{t.schoolAdministration.fields.position}</div>
            <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
              <div className="main_table-modal_upload">
                <div className="login_forms-label_pink">{t.schoolAdministration.fields.photo} *</div>
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

              <div className="main_table-modal_forms">
                <div className="forms">
                  <div className="login_forms-label_pink">{t.schoolAdministration.fields.fullName} *</div>
                  {formik.touched.name && formik.errors.name ? (
                      <div style={{color: "red"}}>{formik.errors.name}</div>
                  ) : null}
                  <Input
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      style={{
                        borderColor: formik.touched.name && formik.errors.name ? "red" : "#c1bbeb",
                      }}
                  />
                </div>

                <div className="forms">
                  <div className="login_forms-label_pink">{t.schoolAdministration.fields.position}</div>
                  {formik.touched.prof && formik.errors.prof ? (
                      <div style={{color: "red"}}>{formik.errors.prof}</div>
                  ) : null}
                  <Input
                      name="prof"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.prof}
                      style={{
                        borderColor: formik.touched.prof && formik.errors.prof ? "red" : "#c1bbeb",
                      }}
                  />
                </div>

                <div
                    className="flex"
                    style={{justifyContent: "flex-end", gap: "1.6rem"}}
                >
                  <Button
                      background="#CACACA"
                      color="#645C5C"
                      style={{width: "auto"}}
                      type="button"
                      onClick={onDelete}
                  >
                    {t.schoolAdministration.actions.delete}
                  </Button>
                  <Button
                      background="#27AE60"
                      style={{width: "auto"}}
                      type="submit"
                  >
                    {t.schoolAdministration.actions.save}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>

  );
};

export default SchoolTableBlock1;
