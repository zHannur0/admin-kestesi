import { useEffect } from "react";

import {LogoutIcons, PlusIcons} from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import MainTableBlock from "@/components/molecules/MainTableBlock";
import MainTable from "@/components/organisms/MainTable";
import MainLayouts from "@/layouts/MainLayouts";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  getKruzhokInfoIdThunk,
  getKruzhokInfoThunk,
} from "@/store/thunks/schoolnfo.thunk";
import {scrollToTop} from "@/utils/assets.utils";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {useRouter} from "next/router";

const MainPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();
  const router = useRouter();
  const translations: any= {
        kz: kz,
        ru: ru,
    };
  const t = translations[router.locale || "kz"] || kz;
  const dispatch = useAppDispatch();
  const kruzhok = useTypedSelector((state) => state.system.kruzhok);
  const kruzhokid = useTypedSelector((state) => state.system.kruzhokid);

  const handleClickGetId = (id?: number) => {
    setEditActive(true);
    scrollToTop();
    setId(id);

    if (id) {
      dispatch(getKruzhokInfoIdThunk(id));
    }
  };

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
      setId(undefined);
  };

  useEffect(() => {
    if (kruzhok) {
      dispatch(getKruzhokInfoThunk());
    }
  }, [dispatch]);

  return (
    <MainLayouts link={"/main"}>
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
        <MainTableBlock
          onReject={setShowActive}
          kruzhokid={kruzhokid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}

      <MainTable
        kruzhok={kruzhok && kruzhok}
        handleClickGetId={handleClickGetId}
      />
    </MainLayouts>
  );
};

export default MainPage;
