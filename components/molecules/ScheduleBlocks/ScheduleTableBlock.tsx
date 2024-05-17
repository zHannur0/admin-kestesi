import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {IClass} from "@/types/assets.type";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useModalLogic} from "@/hooks/useModalLogic";
import {useFormik} from "formik";
import * as Yup from "yup";
import {instance} from "@/api/axios.instance";
import {getTokenInLocalStorage} from "@/utils/assets.utils";
import {getLessonsThunk, getTeachersThunk} from "@/store/thunks/pride.thunk";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {Input, Select} from "@/components/atoms/UI/Inputs/Input";
import {Button} from "@/components/atoms/UI/Buttons/Button";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {
    getIAClassRoomThunk,
    getIAClassThunk,
    getIASchoolThunk,
    getIASubjectThunk,
    getIATypeZThunk
} from "@/store/thunks/available.thunk";
import {getKruzhokTeachersInfoThunk} from "@/store/thunks/schoolnfo.thunk";
import {AddIcons, ResetIcons} from "@/components/atoms/Icons";
import styled from "@emotion/styled";

interface IProps {
    onEdit?: Dispatch<SetStateAction<boolean>>;
    onReject?: Dispatch<SetStateAction<boolean>>;
    distributionId?: any;
    getId?: number;
}

const ScheduleTableBlock: FC<IProps> = ({
                                           onReject,
                                           distributionId,
                                           onEdit,
                                           getId,
                                       }) => {
    const dispatch = useAppDispatch();
    const [showActive, setShowActive] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [id, setId] = useState<number>();
    const iaclass = useTypedSelector((state) => state.ia.iaclass);
    const iasubject = useTypedSelector((state) => state.ia.iasubject);
    const teachers = useTypedSelector((state) => state.pride.teachers);

    useEffect(() => {
        if (
            iaclass &&
            iasubject &&
            teachers
        ) {
            dispatch(getIAClassThunk());
            dispatch(getTeachersThunk());
            dispatch(getIASubjectThunk());
        }
    }, [dispatch]);
    console.log(iaclass);
    console.log(iasubject);
    console.log(teachers);


    const {
        showSuccessModal,
        showErrorModal,
        onSuccessModalClose,
        onErrorModalClose,
        showSuccess,
        showError,
    } = useModalLogic();

    const reset = (isDelete: boolean, index: number) => {
        const teacher = formik.values.teacher;
        let classParam = formik.values.classParam;

        if(isDelete) {
            if(index !== 0)
            classParam = classParam.filter((_,i) => i!==index);
        }else {
            classParam.push({
                class: "",
                lesson: "",
                subgroup: "",
                lessonCount:"",
            })
        }

        formik.resetForm({
                values:
                    {
                        teacher: teacher,
                        classParam: classParam
                    }
            }
        )

    }


    const formik = useFormik({
        initialValues: {
            teacher: "",
            classParam: [
                {
                    class: "",
                    lesson: "",
                    subgroup: "",
                    lessonCount:"",
                }
            ]
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async (values) => {
            console.log(values)
        }
    });

    // useEffect(() => {
    //     if (lessonsid && getId) {
    //         formik.resetForm({
    //             values: {
    //                 name: lessonsid.full_name || "",
    //                 sanat: lessonsid.type || "",
    //             },
    //         });
    //     }
    // }, [lessonsid, getId]);

    function onDelete() {
        formik.resetForm({
            values: {
                teacher: "",
                classParam: [
                    {
                        class: "",
                        lesson: "",
                        subgroup: "",
                        lessonCount:"",
                    }
                ]
            },
        });
    }

    return (
        <>
            {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
            {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
            <form onSubmit={formik.handleSubmit}>
                <div className="main_table-modal">
                    <div className="main_table-modal" style={{ gap: "1.6rem" }}>
                        <div className="main_table-modal_forms">
                            <div className="forms" style={{alignItems: "flex-start"}}>
                                <div className="sanaty">
                                    <div className="login_forms-label_pink">Преподаватель</div>
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

                        </div>
                        {
                            formik.initialValues.classParam.map((item, index) => (
                                <div className="forms flex" style={{alignItems: "flex-start", gap: "40px", position: "relative"}}>
                                    <div className="sanaty">
                                        <div className="login_forms-label_pink">Класс</div>
                                        <Select {...formik.getFieldProps(`classParam[${index}].class`)}>
                                            <option value="">Выберите класс</option>
                                            {iaclass && iaclass?.slice().sort((a, b) => {
                                                const matchA = a.class_name?.match(/^(\d+)([А-Яа-яA-Za-z]*)$/);
                                                const matchB = b.class_name?.match(/^(\d+)([А-Яа-яA-Za-z]*)$/);
                                                const numberA = parseInt(matchA?.[1] || "");
                                                const numberB = parseInt(matchB?.[1] || "");

                                                const textA = matchA?.[2] || "";
                                                const textB = matchB?.[2] || "";

                                                if (numberA !== numberB) {
                                                    return numberA - numberB;
                                                }

                                                return textA.localeCompare(textB);
                                            }).map((item, index) => (
                                                <option key={index} value={item.id}>{item.class_name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="sanaty">
                                        <div className="login_forms-label_pink">Предмет</div>
                                        <Select {...formik.getFieldProps(`classParam[${index}].subject`)}>
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
                                    <div className="sanaty">
                                        <div className="login_forms-label_pink">Подгруппа</div>
                                        <Select {...formik.getFieldProps(`classParam[${index}].subgroup`)}>
                                            <option value="">Выберите подгруппу</option>
                                            <option value={"yes"}>Да</option>
                                            <option value={"no"}>Нет</option>
                                        </Select>
                                    </div>
                                    <div className="forms">
                                        <div
                                            className="login_forms-label_pink"
                                            style={{width: "180px"}}
                                        >
                                            Количество уроков
                                        </div>
                                        <Input
                                            name={`classParam[${index}].lessonCount`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.classParam[0]?.lessonCount}
                                            style={{
                                                borderColor:
                                                    formik.touched.classParam && formik.touched.classParam[index] && formik.errors.classParam && formik.errors.classParam[index] ? "red" : "#c1bbeb", // Update the conditional check for touched and errors
                                            }}
                                        />
                                    </div>
                                    {
                                        index === 0 ? (
                                            <AddButtton
                                                type={"button"}
                                                onClick= {() => reset(false, 999)}
                                                style={{ position: "absolute", bottom: "0", right: "-42px" }}
                                            >
                                                <AddIcons />
                                            </AddButtton>
                                        ) : (
                                            <AddButtton
                                                type="button"
                                                onClick={() => reset(true,index)}
                                                style={{ position: "absolute", bottom: "0", right: "-42px" }}
                                            >
                                                <ResetIcons/>
                                            </AddButtton>
                                        )
                                    }

                                </div>
                            ))
                        }
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
            </form>
        </>
    );
};

const AddButtton = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;

  cursor: pointer;
`;
export default ScheduleTableBlock;