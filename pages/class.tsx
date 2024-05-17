import {LogoutIcons, PlusIcons} from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import ClassTableBlock from "@/components/molecules/ClassTableBlock";
import ClassTable from "@/components/organisms/ClassTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayouts from "@/layouts/MainLayouts";
import { getClassIdThunk, getClassThunk } from "@/store/thunks/schoolnfo.thunk";
import { useEffect, useState } from "react";
import {scrollToTop} from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const ClassPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
    setId(undefined);
  };

  const dispatch = useAppDispatch();
  const classinfo = useTypedSelector((state) => state.system.class);
  const classinfoid = useTypedSelector((state) => state.system.classid);
  useEffect(() => {
    if (classinfo) {
      dispatch(getClassThunk());
    }
  }, [dispatch]);

    const handleClickGetId = (id?: number) => {
        setEditActive(true);
        scrollToTop();
        setId(id);

        if (id) {
            dispatch(getClassIdThunk(id));
        }
    };

    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;

  return (
    <MainLayouts link={"/class"}>
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
        <ClassTableBlock
          classinfoid={classinfoid && classinfoid}
          getId={getId}
          onEdit={setEditActive}
          onReject={setShowActive}
        />
      )}

      <ClassTable
        classinfo={classinfo && classinfo}
        handleClickGetId={handleClickGetId}
      />
    </MainLayouts>
  );
};

export default ClassPage;
