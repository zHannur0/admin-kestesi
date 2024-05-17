import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {LogoutIcons, PlusIcons} from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import Tabs from "@/components/molecules/Tabs/Tabs";
import SchoolTable from "@/components/organisms/SchoolIdTable/SchoolTable";
import MainLayouts from "@/layouts/MainLayouts";
import SchoolTable2 from "@/components/organisms/SchoolIdTable/SchoolTable2";
import SchoolTable3 from "@/components/organisms/SchoolIdTable/SchoolTable3";
import SchoolTableBlock1 from "@/components/molecules/SchoolTableId/SchoolTableBlock1";
import SchoolTableBlock2 from "@/components/molecules/SchoolTableId/SchoolTableBlock2";
import SchoolTableBlock4 from "@/components/molecules/SchoolTableId/SchoolTableBlock4";
import { ITabs } from "@/types/assets.type";
import SchoolTableBlock3 from "@/components/molecules/SchoolTableId/SchoolTableBlock3";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getSchoolAdminIdThunk, getSchoolDirectorThunk, getSchoolPassportThunk,
  getSchoolPhotosIdThunk, getSchoolPhotosThunk,
  getSchoolSocialIdThunk,
} from "@/store/thunks/schoolnfo.thunk";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import SchoolTableBlock from "@/components/molecules/SchoolTableId/SchoolTableBlock";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";


const SchoolComponents = () => {
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
  const socialid = useTypedSelector((state) => state.system.schoolsocialid);
  const adminid = useTypedSelector((state) => state.system.schooladminid);
  const photosid = useTypedSelector((state) => state.system.schoolphotosid);
  const schoolPassword = useTypedSelector((state) => state.system.schoolpassport);
  const directorid = useTypedSelector((state) => state.system.schooldirector);


  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
    setId(undefined);
  };

  useEffect(() => {
    if (schoolPassword) {
      dispatch(getSchoolPassportThunk());
    }
  }, [dispatch]);

  const handleClickGetIdDop = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolSocialIdThunk(id));
    }
  };

  useEffect(() => {
    if (directorid) {
      dispatch(getSchoolDirectorThunk());
    }
  }, [dispatch]);


  const handleClickGetId1 = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolAdminIdThunk(id));
    }
  };

  const handleClickGetId2 = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolPhotosIdThunk(id));
    }
  };



  return (
    <MainLayouts link={`/school/${router.query.id}`}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.6rem",
        }}
      >
        <Tabs link="school" tabs={router.locale === "kz" ? tabs : tabsRU} handleAddButtonClick={() => {
          setEditActive(false);
          setShowActive(false);
          setId(undefined);
        }}/>
      </div>
      {(router.query.id !== "3" && router.query.id !== "1") &&
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
      }

      {(showActive || editActive) && router.query.id === "2" && (
        <SchoolTableBlock1
          onReject={setShowActive}
          adminid={adminid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}
      {router.query.id === "1" && <SchoolTableBlock  onReject={setShowActive}
                                                     directorId={directorid}
                                                     getId={getId}
                                                     onEdit={setEditActive}/>}
      {router.query.id === "3" && <SchoolTableBlock3 schoolPassport={schoolPassword}/>}
      {(showActive || editActive) && router.query.id === "4" && (
        <SchoolTableBlock2
          onReject={setShowActive}
          photosid={photosid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}
      {(showActive || editActive) && router.query.id === "5" && (
        <SchoolTableBlock4
          onReject={setShowActive}
          socialid={socialid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}

      {router.query.id === "2" && (
        <SchoolTable handleClickGetId1={handleClickGetId1} />
      )}
      {router.query.id === "4" && (
        <SchoolTable2 handleClickGetId2={handleClickGetId2} />
      )}
      {router.query.id === "5" && (
        <SchoolTable3 handleClickGetIdDop={handleClickGetIdDop} />
      )}
    </MainLayouts>
  );
};

const tabs: ITabs[] = [
  {
    id: 1,
    type: "Мектеп директоры",
  },

  {
    id: 2,
    type: "Мектеп әкімшілігі",
  },

  {
    id: 3,
    type: "Мектеп төлқұжаты",
  },

  {
    id: 4,
    type: "Фото-суреттер",
  },

  {
    id: 5,
    type: "Әлеуметтік желілер",
  },
];

const tabsRU: ITabs[] = [
  {
    id: 1,
    type: "Директор школы",
  },

  {
    id: 2,
    type: "Администрация школы",
  },

  {
    id: 3,
    type: "Паспорт школы",
  },

  {
    id: 4,
    type: "Фото",
  },

  {
    id: 5,
    type: "Социальные сети",
  },
];

export default SchoolComponents;
