import { useEffect, useState } from "react";
import { LogoutIcons, PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import MenuTableBlock from "@/components/molecules/MenuTableBlock";
import MenuTable from "@/components/organisms/MenuTable";
import MainLayouts from "@/layouts/MainLayouts";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {getMapThunk, getMenuIdThunk, getMenuThunk} from "@/store/thunks/schoolnfo.thunk";
import {useSelector} from "react-redux";
import MapTableBlock from "@/components/molecules/MapTableBlock";

const MapPage = () => {
    const [showActive, setShowActive] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false);
    const [editActive, setEditActive] = useState<boolean>(false);
    const [getId, setId] = useState<number>();

    const dispatch = useAppDispatch();
    const maps = useTypedSelector((state) => state.system.maps);

    useEffect(() => {
        if (maps) {
            dispatch(getMapThunk());
        }
    }, [dispatch]);

    const handleAddButtonClick = () => {
        setEditActive(false);
        setShowActive(!showActive);
        setId(undefined);
    };

    const handleClickGetId = (id?: number) => {
        setEditActive(true);

        setId(id);

        if (id) {
            dispatch(getMenuIdThunk(id));
        }
    };

    return (
        <MainLayouts link={"/map"}>
                <MapTableBlock
                    onReject={setShowActive}
                    getId={getId}
                    mapId={maps}
                    onEdit={setEditActive}
                />

        </MainLayouts>
    );
};

export default MapPage;
