import Sidebar from "@/components/organisms/Sidebar";
import {ReactNode, useEffect, useState} from "react";
import { ButtonLogout } from "@/components/atoms/UI/Buttons/Button";
import { LogoutIcons } from "@/components/atoms/Icons";
import { localStorageWrapper } from "@/components/data/storage";
import { useRouter } from "next/router";
import {instance} from "@/api/axios.instance";
import {getTokenInLocalStorage} from "@/utils/assets.utils";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import Link from "next/link";

interface ILayouts {
  children: ReactNode;
  link?: string;
}

const MainLayouts = ({ children, link }: ILayouts) => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      router.push("/");
      localStorageWrapper.remove("token");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
    const [schoolName, setSchoolName] = useState<string>();
    useEffect(() => {
        async function getSchool() {
            await instance
                .get("https://www.bilimge.kz/admins/users/me/", {
                    headers: {
                        Authorization: `Token ${
                            getTokenInLocalStorage()
                        }`,
                    },
                })
                .then((res?: any) => {
                    if (res) {
                        setSchoolName(res?.school_name)
                    }
                });
        }
        getSchool();
    }, []);

    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;

  return (
    <div className={`container`}>
      <Sidebar />

      <div className="main">
        <div className="main_inner">
            <div
                className="flex-end"
                style={{
                    width: "100%",
                    marginBottom: "2.5rem",
                    alignItems: "center",
                    gap: "4rem",
                }}
            >
                {router.locale === "kz" ? (
                        <Link href={link || ""} locale="ru">
                            <div className={""} >
                                <span>Русский</span></div>
                        </Link> ) :
                    (
                        <Link href={link || ""}  locale="kz">
                            <div className={""}>
                                <span>Қазақша</span></div>
                        </Link>
                    )
                }
                <div
                    style={{
                        fontSize: "1.6rem",
                        color: "#060C3C",
                        fontWeight: "600",
                    }}
                >
                    {schoolName}
                </div>
                <ButtonLogout onClick={onLogout}>
                    <LogoutIcons/>
                    {t.exit.action}
                </ButtonLogout>
            </div>
            {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayouts;
