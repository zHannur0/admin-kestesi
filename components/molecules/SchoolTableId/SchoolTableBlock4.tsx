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
import TypeModal from "../../modals/TypeModal";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {getSchoolAdminThunk, getSchoolSocialThunk} from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ISchoolSocialMedia } from "@/types/assets.type";
import SanatyModalModal from "@/components/modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  socialid?: ISchoolSocialMedia;
  getId?: number;
}

const SchoolTableBlock4: FC<IProps> = ({
  onReject,
  socialid,
  getId,
  onEdit,
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
      type: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required(""),
      type: Yup.string().required(""),
    }),
    onSubmit: async (values) => {
      if (!getId) {
        await instance
            .post(
                "https://bilimge.kz/admins/api/School_SocialMediaApi/",
                {
                  account_name: values.name,
                  type: values.type,
                },
                {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                  },
                },
            )
            .then((res) => {
              if (res) {
                dispatch(getSchoolSocialThunk());
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
                `https://bilimge.kz/admins/api/School_SocialMediaApi/${getId}/`,
                {
                  account_name: values.name,
                  type: values.type,
                },
                {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                  },
                },
            )
            .then((res) => {
              if (res) {
                dispatch(getSchoolSocialThunk());
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
    if (socialid && getId) {
      formik.resetForm({
        values: {
          name: socialid.account_name || "",
          type: socialid.type || "",
        },
      });
    }
  }, [socialid, getId]);


  function onDelete() {
    formik.resetForm({
      values: {
        name: "",
        type: ""
      },
    });
  }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}

      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload sanaty">
              <div className="login_forms-label_pink">{t.socialMedia.fields.type}</div>
              <Select {...formik.getFieldProps("type")}>
                <option value="">{t.socialMedia.fields.selectType}</option>
                <option value={"website"}>
                  Site
                </option>
                <option value={"instagram"}>
                  Instagram
                </option>
                <option value={"facebook"}>
                  Facebook
                </option>
                <option value={"youtube"}>
                  Youtube
                </option>
              </Select>
            </div>

            <div className="main_table-modal_forms">
            {/*<div className="forms">*/}
              {/*  <div className="login_forms-label_pink">URL</div>*/}

              {/*  {formik.touched.url && formik.errors.url ? (*/}
              {/*      <div style={{color: "red"}}>{formik.errors.url}</div>*/}
              {/*  ) : null}*/}
              {/*  <Input*/}
              {/*      name={"url"}*/}
              {/*      onChange={formik.handleChange}*/}
              {/*      onBlur={formik.handleBlur}*/}
              {/*      value={formik.values.url}*/}
              {/*      style={{*/}
              {/*        borderColor:*/}
              {/*            formik.touched.url && formik.errors.url*/}
              {/*                ? "red"*/}
              {/*                : "#c1bbeb",*/}
              {/*      }}*/}
              {/*  />*/}
              {/*</div>*/}

              <div className="forms">
                <div className="login_forms-label_pink">{t.socialMedia.fields.link}</div>

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

              <div
                  className="flex"
                  style={{justifyContent: "flex-end", gap: "1.6rem"}}
              >
                <Button
                    background="#CACACA"
                    color="#645C5C"
                    style={{width: "auto"}}
                    type="button"
                    onClick={() =>
                        getId ? onEdit && onEdit(false) : onReject && onReject(false)
                    }
                >
                  {t.socialMedia.actions.delete}
                </Button>
                <Button
                    background="#27AE60"
                    style={{width: "auto"}}
                    type="submit"
                >
                  {t.socialMedia.actions.save}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
);
};

export default SchoolTableBlock4;
