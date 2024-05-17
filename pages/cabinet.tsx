import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { LogoutIcons, PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import CabinetTableBlock from "@/components/molecules/CabinetTableBlock";
import CabinetTable from "@/components/organisms/CabinetTable";
import MainLayouts from "@/layouts/MainLayouts";
import {
  getClassRoomIdThunk,
  getClassRoomThunk,
} from "@/store/thunks/schoolnfo.thunk";
import {scrollToTop} from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const CabinetPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const cabinet = useTypedSelector((state) => state.system.classroom);
  const cabinetid = useTypedSelector((state) => state.system.classroomid);
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;
  useEffect(() => {
    if (cabinet) {
      dispatch(getClassRoomThunk());
    }
  }, [dispatch]);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
    setId(undefined);

  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);
    scrollToTop();
    setId(id);

    if (id) {
      dispatch(getClassRoomIdThunk(id));
    }
  };

  return (
    <MainLayouts link={"/cabinet"}>
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
            {showActive || editActive ? <LogoutIcons /> : <PlusIcons />}
            {showActive || editActive ? t.actions.close : t.actions.add}
          </div>
        </Button>
      </div>

      {(showActive || editActive) && (
        <CabinetTableBlock
          onReject={setShowActive}
          cabinetid={cabinetid}
          getId={getId}
          setEditActive={setEditActive}
        />
      )}

      <CabinetTable cabinet={cabinet} handleClickGetId={handleClickGetId} />
    </MainLayouts>
  );
};

export default CabinetPage;
