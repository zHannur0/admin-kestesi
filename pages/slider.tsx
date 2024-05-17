import { useEffect, useState } from "react";
import MainLayouts from "@/layouts/MainLayouts";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {getMapThunk, getMenuIdThunk, getMenuThunk, getSliderThunk} from "@/store/thunks/schoolnfo.thunk";
import MapTableBlock from "@/components/molecules/MapTableBlock";
import SliderTableBlock from "@/components/molecules/SliderTableBlock";

const SliderPage = () => {
    const [showActive, setShowActive] = useState<boolean>(false);
    const [editActive, setEditActive] = useState<boolean>(false);
    const [getId, setId] = useState<number>();

    const dispatch = useAppDispatch();
    const slider = useTypedSelector((state) => state.system.slider);

    useEffect(() => {
        if (slider) {
            dispatch(getSliderThunk());
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
        <MainLayouts link={"/slider"}>
            <SliderTableBlock
                onReject={setShowActive}
                getId={getId}
                photo={slider}
                onEdit={setEditActive}
            />
<div>

</div>
        </MainLayouts>
    );
};

export default SliderPage;
