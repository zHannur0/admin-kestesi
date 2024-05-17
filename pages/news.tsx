import {LogoutIcons, PlusIcons} from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import NewsTableBlock from "@/components/molecules/NewsTableBlock";
import NewsTable from "@/components/organisms/NewsTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayouts from "@/layouts/MainLayouts";
import { getNewsIdThunk } from "@/store/thunks/pride.thunk";
import { useState } from "react";
import {scrollToTop} from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const NewsPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const newsid = useTypedSelector((state) => state.pride.newsid);
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;
  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
    setId(undefined)
  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);
    scrollToTop();

    setId(id);

    if (id) {
      dispatch(getNewsIdThunk(id));
    }
  };

  return (
    <MainLayouts link={"/news"}>
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
        <NewsTableBlock
          newsid={newsid}
          getId={getId}
          onEdit={setEditActive}
          onReject={setShowActive}
        />
      )}
      <NewsTable handleClickGetId={handleClickGetId} />
    </MainLayouts>
  );
};

export default NewsPage;
