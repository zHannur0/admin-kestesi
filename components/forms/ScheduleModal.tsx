import { FC, use, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import {Input, Select} from "../atoms/UI/Inputs/Input";
import { Modal, ModalContent, ModalInner } from "../atoms/UI/Modal/Modal";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  getDopScheduleThunk,
  getIAClassRoomThunk,
  getIAClassThunk,
  getIARingThunk,
  getIASchoolThunk,
  getIASubjectThunk,
  getIATypeZThunk,
  getScheduleThunk,
} from "@/store/thunks/available.thunk";
import SanatyModalModal from "../modals/SanatyModal";
import {getKruzhokTeachersInfoThunk, getMapThunk} from "@/store/thunks/schoolnfo.thunk";
import { useRouter } from "next/router";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage, getWeekDayNumber } from "@/utils/assets.utils";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getNewsThunk} from "@/store/thunks/pride.thunk";
import {XIcon} from "@/components/atoms/Icons";
import {is} from "immutable";
import {useModalLogic} from "@/hooks/useModalLogic";
import DeleteModal from "@/components/modals/DeleteModal";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IProps {
  onReject?: () => void;
  selectedCell?: any;
  classnames?: string;
  isOsnova?:boolean;
}

const ScheduleModal: FC<IProps> = ({ onReject, selectedCell, classnames, isOsnova }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const iaschool = useTypedSelector((state) => state.ia.iaschool);
  const iaclass = useTypedSelector((state) => state.ia.iaclass);
  const iaclassrooms = useTypedSelector((state) => state.ia.iaclassrooms);
  const iatypez = useTypedSelector((state) => state.ia.iatypez);
  const iaring = useTypedSelector((state) => state.ia.iaring);
  const iasubject = useTypedSelector((state) => state.ia.iasubject);
  const teachers = useTypedSelector((state) => state.system.teachers);
  const [scheduleId, setScheduleId] = useState<any>();
  const {
    showDeleteModal,
    onDeleteModalClose,
    showDelete,
  } = useModalLogic();

  useEffect(() => {
    if (
      iaschool &&
      iaclass &&
      iaclassrooms &&
      iatypez &&
      iaring &&
      iasubject &&
      teachers
    ) {
      dispatch(getIASchoolThunk());
      dispatch(getIAClassRoomThunk());
      dispatch(
        getIAClassThunk(
          decodeURIComponent(router.asPath?.split("/")?.at(-1) as string),
        ),
      );
      dispatch(getIATypeZThunk());
      dispatch(getIASubjectThunk());
      dispatch(getKruzhokTeachersInfoThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    const url = isOsnova ? `https://bilimge.kz/admins/api/schedule/?week_day=${selectedCell.day_index}&ring=${selectedCell.timeId}&classl=${iaclass?.[0]?.id}` :
        `https://bilimge.kz/admins/api/DopUrokApi/?week_day=${selectedCell.day_index}&ring=${selectedCell.timeId}&classl=${iaclass?.[0]?.id}`
    const fetchSchedule = async () => {
      try {
        const response = await instance.get(
            url,
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            }
        );

        if (response) {
          setScheduleId(response);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (iaclass)
    fetchSchedule();
  }, [selectedCell,iaclass]);
  const formik = useFormik({
    initialValues: {
      subject: '',
      teacher: '',
      classroom: '',
      subject2: '',
      teacher2: '',
      classroom2: '',
      typez: '',
    },
    validationSchema: Yup.object({

    }),
    onSubmit: async (values) => {
      const urlPost = isOsnova ? "https://bilimge.kz/admins/api/schedule/" : "https://bilimge.kz/admins/api/DopUrokApi/";
      if(!scheduleId?.[0]) {
        await instance
            .post(
                urlPost,
                {
                  week_day: getWeekDayNumber(selectedCell.day),
                  teacher: values.teacher,
                  teacher2: values.teacher2,
                  ring: selectedCell.timeId,
                  classl: iaclass && iaclass[0]?.id,
                  subject: values.subject,
                  subject2: values.subject2,
                  classroom: values.classroom,
                  classroom2: values.classroom2,
                  typez: values.typez,
                },
                {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                  },
                },
            )
            .then((res) => {
              if (res && onReject) {
                dispatch(getScheduleThunk());
                dispatch(getDopScheduleThunk());
                onReject();
              }
            })
            .catch((err) => console.log(err));
      }else {
        await instance
            .put(
                `${urlPost}${scheduleId[0].id}/`,
                {
                  week_day: getWeekDayNumber(selectedCell.day),
                  teacher: Number(values.teacher),
                  teacher2: values.teacher2,
                  ring: selectedCell.timeId,
                  classl: iaclass && iaclass[0]?.id,
                  subject: values.subject,
                  subject2: values.subject2,
                  classroom: values.classroom,
                  classroom2: values.classroom2,
                  typez: values.typez,
                },
                {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                  },
                },
            )
            .then((res) => {
              if (res && onReject) {
                dispatch(getScheduleThunk());
                dispatch(getDopScheduleThunk());
                onReject();
              }
            })
            .catch((err) => console.log(err));
      }
    }
  });

  useEffect(() => {
    if (scheduleId?.[0]) {
      formik.resetForm({
        values: {
          subject: scheduleId[0].subject?.id || '',
          teacher: scheduleId[0].teacher?.id || '',
          classroom: scheduleId[0].classroom?.id || '',
          subject2: scheduleId[0].subject2?.id || '',
          teacher2: scheduleId[0].teacher2?.id || '',
          classroom2: scheduleId[0].classroom2?.id || '',
          typez: scheduleId[0].typez?.id || '',
        },
      });
    }
  }, [scheduleId]);

  function onDelete() {
    formik.resetForm({
      values: {
        subject: '',
        teacher: '',
        classroom: '',
        subject2: '',
        teacher2: '',
        classroom2: '',
        typez: '',
      },
    });
  }

  const handleDelete = async () => {
    const urlPost = isOsnova ? "https://bilimge.kz/admins/api/schedule/" : "https://bilimge.kz/admins/api/DopUrokApi/";
    await instance
        .delete(`${urlPost}${scheduleId[0].id}/`, {
          headers: {
            Authorization: `Token ${getTokenInLocalStorage()}`,
          },
        })
        .then((res) => {
          console.log("Good")
        })
        .catch((e) => console.log(e));
    dispatch(getMapThunk());
    onDeleteModalClose();
    onReject && onReject();
    dispatch(getScheduleThunk());
    dispatch(getDopScheduleThunk());
  };

  return (
    <>
      {showDeleteModal && <DeleteModal onClose = {onDeleteModalClose} handleDelete={handleDelete}/>}
      <Modal>
        <ModalInner>
          <ModalContent>
            <form onSubmit={formik.handleSubmit}>
              <div  style={{display: "flex", justifyContent: "end"}}>
                <div onClick={() => onReject && onReject()}>
                  <XIcon />
                </div>
              </div>
              <div className="modal_header">
                {t.schedule.schedule}
              </div>
              <div className="modal_body">
                <div className="forms flex-grid">
                  <div>{t.schedule.dayOfWeek}:</div>
                  <span>{selectedCell.day}</span>
                </div>

                <div className="forms flex-grid">
                  <div>{t.schedule.class}:</div>
                  <span>{classnames?.split("")?.join(" ")}</span>
                </div>

                <div className="forms flex-grid">
                  <div>{t.schedule.time}:</div>
                  <span>
                  {selectedCell.start_time}-{selectedCell.end_time}
                </span>
                </div>

                <div className="forms flex-grid">
                  <div>{t.schedule.subject}:</div>
                  <div className="sanaty">
                    <Select {...formik.getFieldProps("subject")}>
                      <option value="">Выберите предмет</option>
                      {iasubject && iasubject.slice().sort((a, b) => {
                        const nameA = a.full_name || '';
                        const nameB = b.full_name || '';

                        return nameA.localeCompare(nameB);
                      }).map((item, index) => (
                          <option key={index} value={item.id}>{item.full_name}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="forms flex-grid">
                  <div>{t.schedule.teacher}:</div>
                  <div className="sanaty">
                    <Select {...formik.getFieldProps("teacher")}>
                      <option value="">Выберите преподавателя</option>
                      {teachers && teachers.slice().sort((a, b) => {
                        const nameA = a.full_name || '';
                        const nameB = b.full_name || '';

                        return nameA.localeCompare(nameB);
                      }).map((item, index) => (
                          <option key={index} value={item.id}>{item.full_name}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="forms flex-grid">
                  <div>Кабинет:</div>
                  <div className="sanaty">
                    <Select {...formik.getFieldProps("classroom")}>
                      <option value="">Выберите кабинет</option>
                      {iaclassrooms?.slice().sort((a, b) => {
                        const flatA = a.flat ?? 0;
                        const flatB = b.flat ?? 0;

                        if (flatA !== flatB) {
                          return flatA - flatB;
                        }

                        const numberA = a.classroom_number?.toString() ?? "";
                        const numberB = b.classroom_number?.toString() ?? "";

                        const isANumber = !isNaN(Number(a.classroom_number));
                        const isBNumber = !isNaN(Number(b.classroom_number));

                        if (isANumber && isBNumber) {
                          return parseInt(numberA, 10) - parseInt(numberB, 10);
                        }

                        if (!isANumber && isBNumber) {
                          return -1;
                        }
                        if (isANumber && !isBNumber) {
                          return 1;
                        }

                        return numberA.localeCompare(numberB);
                      })
                      .map((item, index) => (
                          <option key={index} value={item.id}>{item.classroom_name}/{item.classroom_number}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="forms flex-grid">
                  <div>{t.schedule.subject} 2:</div>
                  <div className="sanaty">
                    <Select {...formik.getFieldProps("subject2")}>
                      <option value="">Выберите предмет</option>
                      {iasubject && iasubject.slice().sort((a, b) => {
                        const nameA = a.full_name || '';
                        const nameB = b.full_name || '';

                        return nameA.localeCompare(nameB);
                      }).map((item, index) => (
                          <option key={index} value={item.id}>{item.full_name}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="forms flex-grid">
                  <div>{t.schedule.teacher} 2:</div>
                  <div className="sanaty">
                    <Select {...formik.getFieldProps("teacher2")}>
                      <option value="">Выберите преподавателя</option>
                      {teachers && teachers.slice().sort((a, b) => {
                        const nameA = a.full_name || '';
                        const nameB = b.full_name || '';

                        return nameA.localeCompare(nameB);
                      }).map((item, index) => (
                          <option key={index} value={item.id}>{item.full_name}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="forms flex-grid">
                  <div>Кабинет 2:</div>
                  <div className="sanaty">
                    <Select {...formik.getFieldProps("classroom2")}>
                      <option value="">Выберите кабинет</option>
                      {iaclassrooms?.slice().sort((a, b) => {
                        const flatA = a.flat ?? 0;
                        const flatB = b.flat ?? 0;

                        if (flatA !== flatB) {
                          return flatA - flatB;
                        }

                        const numberA = a.classroom_number?.toString() ?? "";
                        const numberB = b.classroom_number?.toString() ?? "";

                        const isANumber = !isNaN(Number(a.classroom_number));
                        const isBNumber = !isNaN(Number(b.classroom_number));

                        if (isANumber && isBNumber) {
                          return parseInt(numberA, 10) - parseInt(numberB, 10);
                        }

                        if (!isANumber && isBNumber) {
                          return -1;
                        }
                        if (isANumber && !isBNumber) {
                          return 1;
                        }

                        return numberA.localeCompare(numberB);
                      })
                      .map((item, index) => (
                          <option key={index} value={item.id}>{item.classroom_name}/{item.classroom_number}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="forms flex-grid">
                  <div>{t.schedule.lessonType}:</div>
                  <div className="sanaty">
                    <Select {...formik.getFieldProps("typez")}>
                      <option value="">Выберите тип занятий</option>
                      {iatypez?.map((item, index) => (
                          <option key={index} value={item.id}>{item.type_full_name}</option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="modal_footer">
                <Button
                    background="#CACACA"
                    radius="14px"
                    color="#645C5C"
                    style={{width: "auto"}}
                    type="button"
                    onClick={showDelete}
                >
                  {t.schedule.delete}
                </Button>
                <Button
                    background="#27AE60"
                    radius="14px"
                    style={{
                      width: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: ".8rem",
                    }}
                    type="submit"
                >
                  {t.bells.save}

                </Button>
              </div>
            </form>
          </ModalContent>
        </ModalInner>
      </Modal>
    </>
);
};

export default ScheduleModal;
