import { useModalLogic } from "@/hooks/useModalLogic";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getIASchoolThunk } from "@/store/thunks/available.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import {
  getSchoolIdThunk,
  getSchoolThunk,
  getUsersThunk,
} from "@/store/thunks/schoolnfo.thunk";
import SuccessModal from "@/components/modals/SuccessModal";
import ErrorModal from "@/components/modals/ErrorModal";
import { IUsers } from "@/types/assets.type";
import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
// import Select from "react-select";

interface UpdateInputProps {
  username?: string;
  password?: string;
  email?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  usersid?: IUsers;
  getId?: number;
}

const AdministratorTableBlock: FC<IProps> = ({
  onReject,
  getId,
  usersid,
  onEdit,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const school = useTypedSelector((state) => state.ia.iaschool);
  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  const [schoolId, setId] = useState(getId ? usersid?.school : 8946542);

  useEffect(() => {
    dispatch(getIASchoolThunk());
  }, [dispatch]);

  const handleChangeSchool = (event: SelectChangeEvent) => {
    setId(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      // email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательно*"),
      // email: Yup.string().email().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      if (!getId) {
        await instance
          .post(
            "https://www.bilimge.kz/admins/api/users/",
            {
              // email: values.email,
              username: values.username,
              password: values.password,
              school: schoolId,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              showSuccess();
              dispatch(getUsersThunk());
              formik.resetForm({
                values: {
                  username: "",
                  // email: "",
                  password: "",
                },
              });
              setId(89846546321);
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
            `https://www.bilimge.kz/admins/api/users/${getId}/`,
            {
              // email: values.email,
              username: values.username,
              school: schoolId,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              showSuccess();
              dispatch(getUsersThunk());
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
    if (usersid && getId) {
      formik.resetForm({
        values: {
          username: usersid.username || "",
          // email: usersid.email || "",
          password: "12345678",
        },
      });
      setId(usersid.school);
    }
  }, [schoolId, usersid]);

  function onDelete() {
    formik.resetForm({
      values: {
        username: "",
        // email: "",
        password: "12345678",
      },
    });
  }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="main_table-modal">
          <div className="main_table-modal_title">{t.superadmin.administrators}</div>
          <div>
            <div className="main_table-modal_forms" style={{ width: "100%" }}>
              <div className="forms flex" style={{ gap: "1.6rem" }}>
                <div style={{ width: "75%" }}>
                  <div className="login_forms-label_pink">Username *</div>
                  {formik.touched.username && formik.errors.username ? (
                    <div style={{ color: "red" }}>{formik.errors.username}</div>
                  ) : null}
                  <Input
                    name={"username"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    style={{
                      borderColor:
                        formik.touched.username && formik.errors.username
                          ? "red"
                          : "#c1bbeb",
                    }}
                  />
                </div>

                {/*<div style={{ width: "75%" }}>*/}
                {/*  <div className="login_forms-label_pink">Email *</div>*/}
                {/*  {formik.touched.email && formik.errors.email ? (*/}
                {/*    <div style={{ color: "red" }}>{formik.errors.email}</div>*/}
                {/*  ) : null}*/}
                {/*  <Input*/}
                {/*    name={"email"}*/}
                {/*    onChange={formik.handleChange}*/}
                {/*    onBlur={formik.handleBlur}*/}
                {/*    value={formik.values.email}*/}
                {/*    style={{*/}
                {/*      borderColor:*/}
                {/*        formik.touched.email && formik.errors.email*/}
                {/*          ? "red"*/}
                {/*          : "#c1bbeb",*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</div>*/}

                {getId ? (
                  <div></div>
                ) : (
                  <div>
                    <div className="login_forms-label_pink">{t.superadmin.password}</div>
                    {formik.touched.password && formik.errors.password ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.password}
                      </div>
                    ) : null}
                    <Input
                      name={"password"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      style={{
                        borderColor:
                          formik.touched.password && formik.errors.password
                            ? "red"
                            : "#c1bbeb",
                      }}
                    />
                  </div>
                )}
              </div>

              {schoolId && (
                <FormControl sx={{ width: "35%" }}>
                  <div className="login_forms-label_pink">{t.superadmin.schoolSelection}</div>
                  <Select
                    id="demo-simple-select"
                    value={schoolId}
                    onChange={handleChangeSchool}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: "250px",
                        },
                      },
                    }}
                    sx={{
                      borderRadius: "5px",
                      border: "1px solid #c1bbeb",
                      fontSize: "1.2rem",
                      backgroundColor: "white",
                    }}
                  >
                    {school?.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        sx={{ fontSize: "1.4rem" }}
                      >
                        {item.school_kz_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
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
              onClick={() => onDelete()}
            >
              Удалить
            </Button>
            <Button
              background="#27AE60"
              style={{ width: "auto" }}
              type="submit"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdministratorTableBlock;
