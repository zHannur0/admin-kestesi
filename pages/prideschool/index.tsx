import { useState } from "react";
import { useRouter } from "next/router";
import {LogoutIcons, PlusIcons} from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import Tabs from "@/components/molecules/Tabs/Tabs";
import MainLayouts from "@/layouts/MainLayouts";
import { ITabs } from "@/types/assets.type";
import PrideSchoolTable1 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable1";
import PrideSchoolTable2 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable2";
import PrideSchoolTable3 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable3";
import PrideSchoolTable4 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable4";
import PrideSchoolTable5 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable5";
import PrideSchoolTableBlock1 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock1";
import PrideSchoolTableBlock2 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock2";
import PrideSchoolTableBlock3 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock3";
import PrideSchoolTableBlock4 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock4";
import PrideSchoolTableBlock5 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock5";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
    getPrideIDThunk,
    getSchoolAltynIdThunk,
    getSchoolAtestIdThunk,
    getSchoolOlimpIdThunk,
    getSchoolOnerIdThunk,
    getSchoolSportIdThunk,
} from "@/store/thunks/pride.thunk";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const PrideSchoolComponents = () => {
    const [showActive, setShowActive] = useState<boolean>(false);
    const router = useRouter();

    const [editActive, setEditActive] = useState<boolean>(false);
    const [getId, setId] = useState<number>();

    const dispatch = useAppDispatch();

    const prideId = useTypedSelector((state) => state.pride.prideId);
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;
    const handleAddButtonClick = () => {
        setEditActive(false);
        setShowActive(!showActive);
        setId(undefined);
    };

    const handleGetPrideId = (id?: number) => {
        setEditActive(true);

        setId(id);

        if (id) {
            dispatch(getPrideIDThunk(id));
        }
    };




    return (
        <MainLayouts link={"/prideschool"}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "1.6rem",
                }}
            >
                <Button
                    background={showActive || editActive ? "#CACACA" : "#27AE60"}
                    radius="14px"
                    style={{
                        width: "auto",
                    }}
                    onClick={handleAddButtonClick}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".8rem",
                        }}
                    >
                        {showActive || editActive ? <LogoutIcons/> : <PlusIcons/>}
                        {showActive || editActive ? t.actions.close : t.actions.add}
                    </div>
                </Button>
            </div>
            {(showActive || editActive) && (
                <PrideSchoolTableBlock1
                    onReject={setShowActive}
                    prideId={prideId}
                    getId={getId}
                    onEdit={setEditActive}
                />
            )}
            <PrideSchoolTable1 handleGetPrideId={handleGetPrideId}/>

        </MainLayouts>
    );
};

const tabs: ITabs[] = [
    {
        id: 1,
        type: "Спорт",
    },

    {
        id: 2,
        type: "Өнер",
    },

    {
        id: 3,
        type: "Пәндік олимпиада",
    },

    {
        id: 4,
        type: "Алтын белгі",
    },

    {
        id: 5,
        type: "Қызыл аттестат",
    },
];

export default PrideSchoolComponents;
