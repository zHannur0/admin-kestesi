import { useEffect, useState } from "react";
import { LogoutIcons, PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import MenuTableBlock from "@/components/molecules/MenuTableBlock";
import MenuTable from "@/components/organisms/MenuTable";
import MainLayouts from "@/layouts/MainLayouts";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getMenuIdThunk, getMenuThunk } from "@/store/thunks/schoolnfo.thunk";
import {useSelector} from "react-redux";
import {scrollToTop} from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const MenuPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const menu = useTypedSelector((state) => state.system.menu);
  const menuid = useTypedSelector((state) => state.system.menuid);
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;

  useEffect(() => {
    if (menu) {
      dispatch(getMenuThunk());
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
      dispatch(getMenuIdThunk(id));
    }
  };

  return (
    <MainLayouts link={"/menu"}>
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
        <MenuTableBlock
          onReject={setShowActive}
          getId={getId}
          menuid={menuid}
          onEdit={setEditActive}
        />
      )}

      <MenuTable
        menu={menu}
        setDel={setDel}
        del={del}
        handleClickGetId={handleClickGetId}
      />
    </MainLayouts>
  );
};

export default MenuPage;
