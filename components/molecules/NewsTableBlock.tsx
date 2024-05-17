import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction, useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import {Input, Select, TextArea} from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {getTokenInLocalStorage, urlToFile} from "@/utils/assets.utils";
import { getNewsThunk } from "@/store/thunks/pride.thunk";
import { INews } from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getMenuThunk} from "@/store/thunks/schoolnfo.thunk";
import {useDropzone} from 'react-dropzone'
import news from "@/pages/news";
import { MdClear } from "react-icons/md";
import {log} from "console";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface UpdateInputProps {
  text?: string;
  date?: string;
  file?: any;
}

interface IProps {
  onEdit?: Dispatch<SetStateAction<boolean>>;
  onReject?: Dispatch<SetStateAction<boolean>>;
  newsid?: INews;
  getId?: number;
}


const NewsTableBlock: FC<IProps> = ({ onEdit, onReject, newsid, getId }) => {
  const dispatch = useAppDispatch();
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({});
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



  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: any[])=> {
    if (files.length >= 10) {
      return;
    } else {
      const newFilesToAdd = acceptedFiles.slice(0, 10 - files.length);
      const updatedFiles: File[] = [...files, ...newFilesToAdd];
      setFiles(updatedFiles);

    }
  }, [files])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const formik = useFormik({
    initialValues: {
      text: "",
      date: "",
      type: "",
    },
    validationSchema: Yup.object({

    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("type", values.type.toLowerCase());
      formData.append("text", values.text);
      values.type !== "facebook" && formData.append("date", values.date);
      if(files && values.type !== "facebook") {
        for (let i = 1; i <= 10; i++) {
          if(files[i-1]) {
            console.log(i)
            formData.append(`img${i}`, files[i-1]);
          }else {
            formData.append(`img${i}`, "");
          }
        }
      }


      if (!getId) {
        await instance
            .post("https://bilimge.kz/admins/api/newsApi/", formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getNewsThunk());
                showSuccess();
                onDelete();
              }
            })
            .catch((err) => showError());
      } else {
        await instance
            .put(
                `https://bilimge.kz/admins/api/newsApi/${getId}/`,
                formData,
                {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                    "Content-Type": "multipart/form-data",
                  },
                },
            )
            .then((res) => {
              if (res) {
                dispatch(getNewsThunk());
                showSuccess();
              }
            })
            .catch((err) => showError());
      }
    }
  });

  useEffect(() => {
    if (newsid  && getId) {
      formik.resetForm({
        values: {
          text: newsid.text || "",
          date: newsid.date || "",
          type: newsid.type || "",
        },
      });
      updateFilesWithImages(newsid);
    }
  }, [newsid, getId]);

  // function getFilenameFromUrl(url: string): string {
  //   const lastSlashIndex = url.lastIndexOf("/") + 1;
  //   const lastUnderscoreIndex = url.lastIndexOf("_");
  //   const extensionIndex = url.lastIndexOf(".");
  //   const namePart = url.substring(lastSlashIndex, lastUnderscoreIndex);
  //   const extension = url.substring(extensionIndex);
  //
  //   return `${namePart}${extension}`;
  // }
  //
  // async function urlToFile(url: string, mimeType: string): Promise<File> {
  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   const filename = getFilenameFromUrl(url);
  //   return new File([blob], filename, { type: mimeType });
  // }

  async function updateFilesWithImages(newsid: any) {
    const filePromises: Promise<File | null>[] = [
      newsid.img1,
      newsid.img2,
      newsid.img3,
      newsid.img4,
      newsid.img5,
      newsid.img6,
      newsid.img7,
      newsid.img8,
      newsid.img9,
      newsid.img10,
    ]
        .filter(Boolean)
        .map((url: string) => {
          return urlToFile(url); // Важно: используйте return для возвращения Promise<File>
        });

    const files: File[] = (await Promise.all(filePromises)).filter((file): file is File => file !== null);
    setFiles(files);
  }

  function onDelete() {
    formik.resetForm({
      values: {
        text: "",
        date: "",
        type: "",
      },
    });
    setFiles([]);
  }


  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload">
              <div style={{marginBottom: "2.4rem"}} className="sanaty">
                <div className="login_forms-label_pink">{t.news.type}</div>
                <Select {...formik.getFieldProps("type")}>
                  <option value="manual">{t.news.manual}</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>

                </Select>
              </div>
              {
                  formik.values.type !=="facebook" &&
                  <>
                    <div className="login_forms-label_pink">Фото</div>
                    <div {...getRootProps()} style={{
                      border: '2px dashed #ccc',
                      padding: '20px',
                      borderRadius: '5px',
                      textAlign: 'center',
                      marginBottom: '20px',
                      backgroundColor: "white",
                    }}>
                      <input {...getInputProps()}/>
                      <p>{t.clubs.clickInside}</p>
                    </div>

                    {files.length > 0 && (
                        <div className="file-list">
                          <div className="file-list__container">
                            {files.map((file, index) => (
                                <div className="file-item" key={index}>
                                  <div className="file-info">
                                    <p>{file.name.substring(0,14)}</p>
                                  </div>
                                  <div className="file-actions">
                                    <MdClear onClick={() => handleRemoveFile(index)} />
                                  </div>
                                </div>
                            ))}
                          </div>
                        </div>
                    )}
                  </>
              }

            </div>

            <div className="main_table-modal_forms">

              <div className="forms">
                {
                    formik.values.type !== "facebook" &&
                    <>
                      <div className="login_forms-label_pink">{t.news.dateFormat}</div>

                      {formik.touched.date && formik.errors.date ? (
                          <div style={{color: "red"}}>{formik.errors.date}</div>
                      ) : null}
                      <Input
                          name={"date"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.date}
                          style={{
                            borderColor:
                                formik.touched.date && formik.errors.date
                                    ? "red"
                                    : "#c1bbeb",
                          }}
                      />
                    </>
                }
                <div className="forms">
                  <div className="login_forms-label_pink">{t.news.text}</div>
                  {formik.touched.text && formik.errors.text ? (
                      <div style={{color: "red"}}>{formik.errors.text}</div>
                  ) : null}
                  <TextArea
                      name={"text"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.text}
                      style={{
                        borderColor:
                            formik.touched.text && formik.errors.text
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />

                  <div className="length">{formik.values.text?.length}/2000</div>

                </div>

                <div
                    className="flex"
                    style={{justifyContent: "flex-end", gap: "1.6rem"}}
                >
                  <Button
                      background="#CACACA"
                      color="#645C5C"
                      style={{width: "auto"}}
                      onClick={() =>
                          getId ? onEdit && onEdit(false) : onReject && onReject(false)
                      }
                      type="button"
                  >
                    {t.news.delete}
                  </Button>
                  <Button
                      background="#27AE60"
                      style={{width: "auto"}}
                      type="submit"
                  >
                    {t.news.save}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
);
};

export default NewsTableBlock;
