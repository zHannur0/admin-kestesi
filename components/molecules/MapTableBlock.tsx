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
    getMenuThunk, getSchoolPassportThunk,
} from "@/store/thunks/schoolnfo.thunk";
import {IMap, IMenu} from "@/types/assets.type";
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
    mapId?: IMap[];
}

const MapTableBlock: FC<IProps> = ({ onReject, getId, mapId, onEdit }) => {
    const [showActive, setShowActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;

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

    const [map, setMap] = useState<File | null>();
    const [flat1, setFlat1] = useState<File | null>();
    const [flat2, setFlat2] = useState<File | null>();
    const [flat3, setFlat3] = useState<File | null>();
    const [flat4, setFlat4] = useState<File | null>();
    const [flat5, setFlat5] = useState<File | null>();
    const [map1Id, setMapId] = useState<string | null>();
    const [flat1Id, setFlat1Id] = useState<string | null>();
    const [flat2Id, setFlat2Id] = useState<string | null>();
    const [flat3Id, setFlat3Id] = useState<string | null>();
    const [flat4Id, setFlat4Id] = useState<string | null>();
    const [flat5Id, setFlat5Id] = useState<string | null>();

    const formik = useFormik({
        initialValues: {
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async (values) => {

            const formData = new FormData();
            map && formData.append("map", map);
            flat1 && formData.append("flat1", flat1);
            flat2 && formData.append("flat2", flat2);
            flat3 && formData.append("flat3", flat3);
            flat4 && formData.append("flat4", flat4);
            flat5 && formData.append("flat5", flat5);

            if (mapId?.length===0) {
                await instance
                    .post(
                        "https://www.bilimge.kz/admins/api/schoolmap/",
                        formData,
                        {
                            headers: {
                                Authorization: `Token ${getTokenInLocalStorage()}`,
                            },
                        },
                    )
                    .then((res) => {
                        if (res) {
                            dispatch(getMapThunk());
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
                        `https://www.bilimge.kz/admins/api/schoolmap/${mapId?.[0]?.id}/`,
                        formData,
                        {
                            headers: {
                                Authorization: `Token ${getTokenInLocalStorage()}`,
                            },
                        },
                    )
                    .then((res) => {
                        if (res) {
                            dispatch(getMapThunk());
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
            .delete(`https://www.bilimge.kz/admins/api/schoolmap/${mapId?.[0]?.id}/`, {
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
    };
    useEffect(() => {
        const fetchFiles = async () => {
            if (mapId && mapId.length > 0) {
                try {
                    const map = await urlToFile(mapId[0].map);
                    setMap(map);
                    const flat1 = await urlToFile(mapId[0].flat1);
                    setFlat1(flat1);
                    const flat2 = await urlToFile(mapId[0].flat2);
                    setFlat2(flat2);
                    const flat3 = await urlToFile(mapId[0].flat3);
                    setFlat3(flat3);
                    const flat4 = await urlToFile(mapId[0].flat4);
                    setFlat4(flat4);
                    const flat5 = await urlToFile(mapId[0].flat5);
                    setFlat5(flat5);
                } catch (error) {
                    console.error("Error fetching files", error);
                }
            }else {
                setMap(null);
                setFlat1(null);
                setFlat2(null);
                setFlat3(null);
                setFlat4(null);
                setFlat5(null);
            }
        };

        fetchFiles();
    }, [mapId]);


    function onDelete() {
        setMap(null);
        setFlat1(null);
        setFlat2(null);
        setFlat3(null);
        setFlat4(null);
        setFlat5(null);
    }

    return (
        <>
            {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
            {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
            {showDeleteModal && <DeleteModal onClose = {onDeleteModalClose} handleDelete={handleDelete}/>}
            <form onSubmit={formik.handleSubmit}>
                <div className="main_table-modal">
                    <div className="main_table-modal_title">{t.schoolMap.name}</div>
                    <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
                        <div className="main_table-modal_forms">
                            <div className="forms">
                                <div className="flex">
                                    <div className="login_forms-label_pink">1 этаж</div>
                                    {
                                        flat1 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{flat1.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setFlat1(null)}/>
                                                    </div>
                                                </div>):
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo"
                                                       onChange={(event) => {
                                                           return setFlat1(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .jpeg, png"
                                                />
                                            )

                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">2 этаж</div>
                                    {
                                    flat2 ? (
                                    <div className="file-item">
                                        <div className="file-info">
                                            <p>{flat2.name.substring(0, 14)}</p>
                                        </div>
                                        <div className="file-actions">
                                            <MdClear onClick={() => setFlat2(null)}/>
                                        </div>
                                    </div>):
                                    (
                                    <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo"
                                           onChange={(event) => {
                                               return setFlat2(event?.target?.files?.[0]);
                                           }}
                                           accept=".svg, .jpg, .jpeg, png"
                                    />
                                    )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">3 этаж</div>
                                    {
                                        flat3 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{flat3.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setFlat3(null)}/>
                                                    </div>
                                                </div>):
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo"
                                                       onChange={(event) => {
                                                           return setFlat3(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .jpeg, png"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">4 этаж</div>
                                    {
                                        flat4 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{flat4.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setFlat4(null)}/>
                                                    </div>
                                                </div>):
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo"
                                                       onChange={(event) => {
                                                           return setFlat4(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .jpeg, png"
                                                />
                                            )
                                    }
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">5 этаж</div>
                                    {
                                        flat5 ? (
                                                <div className="file-item">
                                                    <div className="file-info">
                                                        <p>{flat5.name.substring(0, 14)}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        <MdClear onClick={() => setFlat5(null)}/>
                                                    </div>
                                                </div>):
                                            (
                                                <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo"
                                                       onChange={(event) => {
                                                           return setFlat5(event?.target?.files?.[0]);
                                                       }}
                                                       accept=".svg, .jpg, .jpeg, png"
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
                                    {t.schoolMap.delete}
                                </Button>
                                <Button
                                    background="#27AE60"
                                    style={{width: "auto"}}
                                    type={"submit"}
                                >
                                    {t.schoolMap.save}
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
