import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, Select } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import {
    getTokenInLocalStorage,
    getWeekDayNumber,
    getWeekDayString, urlToFile,
} from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
    getClassRoomThunk, getMapThunk,
    getMenuThunk, getSchoolPassportThunk, getSliderThunk,
} from "@/store/thunks/schoolnfo.thunk";
import {IMap, IMenu, ISlider} from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import { useFormik, useField, Formik, Form } from "formik";
import * as Yup from "yup";
import {MdClear} from "react-icons/md";
import DeleteModal from "@/components/modals/DeleteModal";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface IUpdateInput {
    name?: string;
    recipe?: string;
    exits: Record<string, string>;
}

interface IProps {
    onReject?: Dispatch<SetStateAction<boolean>>;
    onEdit?: Dispatch<SetStateAction<boolean>>;
    getId?: any;
    photo?: ISlider[];
}

const MapTableBlock: FC<IProps> = ({ onReject, getId, photo, onEdit }) => {
    const [showActive, setShowActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {
        showSuccessModal,
        showErrorModal,
        showDeleteModal,
        onDeleteModalClose,
        onSuccessModalClose,
        onErrorModalClose,
        showSuccess,
        showError,
        showDelete,
    } = useModalLogic();
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;


    const [photo1, setPhoto1] = useState<File | null>();
    const [photo2, setPhoto2] = useState<File | null>();
    const [photo3, setPhoto3] = useState<File | null>();
    const [photo4, setPhoto4] = useState<File | null>();
    const [photo5, setPhoto5] = useState<File | null>();
    const [photo6, setPhoto6] = useState<File | null>();
    const [photo7, setPhoto7] = useState<File | null>();
    const [photo8, setPhoto8] = useState<File | null>();
    const [photo9, setPhoto9] = useState<File | null>();
    const [photo10, setPhoto10] = useState<File | null>();

    const formik = useFormik({
        initialValues: {
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            photo1 && formData.append("photo1", photo1);
            photo2 && formData.append("photo2", photo2);
            photo3 && formData.append("photo3", photo3);
            photo4 && formData.append("photo4", photo4);
            photo5 && formData.append("photo5", photo5);
            photo6 && formData.append("photo6", photo6);
            photo7 && formData.append("photo7", photo7);
            photo8 && formData.append("photo8", photo8);
            photo9 && formData.append("photo9", photo9);
            photo10 && formData.append("photo10", photo10);

            if (photo?.length===0) {
                await instance
                    .post(
                        "https://www.bilimge.kz/admins/api/main_slider/",
                        formData,
                        {
                            headers: {
                                Authorization: `Token ${getTokenInLocalStorage()}`,
                            },
                        },
                    )
                    .then((res) => {
                        if (res) {
                            dispatch(getSliderThunk());
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
                        `https://www.bilimge.kz/admins/api/main_slider/${photo?.[0]?.id}/`,
                        formData,
                        {
                            headers: {
                                Authorization: `Token ${getTokenInLocalStorage()}`,
                            },
                        },
                    )
                    .then((res) => {
                        if (res) {
                            dispatch(getSliderThunk());
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
        },
    });

    const handleDelete = async () => {
        await instance
            .delete(`https://www.bilimge.kz/admins/api/main_slider/${photo?.[0]?.id}/`, {
                headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                },
            })
            .then((res) => {
                console.log("Good")
            })
            .catch((e) => console.log(e));
        dispatch(getSliderThunk());
        onDeleteModalClose();
    };

    useEffect(() => {
        const fetchFiles = async () => {
            if (photo && photo.length > 0) {
                try {
                    const photo1 = await urlToFile(photo[0].photo1);
                    setPhoto1(photo1);
                    const photo2 = await urlToFile(photo[0].photo2);
                    setPhoto2(photo2);
                    const photo3 = await urlToFile(photo[0].photo3);
                    setPhoto3(photo3);
                    const photo4 = await urlToFile(photo[0].photo4);
                    setPhoto4(photo4);
                    const photo5 = await urlToFile(photo[0].photo5);
                    setPhoto5(photo5);
                    const photo6 = await urlToFile(photo[0].photo6);
                    setPhoto6(photo6);
                    const photo7 = await urlToFile(photo[0].photo7);
                    setPhoto7(photo7);
                    const photo8 = await urlToFile(photo[0].photo8);
                    setPhoto8(photo8);
                    const photo9 = await urlToFile(photo[0].photo9);
                    setPhoto9(photo9);
                    const photo10 = await urlToFile(photo[0].photo10);
                    setPhoto10(photo10);
                } catch (error) {
                    console.error("Error fetching files", error);
                }
            }else {
                setPhoto1(null);
                setPhoto2(null);
                setPhoto3(null);
                setPhoto4(null);
                setPhoto5(null);
                setPhoto6(null);
                setPhoto7(null);
                setPhoto8(null);
                setPhoto9(null);
                setPhoto10(null);

            }
        };

        fetchFiles();
    }, [photo]);


    function onDelete() {
        setPhoto1(null);
        setPhoto2(null);
        setPhoto3(null);
        setPhoto4(null);
        setPhoto5(null);
        setPhoto6(null);
        setPhoto7(null);
        setPhoto8(null);
        setPhoto9(null);
        setPhoto10(null);
    }

    return (
        <>
            {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
            {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
            {showDeleteModal && <DeleteModal onClose = {onDeleteModalClose} handleDelete={handleDelete}/>}
            <form onSubmit={formik.handleSubmit}>
                <div className="main_table-modal">
                    <div className="main_table-modal_title">Фото-слайдер</div>
                    <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
                        <div className="main_table-modal_forms" >
                            <div className="forms" style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 1</div>
                                    {
                                        photo1 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo1.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto1(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto1(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />

                                            )

                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 2</div>
                                    {
                                        photo2 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo2.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto2(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto2(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )

                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 3</div>
                                    {
                                        photo3 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo3.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto3(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto3(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 4</div>
                                    {
                                        photo4 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo4.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto4(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto4(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 5</div>
                                    {
                                        photo5 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo5.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto5(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto5(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 6</div>
                                    {
                                        photo6 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo6.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto6(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto6(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 7</div>
                                    {
                                        photo7 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo7.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto6(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto6(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 8</div>
                                    {
                                        photo8 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo8.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto6(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto6(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 9</div>
                                    {
                                        photo9 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo9.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto6(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto6(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">Фото 10</div>
                                    {
                                        photo10 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{photo10.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setPhoto6(null)}/>
                                                    </div>
                                                </div>) :
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file"
                                                       name="photo"
                                                       onChange={(event) => {
                                                           return setPhoto6(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .png, .jpeg"
                                                />
                                            )
                                    }
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
                                    type="button"
                                    onClick={showDelete}
                                >
                                    {t.photoSlider.delete}
                                </Button>
                                <Button
                                    background="#27AE60"
                                    style={{width: "auto"}}
                                    type={"submit"}
                                >
                                    {t.photoSlider.save}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MapTableBlock;
