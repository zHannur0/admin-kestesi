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
import {
  getTokenInLocalStorage,
  getWeekDayNumber,
  getWeekRussianDayString, urlToFile,
} from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getClassRoomThunk,
  getKruzhokInfoThunk,
  getKruzhokTeachersInfoThunk, getMenuThunk,
} from "@/store/thunks/schoolnfo.thunk";
import TypeModal from "../modals/TypeModal";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { BASE_URL } from "@/config/config";
import { IKruzhok } from "@/types/assets.type";
import {useFormik} from "formik";
import * as Yup from "yup";
import {array} from "yup";
import {useDropzone} from "react-dropzone";
import {MdClear} from "react-icons/md";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {useRouter} from "next/router";

interface IUpdateInput {
  name?: string;
  teacher?: string;
  goal?: string;
  times: Record<string, string>;
}

interface ITimeSlot {
  week_day: string;
  start_end_time: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  kruzhokid?: IKruzhok;
  getId?: number;
  onEdit?: Dispatch<SetStateAction<boolean>>;
}

const MainTableBlock: FC<IProps> = ({ onReject, kruzhokid, getId, onEdit }) => {
  const dispatch = useAppDispatch();
  const teachers = useTypedSelector((state) => state.system.teachers);
  const classroom = useTypedSelector((state) => state.system.classroom);
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [photoId, setPhotoId] = useState<string | null>()
  useEffect(() => {
    if (teachers) {
      dispatch(getKruzhokTeachersInfoThunk());
    }
    if(classroom) {
      dispatch(getClassRoomThunk());
    }
  }, [dispatch]);

  const handleGetTime = (id?: number, text?: string) => {
    if (setId && setShowActive) {
      setId(id);
      setShowActive(false);
      setText(text as string);
    }
  };

  const toDict = (arr?: any[], arr2?: any[]) => {
    let temp: { week_day: string; start_end_time: string; classroom: number | null}[] = [];
    if (Array.isArray(arr)) {
      arr.forEach((item, i) => {
        if(item)
        temp.push({week_day: String(i+1), start_end_time: String(item), classroom: Number(arr2?.[i]) || null});
      });
    }
    return temp;
  }



  const formik = useFormik({
    initialValues: {
      photo: null,
      name: '',
      teacher: '',
      goal: '',
        times: [
           '',
           '',
           '',
           '',
           '',
           '',
        ],
        classrooms: [
          '',
          '',
          '',
          '',
          '',
          '',
        ]
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t.clubs.writeClubName),

    }),
    onSubmit: async (values) => {
      if (!getId) {
              await instance
                .post(
                  "https://bilimge.kz/admins/api/kruzhok/",
                  {
                    kruzhok_name: values.name,
                    teacher: values.teacher,
                    purpose: values.goal,
                    lessons: toDict(values.times, values.classrooms),
                  },
                  {
                    headers: {
                      Authorization: `Token ${getTokenInLocalStorage()}`,
                    },
                  },
                )
                .then(async (res) => {
                  if (res) {
                    const formData = new FormData();

                    formData.append("photo", photo ? photo : "");
                    formData.append("id", String((res as any).id));

                    try {
                      const uploadPhotoResponse = await instance.post(
                        "https://bilimge.kz/admins/api/kruzhok/upload_photo/",
                        formData,
                        {
                          headers: {
                            Authorization: `Token ${getTokenInLocalStorage()}`,
                            "Content-Type": "multipart/form-data",
                          },
                        },
                      );

                      if (uploadPhotoResponse) {
                        dispatch(getKruzhokInfoThunk());
                        onDelete();
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }
                })
                .catch((err) => console.log(err));
            }
            else {
              await instance
                .put(`https://bilimge.kz/admins/api/kruzhok/${getId}/`,
                    {
                      kruzhok_name: values.name,
                      teacher: values.teacher,
                      purpose: values.goal,
                      lessons: toDict(values.times, values.classrooms),
                    },
                    {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                  },
                })
                .then(async (res) => {
                  if (res) {
                      const formData = new FormData();
                      if(photo)
                      formData.append("photo", photo ? photo : "");
                      formData.append("id", String((res as any).id));
                      try {
                        const uploadPhotoResponse = await instance.put(
                            "https://bilimge.kz/admins/api/kruzhok/upload_photo/",
                            formData,
                            {
                              headers: {
                                Authorization: `Token ${getTokenInLocalStorage()}`,
                                "Content-Type": "multipart/form-data",
                              },
                            },
                        );

                        if (uploadPhotoResponse) {
                          dispatch(getKruzhokInfoThunk());
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }
                    dispatch(getKruzhokInfoThunk());
                })
                .catch((e) => {
                  console.log(e);
                });
            }
    },
  });


  const setTime = (arr?: any[]) => {
    let temp = [];
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        temp[parseInt(String(item.week_day - 1))] = item.start_end_time;
      });
    }
    for(let i = 0; i  < 6; i++) {
      if(!temp[i]) {
        temp[i] = '';
      }
    }
    return temp;
  }

  const setClassroom = (arr?: any[]) => {
    let temp = [];
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        temp[parseInt(String(item.week_day - 1))] = item.classroom;
      });
    }
    for(let i = 0; i  < 6; i++) {
      if(!temp[i]) {
        temp[i] = '';
      }
    }
    return temp;
  }




  useEffect(() => {
    if (kruzhokid && getId) {
      formik.resetForm({
        values: {
          photo: null,
          name: kruzhokid.kruzhok_name || '',
          teacher: kruzhokid.teacher?.id || '',
          goal: kruzhokid.purpose || '',
          times: setTime(kruzhokid.lessons),
          classrooms: setClassroom(kruzhokid.lessons)
        },
      });
      fetchAndSetPhoto(kruzhokid.photo);
    }
  }, [kruzhokid, getId]);
  async function fetchAndSetPhoto(photoUrl?: string) {
    const phot = await urlToFile(photoUrl);
    setPhoto(phot);
  }

  function onDelete() {
    formik.resetForm({
      values: {
        photo: null,
        name: '',
        teacher: '',
        goal: '',
        times: [
          '',
          '',
          '',
          '',
          '',
          '',
        ],
        classrooms: [
          '',
          '',
          '',
          '',
          '',
          '',
        ]
      },
    });
  }

  const [photo, setPhoto] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: any[])=> {
    setPhoto(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})



  return (
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_title">{t.clubs.name}</div>

          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload">
              <div className="login_forms-label_pink">Фото *</div>
              <div {...getRootProps()} style={{
                border: '2px dashed #ccc', /* Штрихованный бордер */
                padding: '20px', /* Паддинг внутри div */
                borderRadius: '5px', /* Скругленные углы */
                textAlign: 'center', /* Текст по центру */
                marginBottom: '20px', /* Отступ снизу */
                backgroundColor: "white",
              }}>
                <input {...getInputProps()} />
                     <p>{t.clubs.clickInside}</p>
              </div>
              {photo && <div className="file-item">
                <div className="file-info">
                  <p>{photo?.name.substring(0, 14)}</p>
                </div>
                <div className="file-actions">
                  <MdClear onClick={() => {
                    setPhoto(null)
                    formik.setFieldValue("photo", null);
                  }}/>
                </div>
              </div>
              }
            </div>

            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">{t.clubs.clubName}</div>

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
                <div className="login_forms-label_pink">{t.clubs.teacherFullName}</div>
                <Select {...formik.getFieldProps("teacher")}>
                  <option value="">{t.clubs.selectTeacher}</option>
                  {teachers?.slice().sort((a, b) => {
                    const nameA = a.full_name || '';
                    const nameB = b.full_name || '';

                    return nameA.localeCompare(nameB);
                  })
                      .map((item) => (
                      <option key={item.id} value={item.id}>{item.full_name}</option>
                  ))}
                </Select>
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">{t.clubs.goal}</div>

                {formik.touched.goal && formik.errors.goal ? (
                    <div style={{color: "red"}}>{formik.errors.goal}</div>
                ) : null}
                <TextArea
                    name={"goal"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.goal}
                    style={{
                      borderColor:
                          formik.touched.goal && formik.errors.goal
                              ? "red"
                              : "#c1bbeb",
                    }}
                />

                <div className="length">{formik.values.goal?.length}/2000</div>
              </div>
              <div className="login_forms-label_pink">{t.clubs.date}</div>
              <div className="forms flex-between">
                  <div>
                    {formik.values.times.map((time, index) => (
                        <div key={index}>
                          <div className="flex-grid">
                            <label htmlFor={`times.${index}`}
                                   className="login_forms-label_pink">{router.locale === "kz" ? weekDayKz[index] : weekDay[index]}</label>
                            <Input
                                id={`times.${index}`}
                                name={`times.${index}`}
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={time}
                                style={{
                                  borderColor: formik.touched.times && formik.errors.times && formik.errors.times[index] ? "red" : "#c1bbeb",
                                }}
                            />
                          </div>
                          <div className="flex-grid">
                            <label htmlFor={`times.${index}`}
                                   className="login_forms-label_pink">Кабинет</label>
                            <Select {...formik.getFieldProps(`classrooms[${index}]`)}>
                              <option value="">{t.clubs.selectRoom}</option>
                              {classroom?.map((item) => (
                                  <option key={item.id} value={item.id}>{item.classroom_name}/{item.classroom_number}</option>
                              ))}
                            </Select>
                          </div>
                        </div>
                    ))}
                  </div>
              </div>

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
                  {t.clubs.delete}
                </Button>
                <Button
                    background="#27AE60"
                    style={{width: "auto"}}
                    type={"submit"}
                >
                  {t.clubs.save}

                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
};

const weekDay = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const weekDayKz = ["Дүйсенбі","Сейсенбі","Сәрсенбі","Бейсенбі","Жұма","Сенбі","Жексенбі"]
export default MainTableBlock;
