import { useState } from "react";
import { useRouter } from "next/router";
import {LogoutIcons, PlusIcons} from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import Tabs from "@/components/molecules/Tabs/Tabs";
import MainLayouts from "@/layouts/MainLayouts";
import { ITabs } from "@/types/assets.type";
import CallsTable from "@/components/organisms/CallsTable/CallsTable1";
import CallsTable2 from "@/components/organisms/CallsTable/CallsTable2";
import CallsTableBlock1 from "@/components/molecules/Calls/CallsTableBlock1";
import CallsTableBlock2 from "@/components/molecules/Calls/CallsTableBlock2";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getDopIdThunk, getOSIdThunk } from "@/store/thunks/pride.thunk";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const CallsComponents = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const router = useRouter();

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const dopid = useTypedSelector((state) => state.pride.dopid);
  const osid = useTypedSelector((state) => state.pride.osid);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
    setId(undefined);
  };

  const handleClickGetIdDop = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getDopIdThunk(id));
    }
  };

  const handleClickGetIdOS = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getOSIdThunk(id));
    }
  };
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;


    return (
    <MainLayouts link={`/calls/${router.query.id}`}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.6rem",
        }}
      >
        <div style={{ width: "100%", display: "flex", gap: "2.4rem" }}>
          <Tabs link="calls" tabs={router.locale === "kz" ? tabs:tabsRU} />
        </div>
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
            {showActive || editActive ? t.actions.close :t.actions.add}
          </div>
        </Button>
      </div>

      {(showActive || editActive) && router.query.id === "1" && (
        <CallsTableBlock1
          onReject={setShowActive}
          osid={osid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}
      {(showActive || editActive) && router.query.id === "2" && (
        <CallsTableBlock2
          onReject={setShowActive}
          dopid={dopid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}

      {router.query.id === "1" && (
        <CallsTable handleClickGetIdOS={handleClickGetIdOS} />
      )}
      {router.query.id === "2" && (
        <CallsTable2 handleClickGetIdDop={handleClickGetIdDop} />
      )}
    </MainLayouts>
  );
};

const tabs: ITabs[] = [
  {
    id: 1,
    type: "Негізгі сабақ",
  },

  {
    id: 2,
    type: "Қосымша сабақ",
  },
];

const tabsRU: ITabs[] = [
  {
    id: 1,
    type: "Основной урок",
  },

  {
    id: 2,
    type: "Дополнительный урок",
  },
];


export default CallsComponents;
